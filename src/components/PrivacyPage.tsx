import React from 'react';
import { contactConfig } from '../lib/contactConfig';
import { ShieldCheck, AlertCircle, ArrowLeft, Mail, Phone, Lock, ExternalLink, Database, Globe } from 'lucide-react';
import { useLanguage } from '../lib/i18n';

interface PrivacyPageProps {
  onOpenQuote?: () => void;
  onNavigate?: (path: string) => void;
}

export const PrivacyPage: React.FC<PrivacyPageProps> = ({ onNavigate }) => {
  const { lang } = useLanguage();

  const go = (path: string) => {
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Navigation Breadcrumb / Back button */}
        <div>
          <button
            type="button"
            onClick={() => go('/')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-400 hover:text-[#d8b96d] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{lang === 'es' ? 'Volver al Inicio' : 'Back to Home'}</span>
          </button>
        </div>

        {/* Header */}
        <header className="space-y-4 border-b border-stone-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181715] border border-[#c5a059]/40 text-[#d8b96d] text-xs font-semibold uppercase tracking-[0.2em]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{lang === 'es' ? 'Transparencia y Privacidad' : 'Transparency & Privacy'}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-tight">
            {lang === 'es'
              ? 'Aviso de Privacidad (Borrador Técnico)'
              : 'Privacy Notice (Technical Draft)'}
          </h1>

          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            {lang === 'es'
              ? 'Este documento describe de forma estricta y verificable el tratamiento técnico de datos personales, formularios web, cookies y servicios de terceros operados en chef4youbyfranko.com. Basado en la auditoría de código del proyecto y pendiente de ratificación jurídica por el titular.'
              : 'This document strictly details the verified technical processing of personal data, web forms, storage and third-party integrations operating on chef4youbyfranko.com. Derived from verified codebase audit, pending final legal ratification by the owner.'}
          </p>

          <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-600/40 text-amber-200 text-xs sm:text-sm space-y-2">
            <div className="flex items-center gap-2 font-semibold text-amber-300">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{lang === 'es' ? 'Nota Informativa de Borrador' : 'Draft Status Notice'}</span>
            </div>
            <p className="leading-relaxed">
              {lang === 'es'
                ? 'Los campos marcados como [Pendiente de confirmación por el propietario] corresponden a información legal, fiscal o de gobierno corporativo que debe ser ratificada formalmente por el titular antes de la publicación jurídica definitiva.'
                : 'Items marked as [Pending owner confirmation] correspond to legal, fiscal, or corporate information that must be formally confirmed by the business owner prior to final publication.'}
            </p>
          </div>
        </header>

        {/* Section 1: Data Controller */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-white flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-[#c5a059]" />
            <span>{lang === 'es' ? '1. Identidad del Responsable' : '1. Data Controller Identity'}</span>
          </h2>
          <div className="rounded-2xl bg-[#141312] border border-stone-800 p-6 space-y-3 text-sm text-stone-300 leading-relaxed">
            <p>
              <strong>{lang === 'es' ? 'Marca Comercial:' : 'Trade Name:'}</strong> Chef4You by Franko Salgado / Chef 4 You.
            </p>
            <p>
              <strong>{lang === 'es' ? 'Titular / Chef Responsable:' : 'Culinary Director:'}</strong> Chef Franko Salgado.
            </p>
            <p>
              <strong>{lang === 'es' ? 'Canal Oficial de Contacto:' : 'Official Contact Email:'}</strong>{' '}
              {contactConfig.email ? (
                <a href={"mailto:" + contactConfig.email} className="text-[#d8b96d] underline">{contactConfig.email}</a>
              ) : (
                <span className="text-amber-300 font-mono text-xs">[{lang === 'es' ? 'Correo oficial pendiente de confirmación por el propietario' : 'Official email pending owner confirmation'}]</span>
              )}
            </p>
            <p>
              <strong>{lang === 'es' ? 'Teléfono Comercial:' : 'Commercial Phone:'}</strong>{' '}
              <a href="https://wa.me/523221606843" className="text-[#d8b96d] underline">+52 322 160 6843</a>
            </p>
            <p>
              <strong>{lang === 'es' ? 'Zona Geográfica de Servicio:' : 'Service Area:'}</strong> Puerto Vallarta (Jalisco), Punta Mita y Nuevo Nayarit (Nayarit), México.
            </p>
            <div className="mt-4 p-3.5 rounded-xl bg-stone-900/80 border border-amber-800/40 text-amber-200/90 text-xs space-y-1">
              <p className="font-semibold">{lang === 'es' ? '[Pendiente de confirmación por el propietario]:' : '[Pending owner confirmation]:'}</p>
              <ul className="list-disc list-inside space-y-0.5 text-stone-300">
                <li>{lang === 'es' ? 'Razón Social formal (Persona Física con Actividad Empresarial o Persona Moral).' : 'Formal registered legal entity name.'}</li>
                <li>{lang === 'es' ? 'Registro Federal de Contribuyentes (RFC).' : 'Tax Identification Number (RFC).'}</li>
                <li>{lang === 'es' ? 'Domicilio fiscal y físico completo para efectos de notificación legal.' : 'Complete legal and fiscal street address for legal notices.'}</li>
                <li>{lang === 'es' ? 'Correo electrónico exclusivo designado para el ejercicio de Derechos ARCO.' : 'Designated privacy officer email address for data subject requests.'}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: Personal Data Collected */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-white flex items-center gap-2.5">
            <Database className="w-5 h-5 text-[#c5a059]" />
            <span>{lang === 'es' ? '2. Datos Personales Recopilados' : '2. Personal Data Collected'}</span>
          </h2>
          <div className="rounded-2xl bg-[#141312] border border-stone-800 p-6 space-y-4 text-sm text-stone-300 leading-relaxed">
            <p>
              {lang === 'es'
                ? 'A través del sitio web se recopilan exclusivamente los datos que el usuario proporciona voluntariamente mediante los siguientes canales técnicos:'
                : 'The website only collects personal data provided voluntarily by visitors across the following technical touchpoints:'}
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <strong>{lang === 'es' ? 'Formularios de Cotización y Reserva (QuoteModal y ReservationPage):' : 'Quote & Reservation Forms:'}</strong>
                <span className="block pl-5 text-stone-400 mt-1">
                  {lang === 'es'
                    ? 'Nombre completo, correo electrónico, número de teléfono, fecha tentativa del evento, número de comensales, menú o experiencia solicitada y notas dietéticas o alergias alimentarias.'
                    : 'Full name, email address, telephone number, proposed event date, guest count, menu/experience selection, and dietary preferences or allergy notes.'}
                </span>
              </li>
              <li>
                <strong>{lang === 'es' ? 'Asistente Gastronómico Virtual (Franko AI Chat):' : 'Virtual Assistant (Franko AI Chat):'}</strong>
                <span className="block pl-5 text-stone-400 mt-1">
                  {lang === 'es'
                    ? 'Mensajes y consultas enviadas en la ventana de chat, idioma de preferencia e historial temporal de la conversación (mantenido únicamente en memoria durante la sesión activa).'
                    : 'Messages and culinary queries submitted in the chat interface, session language, and in-memory conversation history during the active browser session.'}
                </span>
              </li>
              <li>
                <strong>{lang === 'es' ? 'Contacto Directo vía WhatsApp:' : 'Direct WhatsApp Messaging:'}</strong>
                <span className="block pl-5 text-stone-400 mt-1">
                  {lang === 'es'
                    ? 'Si el visitante opta por abrir el enlace de WhatsApp, los datos de cotización prellenados se envían bajo el control voluntario del usuario desde su propia aplicación de WhatsApp a la línea del Chef.'
                    : 'When visitors click WhatsApp links, prefilled quote details are dispatched solely at the visitor\'s election from their own WhatsApp client.'}
                </span>
              </li>
              <li>
                <strong>{lang === 'es' ? 'Borradores en el Navegador (LocalStorage):' : 'Browser Storage Drafts (LocalStorage):'}</strong>
                <span className="block pl-5 text-stone-400 mt-1">
                  {lang === 'es'
                    ? 'Para conveniencia del usuario, los formularios almacenan temporalmente un borrador en el almacenamiento local del navegador (`chef4you_quote_modal_draft`, `chef4you_reservation_draft_v1`). Este borrador no sale del dispositivo hasta que se pulsa el botón de envío y se elimina automáticamente al finalizar.'
                    : 'Form inputs are saved locally in the browser (`chef4you_quote_modal_draft`, `chef4you_reservation_draft_v1`) to prevent data loss. Draft data stays on the user device and is cleared upon successful transmission.'}
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3: Purposes */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-white flex items-center gap-2.5">
            <Globe className="w-5 h-5 text-[#c5a059]" />
            <span>{lang === 'es' ? '3. Finalidades del Tratamiento' : '3. Purposes of Processing'}</span>
          </h2>
          <div className="rounded-2xl bg-[#141312] border border-stone-800 p-6 space-y-4 text-sm text-stone-300 leading-relaxed">
            <div>
              <h3 className="font-semibold text-white mb-2">{lang === 'es' ? 'Finalidades Primarias (necesarias para el servicio):' : 'Primary Purposes (Service Fulfillment):'}</h3>
              <ul className="list-disc list-inside space-y-1.5 text-stone-300 pl-2">
                <li>{lang === 'es' ? 'Elaborar y remitir propuestas y cotizaciones personalizadas de chef privado.' : 'Prepare and deliver bespoke private dining proposals and quotations.'}</li>
                <li>{lang === 'es' ? 'Gestionar la disponibilidad de fechas y la coordinación logística de servicios en villas o residencias.' : 'Coordinate schedule availability and on-site villa logistics.'}</li>
                <li>{lang === 'es' ? 'Atender requerimientos dietéticos, intolerancias y alergias para la seguridad alimentaria de los comensales.' : 'Accommodate dietary restrictions, allergies, and ingredient preferences.'}</li>
                <li>{lang === 'es' ? 'Proteger los formularios contra envíos masivos, spam y abuso mediante análisis de seguridad (reCAPTCHA Enterprise).' : 'Protect forms and APIs from spam, automated abuse, and denial-of-service via reCAPTCHA Enterprise.'}</li>
              </ul>
            </div>

            <div className="pt-2 border-t border-stone-800">
              <h3 className="font-semibold text-white mb-2">{lang === 'es' ? 'Finalidades Secundarias (analítica y mejora):' : 'Secondary Purposes (Analytics & Performance):'}</h3>
              <ul className="list-disc list-inside space-y-1.5 text-stone-300 pl-2">
                <li>{lang === 'es' ? 'Análisis estadístico de visitas, rutas más consultadas y rendimiento publicitario (Google Analytics 4 y Google Ads).' : 'Aggregated measurement of page engagement, traffic trends, and ad conversion efficacy (Google Analytics 4 and Google Ads).'}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Third-Party Services */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-white flex items-center gap-2.5">
            <ExternalLink className="w-5 h-5 text-[#c5a059]" />
            <span>{lang === 'es' ? '4. Proveedores y Servicios de Terceros' : '4. Third-Party Service Providers'}</span>
          </h2>
          <div className="rounded-2xl bg-[#141312] border border-stone-800 p-6 space-y-5 text-sm text-stone-300 leading-relaxed">
            <p>
              {lang === 'es'
                ? 'De acuerdo con la auditoría técnica del sitio, se distingue entre servicios activos en operación y componentes integrados en código cuya activación depende de configuraciones específicas:'
                : 'Based on strict architectural audit, active infrastructure providers are distinguished from code-level integrations:'}
            </p>

            <div className="space-y-3">
              <h3 className="font-semibold text-emerald-400 text-xs uppercase tracking-wider">
                {lang === 'es' ? 'A. Servicios Activos en Producción:' : 'A. Active Production Providers:'}
              </h3>
              <ul className="list-disc list-inside space-y-2 text-stone-300 pl-2">
                <li>
                  <strong>Google Cloud / Firebase Hosting &amp; Functions (Google LLC):</strong>{' '}
                  {lang === 'es' ? 'Infraestructura de entrega de contenido web y backend seguro serverless en us-central1.' : 'Content delivery hosting and serverless backend functions in us-central1.'}
                </li>
                <li>
                  <strong>Formspree (Formspree, Inc.):</strong>{' '}
                  {lang === 'es' ? 'Pasarela activa de recepción y despacho de solicitudes de cotización hacia el correo del Chef.' : 'Operational form transmission gateway forwarding inquiries to the Chef\'s mailbox.'}
                </li>
                <li>
                  <strong>Google reCAPTCHA Enterprise (Google LLC):</strong>{' '}
                  {lang === 'es' ? 'Evaluación de riesgo criptográfica para prevenir bots en formularios y chat.' : 'Cryptographic risk assessment preventing automated spam and abuse.'}
                </li>
                <li>
                  <strong>Google Analytics 4 &amp; Google Tag Manager (Google LLC):</strong>{' '}
                  {lang === 'es' ? 'Medición de métricas de uso (identificadores G-X4T0SBCQVF y GTM-TRBSB34P).' : 'Usage metrics measurement (IDs G-X4T0SBCQVF and GTM-TRBSB34P).'}
                </li>
                <li>
                  <strong>Google Gemini API (Google LLC):</strong>{' '}
                  {lang === 'es' ? 'Modelo de lenguaje utilizado para generar respuestas del asistente Franko AI.' : 'Generative AI model powering the interactive Franko AI culinary assistant.'}
                </li>
                <li>
                  <strong>SMS Reminder (smsreminder.co):</strong>{' '}
                  {lang === 'es' ? 'Herramienta externa de reserva de citas y videollamadas en ReservationPage.' : 'Third-party booking widget embedded on the reservation page.'}
                </li>
                <li>
                  <strong>WhatsApp (Meta Platforms, Inc.):</strong>{' '}
                  {lang === 'es' ? 'Canal de mensajería directa voluntaria mediante enlaces wa.me.' : 'Direct voluntary communication channel via wa.me links.'}
                </li>
              </ul>
            </div>

            <div className="space-y-3 pt-3 border-t border-stone-800">
              <h3 className="font-semibold text-stone-400 text-xs uppercase tracking-wider">
                {lang === 'es' ? 'B. Integraciones Presentes Solo en Código (Inactivas sin credenciales):' : 'B. Code-Only Integraciones (Inactive without credentials):'}
              </h3>
              <ul className="list-disc list-inside space-y-1.5 text-stone-400 pl-2">
                <li>
                  <strong>Clerk (@clerk/react):</strong>{' '}
                  {lang === 'es' ? 'Código de autenticación preparado pero inactivo sin clave VITE_CLERK_PUBLISHABLE_KEY.' : 'Authentication scaffold present in code but dormant without publishable key.'}
                </li>
                <li>
                  <strong>Twilio &amp; SendGrid:</strong>{' '}
                  {lang === 'es' ? 'Librerías de mensajería en Cloud Functions, no activas en el flujo estándar de cliente.' : 'Notification packages in Functions package.json, dormant without configured secrets.'}
                </li>
                <li>
                  <strong>Google Calendar API:</strong>{' '}
                  {lang === 'es' ? 'Integración en funciones para agenda, inactiva sin credencial de cuenta de servicio.' : 'Calendar sync code in functions, inactive without service account credentials.'}
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 5: ARCO Rights & Contact */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-white flex items-center gap-2.5">
            <Mail className="w-5 h-5 text-[#c5a059]" />
            <span>{lang === 'es' ? '5. Ejercicio de Derechos ARCO' : '5. Exercise of Privacy Rights (ARCO)'}</span>
          </h2>
          <div className="rounded-2xl bg-[#141312] border border-stone-800 p-6 space-y-4 text-sm text-stone-300 leading-relaxed">
            <p>
              {lang === 'es'
                ? 'De conformidad con la legislación aplicable en materia de protección de datos personales, los titulares tienen derecho a Acceder, Rectificar, Cancelar u Oponerse al tratamiento de sus datos personales (Derechos ARCO).'
                : 'In accordance with applicable personal data protection laws, individuals maintain the right to Access, Rectify, Cancel, or Oppose the processing of their personal data (ARCO Rights).'}
            </p>
            <p>
              {lang === 'es'
                ? 'Para cualquier consulta o solicitud sobre sus datos personales, puede comunicarse al canal provisional:'
                : 'For privacy inquiries or requests, visitors may contact:'}
            </p>
            {contactConfig.email ? (
              <p className="font-mono text-[#d8b96d] text-base">{contactConfig.email}</p>
            ) : (
              <p className="text-amber-300 text-xs font-mono">[{lang === 'es' ? 'Correo ARCO pendiente de confirmación por el propietario - Atención provisional por WhatsApp' : 'ARCO email pending owner confirmation - Temporary contact via WhatsApp'}]</p>
            )}

            <div className="p-3.5 rounded-xl bg-stone-900/80 border border-amber-800/40 text-amber-200/90 text-xs space-y-1">
              <p className="font-semibold">{lang === 'es' ? '[Pendiente de confirmación por el propietario]:' : '[Pending owner confirmation]:'}</p>
              <ul className="list-disc list-inside space-y-0.5 text-stone-300">
                <li>{lang === 'es' ? 'Plazo formal de respuesta a solicitudes ARCO (ejemplo legal común: 20 días hábiles).' : 'Statutory response timeframe for privacy requests (typically 20 business days under Mexican LFPDPPP).'}</li>
                <li>{lang === 'es' ? 'Requisitos documentales para acreditar la identidad del titular.' : 'Identity verification document requirements.'}</li>
                <li>{lang === 'es' ? 'Mecanismo oficial de revocación del consentimiento para finalidades secundarias.' : 'Opt-out mechanism for secondary processing purposes.'}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 6: Retention & International Transfers */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-white flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-[#c5a059]" />
            <span>{lang === 'es' ? '6. Conservación y Transferencias' : '6. Data Retention & Transfers'}</span>
          </h2>
          <div className="rounded-2xl bg-[#141312] border border-stone-800 p-6 space-y-4 text-sm text-stone-300 leading-relaxed">
            <div className="p-3.5 rounded-xl bg-stone-900/80 border border-amber-800/40 text-amber-200/90 text-xs space-y-1">
              <p className="font-semibold">{lang === 'es' ? '[Pendiente de confirmación por el propietario]:' : '[Pending owner confirmation]:'}</p>
              <ul className="list-disc list-inside space-y-0.5 text-stone-300">
                <li>{lang === 'es' ? 'Plazo de conservación de cotizaciones no concretadas (ej. 6 a 12 meses) y de reservas confirmadas (ej. 5 años por obligaciones fiscales).' : 'Data retention retention timeline for uncompleted quotes and completed culinary contracts.'}</li>
                <li>{lang === 'es' ? 'Declaración formal de transferencias internacionales de datos a servidores en EE. UU. (Google, Formspree, Meta).' : 'Formal disclosure of international data transfers to cloud service providers located in the United States.'}</li>
                <li>{lang === 'es' ? 'Garantías contractuales y cláusulas de confidencialidad celebradas con el personal y proveedores auxiliares.' : 'Staff and contractor data confidentiality agreements.'}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer actions */}
        <div className="pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => go('/')}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-stone-900 border border-stone-700 text-stone-300 text-sm hover:text-white transition-colors"
          >
            {lang === 'es' ? 'Volver a la página principal' : 'Return to main page'}
          </button>
          {contactConfig.email ? (
            <a
              href={"mailto:" + contactConfig.email}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#9e7c33] text-stone-950 font-bold text-sm shadow-md hover:brightness-110 transition-all text-center"
            >
              {lang === 'es' ? 'Contactar por Privacidad' : 'Privacy Inquiries'}
            </a>
          ) : (
            <a
              href={contactConfig.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#9e7c33] text-stone-950 font-bold text-sm shadow-md hover:brightness-110 transition-all text-center"
            >
              {lang === 'es' ? 'Contacto Privacidad (WhatsApp)' : 'Privacy Inquiries (WhatsApp)'}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
