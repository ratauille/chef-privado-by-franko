export const siteUrl = 'https://chef4youbyfranko.com';

// Única fuente de verdad de títulos/descripciones por ruta, junto con
// scripts/prerender.mjs (copia de build). Ambas deben tener el mismo
// title, description y lang por ruta: el prerender se ejecuta después de
// `vite build` y es el que gana en el HTML servido, así que si se cambia
// un texto aquí hay que cambiarlo también en scripts/prerender.mjs.
// No hay páginas /es/* separadas: el idioma es un toggle de UI sobre la
// misma URL, por eso no se usan hreflang en/es, solo x-default (ver
// scripts/prerender.mjs y src/App.tsx).
export const pageMetadata: Record<string, { title: string; description: string; lang?: string; noIndex?: boolean }> = {
  '/': {
    title: 'Private Chef Puerto Vallarta & Punta Mita | Chef Franko',
    description:
      'Luxury private chef experiences, personalized tasting menus and villa dining in Puerto Vallarta, Punta Mita and Riviera Nayarit. Book Chef Franko.',
    lang: 'en',
  },
  '/menu': {
    title: 'Menús y precios | Chef4You by Franko',
    description: 'Explora diez menús de chef privado para grupos de 2 a 20 personas, con precios por persona en MXN. Servicio en Puerto Vallarta, Punta Mita y Nuevo Nayarit.',
    lang: 'es',
  },
  '/experiencias': {
    title: 'Private Chef Experiences | Chef Franko',
    description:
      'Discover bespoke villa dinners, tasting menus, celebrations and chef-led experiences in Puerto Vallarta and Punta Mita.',
    lang: 'en',
  },
  '/chef-franko': {
    title: 'Chef Franko Salgado | Private Chef',
    description:
      'Meet Chef Franko Salgado and discover refined private dining shaped around your guests, setting and celebration.',
    lang: 'en',
  },
  '/galeria': {
    title: 'Private Chef Gallery | Chef 4 You by Franko',
    description:
      'Explore signature dishes, culinary technique and private villa dining captured by Chef Franko Salgado.',
    lang: 'en',
  },
  '/reservar': {
    title: 'Reserve a Private Chef Experience | Chef Franko',
    description:
      'Request a tailored private chef proposal for your date, guest count and villa location in Riviera Nayarit.',
    lang: 'en',
  },
  '/privacy': {
    title: 'Aviso de Privacidad | Chef4You by Franko',
    description: 'Aviso de privacidad y tratamiento de datos personales de Chef4You by Franko Salgado en Puerto Vallarta y Riviera Nayarit. Información sobre derechos ARCO y canales de atención.',
    lang: 'es',
  },
  '/admin': {
    title: 'Administración | Chef4You by Franko',
    description: 'Panel administrativo de Chef4You by Franko.',
    lang: 'es',
    noIndex: true,
  },
};
