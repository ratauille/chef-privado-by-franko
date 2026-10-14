import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  generateLeadId,
  dispatchLead,
  FORMSPREE_DEFAULT_ENDPOINT,
  API_LEAD_DEFAULT_ENDPOINT,
  type LeadSubmissionPayload,
} from './src/lib/leadDispatcher.ts';

const baseLead: LeadSubmissionPayload = {
  clientName: 'Comensal VIP Prueba',
  email: 'test@chef4you.example.com',
  phone: '+52 322 000 1122',
  date: '2026-11-20',
  guests: 4,
  serviceName: 'Cena Degustación de Autor 5 Tiempos',
  notes: 'Sin mariscos ni lácteos',
  source: 'test_suite',
};

// -------------------------------------------------------------
// Pruebas Base (1 a 7)
// -------------------------------------------------------------

test('1. generateLeadId genera un identificador con prefijo lead_ timestamp y UUID seguro', () => {
  const id1 = generateLeadId();
  const id2 = generateLeadId();
  // Formato: lead_<timestamp>_<uuid-con-guiones> o fallback alfanumérico
  assert.match(id1, /^lead_\d+_[a-z0-9\-]+$/i);
  assert.match(id2, /^lead_\d+_[a-z0-9\-]+$/i);
  assert.notEqual(id1, id2, 'Dos IDs generados sucesivamente deben ser unicos');
});

test('2. dispatchLead por defecto utiliza Formspree y no intenta apiLead (Feature Flag inactiva)', async () => {
  let formspreeCalled = false;
  let apiLeadCalled = false;
  let interceptedPayload: any = null;

  const mockFetch: typeof fetch = async (url, init) => {
    const urlStr = String(url);
    if (urlStr === FORMSPREE_DEFAULT_ENDPOINT) {
      formspreeCalled = true;
      interceptedPayload = JSON.parse(String(init?.body));
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }
    if (urlStr === API_LEAD_DEFAULT_ENDPOINT) {
      apiLeadCalled = true;
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }
    return new Response('Not found', { status: 404 });
  };

  const result = await dispatchLead(baseLead, {
    fetchImpl: mockFetch,
    enableApiLead: false,
  });

  assert.equal(result.success, true);
  assert.equal(result.channel, 'formspree');
  assert.equal(formspreeCalled, true, 'Formspree debio ser invocado');
  assert.equal(apiLeadCalled, false, 'apiLead NO debio ser invocado cuando el feature flag esta desactivado');
  assert.ok(interceptedPayload.lead_id, 'El payload debe contener lead_id');
  assert.equal(interceptedPayload.clientName, baseLead.clientName);
});

test('3. dispatchLead no muestra exito si Formspree responde con error HTTP (ej. 429 o 500)', async () => {
  const mockFetch: typeof fetch = async () => {
    return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), { status: 429 });
  };

  const result = await dispatchLead(baseLead, {
    fetchImpl: mockFetch,
    enableApiLead: false,
  });

  assert.equal(result.success, false, 'No debe reportar exito ante error HTTP');
  assert.equal(result.channel, 'none');
  assert.match(result.error || '', /429/);
});

test('4. dispatchLead no muestra exito ante error de conexion o fallo de red total', async () => {
  const mockFetch: typeof fetch = async () => {
    throw new Error('TypeError: Failed to fetch (Network disconnected)');
  };

  const result = await dispatchLead(baseLead, {
    fetchImpl: mockFetch,
    enableApiLead: false,
  });

  assert.equal(result.success, false, 'No debe reportar exito en fallo de red');
  assert.equal(result.channel, 'none');
  assert.match(result.error || '', /Network disconnected/);
});

