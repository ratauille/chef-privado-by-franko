import React from 'react';
import { Star } from 'lucide-react';

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
    <section id="testimonios" className="py-20 bg-stone-50 text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
        <div className="max-w-2xl mx-auto space-y-3">
          <span className="text-[#8c6a24] text-xs font-mono uppercase tracking-widest font-semibold">
            Reseñas Verificadas
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Lo que dicen nuestros comensales
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {reviews.map((r, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-stone-200 space-y-4 shadow-md">
              <div className="flex items-center gap-1 text-[#8c6a24]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#8c6a24]" />
                ))}
              </div>
              <p className="text-stone-600 text-sm italic leading-relaxed">
                "{r.comment}"
              </p>
              <div className="pt-2 border-t border-stone-100">
                <h5 className="font-bold text-sm text-stone-900">{r.name}</h5>
                <p className="text-xs text-stone-400 font-mono mt-0.5">{r.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
