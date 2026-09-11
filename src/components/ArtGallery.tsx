import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Camera, Sparkles, X, ChevronLeft, ChevronRight, Filter } from 'lucide-react';

interface ArtGalleryProps {
  onOpenQuote?: () => void;
  isFullView?: boolean;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  category: 'platos' | 'tecnica' | 'brigada' | 'eventos';
  aspect?: string;
  width: number;
  height: number;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    src: '/assets/IMG_1937.jpg',
    alt: 'Pescado de autor y cordero emplatados para servicio de gala',
    title: 'El Plato como Paisaje',
    subtitle: 'Composición de autor con proteínas de origen y emulsiones',
    category: 'platos',
    aspect: 'md:col-span-2 md:row-span-2',
    width: 1200,
    height: 900,
  },
  {
    id: '2',
    src: '/assets/IMG_1389.jpg',
    alt: 'Corte de carne de autor con vegetales y flores comestibles',
    title: 'Producto, Técnica & Color',
    subtitle: 'Corte de carne magra glaseada y brotes de temporada',
    category: 'platos',
    width: 800,
    height: 600,
  },
  {
    id: '3',
    src: '/assets/IMG_0305.JPG',
    alt: 'Chef Franko en cocina trabajando con precisión',
    title: 'Chef Franko en Acción',
    subtitle: 'Enfoque artesanal en cada detalle del montaje',
    category: 'brigada',
    width: 800,
    height: 600,
  },
  {
    id: '4',
    src: '/assets/IMG_1823.jpg',
    alt: 'Montaje de mesa y servicio de gala en villa privada',
    title: 'El Ritual del Servicio',
    subtitle: 'Servicio de mesa con vajilla fina y cristalería de gala',
    category: 'eventos',
    width: 800,
    height: 600,
  },
  {
    id: '5',
    src: '/assets/IMG_1767.jpg',
    alt: 'Plato de temporada con chícharos, flores y espuma marina',
    title: 'Una Historia en Cada Tiempo',
    subtitle: 'Texturas crocantes y espumas delicadas',
    category: 'platos',
    aspect: 'md:col-span-2',
    width: 1200,
    height: 600,
  },
  {
    id: '6',
    src: '/assets/IMG_8021.jpg',
    alt: 'Postre de autor dentro de esfera de azúcar soplada',
    title: 'El Momento de Asombro',
    subtitle: 'Pastelería de autor y vanguardia',
    category: 'platos',
    width: 800,
    height: 600,
  },
  {
    id: '7',
    src: '/assets/IMG_0488.JPG',
    alt: 'Técnica de corte y preparación de mariscos frescos',
    title: 'Precisión Culinaria',
    subtitle: 'Selección rigurosa de producto fresco del Pacífico',
    category: 'tecnica',
    width: 800,
    height: 600,
  },
  {
    id: '8',
    src: '/assets/IMG_0489.JPG',
    alt: 'Detalle de composición de platillo con brotes orgánicos',
    title: 'Microgreens & Equilibrio',
    subtitle: 'Armonía entre textura, acidez y estética',
    category: 'tecnica',
    width: 800,
    height: 600,
  },
  {
    id: '9',
    src: '/assets/IMG_0493.JPG',
    alt: 'Emplatado meticuloso de salsas y esferificaciones',
    title: 'Geometría del Sabor',
    subtitle: 'Reducciones artesanales y concentrados',
    category: 'tecnica',
    width: 800,
    height: 600,
  },
  {
    id: '10',
    src: '/assets/IMG_0495.JPG',
    alt: 'Sartenado a fuego vivo y técica de dorados',
    title: 'Fuego & Temperatura',
    subtitle: 'Sellado a alta temperatura para retener jugosidad',
    category: 'tecnica',
    width: 800,
    height: 600,
  },
  {
    id: '11',
    src: '/assets/chef_franko_brigada.jpg',
    alt: 'Chef Franko Salgado y su brigada de alta cocina',
    title: 'Brigada de Élite',
    subtitle: 'Profesionalismo y disciplina en tu residencia',
    category: 'brigada',
    width: 800,
    height: 600,
  },
  {
    id: '12',
    src: '/assets/private_chef_flatlay.jpg',
    alt: 'Vista aérea de banquete privado de autor',
    title: 'Experiencia Culinaria Completa',
    subtitle: 'De la selección de ingredientes hasta la sobremesa',
    category: 'eventos',
    width: 800,
    height: 600,
  },
];

