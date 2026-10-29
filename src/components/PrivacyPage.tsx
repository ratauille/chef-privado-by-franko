import React from 'react';
import { contactConfig } from '../lib/contactConfig';
import { ShieldCheck, ArrowLeft, Mail, Phone, Lock, ExternalLink, Database, Globe, CreditCard, Clock } from 'lucide-react';
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
            {lang === 'es' ? 'Aviso de Privacidad' : 'Privacy Notice'}
          </h1>

          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            {lang === 'es'
              ? 'El presente Aviso de Privacidad detalla de forma clara, veraz y transparente el tratamiento, uso, conservación y protección de los datos personales recabados a través de chef4youbyfranko.com y sus canales directos de atención culinaria.'
              : 'This Privacy Notice provides clear, accurate, and transparent details regarding the processing, use, retention, and protection of personal data collected through chef4youbyfranko.com and direct culinary reservation channels.'}
          </p>

          <p className="text-stone-500 text-xs">
            {lang === 'es' ? 'Última actualización: Octubre de 2026' : 'Last updated: October 2026'}
          </p>
        </header>

        {/* Section 1: Data Controller */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-white flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-[#c5a059]" />
            <span>{lang === 'es' ? '1. Identidad y Domicilio del Responsable' : '1. Data Controller Identity & Location'}</span>
          </h2>
          <div className="rounded-2xl bg-[#141312] border border-stone-800 p-6 space-y-3 text-sm text-stone-300 leading-relaxed">
            <p>
              <strong>{lang === 'es' ? 'Marca Comercial / Proyecto:' : 'Brand / Project:'}</strong> Chef4You by Franko Salgado / Chef 4 You.
            </p>
            <p>
              <strong>{lang === 'es' ? 'Responsable del Tratamiento:' : 'Data Controller:'}</strong> Franko Salgado (Titular y Chef Propietario).
            </p>
            <p>
              <strong>{lang === 'es' ? 'Domicilio de Referencia para Solicitudes:' : 'Reference Location for Inquiries:'}</strong>{' '}
              Puerto Vallarta, Jalisco, C.P. 48300, México (operando servicios privados en Puerto Vallarta, Punta Mita y Nuevo Nayarit).
            </p>
            <p>
              <strong>{lang === 'es' ? 'Canal Oficial de Privacidad y Derechos ARCO:' : 'Official Privacy & Data Rights Contact:'}</strong>{' '}
              <a href="mailto:frankocheff99@gmail.com" className="text-[#d8b96d] underline font-medium">frankocheff99@gmail.com</a>
            </p>
            <p>
              <strong>{lang === 'es' ? 'Teléfono Comercial y WhatsApp:' : 'Direct Phone & WhatsApp:'}</strong>{' '}
              <a href="https://wa.me/523221606843" className="text-[#d8b96d] underline">+52 322 160 6843</a>
            </p>
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
                ? 'A través del sitio web únicamente se recopilan los datos personales proporcionados de forma voluntaria por los comensales e interesados a través de los siguientes canales:'
                : 'The website only collects personal data voluntarily provided by clients and guests through the following points of contact:'}
            </p>
            <ul className="list-disc list-inside space-y-2.5 pl-2 text-stone-300">
              <li>
                <strong>{lang === 'es' ? 'Formularios de Cotización y Reserva (QuoteModal y ReservationPage):' : 'Quote & Reservation Forms:'}</strong>
                <span className="block pl-5 text-stone-400 mt-1">
                  {lang === 'es'
                    ? 'Nombre completo, correo electrónico, número de teléfono o WhatsApp, fecha tentativa del evento, número de comensales, ubicación o villa de servicio, menú o experiencia solicitada, y requerimientos dietéticos o alergias alimentarias.'
                    : 'Full name, email address, telephone or WhatsApp number, proposed event date, guest count, villa or venue location, chosen menu/experience, and dietary restrictions or food allergies.'}
                </span>
              </li>
              <li>
                <strong>{lang === 'es' ? 'Asistente Gastronómico Virtual (Franko AI Chat):' : 'Virtual Assistant (Franko AI Chat):'}</strong>
                <span className="block pl-5 text-stone-400 mt-1">
                  {lang === 'es'
                    ? 'Consultas, preferencias de menú e historial de la conversación, mantenidos en memoria únicamente durante la sesión activa del usuario para brindarle orientación culinaria inmediata.'
                    : 'Culinary questions, menu preferences, and active session chat history, kept strictly in-memory during the active browser session to assist with real-time recommendations.'}
                </span>
              </li>
              <li>
                <strong>{lang === 'es' ? 'Contacto Directo por WhatsApp:' : 'Direct WhatsApp Inquiries:'}</strong>
                <span className="block pl-5 text-stone-400 mt-1">
                  {lang === 'es'
                    ? 'Al hacer clic en los enlaces de WhatsApp, la información prellenada de la cotización se transfiere bajo control exclusivo del usuario desde su propia aplicación móvil o de escritorio.'
                    : 'When visitors choose to connect via WhatsApp, inquiry details are transferred solely under the user\'s discretion from their personal WhatsApp application.'}
                </span>
              </li>
              <li>
                <strong>{lang === 'es' ? 'Borrador Técnico en el Navegador (LocalStorage):' : 'Local Storage Temporary Drafts:'}</strong>
                <span className="block pl-5 text-stone-400 mt-1">
                  {lang === 'es'
                    ? 'Para evitar pérdidas de datos en caso de desconexión o recarga accidental, los formularios guardan temporalmente los campos en el almacenamiento local del dispositivo del usuario. Dicha información nunca se transmite a servidores externos hasta que se pulsa voluntariamente el botón de envío y se borra al completarse la solicitud.'
                    : 'To prevent input loss upon accidental refresh, form fields are temporarily held in browser LocalStorage. This data remains on the user\'s device and is deleted upon successful submission.'}
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Section 3: Purposes */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-white flex items-center gap-2.5">
            <Globe className="w-5 h-5 text-[#c5a059]" />
            <span>{lang === 'es' ? '3. Finalidades del Tratamiento' : '3. Purposes of Data Processing'}</span>
          </h2>
          <div className="rounded-2xl bg-[#141312] border border-stone-800 p-6 space-y-4 text-sm text-stone-300 leading-relaxed">
            <div>
              <h3 className="font-semibold text-white mb-2">{lang === 'es' ? 'Finalidades Primarias (necesarias para el servicio):' : 'Primary Purposes (Service Delivery):'}</h3>
              <ul className="list-disc list-inside space-y-1.5 text-stone-300 pl-2">
                <li>{lang === 'es' ? 'Elaborar y remitir propuestas y presupuestos gastronómicos personalizados.' : 'Prepare and deliver personalized culinary proposals and bespoke quotes.'}</li>
                <li>{lang === 'es' ? 'Coordinar la agenda de fechas y la logística operativa en residencias, villas o condominios privados.' : 'Coordinate schedule availability and on-site logistics at private villas or residences.'}</li>
                <li>{lang === 'es' ? 'Atender requerimientos dietéticos, intolerancias y alergias para garantizar la seguridad alimentaria de los comensales.' : 'Accommodate food allergies, medical intolerances, and dietary preferences for guest safety.'}</li>
                <li>{lang === 'es' ? 'Proteger los formularios contra ataques automatizados, spam y fraude mediante reCAPTCHA Enterprise.' : 'Protect web forms against bot abuse, spam submissions, and denial-of-service via reCAPTCHA Enterprise.'}</li>
              </ul>
            </div>

            <div className="pt-2 border-t border-stone-800">
              <h3 className="font-semibold text-white mb-2">{lang === 'es' ? 'Finalidades Secundarias (estadística y mejora continua):' : 'Secondary Purposes (Analytics & Improvement):'}</h3>
              <ul className="list-disc list-inside space-y-1.5 text-stone-300 pl-2">
                <li>{lang === 'es' ? 'Medición estadística y rendimiento de tráfico agregado (Google Analytics 4).' : 'Aggregated measurement of site performance, page engagement, and technical uptime (Google Analytics 4).'}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 4: Third-Party Service Providers */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-white flex items-center gap-2.5">
            <ExternalLink className="w-5 h-5 text-[#c5a059]" />
            <span>{lang === 'es' ? '4. Proveedores e Infraestructura de Terceros' : '4. Third-Party Service Providers'}</span>
          </h2>
          <div className="rounded-2xl bg-[#141312] border border-stone-800 p-6 space-y-4 text-sm text-stone-300 leading-relaxed">
            <p>
              {lang === 'es'
                ? 'Para garantizar la estabilidad técnica, seguridad y despacho de solicitudes, el sitio web utiliza los siguientes servicios tecnológicos especializados:'
                : 'To ensure technical uptime, cryptographic security, and prompt request delivery, the site utilizes the following specialized service providers:'}
            </p>
            <ul className="list-disc list-inside space-y-2 text-stone-300 pl-2">
              <li>
                <strong>Google Cloud / Firebase (Google LLC):</strong>{' '}
                {lang === 'es' ? 'Infraestructura de alojamiento web seguro, entrega de contenido (CDN) y backend serverless en us-central1.' : 'Secure hosting infrastructure, global content delivery network (CDN), and serverless cloud functions in us-central1.'}
              </li>
              <li>
                <strong>Formspree (Formspree, Inc.):</strong>{' '}
                {lang === 'es' ? 'Pasarela de despacho de formularios que retransmite las solicitudes de cotización directamente al correo electrónico de Chef Franko.' : 'Operational transmission gateway forwarding contact and quote submissions directly to Chef Franko\'s inbox.'}
              </li>
              <li>
                <strong>Google reCAPTCHA Enterprise (Google LLC):</strong>{' '}
                {lang === 'es' ? 'Evaluación de seguridad criptográfica basada en puntuación (SCORE) para prevenir ataques sin almacenar contraseñas ni perfiles.' : 'Cryptographic score-based risk assessment shielding forms and chat APIs against automated bots.'}
              </li>
              <li>
                <strong>Google Analytics 4 &amp; Google Tag Manager (Google LLC):</strong>{' '}
                {lang === 'es' ? 'Métricas agregadas y anónimas de navegación (G-X4T0SBCQVF).' : 'Aggregated, anonymous usage analytics (G-X4T0SBCQVF).'}
              </li>
              <li>
                <strong>Google Gemini (Google LLC):</strong>{' '}
                {lang === 'es' ? 'Modelo de inteligencia artificial que asiste en la atención gastronómica interactiva de Franko AI.' : 'Generative artificial intelligence model powering the Franko AI culinary assistant.'}
              </li>
              <li>
                <strong>WhatsApp (Meta Platforms, Inc.):</strong>{' '}
                {lang === 'es' ? 'Canal de mensajería directa elegido voluntariamente por el usuario.' : 'Direct voluntary communication channel chosen by the user.'}
              </li>
            </ul>
          </div>
        </section>

        {/* Section 5: Payment Processing & Financial Inquiries */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-white flex items-center gap-2.5">
            <CreditCard className="w-5 h-5 text-[#c5a059]" />
            <span>{lang === 'es' ? '5. Métodos de Pago y Operaciones Financieras' : '5. Payment Methods & Financial Processing'}</span>
          </h2>
          <div className="rounded-2xl bg-[#141312] border border-stone-800 p-6 space-y-3 text-sm text-stone-300 leading-relaxed">
            <p>
              {lang === 'es'
                ? 'En la operación actual de Chef4You by Franko, las cotizaciones, depósitos de anticipo para reserva de fecha y liquidaciones de servicios se gestionan y convienen de forma directa y personalizada entre el comensal y el Chef (mediante transferencias interbancarias, efectivo o medios acordados puntualmente).'
                : 'In current Chef4You by Franko operations, quote deposits, reservation retainers, and final settlements are agreed upon and handled directly and personally between client and Chef (via bank wire transfers, cash on-site, or custom-arranged methods).'}
            </p>
            <p className="text-stone-400">
              {lang === 'es'
                ? 'Plataformas o pasarelas automáticas de pago en línea (como PayPal u otras) se encuentran únicamente previstas como alternativas futuras de integración técnica. Actualmente este sitio web no recopila, procesa ni almacena números de tarjetas de crédito o credenciales bancarias en sus servidores.'
                : 'Online automated payment gateways (such as PayPal or merchant processors) are currently contemplated solely as potential future technical integrations. This website does not directly capture, process, or store credit card numbers or financial account credentials.'}
            </p>
          </div>
        </section>

        {/* Section 6: Data Retention Timeline */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-white flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-[#c5a059]" />
            <span>{lang === 'es' ? '6. Plazos de Conservación de Datos' : '6. Data Retention Schedule'}</span>
          </h2>
          <div className="rounded-2xl bg-[#141312] border border-stone-800 p-6 space-y-3 text-sm text-stone-300 leading-relaxed">
            <ul className="list-disc list-inside space-y-2 text-stone-300 pl-2">
              <li>
                <strong>{lang === 'es' ? 'Cotizaciones y Consultas no formalizadas:' : 'Uncontracted Inquiries & Quotes:'}</strong>{' '}
                {lang === 'es'
                  ? 'Se conservan por un plazo máximo de doce (12) meses a fin de dar seguimiento a la disponibilidad por temporadas y atender consultas posteriores del comensal. Transcurrido dicho periodo, los registros son depurados.'
                  : 'Retained for a maximum period of twelve (12) months for seasonal availability follow-ups and repeat inquiries. Thereafter, records are safely purged.'}
              </li>
              <li>
                <strong>{lang === 'es' ? 'Servicios y Eventos efectivamente contratados:' : 'Contracted Services & Private Events:'}</strong>{' '}
                {lang === 'es'
                  ? 'La información relativa al servicio, menús servidos y detalles de contratación se conserva por un plazo de cinco (5) años a efectos de control operativo, historial de preferencias para futuras visitas y cumplimiento de disposiciones comerciales y fiscales aplicables en México.'
                  : 'Service specifications, historical menu preferences, and billing records are kept for five (5) years for customer service continuity, operational audits, and applicable commercial/fiscal record-keeping in Mexico.'}
              </li>
            </ul>
          </div>
        </section>

        {/* Section 7: ARCO Rights & Contact */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-white flex items-center gap-2.5">
            <Mail className="w-5 h-5 text-[#c5a059]" />
            <span>{lang === 'es' ? '7. Ejercicio de Derechos ARCO' : '7. Exercise of ARCO Privacy Rights'}</span>
          </h2>
          <div className="rounded-2xl bg-[#141312] border border-stone-800 p-6 space-y-4 text-sm text-stone-300 leading-relaxed">
            <p>
              {lang === 'es'
                ? 'Conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP) de los Estados Unidos Mexicanos, usted tiene derecho a Acceder a sus datos personales, solicitar su Rectificación, Cancelación u Oponerse a su tratamiento (Derechos ARCO).'
                : 'Pursuant to Mexico\'s Federal Law on Protection of Personal Data Held by Private Parties (LFPDPPP), you have the right to Access, Rectify, Cancel, or Oppose the processing of your personal information (ARCO Rights).'}
            </p>
            <p>
              {lang === 'es'
                ? 'Para ejercer cualquiera de estos derechos, basta enviar un correo electrónico con su nombre completo, número de teléfono y la descripción de su solicitud a:'
                : 'To exercise any of these privacy rights, please submit an email request including your full name, phone number, and a description of your request to:'}
            </p>
            <p className="font-mono text-[#d8b96d] text-base font-semibold">frankocheff99@gmail.com</p>
            <p className="text-stone-400 text-xs">
              {lang === 'es'
                ? 'Recibirá respuesta formal a su solicitud en un plazo máximo de veinte (20) días hábiles.'
                : 'Formal response to verified privacy requests will be delivered within twenty (20) business days.'}
            </p>
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
          <a
            href="mailto:frankocheff99@gmail.com?subject=Consulta%20de%20Privacidad%20-%20Chef4You"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#9e7c33] text-stone-950 font-bold text-sm shadow-md hover:brightness-110 transition-all text-center"
          >
            {lang === 'es' ? 'Contactar por Privacidad' : 'Privacy Inquiries'}
          </a>
        </div>
      </div>
    </div>
  );
};
