import React, { useState, useEffect, useRef } from 'react';
import { X, Calendar, Users, Mail, Phone, User, FileText, CheckCircle2, AlertCircle, Sparkles, MessageCircle } from 'lucide-react';
import { useLanguage } from '../lib/i18n';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { leadWhatsAppUrl } from '../lib/leadFallback';
import { submitLead, preloadRecaptchaEnterprise } from '../lib/leadApi';
import { generateLeadId } from '../lib/leadDispatcher';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DRAFT_KEY = 'chef4you_quote_modal_draft';

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
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
      } catch (e) {}
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

  const resetFormWithFreshId = () => {
    try {
      setFormData({
        lead_id: generateLeadId(),
        clientName: '',
        email: '',
        phone: '',
        date: '',
        guests: 6,
        serviceName: 'Cena Degustación de Autor 5 Tiempos',
        notes: '',
      });
    } catch (e) {}
  };

  const handleModalClose = () => {
    if (success) {
      setSuccess(false);
      resetFormWithFreshId();
    }
    onClose();
  };

  const containerRef = useFocusTrap({ isOpen, onClose: handleModalClose });

  useEffect(() => {
    if (isOpen && success) {
      setSuccess(false);
      resetFormWithFreshId();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      preloadRecaptchaEnterprise();
    }
  }, [isOpen]);

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
    if (submittingRef.current || loading) return; // Protección estricta e instantánea contra doble clic
    submittingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const result = await submitLead(
        {
          ...formData,
          source: 'quote_modal',
          landingPage: typeof window !== 'undefined' ? window.location.href : '',
        },
        'LEAD'
      );

      // Track GA4 conversion event una sola vez tras confirmacion de exito
      if (typeof (window as any).trackGA4Event === 'function') {
        (window as any).trackGA4Event('generate_lead', {
          event_category: 'ReservationModal',
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
      setError(err.message || 'Ocurrió un error al enviar la reserva.');
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  };

  const waUrl = leadWhatsAppUrl(formData, lang);

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      tabIndex={-1}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
    >
      <div className="bg-[#141312] border border-stone-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden relative my-8 text-stone-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#0a0a0a] border-b border-stone-800 p-6 sm:p-8 relative">
          <button
            type="button"
            onClick={handleModalClose}
            aria-label={t.forms.closeBtn}
            className="absolute top-6 right-6 text-stone-400 hover:text-white p-2 rounded-full hover:bg-stone-900 border border-transparent hover:border-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181715] border border-[#c5a059]/40 text-[#d8b96d] text-[11px] font-semibold uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Cotización Directa</span>
          </div>

          <h3 id="modal-title" className="font-serif text-2xl sm:text-3xl font-light text-white">
            {lang === 'en' ? 'Book Your Culinary Experience' : 'Reserva Tu Experiencia Culinaria'}
          </h3>

          <p className="text-xs text-stone-400 mt-1 font-light">
            {lang === 'en'
              ? 'Complete your details to check availability and receive your personalized menu.'
              : 'Completa tus datos para consultar disponibilidad y recibir tu menú personalizado.'}
          </p>
        </div>

        {/* Body Form */}
        <div className="p-6 sm:p-8">
          {success ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#1c2a1e] text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-white">
                {t.forms.successTitle}
              </h3>
              <p className="text-xs text-stone-300 max-w-sm mx-auto leading-relaxed">
                {t.forms.successSubmsg}
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-stone-950 font-bold text-xs shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.forms.whatsappDirect}</span>
                </a>
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#9e7c33] text-stone-950 font-bold text-xs shadow-md"
                >
                  {t.forms.closeBtn}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="quote-clientName" className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                  {t.forms.nameLabel} *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#c5a059] absolute left-3.5 top-3" />
                  <input
                    id="quote-clientName"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quote-email" className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                    {t.forms.emailLabel} *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#c5a059] absolute left-3.5 top-3" />
                    <input
                      id="quote-email"
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
                  <label htmlFor="quote-phone" className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                    {t.forms.phoneLabel} *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#c5a059] absolute left-3.5 top-3" />
                    <input
                      id="quote-phone"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="quote-date" className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                    {t.forms.dateLabel} *
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#c5a059] absolute left-3.5 top-3" />
                    <input
                      id="quote-date"
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
                  <label htmlFor="quote-guests" className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                    {t.forms.guestsLabel} *
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-[#c5a059] absolute left-3.5 top-3" />
                    <input
                      id="quote-guests"
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

              <div>
                <label htmlFor="quote-serviceName" className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                  {t.forms.serviceLabel}
                </label>
                <select
                  id="quote-serviceName"
                  name="serviceName"
                  value={formData.serviceName}
                  onChange={e => setFormData({ ...formData, serviceName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1c1b18] border border-stone-700 focus:border-[#c5a059] text-white text-sm outline-none transition-colors"
                >
                  {t.forms.servicesList.map(svc => (
                    <option key={svc} value={svc}>
                      {svc}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="quote-notes" className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">
                  {t.forms.notesLabel}
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-[#c5a059] absolute left-3.5 top-3" />
                  <textarea
                    id="quote-notes"
                    name="notes"
                    rows={2}
                    placeholder={t.forms.notesPlaceholder}
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1c1b18] border border-stone-700 focus:border-[#c5a059] text-white text-sm outline-none transition-colors resize-none"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs space-y-2" role="alert">
                  <p className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    {error}
                  </p>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 underline font-semibold text-emerald-300"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{t.forms.whatsappDirect}</span>
                  </a>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d8b96d] to-[#9e7c33] text-stone-950 font-bold text-sm shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{loading ? t.forms.submittingBtn : t.forms.submitBtn}</span>
              </button>

              <div className="pt-2 text-center">
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 text-xs font-semibold text-[#4ade80] hover:underline"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{t.forms.whatsappDirect}</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
