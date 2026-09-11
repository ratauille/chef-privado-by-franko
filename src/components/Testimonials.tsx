import React from 'react';
import { motion } from 'motion/react';
import { Star, MessageSquare } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Sarah & Michael T.',
      location: 'Punta Mita Villa, PV',
      comment: 'Celebrar nuestro 10º aniversario con la cena de 6 tiempos del Chef Franko fue la mejor decisión de nuestras vacaciones. El Crème Brûlée de Cangrejo Real es inolvidable.',
    },
    {
      name: 'Carlos Mendoza',
      location: 'Evento Corporativo VIP, Sayulita',
      comment: 'Impecable nivel de servicio. Desde el maridaje de vinos hasta la presentación con cloche de cristal. Dejó a nuestros inversionistas encantados.',
    },
    {
      name: 'Elena & David Harrison',
      location: 'Boda Íntima frente al Mar, Riviera Nayarit',
      comment: 'Franko y su brigada hicieron que nuestra boda fuera mágica. La atención al detalle, los sabores y la limpieza final de la cocina superaron todas nuestras expectativas.',
    },
  ];

  return (
    <section id="testimonios" className="py-24 bg-[#0d0d0d] text-stone-100 border-b border-stone-800/80 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(197,160,89,0.08),transparent_40%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center relative z-10">
        <motion.div
          className="max-w-2xl mx-auto space-y-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181715] border border-[#c5a059]/40 text-[#d8b96d] text-xs font-semibold uppercase tracking-[0.2em]">
            <MessageSquare className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Reseñas de Comensales</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white">
            Historias & <span className="italic text-[#d8b96d]">Testimonios Reales</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {reviews.map((r, idx) => (
            <motion.div
              key={idx}
              className="p-8 rounded-3xl bg-[#141312] border border-stone-800 space-y-4 shadow-xl hover:border-[#c5a059]/40 transition-colors"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="flex items-center gap-1 text-[#c5a059]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#c5a059]" />
                ))}
              </div>

              <p className="text-stone-300 text-sm font-light leading-relaxed italic">
                "{r.comment}"
              </p>

              <div className="pt-4 border-t border-stone-800/80">
                <h3 className="font-serif font-bold text-base text-white">{r.name}</h3>
                <p className="text-xs text-stone-500 font-mono mt-0.5">{r.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
