import * as functions from 'firebase-functions/v1';
import * as admin from 'firebase-admin';
import axios from 'axios';
import { google } from 'googleapis';
import { GoogleGenAI } from '@google/genai';

admin.initializeApp();
const db = admin.firestore();

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
- Cliente: ${reservation.clientName || reservation.name || 'Cliente'}
- Fecha: ${reservation.date || 'No especificada'}
- Número de Comensales: ${reservation.guests || 'No especificado'}
- Servicio / Menú solicitado: ${reservation.serviceName || reservation.service || 'Menú Personalizado'}
- Teléfono: ${reservation.phone || 'No disponible'}
- Email: ${reservation.email || 'No disponible'}
- Notas o Preferencias: ${reservation.notes || reservation.preferences || 'Ninguna'}

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
        aiAnalysis: aiData,
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

    // Procesar con Gemini AI si la API Key está configurada
    const aiData = await processReservationWithGemini(reservation, reservationId);

    try {
      const adminEmail = process.env.CHEF_NOTIFICATION_EMAIL || 'info@chef4you.com';
      const siteUrl = process.env.CHEF4YOU_SITE_URL || 'https://chef4youbyfranko.com';
      const recipients = Array.from(new Set([reservation.email, adminEmail])).filter(Boolean);

      const aiBlockHtml = aiData ? `
        <div style="background-color: #1a1a1a; color: #f0f0f0; padding: 15px; border-radius: 8px; margin-top: 15px; border-left: 4px solid #d4af37;">
          <h4 style="color: #d4af37; margin-top: 0;">✨ Análisis IA de Gemini (Chef Assistant)</h4>
          <p><strong>Categoría:</strong> ${aiData.clientCategory || 'VIP'}</p>
          <p><strong>Recomendación:</strong> ${aiData.recommendedMenuType || 'Menú Gastronómico'}</p>
          <p><strong>Resumen Ejecutivas:</strong> ${aiData.pitchSummary || ''}</p>
        </div>
      ` : '';

      await db.collection('mail').add({
        to: recipients,
        message: {
          subject: `✨ Confirmación de Reserva Chef4You - ${reservation.clientName}`,
          html: `
            <h2>¡Hola, ${reservation.clientName}!</h2>
            <p>Hemos recibido tu solicitud de experiencia gastronómica para el día <strong>${reservation.date}</strong>.</p>
            <p><strong>Detalles:</strong></p>
            <ul>
              <li><strong>Comensales:</strong> ${reservation.guests}</li>
              <li><strong>Teléfono:</strong> ${reservation.phone}</li>
              <li><strong>Servicio/Menú:</strong> ${reservation.serviceName || 'Personalizado'}</li>
            </ul>
            ${aiBlockHtml}
            <p>Franko Salgado se pondrá en contacto contigo a la brevedad para afinar los detalles de tu menú privado.</p>
            <hr />
            <p><small><a href="${siteUrl}">Chef4You by Franko Salgado</a> — Chef Privado & Catering de Lujo</small></p>
          `,
        },
      });

      // B. NOTIFICACIÓN WHATSAPP (WhatsApp Business API / Twilio Directo)
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
              body: `🚨 *NUEVA RESERVA CHEF4YOU*\n\n*Cliente:* ${reservation.clientName}\n*Fecha:* ${reservation.date}\n*Invitados:* ${reservation.guests}\n*Teléfono:* ${reservation.phone}\n*ID:* ${reservationId}`,
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
      } else {
        functions.logger.warn('WhatsApp API credentials no configuradas. Se omitió el envío de WhatsApp.');
      }

      // C. NOTIFICACIÓN PUSH A PANEL ADMIN (vía Firebase Cloud Messaging FCM)
      const adminTokensSnapshot = await db.collection('admin_tokens').get();
      const tokens = adminTokensSnapshot.docs.map((doc) => doc.data().token).filter(Boolean);

      if (tokens.length > 0) {
        await admin.messaging().sendEachForMulticast({
          tokens: tokens,
          notification: {
            title: '👨‍🍳 Nueva Reserva Recibida',
            body: `${reservation.clientName} ha reservado para ${reservation.guests} personas el ${reservation.date}`,
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
 * 2. ENDPOINT HTTPS DIRECTO PARA CONSULTAR / PROCESAR IA DE RESERVAS
 */
export const handleNewBooking = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Método no permitido. Use POST.' });
    return;
  }

  try {
    const bookingData = req.body || {};
    const docRef = await db.collection('reservations').add({
      ...bookingData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      status: 'pending',
    });

    const aiData = await processReservationWithGemini(bookingData, docRef.id);

    res.status(200).json({
      success: true,
      reservationId: docRef.id,
      aiAnalysis: aiData,
      message: 'Reserva procesada exitosamente con Gemini AI.',
    });
  } catch (error: any) {
    functions.logger.error('Error en handleNewBooking:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});

/**
 * 3. SINCRONIZACIÓN DE GOOGLE CALENDAR -> FIRESTORE (blockedDates)
 * Se ejecuta automáticamente cada 15 minutos leyendo eventos ocupados en Google Calendar
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
      const blockedDatesBatch = db.batch();

      events.forEach((event) => {
        const startDate = event.start?.date || event.start?.dateTime?.split('T')[0];
        if (startDate) {
          const docRef = db.collection('blockedDates').doc(startDate);
          blockedDatesBatch.set(docRef, {
            date: startDate,
            summary: event.summary || 'Fecha Ocupada / Bloqueada',
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            source: 'GoogleCalendarSync',
          });
        }
      });

      await blockedDatesBatch.commit();
      functions.logger.info(`Sincronización completada. ${events.length} eventos procesados en blockedDates.`);
    } catch (error) {
      functions.logger.error('Error sincronizando calendario de Google:', error);
    }
  });

