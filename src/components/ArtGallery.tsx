import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Camera, Sparkles, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../lib/i18n';
import { useFocusTrap } from '../hooks/useFocusTrap';

interface ArtGalleryProps {
  onOpenQuote?: () => void;
  isFullView?: boolean;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  titleEn: string;
  titleEs: string;
  subtitleEn: string;
  subtitleEs: string;
  category: 'platos' | 'tecnica' | 'brigada' | 'eventos';
  aspect?: string;
  width: number;
  height: number;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: '1',
    src: '/assets/IMG_1937.webp',
    alt: 'Private dining experience prepared by Chef Franko with plated lamb and fish',
    titleEn: 'The Landscape Plate',
    titleEs: 'El Plato como Paisaje',
    subtitleEn: 'Author composition with heritage proteins and delicate emulsions',
    subtitleEs: 'Composición de autor con proteínas de origen y emulsiones',
    category: 'platos',
    aspect: 'md:col-span-2 md:row-span-2',
    width: 1200,
    height: 900,
  },
  {
    id: '2',
    src: '/assets/IMG_1389.webp',
    alt: 'Glazed roasted meat with vegetable purees and edible flowers on a white plate',
    titleEn: 'Product, Technique & Color',
    titleEs: 'Producto, Técnica & Color',
    subtitleEn: 'Glazed tenderloin and seasonal microgreens',
    subtitleEs: 'Corte de carne magra glaseada y brotes de temporada',
    category: 'platos',
    width: 800,
    height: 600,
  },
  {
    id: '3',
    src: '/assets/IMG_0305.JPG',
    alt: 'Chef Franko carefully plating a dish in a professional kitchen',
    titleEn: 'Chef Franko in Action',
    titleEs: 'Chef Franko en Acción',
    subtitleEn: 'Artisanal focus on every plated detail',
    subtitleEs: 'Enfoque artesanal en cada detalle del montaje',
    category: 'brigada',
    width: 800,
    height: 600,
  },
  {
    id: '4',
    src: '/assets/IMG_1823.webp',
    alt: 'Elegant table setting prepared for a private villa dinner',
    titleEn: 'The Ritual of Table Hospitality',
    titleEs: 'El Ritual del Servicio',
    subtitleEn: 'Full table setting with fine china and crystal stemware',
    subtitleEs: 'Servicio de mesa con vajilla fina y cristalería de gala',
    category: 'eventos',
    width: 800,
    height: 600,
  },
  {
    id: '5',
    src: '/assets/IMG_1767.webp',
    alt: 'Seasonal plated dish decorated with peas, edible flowers and delicate foam',
    titleEn: 'A Story in Every Course',
    titleEs: 'Una Historia en Cada Tiempo',
    subtitleEn: 'Crisp textures, floral accents and delicate ocean foam',
    subtitleEs: 'Texturas crocantes y espumas delicadas',
    category: 'platos',
    aspect: 'md:col-span-2',
    width: 1200,
    height: 600,
  },
  {
    id: '6',
    src: '/assets/IMG_8021.webp',
    alt: 'Artistic dessert presented inside a blown sugar sphere',
    titleEn: 'Moments of Wonder',
    titleEs: 'El Momento de Asombro',
    subtitleEn: 'Avant-garde pastry artistry and blown sugar dome',
    subtitleEs: 'Pastelería de autor y vanguardia',
    category: 'platos',
    width: 800,
    height: 600,
  },
  {
    id: '7',
    src: '/assets/IMG_0488.JPG',
    alt: 'Chef preparing fresh Pacific seafood with precise cutting technique',
    titleEn: 'Culinary Precision',
    titleEs: 'Precisión Culinaria',
    subtitleEn: 'Daily hand-selection of fresh Pacific seafood catch',
    subtitleEs: 'Selección rigurosa de producto fresco del Pacífico',
    category: 'tecnica',
    width: 800,
    height: 600,
  },
  {
    id: '8',
    src: '/assets/IMG_0489.JPG',
    alt: 'Close-up of a plated dish finished with organic microgreens',
    titleEn: 'Microgreens & Equilibrium',
    titleEs: 'Microgreens & Equilibrio',
    subtitleEn: 'Harmonious balance between texture, acidity and aesthetics',
    subtitleEs: 'Armonía entre textura, acidez y estética',
    category: 'tecnica',
    width: 800,
    height: 600,
  },
  {
    id: '9',
    src: '/assets/IMG_0493.webp',
    alt: 'Chef carefully arranging sauces and modern culinary garnishes on a plate',
    titleEn: 'Geometry of Flavor',
    titleEs: 'Geometría del Sabor',
    subtitleEn: 'Handmade slow reductions and molecular flavor accents',
    subtitleEs: 'Reducciones artesanales y concentrados',
    category: 'tecnica',
    width: 800,
    height: 600,
  },
  {
    id: '10',
    src: '/assets/IMG_0495.webp',
    alt: 'Chef searing ingredients in a hot pan over open flame',
    titleEn: 'Fire & Searing Technique',
    titleEs: 'Fuego & Temperatura',
    subtitleEn: 'High-temperature pan sear to lock in natural juices',
    subtitleEs: 'Sellado a alta temperatura para retener jugosidad',
    category: 'tecnica',
    width: 800,
    height: 600,
  },
  {
    id: '12',
    src: '/assets/private_chef_flatlay.jpg',
    alt: 'Overhead view of a curated private dining table with plated dishes',
    titleEn: 'Complete Dining Experience',
    titleEs: 'Experiencia Culinaria Completa',
    subtitleEn: 'From curated market ingredients to effortless hosting',
    subtitleEs: 'De la selección de ingredientes hasta la sobremesa',
    category: 'eventos',
    width: 800,
    height: 600,
  },
  {
    id: '13',
    src: '/assets/img_0849.webp',
    alt: 'Seared seafood plated with citrus puree, vanilla and a delicate sauce',
    titleEn: 'Citrus & Sea',
    titleEs: 'Cítricos y Mar',
    subtitleEn: 'A refined seafood composition with bright tropical notes',
    subtitleEs: 'Composición marina con notas tropicales y brillantes',
    category: 'platos',
    width: 683,
    height: 1024,
  },
  {
    id: '14',
    src: '/assets/dessert_mint_sphere.jpg',
    alt: 'Mint ice cream sphere with delicate dessert garnishes and fresh herbs',
    titleEn: 'Mint Garden',
    titleEs: 'Jardín de Menta',
    subtitleEn: 'Fresh herbs, color and delicate pastry textures',
    subtitleEs: 'Hierbas frescas, color y texturas de pastelería',
    category: 'platos',
    width: 1024,
    height: 683,
  },
  {
    id: '15',
    src: '/assets/dessert_chocolate_cone.jpg',
    alt: 'Modern dessert with a chocolate cone, fruit and crisp garnishes',
    titleEn: 'Cacao & Texture',
    titleEs: 'Cacao y Textura',
    subtitleEn: 'Playful pastry architecture with seasonal fruit accents',
    subtitleEs: 'Arquitectura de pastelería con fruta de temporada',
    category: 'platos',
    width: 1024,
    height: 683,
  },
  {
    id: '16',
    src: '/assets/postre_patrio.webp',
    alt: 'Mexican-inspired signature dessert by Chef Franko with cream, berries and herbs',
    titleEn: 'Seasonal Celebration',
    titleEs: 'Celebración de Temporada',
    subtitleEn: 'A playful composition inspired by Mexican ingredients and color',
    subtitleEs: 'Composición inspirada en ingredientes y colores mexicanos',
    category: 'platos',
    width: 683,
    height: 1024,
  },
  {
    id: '17',
    src: '/assets/paleta_de_chivo.webp',
    alt: 'Roasted goat shoulder prepared by Chef Franko with seasonal garnish',
    titleEn: 'Slow-Roasted Goat',
    titleEs: 'Paleta de Chivo',
    subtitleEn: 'Slow cooking, depth of flavor and precise presentation',
    subtitleEs: 'Cocción lenta, profundidad de sabor y precisión',
    category: 'platos',
    width: 683,
    height: 1024,
  },
];

