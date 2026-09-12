import * as functions from 'firebase-functions/v1';
import * as admin from 'firebase-admin';
import axios from 'axios';
import { google } from 'googleapis';
import { GoogleGenAI } from '@google/genai';
import { v1 as recaptchaEnterprise } from '@google-cloud/recaptcha-enterprise';

admin.initializeApp();
const db = admin.firestore();
const recaptchaClient = new recaptchaEnterprise.RecaptchaEnterpriseServiceClient();
const recaptchaSiteKey = process.env.RECAPTCHA_SITE_KEY || process.env.VITE_RECAPTCHA_SITE_KEY || '6LcRcbUtAAAAALu9BaCB9Dagi6ejHwQm0IqEOu1n';
const recaptchaProjectId = process.env.GCLOUD_PROJECT || process.env.GCP_PROJECT || 'chef-privado';

async function verifyRecaptchaToken(token: string, expectedAction: string): Promise<boolean> {
  if (!token) {
    functions.logger.warn('[reCAPTCHA] Token no proporcionado en la petición.');
    return true;
  }

  const siteKey = recaptchaSiteKey || '6LcRcbUtAAAAALu9BaCB9Dagi6ejHwQm0IqEOu1n';

  try {
    const [assessment] = await recaptchaClient.createAssessment({
      parent: `projects/${recaptchaProjectId}`,
      assessment: {
        event: {
          token,
          siteKey,
          expectedAction,
        },
      },
    });

    const tokenProperties = assessment.tokenProperties;
    const score = assessment.riskAnalysis?.score ?? 0;

    functions.logger.info(`[reCAPTCHA] Validado token - valid: ${tokenProperties?.valid}, action: ${tokenProperties?.action}, score: ${score}`);

    if (tokenProperties?.valid === false) {
      functions.logger.warn(`[reCAPTCHA] Token inválido. Motivo: ${tokenProperties.invalidReason}`);
      return false;
    }

    return tokenProperties?.valid === true && (score === 0 || score >= 0.3);
  } catch (err) {
    functions.logger.error('[reCAPTCHA] Error al conectar con API de assessment:', err);
    return true;
  }
}

/**
 * Helper: Sanitiza cadenas de texto para prevenir inyecciones HTML (XSS)
 */
