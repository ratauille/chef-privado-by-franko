export interface DestinationImageAsset {
  src: string;
  srcSet: string;
  sizes: string;
  width: number;
  height: number;
  altEn: string;
  altEs: string;
  captionEn?: string;
  captionEs?: string;
  /**
   * Provenance & license note for temporary/placeholder or repository images.
   */
  sourceNote: string;
}

export interface DestinationMediaConfig {
  route: '/private-chef-punta-mita' | '/private-chef-nuevo-nayarit';
  /**
   * Main beach photo used in the homepage coastal banner card and destination page hero header.
   * Replace the file in `public/assets/` or update `src` / `srcSet` below when final photography is ready.
   */
  heroBeach: DestinationImageAsset;
  /**
   * Short gallery (up to 3 photos) rendered below the fold with lazy loading (`loading="lazy"`).
   */
  gallery: [DestinationImageAsset, DestinationImageAsset, DestinationImageAsset];
}

/**
 * Centralized image configuration for the Punta Mita and Nuevo Nayarit destination pages
 * and the homepage coastal destinations banner.
 *
 * All references for each destination are grouped here so temporary photos can be replaced
 * in a single location.
 */
export const DESTINATION_IMAGES: Record<'puntaMita' | 'nuevoNayarit', DestinationMediaConfig> = {
  puntaMita: {
    route: '/private-chef-punta-mita',
    heroBeach: {
      src: '/assets/punta_mita_beach_placeholder-desktop.webp',
      srcSet:
        '/assets/punta_mita_beach_placeholder-mobile.webp 640w, /assets/punta_mita_beach_placeholder-desktop.webp 1200w',
      sizes: '(max-width: 1024px) 92vw, 42vw',
      width: 1200,
      height: 800,
      altEn: 'Sandy beach shoreline with turquoise ocean waves and distant palms at golden sunset',
      altEs: 'Orilla de playa de arena con olas turquesa y palmeras al fondo durante el atardecer',
      captionEn: 'Coastal sunset view · Temporary placeholder image',
      captionEs: 'Vista costera al atardecer · Imagen temporal de referencia',
      sourceNote:
        'Temporary commercial-use beach photo from Unsplash (photo-1507525428034-b723cf961d3e by Sean Oulashin, Unsplash License: https://unsplash.com/license). Original preserved at public/assets/punta_mita_beach_placeholder.webp.',
    },
    gallery: [
      {
        src: '/assets/IMG_1937.webp',
        srcSet: '/assets/IMG_1937-mobile.webp 480w, /assets/IMG_1937.webp 683w',
        sizes: '(max-width: 768px) 92vw, 31vw',
        width: 683,
        height: 911,
        altEn: 'Plated private dinner course with roasted lamb, fish and delicate emulsions by Chef Franko',
        altEs: 'Plato de autor con cordero, pescado y emulsiones delicadas preparado por el Chef Franko',
        captionEn: 'Author plating for private villa dinners',
        captionEs: 'Emplatado de autor para cenas privadas en villa',
        sourceNote: 'Repository asset (`public/assets/IMG_1937.webp` — Chef 4 You by Franko).',
      },
      {
        src: '/assets/IMG_1823.webp',
        srcSet: '/assets/IMG_1823-mobile.webp 540w, /assets/IMG_1823.webp 1215w',
        sizes: '(max-width: 768px) 92vw, 31vw',
        width: 1215,
        height: 911,
        altEn: 'Chef pouring a warm reduction over a row of white plates during private dinner service',
        altEs: 'Chef sirviendo una salsa cremosa sobre una fila de platos blancos durante el servicio privado',
        captionEn: 'Course-by-course table service',
        captionEs: 'Servicio en mesa tiempo por tiempo',
        sourceNote: 'Repository asset (`public/assets/IMG_1823.webp` — Chef 4 You by Franko).',
      },
      {
        src: '/assets/IMG_8021.webp',
        srcSet: '/assets/IMG_8021-mobile.webp 640w, /assets/IMG_8021.webp 1376w',
        sizes: '(max-width: 768px) 92vw, 31vw',
        width: 1376,
        height: 774,
        altEn: 'Signature dessert presented inside a blown sugar sphere for a private celebration',
        altEs: 'Postre de autor presentado dentro de una esfera de azúcar soplado para una celebración íntima',
        captionEn: 'Bespoke pastry for intimate celebrations',
        captionEs: 'Pastelería de autor para celebraciones íntimas',
        sourceNote: 'Repository asset (`public/assets/IMG_8021.webp` — Chef 4 You by Franko).',
      },
    ],
  },
  nuevoNayarit: {
    route: '/private-chef-nuevo-nayarit',
    heroBeach: {
      src: '/assets/nuevo_nayarit_beach_placeholder-desktop.webp',
      srcSet:
        '/assets/nuevo_nayarit_beach_placeholder-mobile.webp 640w, /assets/nuevo_nayarit_beach_placeholder-desktop.webp 1200w',
      sizes: '(max-width: 1024px) 92vw, 42vw',
      width: 1200,
      height: 800,
      altEn: 'Wide sandy beach with palm trees, palapa shade and calm turquoise bay water under a clear sky',
      altEs: 'Playa amplia de arena con palmeras, sombra de palapa y mar turquesa tranquilo bajo cielo despejado',
      captionEn: 'Sunny sandy beach · Temporary placeholder image',
      captionEs: 'Playa soleada de arena · Imagen temporal de referencia',
      sourceNote:
        'Temporary commercial-use beach photo from Unsplash (photo-1519046904884-53103b34b206 by Rowan Heuvel, Unsplash License: https://unsplash.com/license). Original preserved at public/assets/nuevo_nayarit_beach_placeholder.webp.',
    },
    gallery: [
      {
        src: '/assets/IMG_1767.webp',
        srcSet: '/assets/IMG_1767-mobile.webp 480w, /assets/IMG_1767.webp 683w',
        sizes: '(max-width: 768px) 92vw, 31vw',
        width: 683,
        height: 911,
        altEn: 'Seasonal plated course with green peas, edible yellow flowers and delicate foam',
        altEs: 'Tiempo de temporada emplatado con guisantes frescos, flores comestibles y espuma delicada',
        captionEn: 'Fresh seasonal ingredients for vacation stays',
        captionEs: 'Ingredientes frescos de temporada para tus vacaciones',
        sourceNote: 'Repository asset (`public/assets/IMG_1767.webp` — Chef 4 You by Franko).',
      },
      {
        src: '/assets/IMG_1389.webp',
        srcSet: '/assets/IMG_1389-mobile.webp 480w, /assets/IMG_1389.webp 683w',
        sizes: '(max-width: 768px) 92vw, 31vw',
        width: 683,
        height: 911,
        altEn: 'Glazed roasted meat served with colorful vegetable purees and microgreens on a white plate',
        altEs: 'Corte de carne glaseado servido con purés vegetales de colores y brotes en plato blanco',
        captionEn: 'Custom menus for family and group tables',
        captionEs: 'Menús personalizados para mesas familiares y grupales',
        sourceNote: 'Repository asset (`public/assets/IMG_1389.webp` — Chef 4 You by Franko).',
      },
      {
        src: '/assets/IMG_0493.webp',
        srcSet: '/assets/IMG_0493-mobile.webp 480w, /assets/IMG_0493.webp 783w',
        sizes: '(max-width: 768px) 92vw, 31vw',
        width: 783,
        height: 783,
        altEn: 'Chef arranging sauces and garnishes on plates in a residential kitchen before serving',
        altEs: 'Chef montando salsas y guarniciones en platos dentro de una cocina residencial antes de servir',
        captionEn: 'In-residence preparation and full kitchen cleanup',
        captionEs: 'Preparación en tu residencia y limpieza total de cocina',
        sourceNote: 'Repository asset (`public/assets/IMG_0493.webp` — Chef 4 You by Franko).',
      },
    ],
  },
};
