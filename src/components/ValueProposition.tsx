import React from 'react';
import { motion } from 'motion/react';
import { Utensils, Sparkles, Wine, ShieldCheck, ArrowRight } from 'lucide-react';

interface ValuePropositionProps {
  onOpenQuote: () => void;
}

const pillars = [
  {
    icon: Utensils,
    title: 'Servicio de Gala en Tu Villa',
    description: 'Transformamos tu comedor o terraza privada en un restaurante estelar con vajilla fina, cristalería de lujo y atención personalizada.',
  },
  {
    icon: Sparkles,
    title: 'Alta Cocina de Autor',
    description: 'Menús diseñados exclusivamente para tus gustos, fusionando técnica francesa clásica con ingredientes frescos del Pacífico Mexicano.',
  },
  {
    icon: Wine,
    title: 'Sommelier & Maridaje',
    description: 'Selección exclusiva de vinos boutique, mezcales artesanales y coctelería de autor ideados para realzar cada tiempo.',
  },
  {
    icon: ShieldCheck,
    title: 'Garantía Limpieza Total',
    description: 'Dejamos tu cocina reluciente, impecable y sanitizada al finalizar el evento. Tú solo disfrutas con tus invitados.',
  },
];

export const ValueProposition: React.FC<ValuePropositionProps> = ({ onOpenQuote }) => {
  return (
    <section className="relative bg-[#0d0d0d] py-20 lg:py-28 border-b border-stone-800/80 text-stone-100 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(197,160,89,0.08),transparent_50%)] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181715] border border-[#c5a059]/40 text-[#d8b96d] text-xs font-semibold uppercase tracking-[0.2em]">
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>La Promesa de Excelencia</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white leading-tight">
            El Ritual de la <span className="italic text-[#d8b96d]">Alta Gastronomía</span> Privada
          </h2>

          <p className="text-stone-400 text-base sm:text-lg font-light leading-relaxed">
            Cada detalle está orquestado para brindarte a ti y a tus comensales una noche memorable en Puerto Vallarta, Punta Mita o Sayulita.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                className="group relative p-8 rounded-2xl bg-[#141312] border border-stone-800/90 hover:border-[#c5a059]/50 transition-all duration-500 shadow-xl flex flex-col justify-between"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#1f1d1a] border border-[#c5a059]/30 flex items-center justify-center text-[#d8b96d] mb-6 group-hover:scale-110 group-hover:border-[#c5a059] transition-transform duration-300">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-white mb-3 group-hover:text-[#d8b96d] transition-colors">
                    {p.title}
                  </h3>

                  <p className="text-stone-400 text-sm leading-relaxed font-light">
                    {p.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-800/60 flex items-center text-xs text-[#c5a059] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Conocer experiencia</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button
            onClick={onOpenQuote}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d8b96d] to-[#9e7c33] text-stone-950 font-bold text-sm shadow-lg hover:brightness-110 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Reservar Tu Fecha Especial</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