test('5. Reintentos con el mismo lead_id respetan el identificador original (Idempotencia en cliente)', async () => {
  const customLeadId = 'lead_predefined_123456';
  let recordedLeadId = '';

  const mockFetch: typeof fetch = async (_url, init) => {
    const body = JSON.parse(String(init?.body));
    recordedLeadId = body.lead_id;
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  };

  const result = await dispatchLead(
    { ...baseLead, lead_id: customLeadId },
    { fetchImpl: mockFetch, enableApiLead: false }
  );

  assert.equal(result.success, true);
  assert.equal(result.leadId, customLeadId);
  assert.equal(recordedLeadId, customLeadId, 'El lead_id original debe persistir en el payload');
});

test('6. Preparacion de apiLead: Cuando se activa por Feature Flag y responde 200, se usa apiLead sin duplicar a Formspree', async () => {
  let formspreeCalled = false;
  let apiLeadCalled = false;

  const mockFetch: typeof fetch = async (url) => {
    const urlStr = String(url);
    if (urlStr === API_LEAD_DEFAULT_ENDPOINT) {
      apiLeadCalled = true;
      return new Response(JSON.stringify({ success: true, id: 'res_123' }), { status: 200 });
    }
    if (urlStr === FORMSPREE_DEFAULT_ENDPOINT) {
      formspreeCalled = true;
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }
    return new Response('404', { status: 404 });
  };

  const result = await dispatchLead(baseLead, {
    fetchImpl: mockFetch,
    enableApiLead: true, // Activado para esta prueba
  });

  assert.equal(result.success, true);
  assert.equal(result.channel, 'api_lead');
  assert.equal(apiLeadCalled, true);
  assert.equal(formspreeCalled, false, 'NO debe haber envio simultaneo duplicado a Formspree si apiLead tuvo exito');
});

