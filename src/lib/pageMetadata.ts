export const siteUrl = 'https://chef4youbyfranko.com';
export type PageLanguage = 'en' | 'es';
export interface PageMetadata {
  title: string;
  description: string;
  lang: 'en' | 'es-MX';
  route: string;
  noIndex?: boolean;
  alternates?: { en: string; es: string };
}

// One source for the client, prerenderer and sitemap.
const pages = [
  {
    route: '/', esPath: '/es',
    en: ['Private Chef Puerto Vallarta & Punta Mita | Chef Franko', 'Private chef experiences, tasting menus and villa dinners in Puerto Vallarta, Punta Mita and Nuevo Nayarit. Request a personalized proposal from Chef Franko.'],
    es: ['Chef privado en Puerto Vallarta y Punta Mita | Chef Franko', 'Cenas privadas, menús degustación y servicio de chef en villas de Puerto Vallarta, Punta Mita y Nuevo Nayarit. Solicita una propuesta personalizada.'],
  },
  {
    route: '/private-chef-punta-mita', esPath: '/es/chef-privado-punta-mita',
    en: ['Private Chef Punta Mita | Villa Dining by Chef Franko', 'Plan a private villa dinner in Punta Mita with Chef Franko. Personalized menus, dietary preferences and service coordinated around your guests and residence.'],
    es: ['Chef privado en Punta Mita | Cenas en villa con Chef Franko', 'Planea una cena privada en tu villa de Punta Mita con Chef Franko. Menús personalizados y coordinación del servicio según tu grupo y residencia.'],
  },
  {
    route: '/private-chef-nuevo-nayarit', esPath: '/es/chef-privado-nuevo-nayarit',
    en: ['Private Chef Nuevo Nayarit & Nuevo Vallarta | Chef Franko', 'Private chef dinners for villas, condos and family stays in Nuevo Nayarit, also known as Nuevo Vallarta. Request menus and availability from Chef Franko.'],
    es: ['Chef privado en Nuevo Nayarit y Nuevo Vallarta | Chef Franko', 'Cenas con chef privado para villas, departamentos y estancias familiares en Nuevo Nayarit o Nuevo Vallarta. Consulta menús y disponibilidad con Chef Franko.'],
  },
  {
    route: '/experiencias', esPath: '/es/experiencias',
    en: ['Private Chef Experiences in Puerto Vallarta | Chef Franko', 'Explore private villa dinners, tasting menus and celebrations with Chef Franko in Puerto Vallarta, Punta Mita and Nuevo Nayarit.'],
    es: ['Experiencias de chef privado en Puerto Vallarta | Chef Franko', 'Descubre cenas en villa, menús degustación y celebraciones con Chef Franko en Puerto Vallarta, Punta Mita y Nuevo Nayarit.'],
  },
  {
    route: '/chef-franko', esPath: '/es/chef-franko',
    en: ['Chef Franko Salgado | Private Chef in Puerto Vallarta', 'Meet Chef Franko Salgado and his approach to personalized private dining, seasonal ingredients and hospitality in Puerto Vallarta and Riviera Nayarit.'],
    es: ['Chef Franko Salgado | Chef privado en Puerto Vallarta', 'Conoce al Chef Franko Salgado y su propuesta de cocina personalizada, ingredientes de temporada y hospitalidad en Puerto Vallarta y Riviera Nayarit.'],
  },
  {
    route: '/galeria', esPath: '/es/galeria',
    en: ['Private Chef Gallery | Chef4You by Franko', 'Explore dishes, culinary technique and private dining experiences by Chef Franko Salgado in Puerto Vallarta and Riviera Nayarit.'],
    es: ['Galería gastronómica | Chef4You by Franko', 'Explora platillos, técnica culinaria y experiencias de cenas privadas del Chef Franko Salgado en Puerto Vallarta y Riviera Nayarit.'],
  },
  {
    route: '/reservar', esPath: '/es/reservar',
    en: ['Book a Private Chef in Puerto Vallarta | Chef Franko', 'Share your date, guest count, villa location and dietary preferences to request a private chef proposal for Puerto Vallarta, Punta Mita or Nuevo Nayarit.'],
    es: ['Reserva un chef privado en Puerto Vallarta | Chef Franko', 'Comparte fecha, número de invitados, ubicación y preferencias para solicitar una propuesta de chef privado en Puerto Vallarta, Punta Mita o Nuevo Nayarit.'],
  },
  {
    route: '/menu', esPath: '/es/menu',
    en: ['Private Chef Menus | Chef4You by Franko', 'Explore private chef menus and prices in Mexican pesos for villa dinners and celebrations in Puerto Vallarta, Punta Mita and Nuevo Nayarit.'],
    es: ['Menús de chef privado | Chef4You by Franko', 'Explora menús de chef privado y precios en pesos mexicanos para cenas en villa y celebraciones en Puerto Vallarta, Punta Mita y Nuevo Nayarit.'],
  },
  {
    route: '/privacy', esPath: '/es/privacy',
    en: ['Privacy Notice | Chef4You by Franko', 'Information about personal data, contact channels and privacy requests for Chef4You by Franko Salgado. Notice under legal review.'],
    es: ['Aviso de Privacidad | Chef4You by Franko', 'Información sobre datos personales, canales de contacto y solicitudes de privacidad de Chef4You by Franko Salgado. Aviso en revisión legal.'],
  },
];

export const pageMetadata: Record<string, PageMetadata> = {};
for (const page of pages) {
  const alternates = { en: page.route, es: page.esPath };
  for (const lang of ['en', 'es'] as const) {
    const [title, description] = page[lang];
    pageMetadata[alternates[lang]] = {
      title, description, route: page.route,
      lang: lang === 'es' ? 'es-MX' : 'en', alternates,
    };
  }
}
pageMetadata['/admin'] = {
  title: 'Administración | Chef4You by Franko',
  description: 'Panel administrativo de Chef4You by Franko.',
  lang: 'es-MX', route: '/admin', noIndex: true,
};

export const normalizePathname = (path: string) => path.replace(/\/+$/, '') || '/';
export const canonicalUrl = (path: string) => `${siteUrl}${normalizePathname(path) === '/' ? '/' : `${normalizePathname(path)}/`}`;
export const getPageMetadata = (path: string) => pageMetadata[normalizePathname(path)];
export const getRoutePath = (path: string) => getPageMetadata(path)?.route ?? normalizePathname(path);
export const getLocalizedPath = (path: string, lang: PageLanguage) => {
  const page = getPageMetadata(path);
  return page?.alternates?.[lang] ?? normalizePathname(path);
};
export const getInitialLanguage = (path: string): PageLanguage => getPageMetadata(path)?.lang === 'es-MX' ? 'es' : 'en';
