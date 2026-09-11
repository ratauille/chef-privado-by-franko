import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Utensils, Clock, Sparkles, Check, ChevronRight, ArrowRight } from 'lucide-react';

interface ExperiencesProps {
  onOpenQuote?: () => void;
  isFullView?: boolean;
}

export interface MenuItem {
  id: string;
  category: 'alta-cocina' | 'contemporanea' | 'degustacion' | 'bodas';
  badge: string;
  title: string;
  subtitle: string;
  image: string;
  duration: string;
  courses: string;
  description: string;
  highlights: string[];
  priceRange: string;
}

const MENU_ITEMS: MenuItem[] = [
  {
    id: 'creme-brulee-cangrejo',
    category: 'alta-cocina',
    badge: 'Firma Chef Franko',
    title: 'Crème Brûlée de Cangrejo Real',
    subtitle: 'Con Anís Estrellado & Muselina de Hinojo Ahumado',
    image: '/assets/creme_brulee_cangrejo_real.png',
    duration: '3.5 Horas',
    courses: '6 Tiempos',
    description: 'Platillo insignia galardonado: Crème Brûlée salada de cangrejo real infusionada con anís estrellado, muselina de hinojo y hinojo ahumado, servida sobre láminas de papa gourmet bajo campana cloche de cristal.',
    highlights: [
      'Presentación espectacular en mesa con humo aromático bajo cloche de cristal',
      'Maridaje recomendado con Vino Blanco Chardonnay de reserva o Champagne',
    ],
    priceRange: '$2,400 - $3,800 MXN',
  },
  {
    id: 'belli-cebolla-tatemada',
    category: 'contemporanea',
    badge: 'Popular Puerto Vallarta',
    title: 'Belli con Puré de Cebolla Tatemada',
    subtitle: 'Mousse de Aguacate, Pico de Gallo & Chifles',
    image: '/assets/belli_pure_cebolla_tatemada.png',
    duration: '3.5 Horas',
    courses: '5 Tiempos',
    description: 'Jugoso corte Belli glaseado con reducción artesanal, servido con puntos de mousse de aguacate, puré cremoso de cebolla tatemada, zanahoria baby rostizada al carbón y vasito shot de pico de gallo con crujientes chifles de plátano macho.',
    highlights: [
      'Cocción lenta a temperatura controlada para una textura incomparablemente tierna',
      'Contraste único entre notas ahumadas tatemadas y frescura tropical',
    ],
    priceRange: '$2,200 - $3,500 MXN',
  },
  {
    id: 'degustacion-5-tiempos',
    category: 'degustacion',
    badge: 'Experiencia Exclusiva VIP',
    title: 'Cena Degustación de Autor 5 Tiempos',
    subtitle: 'Coral Tuile de Sepia, Cherry Confitado & Albahaca',
    image: '/assets/cena_degustacion_5_tiempos.png',
    duration: '4 Horas',
    courses: '5 Tiempos',
    description: 'Cada plato cuenta una historia, cada bocado crea un recuerdo. Menú degustación de vanguardia servido en vajilla de cerámica negra con crujiente coral tuile de tinta de sepia, tomates cherry confitados y emulsiones suaves.',
    highlights: [
      'Narración en mesa de la historia culinaria detrás de cada tiempo por Chef Franko',
      'Maridaje exclusivo con etiquetas de vino mexicanas e internacionales',
    ],
    priceRange: '$2,500 - $4,000 MXN',
  },
  {
    id: 'banquete-sunset-gala',
    category: 'bodas',
    badge: 'Villas & Terrazas',
    title: 'Banquete Sunset & Gala frente al Mar',
    subtitle: 'Servicio de Lujo para Bodas Íntimas y Celebraciones VIP',
    image: '/assets/banquete_gala_frente_al_mar.jpg',
    duration: '5 Horas',
    courses: '5 Tiempos',
    description: 'Transforma tu terraza, villa o playa privada en un restaurante estelar. Iluminación cálida con velas, vajilla fina, cristalería de lujo y servicio impecable de meseros y sommelier al atardecer en Puerto Vallarta y Riviera Nayarit.',
    highlights: [
      'Diseño de menú personalizado según tus gustos y necesidades dietéticas',
      'Prueba de menú previa y montaje completo de cristalería y vajilla',
    ],
    priceRange: '$2,800 - $4,500 MXN',
  },
];

