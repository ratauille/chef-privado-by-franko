import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Camera, Sparkles } from 'lucide-react';

interface ArtGalleryProps {
  onOpenQuote: () => void;
}

const galleryItems = [
  {
    src: '/assets/IMG_1937.jpg',
    alt: 'Pescado de autor y cordero emplatados para un servicio de gala',
    title: 'El plato como paisaje',
    className: 'md:row-span-2',
  },
  {
    src: '/assets/IMG_1389.jpg',
    alt: 'Corte de carne de autor con vegetales y flores comestibles',
    title: 'Producto, técnica y color',
    className: '',
  },
  {
    src: '/assets/IMG_1823.jpg',
    alt: 'Chef terminando platos durante un servicio de alta cocina',
    title: 'El ritual del servicio',
    className: '',
  },
  {
    src: '/assets/IMG_1767.jpg',
    alt: 'Plato de temporada con chícharos, flores y espuma',
    title: 'Una historia en cada tiempo',
    className: 'md:col-span-2',
  },
  {
    src: '/assets/IMG_8021.jpg',
    alt: 'Postre de autor presentado dentro de una esfera de azúcar',
    title: 'El momento de asombro',
    className: '',
  },
  {
    src: '/assets/IMG_0305.JPG',
    alt: 'Chef Franko trabajando con su brigada en cocina',
    title: 'Detrás de cada experiencia',
    className: '',
  },
];

export const ArtGallery: React.FC<ArtGalleryProps> = ({ onOpenQuote }) => {
  return (
    <section id="galeria" className="relative overflow-hidden bg-[#11100f] py-24 text-white sm:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(180,139,55,0.18),transparent_32%),radial-gradient(circle_at_90%_85%,rgba(255,255,255,0.06),transparent_30%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-12 max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#b8944a]/50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#d8b96d]">
            <Camera className="h-3.5 w-3.5" />
            <span>El arte de Franko</span>
          </div>
          <h2 className="font-serif text-4xl font-light leading-tight sm:text-5xl lg:text-6xl">
            Alta cocina que se <span className="text-[#d8b96d]">recuerda</span> con los sentidos.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-stone-300 sm:text-lg">
            Ingredientes, técnica y emoción en una experiencia diseñada especialmente para tu villa, tu celebración y tus invitados.
          </p>
        </motion.div>

        <div className="grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[190px] md:grid-cols-4">
          {galleryItems.map((item, index) => (
            <motion.figure
              key={item.src}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-stone-900 ${item.className}`}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: index * 0.07, ease: 'easeOut' }}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading={index > 1 ? 'lazy' : 'eager'}
                className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105 group-hover:brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                <span className="font-serif text-xl text-white sm:text-2xl">{item.title}</span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-[#d8b96d] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <motion.div
          className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-white/15 pt-8 sm:flex-row sm:items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.25 }}
        >
          <p className="flex items-center gap-2 text-sm text-stone-300">
            <Sparkles className="h-4 w-4 text-[#d8b96d]" />
            <span>Tu mesa puede convertirse en nuestra próxima obra.</span>
          </p>
          <button
            onClick={onOpenQuote}
            className="rounded-xl bg-[#d8b96d] px-6 py-3 text-sm font-bold text-stone-950 transition hover:bg-[#ead18f] focus:outline-none focus:ring-2 focus:ring-[#d8b96d] focus:ring-offset-2 focus:ring-offset-[#11100f]"
          >
            Diseñar mi experiencia
          </button>
        </motion.div>
      </div>
    </section>
  );
};
