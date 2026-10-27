import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Users, Mail, Phone, User, FileText, CheckCircle2, AlertCircle, Sparkles, ShieldCheck, ArrowRight, MessageCircle } from 'lucide-react';
import { useLanguage } from '../lib/i18n';
import { leadWhatsAppUrl } from '../lib/leadFallback';
import { submitLead, preloadRecaptchaEnterprise } from '../lib/leadApi';
import { generateLeadId } from '../lib/leadDispatcher';

const DRAFT_KEY = 'chef4you_reservation_draft_v1';
const SMS_REMINDER_BOOKING_URL =
  'https://www.smsreminder.co/book/tiVbGssvDw6CtX6t/franko-salgado?utm_source=inline-button-embed&utm_medium=embed';
const SMS_REMINDER_SCRIPT_ID = 'smsreminder-inline-button-script';

export const ReservationPage: React.FC = () => {
  const { t, lang } = useLanguage();
  const today = new Date().toISOString().split('T')[0];
  const submittingRef = useRef(false);

  const [formData, setFormData] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(DRAFT_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            ...parsed,
            lead_id: parsed.lead_id || generateLeadId(),
          };
        }
      } catch (e) {
        console.warn('Could not restore reservation draft from localStorage');
      }
    }
    return {
      lead_id: generateLeadId(),
      clientName: '',
      email: '',
      phone: '',
      date: '',
      guests: 6,
      serviceName: 'Cena Degustación de Autor 5 Tiempos',
      notes: '',
    };
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    preloadRecaptchaEnterprise();
  }, []);

  // Auto-save form draft to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined' && !success) {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
      } catch (e) {}
    }
  }, [formData, success]);

  // Defer third-party booking widget script so it never blocks mobile rendering
  useEffect(() => {
    if (document.getElementById(SMS_REMINDER_SCRIPT_ID)) return;
    const timer = setTimeout(() => {
      if (document.getElementById(SMS_REMINDER_SCRIPT_ID)) return;
      const script = document.createElement('script');
      script.id = SMS_REMINDER_SCRIPT_ID;
      script.async = true;
      script.src = 'https://www.smsreminder.co/embed/inline-button.js';
      document.body.appendChild(script);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submittingRef.current || loading) return; // Protección estricta contra doble clic
    submittingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const result = await submitLead(
        {
          ...formData,
          source: 'reservation_page',
          landingPage: typeof window !== 'undefined' ? window.location.href : '',
        },
        'RESERVATION'
      );

      if (typeof (window as any).trackGA4Event === 'function') {
        (window as any).trackGA4Event('generate_lead', {
          event_category: 'ReservationPage',
          event_label: formData.serviceName,
          value: formData.guests,
          lead_id: result?.leadId || formData.lead_id,
        });
      }

      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch (e) {}

      setSuccess(true);
    } catch (err: any) {
      setError(
        err.message ||
          'Ocurrió un error al enviar tu solicitud. Se han conservado tus datos para que reintentes.'
      );
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  };

  const waUrl = leadWhatsAppUrl(formData, lang);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-stone-100 py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(197,160,89,0.12),transparent_50%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto w-full relative z-10">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181715] border border-[#c5a059]/40 text-[#d8b96d] text-xs font-semibold uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{t.forms.reservationBadge}</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight">
            {t.forms.reservationTitle}{' '}
            <span className="italic text-[#d8b96d]">{t.forms.reservationTitleAccent}</span>
          </h1>

          <p className="text-stone-400 text-base sm:text-lg max-w-xl mx-auto font-light">
            {t.forms.reservationSubtitle}
          </p>

          <div className="pt-2 flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-[0.18em] text-stone-400">
              {lang === 'en' ? 'Already have a date and time?' : '¿Ya tienes fecha y horario?'}
            </span>
            <a
              href={SMS_REMINDER_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-bwm
              data-bwm-label="Book Now"
              data-bwm-color="#2b4c9b"
              data-bwm-text-color="#ffffff"
              data-bwm-size="normal"
              data-bwm-position="centered"
              aria-label={t.forms.calendarBookingBtn}
            >
              Book Now
            </a>
            <span className="text-[11px] text-stone-400">{t.forms.calendarBookingBtn}</span>
          </div>
        </div>

        <div className="bg-[#141312] border border-stone-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          {success ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-20 h-20 rounded-full bg-[#1c2a1e] border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-light text-white">
                {t.forms.successTitle}
              </h2>

              <p className="text-stone-300 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                {t.forms.successSubmsg}
              </p>

              <div className="p-4 rounded-2xl bg-[#1c1b18] border border-stone-800 max-w-md mx-auto text-xs text-stone-400 space-y-1">
                <p>{t.forms.directContactNote}</p>
                <p className="font-mono text-[#d8b96d] font-bold text-sm">{formData.phone}</p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-stone-950 font-bold text-sm transition-all shadow-lg inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.forms.whatsappDirect}</span>
                </a>
                <a
                  href="/"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d8b96d] to-[#9e7c33] text-stone-950 font-bold text-sm hover:brightness-110 transition-all shadow-lg"
                >
                  {lang === 'en' ? 'Back to Home' : 'Volver al Inicio'}
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setSuccess(false);
                    let freshLeadId = '';
                    try {
                      freshLeadId = generateLeadId();
                    } catch (e) {}
                    setFormData({
                      lead_id: freshLeadId,
                      clientName: '',
                      email: '',
                      phone: '',
                      date: '',
                      guests: 6,
                      serviceName: 'Cena Degustación de Autor 5 Tiempos',
                      notes: '',
                    });
                  }}
                  className="px-6 py-3 rounded-xl bg-stone-900 border border-stone-700 text-stone-300 text-sm hover:text-white transition-colors"
                >
                  {lang === 'en' ? 'Request Another Quote' : 'Realizar otra cotización'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="sr-only">
                {lang === 'es' ? 'Formulario de Solicitud de Reserva' : 'Reservation Request Form'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="res-clientName" className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                    {t.forms.nameLabel} *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#c5a059] absolute left-4 top-3.5" />
                    <input
                      id="res-clientName"
                      type="text"
                      name="clientName"
                      autoComplete="name"
                      required
                      placeholder={t.forms.namePlaceholder}
                      value={formData.clientName}
                      onChange={e => handleChange('clientName', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#1c1b18] border border-stone-700 focus:border-[#c5a059] text-white placeholder-stone-400 text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="res-email" className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                    {t.forms.emailLabel} *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#c5a059] absolute left-4 top-3.5" />
                    <input
                      id="res-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      placeholder={t.forms.emailPlaceholder}
                      value={formData.email}
                      onChange={e => handleChange('email', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#1c1b18] border border-stone-700 focus:border-[#c5a059] text-white placeholder-stone-400 text-sm outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label htmlFor="res-phone" className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                    {t.forms.phoneLabel} *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#c5a059] absolute left-4 top-3.5" />
                    <input
                      id="res-phone"
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      required
                      placeholder={t.forms.phonePlaceholder}
                      value={formData.phone}
                      onChange={e => handleChange('phone', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#1c1b18] border border-stone-700 focus:border-[#c5a059] text-white placeholder-stone-400 text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="res-date" className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                    {t.forms.dateLabel} *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#c5a059] absolute left-4 top-3.5" />
                    <input
                      id="res-date"
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
                  <label htmlFor="res-guests" className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                    {t.forms.guestsLabel} *
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-[#c5a059] absolute left-4 top-3.5" />
                    <input
                      id="res-guests"
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
                <label htmlFor="res-serviceName" className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                  {t.forms.serviceLabel}
                </label>
                <select
                  id="res-serviceName"
                  name="serviceName"
                  value={formData.serviceName}
                  onChange={e => handleChange('serviceName', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#1c1b18] border border-stone-700 focus:border-[#c5a059] text-white text-sm outline-none transition-colors"
                >
                  {t.forms.servicesList.map(svc => (
                    <option key={svc} value={svc}>
                      {svc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="res-notes" className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                  {t.forms.notesLabel}
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-[#c5a059] absolute left-4 top-3.5" />
                  <textarea
                    id="res-notes"
                    name="notes"
                    rows={3}
                    placeholder={t.forms.notesPlaceholder}
                    value={formData.notes}
                    onChange={e => handleChange('notes', e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#1c1b18] border border-stone-700 focus:border-[#c5a059] text-white placeholder-stone-400 text-sm outline-none transition-colors resize-none"
                  />
                </div>
              </div>

              {error && (
                <div className="p-4 rounded-xl bg-red-950/80 border border-red-800/80 text-red-200 text-xs space-y-2" role="alert">
                  <p className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                    {error}
                  </p>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 underline font-semibold text-emerald-300"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{t.forms.whatsappDirect}</span>
                  </a>
                </div>
              )}

              <div className="pt-4 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-xs text-stone-400">
                  <span className="inline-flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
                    <span>
                      {lang === 'en'
                        ? 'Your draft is saved in this browser until submitted.'
                        : 'Tu borrador se conserva en este navegador hasta que envíes la solicitud.'}
                    </span>
                  </span>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-[#4ade80] hover:underline"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{t.forms.whatsappDirect}</span>
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d8b96d] to-[#9e7c33] text-stone-950 font-bold text-sm shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span>{loading ? t.forms.submittingBtn : t.forms.submitBtn}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