export const Experiences: React.FC<ExperiencesProps> = ({ onOpenQuote, isFullView = false }) => {
  const [activeTab, setActiveTab] = useState<string>('todos');

  const filteredItems = activeTab === 'todos' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeTab);

  return (
    <section id="experiencias" className="py-24 bg-[#0d0d0d] text-stone-100 border-b border-stone-800/80 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(197,160,89,0.08),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto space-y-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181715] border border-[#c5a059]/40 text-[#d8b96d] text-xs font-semibold uppercase tracking-[0.2em]">
            <Utensils className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>Colección Gastronómica de Autor</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white">
            Experiencias & <span className="italic text-[#d8b96d]">Menús Diseñados a Medida</span>
          </h2>

          <p className="text-stone-400 text-base sm:text-lg font-light leading-relaxed">
            Propuestas gastronómicas concebidas para tu villa, residencia privada o boda íntima en Puerto Vallarta, Punta Mita y Sayulita.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'todos', label: 'Todos los Menús' },
            { id: 'alta-cocina', label: 'Alta Cocina de Autor' },
            { id: 'contemporanea', label: 'Cocina Contemporánea' },
            { id: 'degustacion', label: 'Cena Degustación VIP' },
            { id: 'bodas', label: 'Bodas & Galas' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#c5a059] text-stone-950 font-bold shadow-lg scale-105'
                  : 'bg-[#181715] text-stone-400 border border-stone-800 hover:text-white hover:border-stone-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              className="bg-[#141312] rounded-3xl border border-stone-800/90 hover:border-[#c5a059]/50 transition-all duration-500 overflow-hidden flex flex-col group shadow-xl"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141312] via-transparent to-transparent"></div>

                <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-stone-950/90 border border-[#c5a059]/40 text-[#d8b96d] font-semibold text-xs shadow-md">
                  {item.badge}
                </span>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-stone-200">
                  <span className="flex items-center gap-1.5 bg-stone-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-stone-800 shadow-sm font-semibold">
                    <Clock className="w-3.5 h-3.5 text-[#c5a059]" />
                    {item.duration}
                  </span>
                  <span className="flex items-center gap-1.5 bg-stone-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-stone-800 shadow-sm font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                    {item.courses}
                  </span>
                </div>
              </div>

              <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-[#c5a059] text-xs font-mono uppercase tracking-widest font-semibold block mb-1">
                    {item.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-light text-white">
                    {item.title}
                  </h3>
                  <p className="text-stone-400 text-sm mt-3 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-stone-800/80">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-stone-300">
                      <Check className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-stone-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase tracking-widest block font-mono">
                      Estimado por comensal
                    </span>
                    <span className="font-serif text-xl font-semibold text-[#d8b96d]">
                      {item.priceRange}
                    </span>
                  </div>

                  <a
                    href="/reservar"
                    onClick={(e) => {
                      if (onOpenQuote) {
                        e.preventDefault();
                        onOpenQuote();
                      }
                    }}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d8b96d] to-[#9e7c33] text-stone-950 font-bold text-xs shadow-md transition-all hover:brightness-110 flex items-center gap-1.5"
                  >
                    <span>Cotizar Experiencia</span>
                    <ChevronRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {!isFullView && (
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <a
              href="/experiencias"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-stone-900 border border-stone-700 text-stone-200 hover:text-white text-xs font-semibold transition-colors"
            >
              <span>Explorar Todas las Experiencias</span>
              <ArrowRight className="w-4 h-4 text-[#c5a059]" />
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
};