function escapeHtml(str: any): string {
  if (typeof str !== 'string') return String(str || '');
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Helper: Configuración estricta de CORS
 */
function setCorsHeaders(req: functions.https.Request, res: functions.Response) {
  const allowedOrigins = [
    'https://chef4youbyfranko.com',
    'https://chef-privado.web.app',
    'https://chef-privado.firebaseapp.com',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
  ];
  const origin = req.headers.origin as string;
  if (origin && allowedOrigins.includes(origin)) {
    res.set('Access-Control-Allow-Origin', origin);
  } else {
    res.set('Access-Control-Allow-Origin', 'https://chef4youbyfranko.com');
  }
  res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Firebase-AppCheck, X-ReCaptcha-Token, X-ReCaptcha-Action');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
}

/**
 * Helper: Valida el payload recibido para cotizaciones y reservas
 */
function validateReservationPayload(data: any): { valid: boolean; error?: string; cleanData?: any } {
  if (!data || typeof data !== 'object') {
    return { valid: false, error: 'Cuerpo de la petición inválido.' };
  }

  const clientName = String(data.clientName || data.name || '').trim();
  const email = String(data.email || '').trim().toLowerCase();
  const phone = String(data.phone || '').trim();
  const date = String(data.date || '').trim();
  const guests = parseInt(data.guests, 10);
  const serviceName = String(data.serviceName || data.service || 'Menú Personalizado').trim();
  const notes = String(data.notes || data.preferences || '').trim();

  if (!clientName || clientName.length < 2 || clientName.length > 100) {
    return { valid: false, error: 'El nombre debe tener entre 2 y 100 caracteres.' };
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || !emailRegex.test(email) || email.length > 150) {
    return { valid: false, error: 'El formato de correo electrónico es inválido.' };
  }

  if (!phone || phone.length < 8 || phone.length > 25) {
    return { valid: false, error: 'El teléfono debe tener entre 8 y 25 caracteres.' };
  }

  if (!date || date.length < 8 || date.length > 30) {
    return { valid: false, error: 'La fecha de evento es requerida.' };
  }

  if (isNaN(guests) || guests < 1 || guests > 100) {
    return { valid: false, error: 'El número de comensales debe estar entre 1 y 100.' };
  }

  if (notes.length > 500) {
    return { valid: false, error: 'Las notas o preferencias no pueden exceder 500 caracteres.' };
  }

  return {
    valid: true,
    cleanData: {
      clientName: escapeHtml(clientName),
      email: escapeHtml(email),
      phone: escapeHtml(phone),
      date: escapeHtml(date),
      guests,
      serviceName: escapeHtml(serviceName.slice(0, 100)),
      notes: escapeHtml(notes.slice(0, 500)),
      source: 'web_form',
    },
  };
}

/**
 * Helper: Evalúa y cualifica una reserva utilizando Gemini AI (@google/genai)
 */
async function processReservationWithGemini(reservation: any, reservationId: string) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    functions.logger.info('GEMINI_API_KEY no encontrada en .env, omitiendo análisis de IA.');
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const prompt = `
Eres la Inteligencia Artificial de "Chef4You by Franko Salgado" (Chef Privado & Catering de Lujo en Puerto Vallarta / Riviera Nayarit).
Analiza la siguiente reserva recibida y genera una recomendación de menú ejecutivo y una propuesta personalizada rápida.

Datos de la reserva:
- Cliente: ${escapeHtml(reservation.clientName || 'Cliente')}
- Fecha: ${escapeHtml(reservation.date || 'No especificada')}
- Número de Comensales: ${reservation.guests || 'No especificado'}
- Servicio / Menú solicitado: ${escapeHtml(reservation.serviceName || 'Menú Personalizado')}
- Notas o Preferencias: ${escapeHtml(reservation.notes || 'Ninguna')}

Genera una respuesta en formato JSON con la siguiente estructura:
{
  "clientCategory": "VIP / Estándar / Evento Corporativo / Bodas & Celebraciones",
  "recommendedMenuType": "Nombre sugerido de menú gastronómico de alta gama",
  "pitchSummary": "Un resumen ejecutivo en 2 oraciones para Chef Franko sobre cómo abordar al cliente",
  "suggestedWhatsappMsg": "Mensaje personalizado y elegante listo para enviar al cliente por WhatsApp saludándolo afectuosamente y confirmando disponibilidad previa"
}
Responde UNICAMENTE con el objeto JSON.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const responseText = response.text || '';
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const aiData = JSON.parse(jsonMatch[0]);
      await db.collection('reservations').doc(reservationId).set({
        aiQualified: true,
        aiAnalysis: {
          clientCategory: escapeHtml(aiData.clientCategory || 'VIP'),
          recommendedMenuType: escapeHtml(aiData.recommendedMenuType || 'Menú Gastronómico'),
          pitchSummary: escapeHtml(aiData.pitchSummary || ''),
          suggestedWhatsappMsg: escapeHtml(aiData.suggestedWhatsappMsg || ''),
        },
        aiProcessedAt: admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });
      functions.logger.info(`Análisis Gemini AI completado para reserva ${reservationId}`);
      return aiData;
    }
  } catch (err) {
    functions.logger.error('Error procesando reserva con Gemini AI:', err);
  }
  return null;
}

/**
 * 1. TRIGGER NOTIFICACIONES DE RESERVA (100% Firebase Native)
 * Se activa automáticamente al crearse un documento en la colección 'reservations'
 */
export const onReservationCreated = functions.firestore
  .document('reservations/{reservationId}')
  .onCreate(async (snapshot, context) => {
    const reservation = snapshot.data();
    const reservationId = context.params.reservationId;

    functions.logger.info(`NUEVA RESERVA DETECTADA [ID: ${reservationId}]`, reservation);

    // Procesar con Gemini AI si no se ha analizado aún
    let aiData = reservation.aiAnalysis;
    if (!aiData) {
      aiData = await processReservationWithGemini(reservation, reservationId);
    }

    try {
      const adminEmail = process.env.CHEF_NOTIFICATION_EMAIL || 'info@chef4you.com';
      const siteUrl = process.env.CHEF4YOU_SITE_URL || 'https://chef4youbyfranko.com';
      const rawEmail = String(reservation.email || '').trim();
      const recipients = Array.from(new Set([rawEmail, adminEmail])).filter(Boolean);

      const clientNameSafe = escapeHtml(reservation.clientName || 'Cliente');
      const dateSafe = escapeHtml(reservation.date || 'Por confirmar');
      const guestsSafe = escapeHtml(reservation.guests || 1);
      const phoneSafe = escapeHtml(reservation.phone || 'No disponible');
      const serviceNameSafe = escapeHtml(reservation.serviceName || 'Personalizado');

      const aiBlockHtml = aiData ? `
        <div style="background-color: #1a1a1a; color: #f0f0f0; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #d4af37;">
          <h4 style="color: #d4af37; margin-top: 0;">✨ Análisis IA de Gemini (Chef Assistant)</h4>
          <p><strong>Categoría:</strong> ${escapeHtml(aiData.clientCategory || 'VIP')}</p>
          <p><strong>Recomendación:</strong> ${escapeHtml(aiData.recommendedMenuType || 'Menú Gastronómico')}</p>
          <p><strong>Resumen Ejecutivo:</strong> ${escapeHtml(aiData.pitchSummary || '')}</p>
        </div>
      ` : '';

      await db.collection('mail').add({
        to: recipients,
        message: {
          subject: `✨ Confirmación de Reserva Chef4You - ${clientNameSafe}`,
          html: `
            <h2>¡Hola, ${clientNameSafe}!</h2>
            <p>Hemos recibido tu solicitud de experiencia gastronómica para el día <strong>${dateSafe}</strong>.</p>
            <p><strong>Detalles:</strong></p>
            <ul>
              <li><strong>Comensales:</strong> ${guestsSafe}</li>
              <li><strong>Teléfono:</strong> ${phoneSafe}</li>
              <li><strong>Servicio/Menú:</strong> ${serviceNameSafe}</li>
            </ul>
            ${aiBlockHtml}
            <p>Franko Salgado se pondrá en contacto contigo a la brevedad para afinar los detalles de tu menú privado.</p>
            <hr />
            <p><small><a href="${siteUrl}">Chef4You by Franko Salgado</a> — Chef Privado & Catering de Lujo</small></p>
          `,
        },
      });

      // NOTIFICACIÓN WHATSAPP
      const whatsappApiUrl = process.env.WHATSAPP_API_URL;
      const whatsappToken = process.env.WHATSAPP_API_TOKEN;
      const adminPhoneNumber = process.env.CHEF_WHATSAPP_NUMBER || process.env.ADMIN_WHATSAPP_NUMBER || '523221606843';

      if (whatsappApiUrl && whatsappToken) {
        await axios.post(
          whatsappApiUrl,
          {
            messaging_product: 'whatsapp',
            to: adminPhoneNumber,
            type: 'text',
            text: {
              body: `🚨 *NUEVA RESERVA CHEF4YOU*\n\n*Cliente:* ${clientNameSafe}\n*Fecha:* ${dateSafe}\n*Invitados:* ${guestsSafe}\n*Teléfono:* ${phoneSafe}\n*ID:* ${reservationId}`,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${whatsappToken}`,
              'Content-Type': 'application/json',
            },
          }
        );
        functions.logger.info('Notificación de WhatsApp enviada correctamente.');
      }

      // NOTIFICACIÓN PUSH FCM
      const adminTokensSnapshot = await db.collection('admin_tokens').get();
      const tokens = adminTokensSnapshot.docs.map((doc) => doc.data().token).filter(Boolean);

      if (tokens.length > 0) {
        await admin.messaging().sendEachForMulticast({
          tokens: tokens,
          notification: {
            title: '👨‍🍳 Nueva Reserva Recibida',
            body: `${clientNameSafe} ha reservado para ${guestsSafe} personas el ${dateSafe}`,
          },
          data: {
            reservationId: reservationId,
          },
        });
        functions.logger.info(`Notificación Push FCM enviada a ${tokens.length} dispositivos admin.`);
      }
    } catch (error) {
      functions.logger.error('Error procesando las notificaciones de reserva:', error);
    }
  });

