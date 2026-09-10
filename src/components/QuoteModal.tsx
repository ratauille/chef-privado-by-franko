import React, { useState } from 'react';
import { X, Calendar, Users, Mail, Phone, User, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    date: '',
    guests: 6,
    serviceName: 'Cena Degustación de Autor',
    notes: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
          recaptchaToken = await (window as any).grecaptcha.enterprise.execute('6LdA2a8tAAAAAEmdWsjEs3KtOhxDHmYGWoxdKXp0', { action: 'LEAD' });
        } catch (e) {
          console.warn('[reCAPTCHA Enterprise] Notice:', e);
        }
      }

      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(recaptchaToken ? { 'X-ReCaptcha-Token': recaptchaToken } : {}),
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
          event_category: 'Reservation',
          event_label: formData.serviceName,
          value: formData.guests,
        });
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Ocurrió un error al enviar la reserva.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-white border border-stone-200 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-stone-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-full hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <span className="text-gold-400 text-xs font-mono uppercase tracking-widest font-semibold">
            Cotización Directa
          </span>
          <h3 className="font-serif text-2xl font-bold mt-1 text-white">
            Reserva tu Experiencia Culinaria
          </h3>
          <p className="text-xs text-stone-400 mt-1">
            Completa tus datos para consultar disponibilidad y recibir tu menú personalizado.
          </p>
        </div>

        {/* Body Form */}
        <div className="p-6">
          {success ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="font-serif text-2xl font-bold text-stone-900">
                ¡Solicitud Recibida!
              </h4>
              <p className="text-xs text-stone-600 max-w-sm mx-auto">
                Hemos registrado tu solicitud para el día <strong>{formData.date}</strong>. Franko Salgado se pondrá en contacto contigo a la brevedad.
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-6 py-2.5 rounded-xl bg-black text-white font-bold text-xs shadow-md"
              >
                Cerrar Ventana
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-stone-600 mb-1">Nombre Completo</label>
                <div className="relative">
                  <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    placeholder="Ej. Sarah Thompson"
                    value={formData.clientName}
                    onChange={e => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#8c6a24] text-sm outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-600 mb-1">Correo Electrónico</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="nombre@ejemplo.com"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#8c6a24] text-sm outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-600 mb-1">Teléfono / WhatsApp</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+52 322 000 0000"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#8c6a24] text-sm outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-stone-600 mb-1">Fecha del Evento</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={e => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#8c6a24] text-sm outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-stone-600 mb-1">Número de Comensales</label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="number"
                      min={1}
                      max={100}
                      required
                      value={formData.guests}
                      onChange={e => setFormData({ ...formData, guests: parseInt(e.target.value, 10) || 1 })}
                      className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#8c6a24] text-sm outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-600 mb-1">Experiencia / Menú Sugerido</label>
                <select
                  value={formData.serviceName}
                  onChange={e => setFormData({ ...formData, serviceName: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#8c6a24] text-sm outline-none"
                >
                  <option value="Crème Brûlée de Cangrejo Real (6 Tiempos)">Crème Brûlée de Cangrejo Real (6 Tiempos)</option>
                  <option value="Belli con Puré de Cebolla Tatemada (5 Tiempos)">Belli con Puré de Cebolla Tatemada (5 Tiempos)</option>
                  <option value="Cena Degustación de Autor 5 Tiempos">Cena Degustación de Autor 5 Tiempos</option>
                  <option value="Banquete Sunset & Gala frente al Mar">Banquete Sunset & Gala frente al Mar</option>
                  <option value="Menú Personalizado en Villa">Menú Personalizado en Villa</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-stone-600 mb-1">Notas o Alergias Alimentarias</label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <textarea
                    rows={2}
                    placeholder="Escribe preferencias, alergias o solicitudes especiales..."
                    value={formData.notes}
                    onChange={e => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-300 focus:ring-2 focus:ring-[#8c6a24] text-sm outline-none resize-none"
                  ></textarea>
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-black hover:bg-stone-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
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
