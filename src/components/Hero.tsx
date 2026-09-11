import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, ArrowRight, UtensilsCrossed, ShieldCheck, Star } from 'lucide-react';

interface HeroProps {
  onOpenQuote: () => void;
  onOpenAI: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote, onOpenAI }) => {
  return (
    <section id="hero" className="relative min-h-[90vh] bg-[#0a0a0a] text-stone-100 flex items-center overflow-hidden border-b border-stone-800/80">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.15),transparent_45%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-[#c5a059]/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Text Content */}
        <motion.div
          className="lg:col-span-7 space-y-8 text-left"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#181715] border border-[#c5a059]/40 text-[#d8b96d] text-xs font-semibold tracking-[0.2em] uppercase shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Chef Privado & Catering de Lujo • Puerto Vallarta & Riviera Nayarit</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.1]">
            Experiencias Gastronómicas <br className="hidden sm:inline" />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#c5a059] via-[#e5cf96] to-[#9e7c33]">
              Inolvidables en Tu Villa
            </span>.
          </h1>

          <p className="text-stone-300 text-base sm:text-xl max-w-2xl leading-relaxed font-light">
            Transformamos tu residencia, yate o terraza privada en un restaurante de alta cocina. Menús de autor maridados, vajilla fina y servicio de gala por el Chef Franko Salgado.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <button
              onClick={onOpenQuote}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d8b96d] to-[#9e7c33] hover:brightness-110 text-stone-950 font-bold text-base shadow-xl flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Calendar className="w-5 h-5 text-stone-950" />
              <span>Cotizar Evento Ahora</span>
              <ArrowRight className="w-5 h-5 ml-1" />
            </button>

            <button
              onClick={onOpenAI}
              className="px-8 py-4 rounded-xl bg-[#161513] hover:bg-[#201f1c] text-stone-200 border border-stone-800 hover:border-[#c5a059]/50 font-semibold text-base flex items-center justify-center gap-3 transition-all shadow-md"
            >
              <Sparkles className="w-5 h-5 text-[#c5a059]" />
              <span>Asistente Franko AI</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="pt-10 border-t border-stone-800/80 grid grid-cols-3 gap-6 text-left">
            <div>
              <div className="text-3xl sm:text-4xl font-serif font-light text-white flex items-center gap-1">
                <span>+20</span>
                <span className="text-[#c5a059] text-xl">★</span>
              </div>
              <p className="text-xs text-stone-400 mt-1 uppercase font-mono tracking-wider">Años de Trayectoria</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-serif font-light text-white flex items-center gap-1">
                <span>+250</span>
              </div>
              <p className="text-xs text-stone-400 mt-1 uppercase font-mono tracking-wider">Eventos Exclusivos</p>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-serif font-light text-white flex items-center gap-1">
                <span>100%</span>
              </div>
              <p className="text-xs text-stone-400 mt-1 uppercase font-mono tracking-wider">Satisfacción Clientes</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Hero Visual Card */}
        <motion.div
          className="lg:col-span-5 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative rounded-3xl overflow-hidden border border-stone-800 bg-[#141312] shadow-2xl group">
            <img
              src="/assets/private_chef_flatlay.jpg"
              alt="Experiencia Culinaria de Lujo Chef Franko Salgado"
              width={800}
              height={1000}
              loading="eager"
              className="w-full h-[460px] sm:h-[540px] object-cover group-hover:scale-105 transition-transform duration-1000 brightness-95 group-hover:brightness-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/20 to-transparent"></div>

            {/* Floating Badge */}
            <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-stone-950/90 backdrop-blur-md border border-[#c5a059]/40 text-[#d8b96d] text-xs font-semibold flex items-center gap-1.5 shadow-md">
              <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
              <span>Chef Franko Salgado</span>
            </div>

            {/* Bottom Overlay Info Card */}
            <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#141312]/95 backdrop-blur-md border border-stone-800/90 shadow-xl text-left">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#1f1d1a] border border-[#c5a059]/40 text-[#d8b96d] shrink-0">
                  <UtensilsCrossed className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-white">Banquete de Gala Frente al Mar</h3>
                  <p className="text-xs text-stone-400 mt-1 font-light">
                    Puerto Vallarta • Punta Mita • Sayulita • Sommelier y Servicio de Gala.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
