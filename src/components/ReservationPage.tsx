import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Users, Mail, Phone, User, FileText, CheckCircle2, AlertCircle, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { useLanguage } from '../lib/i18n';

const DRAFT_KEY = 'chef4you_reservation_draft_v1';
const SMS_REMINDER_BOOKING_URL = 'https://www.smsreminder.co/book/tiVbGssvDw6CtX6t/franko-salgado?utm_source=inline-button-embed&utm_medium=embed';
const SMS_REMINDER_SCRIPT_ID = 'smsreminder-inline-button-script';

export const ReservationPage: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];
  const { t, lang } = useLanguage();

  const [formData, setFormData] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(DRAFT_KEY);
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.warn('Could not restore reservation draft from localStorage');
      }
    }
    return {
      clientName: '',
      email: '',
      phone: '',
      date: '',
      guests: 6,
      serviceName: t.forms.servicesList[0] || '5-Course Author Tasting Menu',
      notes: '',
    };
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-save form draft to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && !success) {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
      } catch (e) {}
    }
  }, [formData, success]);

  useEffect(() => {
    if (document.getElementById(SMS_REMINDER_SCRIPT_ID)) return;

    const script = document.createElement('script');
    script.id = SMS_REMINDER_SCRIPT_ID;
    script.async = true;
    script.src = 'https://www.smsreminder.co/embed/inline-button.js';
    document.body.appendChild(script);
  }, []);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let successSubmitted = false;

    try {
      // Execute reCAPTCHA Enterprise token if available
      let recaptchaToken = '';
      if (typeof window !== 'undefined' && (window as any).grecaptcha?.enterprise) {
        try {
          recaptchaToken = await (window as any).grecaptcha.enterprise.execute(
            import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LcRcbUtAAAAALu9BaCB9Dagi6ejHwQm0IqEOu1n',
            { action: 'RESERVATION' }
          );
        } catch (err) {
          console.warn('[reCAPTCHA Enterprise] Notice:', err);
        }
      }

      try {
        const res = await fetch('/api/lead', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(recaptchaToken ? { 'X-ReCaptcha-Token': recaptchaToken } : {}),
            'X-ReCaptcha-Action': 'RESERVATION',
          },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            successSubmitted = true;
          }
        }
      } catch (apiErr) {
        console.warn('[ReservationPage] /api/lead error:', apiErr);
      }

      if (!successSubmitted) {
        throw new Error(
          lang === 'es'
            ? 'No pudimos enviar tu solicitud de forma segura. Por favor intenta de nuevo o escríbenos directamente por WhatsApp.'
            : 'We could not submit your request safely. Please try again or reach out to Chef Franko directly on WhatsApp.'
        );
      }

      // Track GA4 event
      if (typeof (window as any).trackGA4Event === 'function') {
        (window as any).trackGA4Event('generate_lead', {
          event_category: 'ReservationPage',
          event_label: formData.serviceName,
          value: formData.guests,
        });
      }

      // Clear draft on success
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch (e) {}

      setSuccess(true);
    } catch (err: any) {
      setError(
        err.message ||
          (lang === 'es'
            ? 'Ocurrió un error al enviar tu solicitud. Se han conservado tus datos para que reintentes.'
            : 'An error occurred while submitting your request. Your details have been preserved.')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-100 py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(197,160,89,0.12),transparent_50%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <motion.div
          className="text-center space-y-4 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181715] border border-[#c5a059]/40 text-[#d8b96d] text-xs font-semibold uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{t.forms.reservationBadge}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight">
            {t.forms.reservationTitle}{' '}
            <span className="italic text-[#d8b96d]">{t.forms.reservationTitleAccent}</span>
          </h1>

          <p className="text-stone-400 text-base sm:text-lg max-w-xl mx-auto font-light leading-relaxed">
            {t.forms.reservationSubtitle}
          </p>

          <div className="pt-2 flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-[0.18em] text-stone-500">
              {lang === 'es' ? '¿Deseas agendar llamada o reunión directa?' : 'Need to schedule an instant intro call?'}
            </span>
            <a
              href={SMS_REMINDER_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-bwm
              data-bwm-label="Book Calendar Call"
              data-bwm-color="#c5a059"
              data-bwm-text-color="#0a0a0a"
              data-bwm-size="normal"
              data-bwm-position="centered"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1e1c18] border border-[#c5a059]/40 text-[#d8b96d] text-xs font-semibold hover:bg-[#c5a059] hover:text-stone-950 transition-colors"
              aria-label="Abrir calendario de reservas"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>{t.forms.calendarBookingBtn}</span>
            </a>
          </div>
        </motion.div>

        <motion.div
          className="bg-[#141312] border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {success ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-20 h-20 rounded-full bg-[#1c2a1e] border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-light text-white">
                {t.forms.successTitle}
              </h2>

              <p className="text-stone-300 text-sm sm:text-base max-w-md mx-auto leading-relaxed font-light">
                {lang === 'es' ? 'Gracias' : 'Thank you'}, <strong className="text-white">{formData.clientName}</strong>.{' '}
                {lang === 'es'
                  ? `Hemos recibido tu solicitud para el día ${formData.date} (${formData.guests} comensales).`
                  : `We have received your reservation request for ${formData.date} (${formData.guests} guests).`}
              </p>

              <div className="p-4 rounded-2xl bg-[#1c1b18] border border-stone-800 max-w-md mx-auto text-xs text-stone-400 space-y-1">
                <p>{t.forms.directContactNote}</p>
                <p className="font-mono text-[#d8b96d] font-bold text-sm">+52 322 160 6843</p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={`https://wa.me/523221606843?text=${encodeURIComponent(
                    lang === 'es'
                      ? `Hola Chef Franko, envié una solicitud de reserva desde el sitio web para el ${formData.date} (${formData.guests} comensales).`
                      : `Hello Chef Franko, I just sent a reservation request via your website for ${formData.date} (${formData.guests} guests).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/30 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{t.forms.whatsappDirect}</span>
                </a>
                <a
                  href="/"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d8b96d] to-[#9e7c33] text-stone-950 font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-lg"
                >
                  {lang === 'es' ? 'Volver al Inicio' : 'Return Home'}
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                    {t.forms.nameLabel} *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#c5a059] absolute left-4 top-3.5" />
                    <input
                      type="text"
                      name="clientName"
                      autoComplete="name"
                      required
                      placeholder={t.forms.namePlaceholder}
                      value={formData.clientName}
                      onChange={e => handleChange('clientName', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#1c1b18] border border-stone-700 focus:border-[#c5a059] text-white placeholder-stone-500 text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                    {t.forms.emailLabel} *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#c5a059] absolute left-4 top-3.5" />
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      placeholder={t.forms.emailPlaceholder}
                      value={formData.email}
                      onChange={e => handleChange('email', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#1c1b18] border border-stone-700 focus:border-[#c5a059] text-white placeholder-stone-500 text-sm outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                    {t.forms.phoneLabel} *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#c5a059] absolute left-4 top-3.5" />
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      required
                      placeholder={t.forms.phonePlaceholder}
                      value={formData.phone}
                      onChange={e => handleChange('phone', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#1c1b18] border border-stone-700 focus:border-[#c5a059] text-white placeholder-stone-500 text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                    {t.forms.dateLabel} *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#c5a059] absolute left-4 top-3.5" />
                    <input
                      type="date"
                      name="eventDate"
                      min={today}
                      autoComplete="off"
                      required
                      value={formData.date}
                      onChange={e => handleChange('date', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#1c1b18] border border-stone-700 focus:border-[#c5a059] text-white text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                    {t.forms.guestsLabel} *
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-[#c5a059] absolute left-4 top-3.5" />
                    <input
                      type="number"
                      name="guests"
                      inputMode="numeric"
                      min={1}
                      max={100}
                      required
                      value={formData.guests}
                      onChange={e => handleChange('guests', parseInt(e.target.value, 10) || 1)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#1c1b18] border border-stone-700 focus:border-[#c5a059] text-white text-sm outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                  {t.forms.serviceLabel}
                </label>
                <select
                  value={formData.serviceName}
                  onChange={e => handleChange('serviceName', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#1c1b18] border border-stone-700 focus:border-[#c5a059] text-white text-sm outline-none transition-colors"
                >
                  {t.forms.servicesList.map(srv => (
                    <option key={srv} value={srv}>
                      {srv}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                  {t.forms.notesLabel}
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-[#c5a059] absolute left-4 top-3.5" />
                  <textarea
                    rows={3}
                    placeholder={t.forms.notesPlaceholder}
                    value={formData.notes}
                    onChange={e => handleChange('notes', e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#1c1b18] border border-stone-700 focus:border-[#c5a059] text-white placeholder-stone-500 text-sm outline-none transition-colors resize-none"
                  ></textarea>
                </div>
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-red-950/80 border border-red-800/80 text-red-200 text-xs flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="pt-4 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-stone-400">
                  <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
                  <span>
                    {lang === 'es'
                      ? 'Tus datos están protegidos y se guardan automáticamente.'
                      : 'Your inquiry details are secure and auto-saved.'}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d8b96d] to-[#9e7c33] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span>{loading ? t.forms.submittingBtn : t.forms.submitBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};
