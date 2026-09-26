import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../lib/i18n';

interface ExperiencesProps {
  onOpenQuote?: () => void;
  isFullView?: boolean;
}

const experienceImages = [
  '/assets/banquete_gala_frente_al_mar.jpg',
  '/assets/cena_degustacion_5_tiempos.png',
  '/assets/IMG_1937.jpg',
  '/assets/belli_pure_cebolla_tatemada.png',
  '/assets/creme_brulee_cangrejo_real.png',
  '/assets/IMG_1389.jpg',
];

export const Experiences: React.FC<ExperiencesProps> = ({ onOpenQuote, isFullView }) => {
  const { t } = useLanguage();

  return (
    <section id="experiencias" className={`py-24 bg-[#0d0d0d] text-stone-100 border-b border-stone-800/80 ${isFullView ? 'min-h-[85vh]' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181715] border border-[#c5a059]/40 text-[#d8b96d] text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{t.experiences.badge}</span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white">
            {t.experiences.title1} <span className="italic text-[#d8b96d]">{t.experiences.title2}</span>
          </h2>
          <p className="mt-4 text-stone-400 text-base sm:text-lg leading-relaxed font-light">
            {t.experiences.subtitle}
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.experiences.items.map((exp, i) => (
            <motion.article
              key={exp.title}
              className="rounded-3xl overflow-hidden bg-[#141312] border border-stone-800/90 flex flex-col hover:border-[#c5a059]/40 transition-all shadow-xl group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={experienceImages[i] || experienceImages[0]}
                  alt={exp.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141312] via-transparent to-transparent opacity-80" />
              </div>

              <div className="p-7 flex flex-col flex-1">
                <h3 className="font-serif text-2xl font-light text-white group-hover:text-[#d8b96d] transition-colors">
                  {exp.title}
                </h3>
                <p className="mt-3 text-stone-400 text-sm leading-relaxed flex-1 font-light">
                  {exp.desc}
                </p>
                <button
                  onClick={onOpenQuote}
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d8b96d] to-[#9e7c33] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 active:scale-95 transition-all"
                >
                  <span>{exp.cta}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
