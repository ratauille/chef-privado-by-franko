import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Award, Utensils, Sparkles } from 'lucide-react';
import { useLanguage } from '../lib/i18n';

interface ChefBioProps {
  onOpenQuote?: () => void;
  isFullView?: boolean;
}

export const ChefBio: React.FC<ChefBioProps> = ({ onOpenQuote, isFullView }) => {
  const { t, lang } = useLanguage();

  return (
    <section
      id="chef-franko"
      className={`py-24 bg-[#0a0a0a] text-stone-100 border-b border-stone-800/80 ${isFullView ? 'min-h-[85vh]' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Photo Container */}
        <motion.div
          className="lg:col-span-5 relative"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative rounded-3xl overflow-hidden border border-stone-800 shadow-2xl">
            <img
              src="/assets/chef_franko_brigada.jpg"
              alt="Chef Franko Salgado"
              loading="lazy"
              className="w-full h-[520px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#141312]/90 border border-stone-800 backdrop-blur-md">
              <p className="font-serif text-lg text-white font-light">Chef Franko Salgado</p>
              <p className="text-[11px] text-[#c5a059] font-mono uppercase tracking-widest">
                Le Cordon Bleu · Four Seasons Ex-Executive
              </p>
            </div>
          </div>
        </motion.div>

        {/* Narrative */}
        <motion.div
          className="lg:col-span-7 space-y-6"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181715] border border-[#c5a059]/40 text-[#d8b96d] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{t.bio.badge}</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-tight">
            {t.bio.title1} <span className="italic text-[#d8b96d]">{t.bio.title2}</span>
          </h2>

          <div className="space-y-4 text-stone-300 text-base sm:text-lg leading-relaxed font-light">
            <p>{t.bio.p1}</p>
            <p className="text-stone-400">{t.bio.p2}</p>
          </div>

          {/* Key Pillars */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-stone-800/80">
            <div className="p-4 rounded-2xl bg-[#141312] border border-stone-800">
              <Award className="w-5 h-5 text-[#c5a059] mb-2" />
              <p className="text-white text-xs font-bold">{lang === 'es' ? 'Alta Cocina de Autor' : 'Michelin Pedigree'}</p>
              <p className="text-stone-500 text-[11px] mt-1">{lang === 'es' ? 'Técnica clásica & vanguardia' : 'Le Cordon Bleu legacy'}</p>
            </div>
            <div className="p-4 rounded-2xl bg-[#141312] border border-stone-800">
              <Utensils className="w-5 h-5 text-[#c5a059] mb-2" />
              <p className="text-white text-xs font-bold">{lang === 'es' ? 'Pesca del Pacífico' : 'Local Provenance'}</p>
              <p className="text-stone-500 text-[11px] mt-1">{lang === 'es' ? 'Producto 100% fresco diario' : 'Pacific catch & artisan farms'}</p>
            </div>
            <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-[#141312] border border-stone-800">
              <Sparkles className="w-5 h-5 text-[#c5a059] mb-2" />
              <p className="text-white text-xs font-bold">{lang === 'es' ? 'Discreción & Lujo' : 'Discreet Hospitality'}</p>
              <p className="text-stone-500 text-[11px] mt-1">{lang === 'es' ? 'Servicio impecable en villa' : 'Seamless villa service'}</p>
            </div>
          </div>

          {onOpenQuote && (
            <div className="pt-4">
              <button
                onClick={onOpenQuote}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d8b96d] to-[#9e7c33] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all"
              >
                <span>{t.bio.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
