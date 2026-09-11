import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, Mail, Phone, User, FileText, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DRAFT_KEY = 'chef4you_quote_modal_draft';

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const today = new Date().toISOString().split('T')[0];

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
      serviceName: 'Cena Degustación de Autor 5 Tiempos',
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

    try {
      // Execute reCAPTCHA Enterprise if available
      let recaptchaToken = '';
      if (typeof window !== 'undefined' && (window as any).grecaptcha?.enterprise) {
        try {
          recaptchaToken = await (window as any).grecaptcha.enterprise.execute(import.meta.env.VITE_RECAPTCHA_SITE_KEY || '6LcRcbUtAAAAALu9BaCB9Dagi6ejHwQm0IqEOu1n', { action: 'LEAD' });
        } catch (err) {
          console.warn('[reCAPTCHA Enterprise] Notice:', err);
        }
      }

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(recaptchaToken ? { 'X-ReCaptcha-Token': recaptchaToken } : {}),
          'X-ReCaptcha-Action': 'LEAD',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'No se pudo enviar la solicitud.');
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
      setError(err.message || 'Ocurrió un error al enviar la reserva.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto"
    >
      <div className="bg-[#141312] border border-stone-800 rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden relative my-8 text-stone-100 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-[#0a0a0a] border-b border-stone-800 p-6 sm:p-8 relative">
          <button
            onClick={onClose}
            aria-label="Cerrar modal de cotización"
            className="absolute top-6 right-6 text-stone-400 hover:text-white p-2 rounded-full hover:bg-stone-900 border border-transparent hover:border-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181715] border border-[#c5a059]/40 text-[#d8b96d] text-[11px] font-semibold uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Cotización Directa</span>
          </div>

          <h3 id="modal-title" className="font-serif text-2xl sm:text-3xl font-light text-white">
            Reserva Tu Experiencia Culinaria
          </h3>

          <p className="text-xs text-stone-400 mt-1 font-light">
            Completa tus datos para consultar disponibilidad y recibir tu menú personalizado.
          </p>
        </div>

        {/* Body Form */}
        <div className="p-6 sm:p-8">
          {success ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#1c2a1e] text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center shadow-lg">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-white">
                ¡Solicitud Recibida!
              </h4>
              <p className="text-xs text-stone-300 max-w-sm mx-auto leading-relaxed">
                Hemos registrado tu solicitud para el día <strong className="text-[#d8b96d]">{formData.date}</strong>. El Chef Franko Salgado se pondrá en contacto contigo a la brevedad.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-8 py-3 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#9e7c33] text-stone-950 font-bold text-xs shadow-md"
              >
                Cerrar Ventana
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">Nombre Completo *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#c5a059] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    name="clientName"
                    autoComplete="name"
                    required
                    placeholder="Ej. Sarah Thompson"
                    value={formData.clientName}
                    onChange={e => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1c1b18] border border-stone-700 focus:border-[#c5a059] text-white text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">Correo Electrónico *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#c5a059] absolute left-3.5 top-3" />
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      placeholder="nombre@ejemplo.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1c1b18] border border-stone-700 focus:border-[#c5a059] text-white text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">Teléfono / WhatsApp *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#c5a059] absolute left-3.5 top-3" />
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      required
                      placeholder="+52 322 000 0000"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1c1b18] border border-stone-700 focus:border-[#c5a059] text-white text-sm outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">Fecha del Evento *</label>
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
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">Comensales *</label>
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

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">Experiencia / Menú Sugerido</label>
                <select
                  value={formData.serviceName}
                  onChange={e => setFormData({ ...formData, serviceName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#1c1b18] border border-stone-700 focus:border-[#c5a059] text-white text-sm outline-none transition-colors"
                >
                  <option value="Crème Brûlée de Cangrejo Real (6 Tiempos)">Crème Brûlée de Cangrejo Real (6 Tiempos)</option>
                  <option value="Belli con Puré de Cebolla Tatemada (5 Tiempos)">Belli con Puré de Cebolla Tatemada (5 Tiempos)</option>
                  <option value="Cena Degustación de Autor 5 Tiempos">Cena Degustación de Autor 5 Tiempos</option>
                  <option value="Banquete Sunset & Gala frente al Mar">Banquete Sunset & Gala frente al Mar</option>
                  <option value="Menú Personalizado en Villa">Menú Personalizado en Villa</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1">Notas o Alergias Alimentarias</label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-[#c5a059] absolute left-3.5 top-3" />
                  <textarea
                    rows={2}
                    placeholder="Escribe preferencias, alergias o solicitudes especiales..."
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
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d8b96d] to-[#9e7c33] text-stone-950 font-bold text-sm shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>{loading ? 'Enviando Solicitud...' : 'Enviar Solicitud de Cotización'}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