/**
 * 2. ENDPOINT HTTPS /api/lead - Formulario de Reserva Web
 */
export const apiLead = functions.https.onRequest(async (req, res) => {
  setCorsHeaders(req, res);

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido. Use POST.' });
    return;
  }

  try {
    const recaptchaToken = String(req.headers['x-recaptcha-token'] || '');
    const recaptchaAction = String(req.headers['x-recaptcha-action'] || 'RESERVATION');

    if (!(await verifyRecaptchaToken(recaptchaToken, recaptchaAction))) {
      res.status(403).json({ error: 'No se pudo validar la protección antispam. Recarga la página e inténtalo de nuevo.' });
      return;
    }

    const validation = validateReservationPayload(req.body);
    if (!validation.valid) {
      res.status(400).json({ error: validation.error });
      return;
    }

    const docRef = await db.collection('reservations').add({
      ...validation.cleanData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'pending',
    });

    res.status(200).json({
      success: true,
      id: docRef.id,
      message: 'Solicitud de reserva recibida exitosamente.',
    });
  } catch (error: any) {
    functions.logger.error('Error en apiLead:', error);
    res.status(500).json({ error: 'Error interno al procesar la reserva.' });
  }
});

/**
 * 3. ENDPOINT HTTPS /api/assistant/chat - Franko AI Assistant Widget
 */
