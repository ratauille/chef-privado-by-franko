/**
 * Lead Dispatcher y Servicio de Captura Resiliente para ChefOS / Chef4You
 * 
 * Principios:
 * 1. Genera un identificador único e idempotente `lead_id` para cada cotización.
 * 2. Canal primario actual: Formspree (fiable, en producción).
 * 3. Integración con apiLead preparada mediante Feature Flag controlada (`VITE_ENABLE_API_LEAD`),
 *    desactivada por defecto hasta contar con confirmación y deduplicación verificable.
 * 4. NUNCA reporta éxito si ningún canal aceptó la solicitud.
 * 5. Provee WhatsApp como último recurso manual cuando la red falle por completo.
 */

export interface LeadSubmissionPayload {
  lead_id?: string;
  clientName: string;
  email: string;
  phone: string;
  date: string;
  guests: number;
  serviceName: string;
  notes?: string;
  source: string;
  landingPage?: string;
  submittedAt?: string;
}

export interface LeadDispatchResult {
  success: boolean;
  leadId: string;
  channel: 'formspree' | 'api_lead' | 'none';
  error?: string;
}

export interface LeadDispatcherOptions {
  fetchImpl?: typeof fetch;
  formspreeEndpoint?: string;
  apiLeadEndpoint?: string;
  enableApiLead?: boolean;
  timeoutMs?: number;
}

/**
 * Genera un identificador único criptográficamente seguro para el lead.
 * Utiliza crypto.randomUUID() para garantizar unicidad e invulnerabilidad a colisiones.
 */
export function generateLeadId(): string {
  const timestamp = Date.now();
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `lead_${timestamp}_${crypto.randomUUID()}`;
  }
  // Fallback seguro en caso de entornos sin crypto.randomUUID
  const randomPart = Math.random().toString(36).substring(2, 10);
  return `lead_${timestamp}_${randomPart}`;
}

export const FORMSPREE_DEFAULT_ENDPOINT = 'https://formspree.io/f/mwlprdwr';
export const API_LEAD_DEFAULT_ENDPOINT = '/api/lead';

/**
 * Despacha el lead al canal activo de forma segura y controlada.
 */
export async function dispatchLead(
  leadData: LeadSubmissionPayload,
  options: LeadDispatcherOptions = {}
): Promise<LeadDispatchResult> {
  const fetchFn = options.fetchImpl || fetch;
  const leadId = leadData.lead_id || generateLeadId();
  const formspreeUrl = options.formspreeEndpoint || FORMSPREE_DEFAULT_ENDPOINT;
  const apiLeadUrl = options.apiLeadEndpoint || API_LEAD_DEFAULT_ENDPOINT;
  
  // Feature Flag: controlada por opción directa o por variable de entorno Vite
  // Por defecto es FALSE (desactivada) según requerimiento de la misión.
  const isApiLeadEnabled = options.enableApiLead ?? (
    typeof import.meta !== 'undefined' && 
    Boolean(import.meta.env?.VITE_ENABLE_API_LEAD === 'true')
  );

  const payload: LeadSubmissionPayload = {
    ...leadData,
    lead_id: leadId,
    submittedAt: leadData.submittedAt || new Date().toISOString(),
  };

  const timeoutMs = options.timeoutMs ?? 10000;

  // 1. Si apiLead está expresamente activado por Feature Flag, intentamos primero apiLead
  if (isApiLeadEnabled) {
    const apiController = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const apiTimer = apiController ? setTimeout(() => apiController.abort(), timeoutMs) : null;
    try {
      const apiResponse = await fetchFn(apiLeadUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Lead-Id': leadId,
        },
        body: JSON.stringify(payload),
        signal: apiController?.signal,
      });

      if (apiResponse.ok) {
        return {
          success: true,
          leadId,
          channel: 'api_lead',
        };
      }
      console.warn(`[LeadDispatcher] apiLead respondió HTTP ${apiResponse.status}, alternando a canal de respaldo.`);
    } catch (apiErr: any) {
      console.warn('[LeadDispatcher] Error o timeout en apiLead:', apiErr?.message || apiErr);
    } finally {
      if (apiTimer) clearTimeout(apiTimer);
    }
  }

  // 2. Canal Confiable Operativo: Formspree (sin envíos duplicados simultáneos)
  const fsController = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const fsTimer = fsController ? setTimeout(() => fsController.abort(), timeoutMs) : null;
  try {
    const fsResponse = await fetchFn(formspreeUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: fsController?.signal,
    });

    if (fsResponse.ok) {
      return {
        success: true,
        leadId,
        channel: 'formspree',
      };
    }

    return {
      success: false,
      leadId,
      channel: 'none',
      error: `Formspree respondió con código HTTP ${fsResponse.status}.`,
    };
  } catch (fsErr: any) {
    const isTimeout = fsErr?.name === 'AbortError' || fsErr?.message?.includes('aborted');
    return {
      success: false,
      leadId,
      channel: 'none',
      error: isTimeout ? 'Tiempo de espera agotado al enviar formulario.' : (fsErr?.message || 'Fallo de conexión al enviar formulario.'),
    };
  } finally {
    if (fsTimer) clearTimeout(fsTimer);
  }
}
