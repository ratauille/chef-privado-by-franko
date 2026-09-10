import React from 'react';
import { Sparkles, Calendar, ArrowRight, UtensilsCrossed, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onOpenQuote: () => void;
  onOpenAI: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onOpenAI }) => {
  return (
    <section id="hero" className="relative min-h-[85vh] bg-white text-stone-900 flex items-center overflow-hidden border-b border-stone-200">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-100 via-white to-white pointer-events-none"></div>
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[400px] bg-gold-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Text Content */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-gold-300 text-[#8c6a24] text-[11px] font-semibold tracking-[0.18em] uppercase shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Chef Privado & Catering de Lujo en Puerto Vallarta & Riviera Nayarit</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-stone-900 leading-[1.15]">
            Experiencias Gastronómicas, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8c6a24] via-[#a4832f] to-[#6f5219] font-normal">
              Inolvidables en Tu Villa
            </span>.
          </h1>

          <p className="text-stone-600 text-base sm:text-lg max-w-2xl leading-relaxed font-sans font-light">
            Transforma tu residencia o terraza en un restaurante de alta cocina. Menús de autor maridados, vajilla fina y servicio de gala por el Chef Franko Salgado.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onOpenQuote}
              className="px-6 py-4 rounded-xl bg-black hover:bg-stone-800 text-white font-bold text-base shadow-lg flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Calendar className="w-5 h-5 text-gold-400" />
              <span>Cotizar Evento Ahora</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </button>

            <button
              onClick={onOpenAI}
              className="px-6 py-4 rounded-xl bg-white hover:bg-stone-50 text-stone-900 border border-stone-300 font-semibold text-base flex items-center justify-center gap-3 transition-colors shadow-xs"
            >
              <Sparkles className="w-5 h-5 text-[#8c6a24]" />
              <span>Franko AI</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="pt-8 border-t border-stone-200 grid grid-cols-3 gap-4 text-left">
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">+20</div>
              <p className="text-xs text-stone-500 mt-1 uppercase font-semibold tracking-wider">Años de Trayectoria</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">+250</div>
              <p className="text-xs text-stone-500 mt-1 uppercase font-semibold tracking-wider">Eventos Exclusivos</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">100%</div>
              <p className="text-xs text-stone-500 mt-1 uppercase font-semibold tracking-wider">Satisfacción Clientes</p>
            </div>
          </div>
        </div>

        {/* Right Media Card */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-xl bg-white group">
            <img
              src="/assets/banquete_gala_frente_al_mar.jpg"
              alt="Banquete de Gala Frente al Mar - Chef4You"
              className="w-full h-[420px] sm:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent"></div>

            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-stone-200 shadow-lg text-left">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-gold-100 text-[#8c6a24]">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-bold text-stone-900">Experiencia Gourmet al Atardecer</h4>
                  <p className="text-xs text-stone-500">Puerto Vallarta & Riviera Nayarit • Sommelier y servicio de gala.</p>
                </div>
              </div>
            </div>

            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md border border-gold-300 text-[#8c6a24] text-xs font-semibold flex items-center gap-1.5 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8c6a24]" />
              <span>Chef Franko Salgado</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
