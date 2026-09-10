import React, { useState } from 'react';
import { Utensils, Clock, Sparkles, Check, ChevronRight } from 'lucide-react';

interface ExperiencesProps {
  onOpenQuote: () => void;
}

interface MenuItem {
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
    badge: 'Experiencia Exclusiva',
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

export const Experiences: React.FC<ExperiencesProps> = ({ onOpenQuote }) => {
  const [activeTab, setActiveTab] = useState<string>('todos');

  const filteredItems = activeTab === 'todos' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeTab);

  return (
    <section id="experiencias" className="py-20 bg-white text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-300 text-[#8c6a24] text-xs font-semibold uppercase tracking-wider">
            <Utensils className="w-3.5 h-3.5" />
            <span>Colección Gastronómica</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900">
            Experiencias & Menús de Autor
          </h2>

          <p className="text-stone-600 text-base sm:text-lg font-light">
            Diseñados a la medida para tu villa, boda íntima o celebración especial en Puerto Vallarta, Punta Mita y Sayulita.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'todos', label: 'Todos' },
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
                  ? 'bg-black text-white font-semibold shadow-md'
                  : 'bg-white text-stone-600 border border-stone-200 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-stone-200 hover:border-stone-400 transition-all overflow-hidden flex flex-col group shadow-lg"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/85 via-white/15 to-transparent"></div>

                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black text-white font-bold text-xs shadow-md">
                  {item.badge}
                </span>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-stone-900">
                  <span className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-stone-200 shadow-sm font-semibold">
                    <Clock className="w-3.5 h-3.5 text-[#8c6a24]" />
                    {item.duration}
                  </span>
                  <span className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg border border-stone-200 shadow-sm font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-[#8c6a24]" />
                    {item.courses}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[#8c6a24] text-xs font-mono uppercase tracking-wider font-semibold">
                    {item.subtitle}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-stone-900 mt-1">
                    {item.title}
                  </h3>
                  <p className="text-stone-600 text-sm mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-stone-200">
                  {item.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-stone-700">
                      <Check className="w-4 h-4 text-[#8c6a24] shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-stone-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase tracking-widest block font-mono">
                      Estimado por comensal
                    </span>
                    <span className="font-serif text-lg font-bold text-[#8c6a24]">
                      {item.priceRange}
                    </span>
                  </div>

                  <button
                    onClick={onOpenQuote}
                    className="px-4 py-2 rounded-xl bg-black hover:bg-stone-800 text-white font-bold text-xs transition-colors flex items-center gap-1 shadow-sm"
                  >
                    <span>Cotizar</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
