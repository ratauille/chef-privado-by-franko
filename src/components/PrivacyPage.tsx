import React from 'react';
import { contactConfig } from '../lib/contactConfig';
import { ShieldAlert, ArrowLeft, Mail, Phone, Lock, ExternalLink, Database, Globe, CreditCard, Clock, FileText } from 'lucide-react';
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-950/40 border border-amber-600/40 text-amber-300 text-xs font-semibold uppercase tracking-[0.2em]">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'es' ? 'Documento Informativo en Revisión Legal' : 'Information Document Under Legal Review'}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-light text-white tracking-tight">
            {lang === 'es' ? 'Aviso de Privacidad (En Proceso de Revisión)' : 'Privacy Notice (Under Review)'}
          </h1>

          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            {lang === 'es'
              ? 'Este documento describe con estricta transparencia técnica los flujos de datos, formularios y servicios tecnológicos que operan en chef4youbyfranko.com. No constituye una declaración de cumplimiento legal garantizado y se encuentra en proceso de revisión y complementación por el titular del negocio.'
              : 'This document transparently details the verified technical data flows, web forms, and third-party infrastructure operating on chef4youbyfranko.com. It does not represent guaranteed legal compliance and is currently undergoing formal legal review and completion.'}
          </p>

          <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 text-stone-400 text-xs sm:text-sm space-y-2">
            <p className="text-[#d8b96d] font-semibold flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>{lang === 'es' ? 'Estado actual de la información:' : 'Current information status:'}</span>
            </p>
            <p className="leading-relaxed">
              {lang === 'es'
                ? 'Los canales de contacto directo (correo frankocheff99@gmail.com y teléfono +52 322 160 6843) y los proveedores tecnológicos están verificados. La personalidad jurídica formal, el domicilio legal para notificaciones, la política corporativa de conservación y el mecanismo de consentimiento expreso para datos de salud están pendientes de ratificación final.'
                : 'Confirmed direct contact channels (email frankocheff99@gmail.com and phone +52 322 160 6843) and technical providers are verified. Formal legal entity identity, statutory notice address, corporate retention policy, and health data express consent mechanisms are pending final formal adoption.'}
            </p>
          </div>
        </header>

        {/* Section 1: Data Controller */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-white flex items-center gap-2.5">
            <Lock className="w-5 h-5 text-[#c5a059]" />
            <span>{lang === 'es' ? '1. Identidad y Canales de Atención' : '1. Controller Identity & Contact Channels'}</span>
          </h2>
          <div className="rounded-2xl bg-[#141312] border border-stone-800 p-6 space-y-3 text-sm text-stone-300 leading-relaxed">
            <p>
              <strong>{lang === 'es' ? 'Marca Comercial / Proyecto:' : 'Trade Name / Project:'}</strong> Chef4You by Franko Salgado / Chef 4 You.
            </p>
            <p>
              <strong>{lang === 'es' ? 'Responsable Legal:' : 'Legal Controller:'}</strong>{' '}
              <span className="text-amber-300/90 font-mono text-xs">
                [{lang === 'es' ? 'Pendiente de confirmación legal: nombre legal de la persona física o razón social' : 'Pending legal confirmation: full legal individual name or registered entity'}]
              </span>
            </p>
            <p>
              <strong>{lang === 'es' ? 'Domicilio para Notificaciones:' : 'Address for Legal Notices:'}</strong>{' '}
              <span className="text-amber-300/90 font-mono text-xs">
                [{lang === 'es' ? 'Pendiente de verificación del domicilio formal requerido; la atención se recibe a través del correo de contacto' : 'Pending statutory address verification; notices received via official contact email'}]
              </span>
            </p>
            <p>
              <strong>{lang === 'es' ? 'Área Geográfica de Cobertura:' : 'Service Coverage Area:'}</strong> Puerto Vallarta (Jalisco), Punta Mita y Nuevo Nayarit (Nayarit), México.
            </p>
            <p>
              <strong>{lang === 'es' ? 'Canal Oficial de Contacto y Privacidad:' : 'Official Contact & Privacy Channel:'}</strong>{' '}
              <a href="mailto:frankocheff99@gmail.com" className="text-[#d8b96d] underline font-medium">frankocheff99@gmail.com</a>
            </p>
            <p>
              <strong>{lang === 'es' ? 'Teléfono Directo y WhatsApp:' : 'Direct Phone & WhatsApp:'}</strong>{' '}
              <a href="https://wa.me/523221606843" className="text-[#d8b96d] underline">+52 322 160 6843</a>
            </p>
          </div>
        </section>

        {/* Section 2: Personal Data & Sensitive Health Data */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-white flex items-center gap-2.5">
            <Database className="w-5 h-5 text-[#c5a059]" />
            <span>{lang === 'es' ? '2. Datos Personales y Datos Sensibles de Salud' : '2. Personal Data & Sensitive Health Data'}</span>
          </h2>
          <div className="rounded-2xl bg-[#141312] border border-stone-800 p-6 space-y-4 text-sm text-stone-300 leading-relaxed">
            <p>
              {lang === 'es'
                ? 'El sitio web recopila datos a través de sus formularios de contacto, cotización, chat en línea y enlaces directos a WhatsApp:'
                : 'The website collects data through contact forms, quote requests, culinary chat, and direct WhatsApp links:'}
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2 text-stone-300">
              <li>
                <strong>{lang === 'es' ? 'Datos de Contacto y Reserva:' : 'Contact & Booking Data:'}</strong>{' '}
                <span className="text-stone-400">
                  {lang === 'es'
                    ? 'Nombre, correo electrónico, teléfono, fecha tentativa, número de comensales, ubicación aproximada o villa de servicio y menú de interés.'
                    : 'Name, email, phone number, tentative event date, guest count, approximate villa location, and selected menu.'}
                </span>
              </li>
              <li>
                <strong>{lang === 'es' ? 'Datos Sensibles de Salud (Alergias e Intolerancias):' : 'Sensitive Health Data (Allergies & Intolerances):'}</strong>{' '}
                <span className="text-stone-400">
                  {lang === 'es'
                    ? 'La información relativa a alergias alimentarias, intolerancias médicas o restricciones dietéticas corresponde a datos sensibles relativos a la salud. El simple envío de un mensaje general no se considera de forma automática como consentimiento legal expreso.'
                    : 'Information regarding food allergies, medical intolerances, or dietary restrictions constitutes sensitive health data. Simply sending a general inquiry is not automatically deemed formal express consent.'}
                </span>
              </li>
            </ul>

            <div className="mt-3 p-4 rounded-xl bg-stone-900/80 border border-stone-800 space-y-2 text-xs text-stone-400">
              <p className="font-semibold text-amber-300/90">
                {lang === 'es' ? 'Mecanismo de Consentimiento Expreso en Desarrollo (Todavía sin activar):' : 'Proposed Express Consent Mechanism (Under Development):'}
              </p>
              <ul className="list-disc list-inside space-y-1 text-stone-300">
                <li>{lang === 'es' ? 'Campo de información de salud opcional y completamente separado de las notas generales.' : 'Optional health/allergy input separate from general service notes.'}</li>
                <li>{lang === 'es' ? 'Casilla específica de consentimiento, desmarcada por defecto, vinculada al texto definitivo.' : 'Specific opt-in checkbox, unchecked by default, referencing the final notice.'}</li>
                <li>{lang === 'es' ? 'Finalidad estrictamente delimitada a la preparación y prestación segura de los alimentos.' : 'Purpose strictly delimited to food safety and customized meal preparation.'}</li>
                <li>{lang === 'es' ? 'Posibilidad de solicitar cotizaciones preliminares sin proporcionar datos de salud.' : 'Ability to request preliminary quotes without submitting health data.'}</li>
                <li>{lang === 'es' ? 'Registro auditable de la decisión con acceso técnico restringido.' : 'Restricted-access logging of consent decisions.'}</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 3: Purposes */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-white flex items-center gap-2.5">
            <Globe className="w-5 h-5 text-[#c5a059]" />
            <span>{lang === 'es' ? '3. Finalidades del Tratamiento' : '3. Purposes of Processing'}</span>
          </h2>
          <div className="rounded-2xl bg-[#141312] border border-stone-800 p-6 space-y-3 text-sm text-stone-300 leading-relaxed">
            <ul className="list-disc list-inside space-y-1.5 text-stone-300 pl-2">
              <li>{lang === 'es' ? 'Elaborar y responder solicitudes de cotización gastronómica personalizada.' : 'Prepare and respond to personalized culinary quote requests.'}</li>
              <li>{lang === 'es' ? 'Coordinar fechas disponibles y logística de servicio en villas y residencias privadas.' : 'Coordinate calendar dates and on-site private villa logistics.'}</li>
              <li>{lang === 'es' ? 'Preparar alimentos adaptados a las restricciones y seguridad alimentaria de los comensales.' : 'Accommodate food allergies and dietary needs for dining safety.'}</li>
              <li>{lang === 'es' ? 'Prevenir ataques automatizados, fraude y spam en formularios y chat mediante reCAPTCHA Enterprise.' : 'Prevent bot abuse, fraud, and spam on forms and chat using reCAPTCHA Enterprise.'}</li>
              <li>{lang === 'es' ? 'Medición estadística disociada del rendimiento de la web (Google Analytics 4).' : 'Aggregated, anonymous measurement of website performance (Google Analytics 4).'}</li>
            </ul>
          </div>
        </section>

        {/* Section 4: Technology & Third-Party Providers */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-white flex items-center gap-2.5">
            <ExternalLink className="w-5 h-5 text-[#c5a059]" />
            <span>{lang === 'es' ? '4. Proveedores Tecnológicos Verificados' : '4. Verified Technology Providers'}</span>
          </h2>
          <div className="rounded-2xl bg-[#141312] border border-stone-800 p-6 space-y-3 text-sm text-stone-300 leading-relaxed">
            <p>
              {lang === 'es'
                ? 'El funcionamiento técnico del sitio web se apoya en los siguientes servicios:'
                : 'The technical infrastructure of this site relies upon the following service providers:'}
            </p>
            <ul className="list-disc list-inside space-y-2 text-stone-300 pl-2">
              <li><strong>Google Cloud &amp; Firebase (Google LLC):</strong> {lang === 'es' ? 'Alojamiento web y funciones serverless seguras.' : 'Web hosting and secure serverless functions.'}</li>
              <li><strong>Formspree (Formspree, Inc.):</strong> {lang === 'es' ? 'Retransmisión técnica de formularios hacia el correo del Chef.' : 'Form transmission gateway forwarding inquiries to the Chef.'}</li>
              <li><strong>Google reCAPTCHA Enterprise (Google LLC):</strong> {lang === 'es' ? 'Evaluación de seguridad basada en puntuación para mitigar bots.' : 'Risk-score bot mitigation for forms and chat.'}</li>
              <li><strong>Google Analytics 4 &amp; GTM (Google LLC):</strong> {lang === 'es' ? 'Medición de uso anónimo y rendimiento web.' : 'Aggregated usage analytics.'}</li>
              <li><strong>Google Gemini API (Google LLC):</strong> {lang === 'es' ? 'Asistencia culinaria interactiva a través de Franko AI.' : 'Interactive culinary assistance powered by Franko AI.'}</li>
              <li><strong>WhatsApp (Meta Platforms, Inc.):</strong> {lang === 'es' ? 'Mensajería voluntaria iniciada directamente por el usuario.' : 'Voluntary messaging initiated directly by the user.'}</li>
            </ul>
          </div>
        </section>

        {/* Section 5: Payment Processing & Financial Inquiries */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-white flex items-center gap-2.5">
            <CreditCard className="w-5 h-5 text-[#c5a059]" />
            <span>{lang === 'es' ? '5. Métodos de Pago y Operaciones Financieras' : '5. Payment Operations'}</span>
          </h2>
          <div className="rounded-2xl bg-[#141312] border border-stone-800 p-6 space-y-3 text-sm text-stone-300 leading-relaxed">
            <p>
              {lang === 'es'
                ? 'Las condiciones de pago, anticipos de reserva y liquidaciones se coordinan y confirman directamente con el comensal tras verificar la disponibilidad.'
                : 'Payment conditions, reservation retainers, and settlements are coordinated and confirmed directly with the client upon availability confirmation.'}
            </p>
            <p className="text-stone-400">
              {lang === 'es'
                ? 'El sitio web no recopila ni almacena números de tarjeta de crédito ni credenciales bancarias. La descripción formal de pasarelas como PayPal y otros medios de cobro se encuentra pendiente de ratificación final antes de considerarse definitiva.'
                : 'This website does not collect or store credit card numbers or financial credentials. Formal description of payment channels such as PayPal remains pending final operational confirmation.'}
            </p>
          </div>
        </section>

        {/* Section 6: Data Retention Policy */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-white flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-[#c5a059]" />
            <span>{lang === 'es' ? '6. Plazos de Conservación de Datos' : '6. Data Retention Policy'}</span>
          </h2>
          <div className="rounded-2xl bg-[#141312] border border-stone-800 p-6 space-y-3 text-sm text-stone-300 leading-relaxed">
            <p className="text-stone-300">
              {lang === 'es'
                ? 'La política corporativa formal de conservación y los procedimientos de eliminación periódica de datos se encuentran en proceso de definición por parte del titular. Se retiraron plazos estimados previos hasta que se cuente con un procedimiento real y auditable de depuración.'
                : 'Corporate retention policies and formal periodic deletion procedures are currently under development. Specific estimated timeframes have been withdrawn pending the adoption of an auditable data purge procedure.'}
            </p>
          </div>
        </section>

        {/* Section 7: Inquiries and Data Subject Requests */}
        <section className="space-y-4">
          <h2 className="font-serif text-2xl text-white flex items-center gap-2.5">
            <Mail className="w-5 h-5 text-[#c5a059]" />
            <span>{lang === 'es' ? '7. Solicitudes y Atención a Usuarios' : '7. Privacy Requests & Contact'}</span>
          </h2>
          <div className="rounded-2xl bg-[#141312] border border-stone-800 p-6 space-y-3 text-sm text-stone-300 leading-relaxed">
            <p>
              {lang === 'es'
                ? 'Para cualquier consulta sobre la privacidad de sus datos o para solicitar el acceso, actualización o eliminación de la información proporcionada voluntariamente en formularios, por favor comuníquese a:'
                : 'For inquiries regarding data privacy or to request access, correction, or deletion of voluntarily submitted information, please reach out directly to:'}
            </p>
            <p className="font-mono text-[#d8b96d] text-base font-semibold">frankocheff99@gmail.com</p>
            <p className="text-stone-400 text-xs">
              {lang === 'es'
                ? 'La solicitud será atendida directamente por el titular a la brevedad posible.'
                : 'Inquiries will be attended directly by the business owner in a timely manner.'}
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
