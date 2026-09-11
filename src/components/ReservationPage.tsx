import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Users, Mail, Phone, User, FileText, CheckCircle2, AlertCircle, Sparkles, ShieldCheck, Clock, ArrowRight } from 'lucide-react';

const DRAFT_KEY = 'chef4you_reservation_draft_v1';

export const ReservationPage: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];

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
      serviceName: 'Cena Degustación de Autor 5 Tiempos',
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
      } catch (e) {
        // ignore storage errors
      }
    }
  }, [formData, success]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Execute reCAPTCHA Enterprise token if available
      let recaptchaToken = '';
      if (typeof window !== 'undefined' && (window as any).grecaptcha?.enterprise) {
        try {
          recaptchaToken = await (window as any).grecaptcha.enterprise.execute('6LdA2a8tAAAAAEmdWsjEs3KtOhxDHmYGWoxdKXp0', { action: 'RESERVATION' });
        } catch (err) {
          console.warn('[reCAPTCHA Enterprise] Notice:', err);
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
        throw new Error(data.error || 'No se pudo enviar la reserva. Por favor intenta de nuevo o contáctanos directamente.');
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
      setError(err.message || 'Ocurrió un error al enviar tu solicitud. Se han conservado tus datos para que reintentes.');
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
            <span>Reserva & Cotización Directa</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white tracking-tight">
            Diseña Tu Experiencia <span className="italic text-[#d8b96d]">Gourmet</span>
          </h1>

          <p className="text-stone-400 text-base sm:text-lg max-w-xl mx-auto font-light">
            Consulta disponibilidad para tu villa, casa de playa o evento privado en Puerto Vallarta, Punta Mita y Sayulita.
          </p>
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
                ¡Solicitud de Reserva Recibida!
              </h2>

              <p className="text-stone-300 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
                Gracias, <strong className="text-white">{formData.clientName}</strong>. Hemos recibido tu solicitud para el día <strong className="text-[#d8b96d]">{formData.date}</strong> para <strong className="text-white">{formData.guests} comensales</strong>.
              </p>

              <div className="p-4 rounded-2xl bg-[#1c1b18] border border-stone-800 max-w-md mx-auto text-xs text-stone-400 space-y-1">
                <p>El Chef Franko Salgado se comunicará contigo al teléfono/WhatsApp:</p>
                <p className="font-mono text-[#d8b96d] font-bold text-sm">{formData.phone}</p>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="/"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d8b96d] to-[#9e7c33] text-stone-950 font-bold text-sm hover:brightness-110 transition-all shadow-lg"
                >
                  Volver al Inicio
                </a>
                <button
                  onClick={() => {
                    setSuccess(false);
                    setFormData({
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
                  Realizar otra cotización
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                    Nombre Completo *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#c5a059] absolute left-4 top-3.5" />
                    <input
                      type="text"
                      name="clientName"
                      autoComplete="name"
                      required
                      placeholder="Ej. Sarah Thompson"
                      value={formData.clientName}
                      onChange={e => handleChange('clientName', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#1c1b18] border border-stone-700 focus:border-[#c5a059] text-white placeholder-stone-500 text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                    Correo Electrónico *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#c5a059] absolute left-4 top-3.5" />
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      required
                      placeholder="nombre@ejemplo.com"
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
                    Teléfono / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#c5a059] absolute left-4 top-3.5" />
                    <input
                      type="tel"
                      name="phone"
                      autoComplete="tel"
                      required
                      placeholder="+52 322 000 0000"
                      value={formData.phone}
                      onChange={e => handleChange('phone', e.target.value)}
                      className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#1c1b18] border border-stone-700 focus:border-[#c5a059] text-white placeholder-stone-500 text-sm outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                    Fecha del Evento *
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
                    Comensales *
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
                  Experiencia o Menú Deseado
                </label>
                <select
                  value={formData.serviceName}
                  onChange={e => handleChange('serviceName', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#1c1b18] border border-stone-700 focus:border-[#c5a059] text-white text-sm outline-none transition-colors"
                >
                  <option value="Cena Degustación de Autor 5 Tiempos">Cena Degustación de Autor 5 Tiempos</option>
                  <option value="Crème Brûlée de Cangrejo Real (6 Tiempos)">Crème Brûlée de Cangrejo Real (6 Tiempos)</option>
                  <option value="Belli con Puré de Cebolla Tatemada (5 Tiempos)">Belli con Puré de Cebolla Tatemada (5 Tiempos)</option>
                  <option value="Banquete Sunset & Gala frente al Mar">Banquete Sunset & Gala frente al Mar</option>
                  <option value="Servicio de Chef Privado Completo en Villa">Servicio de Chef Privado Completo en Villa</option>
                  <option value="Catering para Yate Privado">Catering para Yate Privado</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-300 mb-2">
                  Preferencias, Alergias o Notas Especiales
                </label>
                <div className="relative">
                  <FileText className="w-4 h-4 text-[#c5a059] absolute left-4 top-3.5" />
                  <textarea
                    rows={3}
                    placeholder="Menciona alergias (mariscos, gluten, frutos secos), requerimientos dietéticos o detalles de tu residencia/villa..."
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
                  <span>Tus datos están protegidos y se guardan automáticamente.</span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d8b96d] to-[#9e7c33] text-stone-950 font-bold text-sm shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span>{loading ? 'Enviando Solicitud...' : 'Enviar Solicitud de Cotización'}</span>
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
