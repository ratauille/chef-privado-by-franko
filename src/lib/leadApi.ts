export interface LeadPayload {
  lead_id?: string;
  clientName: string;
  email: string;
  phone: string;
  date: string;
  guests: number;
  serviceName: string;
  notes: string;
  source?: string;
  landingPage?: string;
  submittedAt?: string;
}

interface RecaptchaWindow extends Window {
  grecaptcha?: {
    enterprise?: {
      ready?: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  };
}

const RECAPTCHA_SITE_KEY =
  import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6Leo8bYtAAAAAAUiuv6Fuyf2OePRM1KQodNFBvGC';

export const FORMSPREE_DEFAULT_ENDPOINT = 'https://formspree.io/f/mwlprdwr';
export const API_LEAD_DEFAULT_ENDPOINT = '/api/lead';

let recaptchaScriptPromise: Promise<void> | null = null;
let inFlightLeadSubmission = false;

export function preloadRecaptchaEnterprise(): Promise<void> {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return Promise.resolve();
  }
  if ((window as RecaptchaWindow).grecaptcha?.enterprise) {
    return Promise.resolve();
  }
  if (recaptchaScriptPromise) {
    return recaptchaScriptPromise;
  }

  recaptchaScriptPromise = new Promise<void>(resolve => {
    const existing = document.querySelector<HTMLScriptElement>('script[src*="recaptcha/enterprise.js"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => resolve(), { once: true });
      setTimeout(resolve, 2500);
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = `https://www.google.com/recaptcha/enterprise.js?render=${encodeURIComponent(RECAPTCHA_SITE_KEY)}`;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.head.appendChild(script);
    setTimeout(resolve, 3500);
  });

  return recaptchaScriptPromise;
}

export async function ensureRecaptchaToken(action: 'LEAD' | 'RESERVATION' | 'CHAT'): Promise<string> {
  try {
    await preloadRecaptchaEnterprise();
    let enterprise = (window as RecaptchaWindow).grecaptcha?.enterprise;
    if (!enterprise) {
      for (let i = 0; i < 35; i++) {
        await new Promise(r => setTimeout(r, 150));
        enterprise = (window as RecaptchaWindow).grecaptcha?.enterprise;
        if (enterprise) break;
      }
    }
    if (!enterprise) {
      console.warn(`[reCAPTCHA] enterprise object not found after waiting for ${action}`);
      return '';
    }

    const token = await new Promise<string>((resolve) => {
      const timer = setTimeout(() => {
        console.warn(`[reCAPTCHA] Timeout waiting for execution of ${action}`);
        resolve('');
      }, 7000);

      enterprise.ready(async () => {
        try {
          const t = await enterprise.execute(RECAPTCHA_SITE_KEY, { action });
          clearTimeout(timer);
          resolve(t || '');
        } catch (e) {
          clearTimeout(timer);
          console.warn(`[reCAPTCHA] Error executing action ${action}:`, e);
          resolve('');
        }
      });
    });

    return token || '';
  } catch (err) {
    console.warn(`[reCAPTCHA] Could not obtain token for ${action}:`, err);
    return '';
  }
}

export function generateLeadId(): string {
  const timestamp = Date.now();
  if (typeof crypto !== 'undefined') {
    if (typeof crypto.randomUUID === 'function') {
      return `lead_${timestamp}_${crypto.randomUUID()}`;
    }
    if (typeof crypto.getRandomValues === 'function') {
      const bytes = new Uint8Array(16);
      crypto.getRandomValues(bytes);
      const hex = Array.from(bytes, b => b.toString(16).padStart(2, '0')).join('');
      return `lead_${timestamp}_${hex}`;
    }
  }
  return `lead_${timestamp}_${Math.trunc(performance.now() * 1000).toString(16)}`;
}

export async function submitLead(payload: LeadPayload, action: 'LEAD' | 'RESERVATION') {
  if (inFlightLeadSubmission) {
    throw new Error('Tu solicitud ya se está enviando. Por favor espera unos segundos.');
  }

  inFlightLeadSubmission = true;
  try {
    const leadId = payload.lead_id || generateLeadId();
    const enrichedPayload: LeadPayload = {
      ...payload,
      lead_id: leadId,
      source: payload.source || (action === 'LEAD' ? 'quote_modal' : 'reservation_page'),
      landingPage:
        payload.landingPage || (typeof window !== 'undefined' ? window.location.pathname : '/'),
      submittedAt: payload.submittedAt || new Date().toISOString(),
    };

    const isApiLeadEnabled = Boolean(import.meta.env?.VITE_ENABLE_API_LEAD === 'true');

    // 1. Optional Cloud Function channel (/api/lead) when VITE_ENABLE_API_LEAD === 'true'
    if (isApiLeadEnabled) {
      const recaptchaToken = await ensureRecaptchaToken(action);
      if (recaptchaToken) {
        const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
        const timer = controller ? setTimeout(() => controller.abort(), 10000) : null;
        try {
          const apiRes = await fetch(API_LEAD_DEFAULT_ENDPOINT, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'X-Lead-Id': leadId,
              'X-ReCaptcha-Token': recaptchaToken,
              'X-ReCaptcha-Action': action,
            },
            body: JSON.stringify({
              ...enrichedPayload,
              recaptchaToken,
              recaptchaAction: action,
            }),
            signal: controller?.signal,
          });

          if (apiRes.ok) {
            const data = await apiRes.json().catch(() => ({}));
            return { success: true, leadId, channel: 'api_lead', ...data };
          }
          console.warn(`[submitLead] /api/lead returned HTTP ${apiRes.status}, falling back to Formspree.`);
        } catch (apiErr) {
          console.warn('[submitLead] /api/lead error, falling back to Formspree:', apiErr);
        } finally {
          if (timer) clearTimeout(timer);
        }
      }
    }

    // 2. Primary verified production channel: Formspree
    const fsController = typeof AbortController !== 'undefined' ? new AbortController() : null;
    const fsTimer = fsController ? setTimeout(() => fsController.abort(), 10000) : null;
    try {
      const fsResponse = await fetch(FORMSPREE_DEFAULT_ENDPOINT, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(enrichedPayload),
        signal: fsController?.signal,
      });

      if (fsResponse.ok) {
        return {
          success: true,
          leadId,
          channel: 'formspree',
        };
      }

      const result = await fsResponse.json().catch(() => null);
      throw new Error(
        result?.error ||
          'No pudimos registrar tu solicitud en este momento. Por favor envíala directamente por WhatsApp.'
      );
    } finally {
      if (fsTimer) clearTimeout(fsTimer);
    }
  } finally {
    inFlightLeadSubmission = false;
  }
}
