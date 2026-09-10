import React from 'react';
import { Sparkles, ShieldCheck, Utensils, ArrowRight } from 'lucide-react';

interface ServicesBannerProps {
  onOpenQuote: () => void;
}

export const ServicesBanner: React.FC<ServicesBannerProps> = ({ onOpenQuote }) => {
  return (
    <section id="banner-servicios" className="py-16 bg-stone-50 border-b border-stone-200 text-stone-900 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gold-300 text-[#8c6a24] text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Portafolio de Experiencias Exclusivas</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-stone-900">
            An Experience for <span className="text-[#8c6a24] italic font-normal">Every Occasion</span>
          </h2>

          <p className="text-stone-600 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Desde cenas románticas íntimas hasta banquetes de boda de gala — cada experiencia gastronómica está creada a la medida en Puerto Vallarta, Punta Mita y Riviera Nayarit.
          </p>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-xl bg-white group">
          <img
            src="/assets/chef4you_services_banner.jpg"
            alt="Chef4You Services Banner - An experience for every occasion"
            className="w-full h-auto object-cover transform group-hover:scale-[1.01] transition-transform duration-700"
          />

          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 px-4 py-2 rounded-xl bg-white/95 backdrop-blur-md border border-stone-200 text-stone-900 text-xs font-semibold shadow-lg hidden sm:flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#8c6a24]" />
            <span>Servicios de Alta Culinaria 6 Tiempos</span>
          </div>

          <div className="p-6 sm:p-8 bg-white border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                ¿Listo para diseñar tu experiencia culinaria personalizada?
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Cena en Villa · Cena Romántica · Especialista en Bodas · Masterclass · Chef en Yate · Eventos VIP
              </p>
            </div>

            <button
              onClick={onOpenQuote}
              className="px-6 py-3.5 rounded-xl bg-black hover:bg-stone-800 text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 shrink-0 transition-transform hover:scale-105 active:scale-95"
            >
              <Utensils className="w-4 h-4 text-gold-400" />
              <span>Reservar Mi Fecha</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