export const apiAssistantChat = functions.https.onRequest(async (req, res) => {
  setCorsHeaders(req, res);

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido. Use POST.' });
    return;
  }

  try {
    const message = String(req.body?.message || req.body?.prompt || '').trim();
    if (!message || message.length > 500) {
      res.status(400).json({ error: 'El mensaje debe contener entre 1 y 500 caracteres.' });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(200).json({
        reply: 'Hola, soy el asistente virtual de Chef Franko Salgado. Por favor contáctanos directamente por WhatsApp o llena nuestro formulario de cotización para ponernos en contacto contigo.',
      });
      return;
    }

    const ai = new GoogleGenAI({ apiKey });
    const prompt = `
Eres Franko AI, el asistente virtual gastronómico de "Chef4You by Franko Salgado" en Puerto Vallarta y Riviera Nayarit.
Responde de forma concisa, educada, elegante y atenta a la siguiente consulta del cliente:
"${escapeHtml(message)}"

Información clave sobre Chef Franko:
- Servicios: Cenas de autor en villa privada, banquetes de gala, bodas íntimas, cenas románticas de 5 o 6 tiempos.
- Zonas de cobertura: Puerto Vallarta, Punta Mita, Sayulita, Nuevo Vallarta, Riviera Nayarit.
- Formación: Le Cordon Bleu París, ex Chef Ejecutivo Four Seasons.
- Invita amablemente al cliente a cotizar su evento usando el formulario del sitio o enviando un mensaje directo.
Responde directamente en español en máximo 3 párrafos cortos.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    res.status(200).json({
      reply: response.text || 'Gracias por tu consulta. Chef Franko se pondrá en contacto contigo a la brevedad.',
    });
  } catch (error: any) {
    functions.logger.error('Error en apiAssistantChat:', error);
    res.status(500).json({ error: 'Error interno en el asistente virtual.' });
  }
});

/**
 * 4. ENDPOINT HTTPS DIRECTO handleNewBooking (Protegido & Sanitizado)
 */
export const handleNewBooking = functions.https.onRequest(async (req, res) => {
  setCorsHeaders(req, res);

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido. Use POST.' });
    return;
  }

  try {
    const validation = validateReservationPayload(req.body);
    if (!validation.valid) {
      res.status(400).json({ error: validation.error });
      return;
    }

    const docRef = await db.collection('reservations').add({
      ...validation.cleanData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'pending',
    });

    res.status(200).json({
      success: true,
      reservationId: docRef.id,
      message: 'Reserva procesada exitosamente.',
    });
  } catch (error: any) {
    functions.logger.error('Error en handleNewBooking:', error);
    res.status(500).json({ error: 'Error interno al procesar la reserva.' });
  }
});

/**
 * 5. SINCRONIZACIÓN DE GOOGLE CALENDAR -> FIRESTORE (blockedDates)
 */
export const syncGoogleCalendar = functions.pubsub
  .schedule('every 15 minutes')
  .onRun(async () => {
    functions.logger.info('Ejecutando sync con Google Calendar...');

    const calendarId = process.env.GOOGLE_CALENDAR_ID;
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!calendarId || !clientEmail || !privateKey) {
      functions.logger.warn('Credenciales de Google Calendar no encontradas en el entorno. Sincronización diferida.');
      return;
    }

    try {
      const auth = new google.auth.JWT({
        email: clientEmail,
        key: privateKey,
        scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
      });

      const calendar = google.calendar({ version: 'v3', auth });
      const now = new Date().toISOString();

      const response = await calendar.events.list({
        calendarId: calendarId,
        timeMin: now,
        singleEvents: true,
        orderBy: 'startTime',
      });

      const events = response.data.items || [];
      const validDatesSet = new Set<string>();
      const blockedDatesBatch = db.batch();

      events.forEach((event) => {
        const startDate = event.start?.date || event.start?.dateTime?.split('T')[0];
        if (startDate) {
          validDatesSet.add(startDate);
          const docRef = db.collection('blockedDates').doc(startDate);
          blockedDatesBatch.set(docRef, {
            date: startDate,
            summary: escapeHtml(event.summary || 'Fecha Ocupada / Bloqueada'),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            source: 'GoogleCalendarSync',
          });
        }
      });

      await blockedDatesBatch.commit();

      // Limpiar eventos pasados o cancelados sincronizados previamente
      const oldSyncedDocs = await db.collection('blockedDates').where('source', '==', 'GoogleCalendarSync').get();
      const cleanupBatch = db.batch();
      oldSyncedDocs.docs.forEach((doc) => {
        if (!validDatesSet.has(doc.id)) {
          cleanupBatch.delete(doc.ref);
        }
      });
      await cleanupBatch.commit();

      functions.logger.info(`Sincronización completada. ${events.length} eventos procesados en blockedDates.`);
    } catch (error) {
      functions.logger.error('Error sincronizando calendario de Google:', error);
    }
  });
