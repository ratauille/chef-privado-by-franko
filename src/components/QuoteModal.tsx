import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, Mail, Phone, User, FileText, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '../lib/i18n';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DRAFT_KEY = 'chef4you_quote_modal_draft';

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const today = new Date().toISOString().split('T')[0];
  const { t, lang } = useLanguage();

  const [formData, setFormData] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(DRAFT_KEY);
        if (saved) return JSON.parse(saved);
      } catch (e) {}
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

  useEffect(() => {
    if (typeof window !== 'undefined' && isOpen && !success) {
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
      } catch (e) {}
    }
  }, [formData, isOpen, success]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    let successSubmitted = false;

    try {
      // Execute reCAPTCHA Enterprise if available
      let recaptchaToken = '';
      if (typeof window !== 'undefined' && (window as any).grecaptcha?.enterprise) {
        try {
          recaptchaToken = await (window as any).grecaptcha.enterprise.execute(
            import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LcRcbUtAAAAALu9BaCB9Dagi6ejHwQm0IqEOu1n',
            { action: 'LEAD' }
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
            'X-ReCaptcha-Action': 'LEAD',
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
        console.warn('[QuoteModal] /api/lead error:', apiErr);
      }

      if (!successSubmitted) {
        throw new Error(
          lang === 'es'
            ? 'No pudimos enviar tu solicitud de forma segura. Por favor contáctanos directamente por WhatsApp.'
            : 'We could not submit your request safely. Please reach out to Chef Franko directly on WhatsApp.'
        );
      }

      // Track GA4 conversion event
      if (typeof (window as any).trackGA4Event === 'function') {
        (window as any).trackGA4Event('generate_lead', {
          event_category: 'ReservationModal',
          event_label: formData.serviceName,
          value: formData.guests,
        });
      }

      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch (e) {}

      setSuccess(true);
    } catch (err: any) {
      setError(
        err.message ||
          (lang === 'es'
            ? 'Ocurrió un error al procesar tu solicitud.'
            : 'An error occurred while submitting your request.')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div className="bg-[#141312] border border-stone-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden relative my-8 text-stone-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#0a0a0a] border-b border-stone-800 p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            aria-label={lang === 'es' ? 'Cerrar modal' : 'Close modal'}
            className="absolute top-6 right-6 text-stone-400 hover:text-white p-2 rounded-full hover:bg-stone-900 border border-transparent hover:border-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181715] border border-[#c5a059]/40 text-[#d8b96d] text-[11px] font-semibold uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{t.forms.quoteBadge}</span>
          </div>

          <h3 id="modal-title" className="font-serif text-2xl sm:text-3xl font-light text-white">
            {t.forms.quoteTitle}
          </h3>

          <p className="text-xs text-stone-400 mt-1 font-light">
            {t.forms.quoteSubtitle}
          </p>
        </div>

        {/* Body Form */}
        <div className="p-6 sm:p-8">
          {success ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#1c2a1e] text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-white">
                {t.forms.successTitle}
              </h4>
              <p className="text-xs text-stone-300 max-w-sm mx-auto leading-relaxed">
                {t.forms.successMsg}{' '}
                {lang === 'es' ? 'para el día' : 'for'}{' '}
                <strong className="text-[#d8b96d]">{formData.date}</strong>.
              </p>
              <p className="text-[11px] text-stone-400">
                {t.forms.successSubmsg}
              </p>
              <div className="pt-4 flex flex-col gap-3">
                <a
                  href={`https://wa.me/523221606843?text=${encodeURIComponent(
                    lang === 'es'
                      ? `Hola Chef Franko, envié mi cotización para el ${formData.date} (${formData.guests} comensales).`
                      : `Hello Chef Franko, I just submitted a reservation request for ${formData.date} (${formData.guests} guests).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-[#25D366]/20 border border-[#25D366]/40 text-[#25D366] hover:bg-[#25D366]/30 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>{t.forms.whatsappDirect}</span>
                </a>
                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl bg-stone-900 border border-stone-700 text-stone-300 hover:text-white font-bold text-xs"
                >
                  {t.forms.closeBtn}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                  {t.forms.nameLabel} *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#c5a059] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    name="clientName"
                    autoComplete="name"
                    required
                    placeholder={t.forms.namePlaceholder}
                    value={formData.clientName}
                    onChange={e => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1c1b18] border border-stone-700 focus:border-[#c5a059] text-white text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                    {t.forms.emailLabel} *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#c5a059] absolute left-3.5 top-3" />
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      placeholder={t.forms.emailPlaceholder}
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1c1b18] border border-stone-700 focus:border-[#c5a059] text-white text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                    {t.forms.phoneLabel} *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#c5a059] absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      required
                      placeholder={t.forms.phonePlaceholder}
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1c1b18] border border-stone-700 focus:border-[#c5a059] text-white text-sm outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Date & Guests */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                    {t.forms.dateLabel} *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#c5a059] absolute left-3.5 top-3" />
                    <input
                      type="date"
                      name="eventDate"
                      min={today}
                      autoComplete="off"
                      required
                      value={formData.date}
                      onChange={e => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1c1b18] border border-stone-700 focus:border-[#c5a059] text-white text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                    {t.forms.guestsLabel} *
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-[#c5a059] absolute left-3.5 top-3" />
                    <input
                      type="number"
                      name="guests"
                      inputMode="numeric"
                      min={1}
                      max={100}
                      required
                      value={formData.guests}
                      onChange={e => setFormData({ ...formData, guests: parseInt(e.target.value, 10) || 1 })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1c1b18] border border-stone-700 focus:border-[#c5a059] text-white text-sm outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                  {t.forms.serviceLabel}
                </label>
                <select
                  value={formData.serviceName}
                  onChange={e => setFormData({ ...formData, serviceName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1c1b18] border border-stone-700 focus:border-[#c5a059] text-white text-sm outline-none transition-colors"
                >
                  {t.forms.servicesList.map(srv => (
                    <option key={srv} value={srv}>
                      {srv}
                    </option>
                  ))}
                </select>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                  {t.forms.notesLabel}
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-[#c5a059] absolute left-3.5 top-3" />
                  <textarea
                    rows={2}
                    placeholder={t.forms.notesPlaceholder}
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1c1b18] border border-stone-700 focus:border-[#c5a059] text-white text-sm outline-none transition-colors resize-none"
                  ></textarea>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d8b96d] to-[#9e7c33] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{loading ? t.forms.submittingBtn : t.forms.submitBtn}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
