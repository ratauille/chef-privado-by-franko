export const siteUrl = 'https://chef4youbyfranko.com';

export const pageMetadata: Record<string, { title: string; description: string; lang?: string; noIndex?: boolean }> = {
  '/': {
    title: 'Chef4You by Franko Salgado | Chef Privado en Puerto Vallarta',
    description: 'Experiencias gastronómicas privadas, menús de autor y cenas en villas en Puerto Vallarta, Punta Mita y Nuevo Nayarit con el Chef Franko Salgado.',
    lang: 'en',
  },
  '/menu': {
    title: 'Menús y precios | Chef4You by Franko',
    description: 'Explora diez menús de chef privado para grupos de 2 a 20 personas, con precios por persona en MXN. Servicio en Puerto Vallarta, Punta Mita y Nuevo Nayarit.',
  },
  '/experiencias': {
    title: 'Experiencias privadas | Chef4You by Franko',
    description: 'Descubre experiencias de chef privado y catering para villas, celebraciones y estancias en Puerto Vallarta, Punta Mita y Nuevo Nayarit.',
    lang: 'en',
  },
  '/chef-franko': {
    title: 'Conoce al Chef Franko Salgado | Chef4You',
    description: 'Conoce la propuesta de cocina y hospitalidad personal del Chef Franko Salgado para cenas privadas y celebraciones en la Riviera Nayarit.',
    lang: 'en',
  },
  '/galeria': {
    title: 'Galería gastronómica | Chef4You by Franko',
    description: 'Imágenes de cenas privadas, platillos y experiencias gastronómicas de Chef4You by Franko en Puerto Vallarta y Riviera Nayarit.',
  },
  '/reservar': {
    title: 'Solicita una experiencia privada | Chef4You',
    description: 'Cuéntanos sobre tu grupo, fecha y ocasión para planear una experiencia de chef privado en Puerto Vallarta, Punta Mita o Nuevo Nayarit.',
  },
  '/admin': {
    title: 'Administración | Chef4You by Franko',
    description: 'Panel administrativo de Chef4You by Franko.',
    noIndex: true,
  },
};
