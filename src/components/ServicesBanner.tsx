import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShieldCheck, Utensils, ArrowRight } from 'lucide-react';

interface ServicesBannerProps {
  onOpenQuote: () => void;
}

export const ServicesBanner: React.FC<ServicesBannerProps> = ({ onOpenQuote }) => {
  return (
    <section id="banner-servicios" className="py-20 bg-[#0a0a0a] border-b border-stone-800/80 text-stone-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181715] border border-[#c5a059]/40 text-[#d8b96d] text-xs font-semibold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Portafolio de Experiencias Exclusivas</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white">
            Una Experiencia para <span className="italic text-[#d8b96d]">Cada Ocasión Especial</span>
          </h2>

          <p className="text-stone-400 text-sm sm:text-base font-light max-w-2xl mx-auto leading-relaxed">
            Desde cenas románticas íntimas hasta banquetes de boda de gala — cada experiencia gastronómica está creada a la medida en Puerto Vallarta, Punta Mita y Riviera Nayarit.
          </p>
        </motion.div>

        <motion.div
          className="relative rounded-3xl overflow-hidden border border-stone-800 bg-[#141312] shadow-2xl group"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <img
            src="/assets/chef4you_services_banner.jpg"
            alt="Chef4You Services Banner - An experience for every occasion"
            width={1200}
            height={600}
            loading="lazy"
            className="w-full h-auto object-cover transform group-hover:scale-[1.01] transition-transform duration-700 brightness-90 group-hover:brightness-100"
          />

          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 px-4 py-2 rounded-xl bg-stone-950/90 backdrop-blur-md border border-[#c5a059]/40 text-[#d8b96d] text-xs font-semibold shadow-lg hidden sm:flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
            <span>Servicios de Alta Culinaria 6 Tiempos</span>
          </div>

          <div className="p-6 sm:p-10 bg-[#141312] border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h3 className="font-serif text-xl sm:text-3xl font-light text-white">
                ¿Listo para diseñar tu experiencia culinaria personalizada?
              </h3>
              <p className="text-xs sm:text-sm text-stone-400 mt-2 font-light">
                Cena en Villa · Cena Romántica · Especialista en Bodas · Masterclass · Chef en Yate · Eventos VIP
              </p>
            </div>

            <button
              onClick={onOpenQuote}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d8b96d] to-[#9e7c33] text-stone-950 font-bold text-xs sm:text-sm shadow-xl flex items-center gap-2 shrink-0 transition-all hover:brightness-110 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <Utensils className="w-4 h-4 text-stone-950" />
              <span>Reservar Mi Fecha</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