export const ArtGallery: React.FC<ArtGalleryProps> = ({ onOpenQuote, isFullView = false }) => {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { t, lang } = useLanguage();
  const lightboxRef = useFocusTrap({ isOpen: selectedIndex !== null, onClose: () => setSelectedIndex(null) });

  const filteredItems =
    activeCategory === 'todos'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  const displayedItems = isFullView ? filteredItems : filteredItems.slice(0, 8);

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
    <section
      id="galeria"
      className={`relative overflow-hidden bg-[#0a0a0a] py-24 text-white sm:py-32 border-b border-stone-800/80 ${
        isFullView ? 'min-h-[85vh]' : ''
      }`}
    >
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
            <span>{t.gallery.badge}</span>
          </div>

          <h1 className="font-serif text-4xl font-light leading-tight sm:text-5xl lg:text-6xl text-white">
            {t.gallery.title1} <span className="italic text-[#d8b96d]">{t.gallery.title2}</span>
          </h1>

          <p className="mt-4 text-base leading-relaxed text-stone-400 sm:text-lg font-light">
            {t.gallery.subtitle}
          </p>
        </motion.div>

        {/* Category Filters */}
        <h2 className="sr-only">{lang === 'es' ? 'Categorías de la Galería' : 'Gallery Categories'}</h2>
        <div className="mb-10 flex flex-wrap items-center justify-center md:justify-start gap-2">
          {[
            { id: 'todos', label: t.gallery.categories.todos },
            { id: 'platos', label: t.gallery.categories.platos },
            { id: 'tecnica', label: t.gallery.categories.tecnica },
            { id: 'brigada', label: t.gallery.categories.brigada },
            { id: 'eventos', label: t.gallery.categories.eventos },
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
          {displayedItems.map((item, index) => {
            const itemTitle = lang === 'es' ? item.titleEs : item.titleEn;
            const itemSubtitle = lang === 'es' ? item.subtitleEs : item.subtitleEn;

            return (
              <motion.div
                key={item.id}
                className={`group relative overflow-hidden rounded-2xl border border-stone-800/90 bg-[#121110] ${
                  item.aspect || ''
                }`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
              >
                <button
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`${itemTitle} - ${itemSubtitle}. ${lang === 'es' ? 'Abrir imagen ampliada' : 'Open enlarged view'}`}
                  className="w-full h-full text-left relative block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c5a059] rounded-2xl overflow-hidden"
                >
                  <figure className="h-full w-full">
                    <img
                      src={item.src}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105 group-hover:brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95" />

                    <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                      <div>
                        <span className="text-[11px] font-mono text-[#c5a059] uppercase tracking-wider block">
                          {itemSubtitle}
                        </span>
                        <h2 className="font-serif text-lg sm:text-xl text-white font-medium">{itemTitle}</h2>
                      </div>
                      <div className="p-2 rounded-lg bg-[#1a1917] border border-[#c5a059]/40 text-[#d8b96d] shrink-0 group-hover:bg-[#c5a059] group-hover:text-stone-950 transition-colors">
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                    </figcaption>
                  </figure>
                </button>
              </motion.div>
            );
          })}
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
              <span>
                {lang === 'es'
                  ? 'Tu residencia o villa puede ser nuestra próxima experiencia gastronómica.'
                  : 'Your private villa can be the setting for our next bespoke tasting experience.'}
              </span>
            </p>
            <div className="flex items-center gap-4">
              <a
                href="/galeria"
                className="px-5 py-3 rounded-xl bg-stone-900 border border-stone-700 text-stone-200 hover:text-white text-xs font-semibold transition-colors"
              >
                {lang === 'es'
                  ? `Ver Galería Completa (${GALLERY_ITEMS.length} fotos)`
                  : `View Full Gallery (${GALLERY_ITEMS.length} photos)`}
              </a>
              {onOpenQuote && (
                <button
                  onClick={onOpenQuote}
                  className="rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d8b96d] to-[#9e7c33] px-6 py-3 text-xs font-bold text-stone-950 transition hover:brightness-110 shadow-lg active:scale-95"
                >
                  {t.gallery.cta}
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
            ref={lightboxRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-item-title"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md outline-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              onClick={() => setSelectedIndex(null)}
              aria-label={lang === 'es' ? 'Cerrar ventana emergente' : 'Close image dialog'}
              className="absolute top-6 right-6 z-10 p-3 rounded-full bg-stone-900/90 text-stone-300 hover:text-white border border-stone-700 hover:border-[#c5a059] transition-colors focus-visible:ring-2 focus-visible:ring-[#c5a059]"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={handlePrev}
              aria-label={lang === 'es' ? 'Imagen anterior' : 'Previous image'}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-stone-900/90 text-stone-300 hover:text-white border border-stone-700 hover:border-[#c5a059] transition-colors focus-visible:ring-2 focus-visible:ring-[#c5a059]"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label={lang === 'es' ? 'Siguiente imagen' : 'Next image'}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-stone-900/90 text-stone-300 hover:text-white border border-stone-700 hover:border-[#c5a059] transition-colors focus-visible:ring-2 focus-visible:ring-[#c5a059]"
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
                  <h2 id="lightbox-item-title" className="font-serif text-2xl font-bold text-white mb-2">
                    {lang === 'es'
                      ? displayedItems[selectedIndex].titleEs
                      : displayedItems[selectedIndex].titleEn}
                  </h2>
                  <p className="text-stone-400 text-sm font-light leading-relaxed">
                    {lang === 'es'
                      ? displayedItems[selectedIndex].subtitleEs
                      : displayedItems[selectedIndex].subtitleEn}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone-800 flex items-center justify-between">
                  <span className="text-xs text-stone-500 font-mono">
                    {selectedIndex + 1} / {displayedItems.length}
                  </span>
                  {onOpenQuote && (
                    <button
                      onClick={() => {
                        setSelectedIndex(null);
                        onOpenQuote();
                      }}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#c5a059] to-[#9e7c33] text-stone-950 font-bold text-xs shadow-md active:scale-95"
                    >
                      {t.gallery.cta}
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