export const ArtGallery: React.FC<ArtGalleryProps> = ({ onOpenQuote, isFullView = false }) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredItems = activeCategory === 'todos'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  const displayedItems = isFullView ? filteredItems : filteredItems.slice(0, 6);

  const handleNext = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % displayedItems.length);
    }
  }, [selectedIndex, displayedItems.length]);

  const handlePrev = useCallback(() => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + displayedItems.length) % displayedItems.length);
    }
  }, [selectedIndex, displayedItems.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === 'Escape') setSelectedIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  return (
    <section id="galeria" className="relative overflow-hidden bg-[#0a0a0a] py-24 text-white sm:py-32 border-b border-stone-800/80">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(197,160,89,0.12),transparent_32%),radial-gradient(circle_at_90%_85%,rgba(255,255,255,0.03),transparent_30%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 text-center md:text-left max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c5a059]/40 bg-[#161513] px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#d8b96d]">
            <Camera className="h-3.5 w-3.5 text-[#c5a059]" />
            <span>Galería & Alta Cocina</span>
          </div>

          <h2 className="font-serif text-4xl font-light leading-tight sm:text-5xl lg:text-6xl text-white">
            El Arte Gastronómico de <span className="italic text-[#d8b96d]">Franko Salgado</span>
          </h2>

          <p className="mt-4 text-base leading-relaxed text-stone-400 sm:text-lg font-light">
            Explora la estética, los ingredientes frescos y la precisión técnica detrás de cada experiencia en Puerto Vallarta y Riviera Nayarit.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="mb-10 flex flex-wrap items-center justify-center md:justify-start gap-2">
          {[
            { id: 'todos', label: 'Todos' },
            { id: 'platos', label: 'Platos de Autor' },
            { id: 'tecnica', label: 'Técnica & Detalle' },
            { id: 'brigada', label: 'Chef & Brigada' },
            { id: 'eventos', label: 'Servicio & Galas' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveCategory(tab.id);
                setSelectedIndex(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                activeCategory === tab.id
                  ? 'bg-[#c5a059] text-stone-950 font-bold shadow-lg scale-105'
                  : 'bg-[#181715] text-stone-400 border border-stone-800 hover:text-white hover:border-stone-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid auto-rows-[240px] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[220px] md:grid-cols-4">
          {displayedItems.map((item, index) => (
            <motion.figure
              key={item.id}
              onClick={() => setSelectedIndex(index)}
              className={`group relative overflow-hidden rounded-2xl border border-stone-800/90 bg-[#121110] cursor-pointer ${item.aspect || ''}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.01 }}
            >
              <img
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                loading={index > 2 ? 'lazy' : 'eager'}
                className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105 group-hover:brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />

              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                <div>
                  <span className="text-[11px] font-mono text-[#c5a059] uppercase tracking-wider block">
                    {item.subtitle}
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl text-white font-medium">
                    {item.title}
                  </h3>
                </div>
                <div className="p-2 rounded-lg bg-[#1a1917] border border-[#c5a059]/40 text-[#d8b96d] shrink-0 group-hover:bg-[#c5a059] group-hover:text-stone-950 transition-colors">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>

        {/* Action Bar */}
        {!isFullView && (
          <motion.div
            className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-stone-800/80 pt-8 sm:flex-row"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="flex items-center gap-2 text-sm text-stone-400">
              <Sparkles className="h-4 w-4 text-[#c5a059]" />
              <span>Tu residencia o villa puede ser nuestra próxima experiencia gastronómica.</span>
            </p>
            <div className="flex items-center gap-4">
              <a
                href="/galeria"
                className="px-5 py-3 rounded-xl bg-stone-900 border border-stone-700 text-stone-200 hover:text-white text-xs font-semibold transition-colors"
              >
                Ver Galería Completa ({GALLERY_ITEMS.length} fotos)
              </a>
              {onOpenQuote && (
                <button
                  onClick={onOpenQuote}
                  className="rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d8b96d] to-[#9e7c33] px-6 py-3 text-xs font-bold text-stone-950 transition hover:brightness-110 shadow-lg"
                >
                  Diseñar Mi Experiencia
                </button>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Accessible Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && displayedItems[selectedIndex] && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Detalle de la imagen: ${displayedItems[selectedIndex].title}`}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setSelectedIndex(null)}
              aria-label="Cerrar ventana emergente"
              className="absolute top-6 right-6 z-10 p-3 rounded-full bg-stone-900/90 text-stone-300 hover:text-white border border-stone-700 hover:border-[#c5a059] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={handlePrev}
              aria-label="Imagen anterior"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-stone-900/90 text-stone-300 hover:text-white border border-stone-700 hover:border-[#c5a059] transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Siguiente imagen"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-stone-900/90 text-stone-300 hover:text-white border border-stone-700 hover:border-[#c5a059] transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.div
              key={displayedItems[selectedIndex].id}
              className="max-w-4xl w-full bg-[#141312] border border-stone-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="md:w-2/3 bg-black flex items-center justify-center relative max-h-[70vh]">
                <img
                  src={displayedItems[selectedIndex].src}
                  alt={displayedItems[selectedIndex].alt}
                  className="max-h-[70vh] w-full object-contain"
                />
              </div>

              <div className="md:w-1/3 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#c5a059] block mb-1">
                    {displayedItems[selectedIndex].category}
                  </span>
                  <h3 className="font-serif text-2xl font-bold text-white mb-2">
                    {displayedItems[selectedIndex].title}
                  </h3>
                  <p className="text-stone-400 text-sm font-light leading-relaxed">
                    {displayedItems[selectedIndex].subtitle}
                  </p>
                  <p className="text-stone-500 text-xs mt-4 pt-4 border-t border-stone-800">
                    {displayedItems[selectedIndex].alt}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                  <span className="text-xs text-stone-500 font-mono">
                    {selectedIndex + 1} de {displayedItems.length}
                  </span>
                  {onOpenQuote && (
                    <button
                      onClick={() => {
                        setSelectedIndex(null);
                        onOpenQuote();
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#9e7c33] text-stone-950 font-bold text-xs shadow-md"
                    >
                      Cotizar Evento
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