test('7. Tolerancia a fallos: Si apiLead esta activado pero responde 500, conmuta limpiamente a Formspree como respaldo', async () => {
  let formspreeCalled = false;
  let apiLeadCalled = false;

  const mockFetch: typeof fetch = async (url) => {
    const urlStr = String(url);
    if (urlStr === API_LEAD_DEFAULT_ENDPOINT) {
      apiLeadCalled = true;
      return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
    if (urlStr === FORMSPREE_DEFAULT_ENDPOINT) {
      formspreeCalled = true;
      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }
    return new Response('404', { status: 404 });
  };

  const result = await dispatchLead(baseLead, {
    fetchImpl: mockFetch,
    enableApiLead: true,
  });

  assert.equal(result.success, true);
  assert.equal(result.channel, 'formspree', 'Debio conmutar exitosamente a Formspree ante el 500 de apiLead');
  assert.equal(apiLeadCalled, true);
  assert.equal(formspreeCalled, true);
});

// -------------------------------------------------------------
// Pruebas Adicionales Misión 004 (8 a 13)
// -------------------------------------------------------------

test('8. Doble clic (envíos concurrentes con el mismo lead_id reutilizan identificador)', async () => {
  const sharedLeadId = generateLeadId();
  const dispatchedIds: string[] = [];

  const mockFetch: typeof fetch = async (_url, init) => {
    const body = JSON.parse(String(init?.body));
    dispatchedIds.push(body.lead_id);
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  };

  // Simulación de dos clics en paralelo
  const [res1, res2] = await Promise.all([
    dispatchLead({ ...baseLead, lead_id: sharedLeadId }, { fetchImpl: mockFetch }),
    dispatchLead({ ...baseLead, lead_id: sharedLeadId }, { fetchImpl: mockFetch }),
  ]);

  assert.equal(res1.success, true);
  assert.equal(res2.success, true);
  assert.equal(res1.leadId, sharedLeadId);
  assert.equal(res2.leadId, sharedLeadId);
  assert.equal(dispatchedIds[0], sharedLeadId);
  assert.equal(dispatchedIds[1], sharedLeadId);
});

test('9. Reintento tras fallo inicial conserva exactamente el mismo lead_id', async () => {
  const originalLeadId = generateLeadId();
  let attempt = 0;
  const capturedIds: string[] = [];

  const mockFetch: typeof fetch = async (_url, init) => {
    attempt++;
    const body = JSON.parse(String(init?.body));
    capturedIds.push(body.lead_id);
    if (attempt === 1) {
      return new Response(JSON.stringify({ error: 'Server Busy' }), { status: 503 });
    }
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  };

  // Primer intento (falla)
  const firstTry = await dispatchLead(
    { ...baseLead, lead_id: originalLeadId },
    { fetchImpl: mockFetch }
  );
  assert.equal(firstTry.success, false);

  // Segundo intento (reintento del usuario con el mismo lead_id preservado en estado/draft)
  const retry = await dispatchLead(
    { ...baseLead, lead_id: originalLeadId },
    { fetchImpl: mockFetch }
  );
  assert.equal(retry.success, true);
  assert.equal(retry.leadId, originalLeadId);
  assert.equal(capturedIds[0], originalLeadId);
  assert.equal(capturedIds[1], originalLeadId, 'El reintento debe reutilizar el lead_id previo');
});

test('10. Timeout en petición aborta y retorna error controlado sin colgar al cliente', async () => {
  const mockFetch: typeof fetch = async (_url, init) => {
    return new Promise((_, reject) => {
      // Si se provee signal, escuchar evento abort
      if (init?.signal) {
        init.signal.addEventListener('abort', () => {
          const abortErr = new Error('The operation was aborted');
          abortErr.name = 'AbortError';
          reject(abortErr);
        });
      }
    });
  };

  const result = await dispatchLead(baseLead, {
    fetchImpl: mockFetch,
    timeoutMs: 50, // Timeout muy corto para la prueba
  });

  assert.equal(result.success, false);
  assert.equal(result.channel, 'none');
  assert.match(result.error || '', /Tiempo de espera agotado/);
});

test('11. Respuesta con cuerpo corrupto o JSON inválido no arroja excepción no controlada', async () => {
  const mockFetch: typeof fetch = async () => {
    return new Response('Internal Server Crash 502 Bad Gateway', {
      status: 502,
      headers: { 'Content-Type': 'text/html' },
    });
  };

  const result = await dispatchLead(baseLead, {
    fetchImpl: mockFetch,
  });

  assert.equal(result.success, false);
  assert.equal(result.channel, 'none');
  assert.match(result.error || '', /502/);
});

test('12. Fallo simultáneo de ambos canales cuando apiLead está habilitado reporta error claro', async () => {
  const mockFetch: typeof fetch = async (url) => {
    const urlStr = String(url);
    if (urlStr === API_LEAD_DEFAULT_ENDPOINT) {
      return new Response(JSON.stringify({ error: 'Firestore down' }), { status: 500 });
    }
    if (urlStr === FORMSPREE_DEFAULT_ENDPOINT) {
      return new Response(JSON.stringify({ error: 'Formspree down' }), { status: 502 });
    }
    return new Response('404', { status: 404 });
  };

  const result = await dispatchLead(baseLead, {
    fetchImpl: mockFetch,
    enableApiLead: true,
  });

  assert.equal(result.success, false);
  assert.equal(result.channel, 'none');
  assert.match(result.error || '', /502/);
});

test('13. Confirmar que el Feature Flag VITE_ENABLE_API_LEAD no se evalúa como true si no está explícitamente configurado', async () => {
  let apiLeadHit = false;

  const mockFetch: typeof fetch = async (url) => {
    if (String(url) === API_LEAD_DEFAULT_ENDPOINT) apiLeadHit = true;
    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  };

  // Sin pasar enableApiLead (usando defaults de entorno)
  const result = await dispatchLead(baseLead, { fetchImpl: mockFetch });

  assert.equal(result.success, true);
  assert.equal(result.channel, 'formspree');
  assert.equal(apiLeadHit, false, 'apiLead nunca debe ser contactado si VITE_ENABLE_API_LEAD no es true');
});
