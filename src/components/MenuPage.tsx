import React, { useState } from 'react';
import { MessageCircle, Search, Users } from 'lucide-react';

type Menu = {
  id: string;
  title: string;
  titleEn: string;
  price: number;
  cuisines: string[];
  cuisineLabels: string[];
  image: string;
  imageAlt: string;
};

const menus: Menu[] = [
  {
    id: 'molcajetes-mariscos',
    title: 'Molcajetes de mariscos',
    titleEn: 'Seafood Molcajetes',
    price: 1000,
    cuisines: ['chefs-special', 'local', 'seafood'],
    cuisineLabels: ['Especial del Chef', 'Local'],
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Molcajete tradicional de mariscos y salsas regionales',
  },
  {
    id: 'menu-temporada',
    title: 'Menu de temporada',
    titleEn: 'Seasonal Menu',
    price: 970,
    cuisines: ['mediterranean', 'local', 'seafood'],
    cuisineLabels: ['Mediterránea', 'Local', 'Mariscos'],
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Platillo fresco de temporada con ingredientes regionales',
  },
  {
    id: 'vegano-gourmet',
    title: 'Vegano gourmet',
    titleEn: 'Gourmet Vegan',
    price: 1000,
    cuisines: ['chefs-special'],
    cuisineLabels: ['Especial del Chef'],
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Ensalada y vegetales frescos de alta cocina vegana',
  },
  {
    id: 'birthday-chef',
    title: 'Birthday chef experience',
    titleEn: 'Birthday Chef Experience',
    price: 970,
    cuisines: ['italian', 'chefs-special', 'mediterranean'],
    cuisineLabels: ['Italiana', 'Especial del Chef', 'Mediterránea'],
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Mesa festiva de cumpleaños con pasta y copas de vino',
  },
  {
    id: 'menu-adelaida',
    title: 'El menu de adelaida',
    titleEn: "Adelaide's Menu",
    price: 999,
    cuisines: ['chefs-special', 'local', 'fusion'],
    cuisineLabels: ['Especial del Chef', 'Local', 'Fusión'],
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Emplatado elegante de cocina de autor local y fusión',
  },
  {
    id: 'chef-casual',
    title: 'Especial del chef – casual',
    titleEn: "Chef's Special – Casual",
    price: 970,
    cuisines: ['chefs-special', 'mediterranean'],
    cuisineLabels: ['Especial del Chef', 'Mediterránea'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Platillo estilo chef relajado con corte o ingrediente mediterráneo',
  },
  {
    id: 'signature-tasting',
    title: 'Signature tasting menu',
    titleEn: 'Signature Tasting Menu',
    price: 1000,
    cuisines: ['french', 'chefs-special', 'seafood'],
    cuisineLabels: ['Francesa', 'Especial del Chef', 'Mariscos'],
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Degustación gourmet estilo francés',
  },
  {
    id: 'mar-y-mar',
    title: 'Mar y mar exclusivo',
    titleEn: 'Exclusive Sea & Sea',
    price: 1200,
    cuisines: ['seafood'],
    cuisineLabels: ['Mariscos/Pescados'],
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Pescados y mariscos exclusivos preparados a la parrilla',
  },
  {
    id: 'menu-fusion',
    title: 'Menu fusion, exclusivo',
    titleEn: 'Exclusive Fusion Menu',
    price: 1200,
    cuisines: ['fusion'],
    cuisineLabels: ['Fusión'],
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Presentación gastronómica de cocina fusión',
  },
  {
    id: 'el-patasalada',
    title: 'El patasalada',
    titleEn: 'El Patasalada',
    price: 1350,
    cuisines: ['japanese', 'seafood', 'fusion'],
    cuisineLabels: ['Japonesa', 'Mariscos', 'Fusión'],
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Experiencia japonesa con pesca fresca del día y toques fusión',
  },
];

const cuisineOptions = [
  ['chefs-special', 'Especial del Chef / Chef’s Special'],
  ['seafood', 'Mariscos / Pescados / Seafood'],
  ['mediterranean', 'Mediterránea / Mediterranean'],
  ['local', 'Local'],
  ['fusion', 'Fusión / Fusion'],
  ['italian', 'Italiana / Italian'],
  ['french', 'Francesa / French'],
  ['japanese', 'Japonesa / Japanese'],
];

const priceFormatter = new Intl.NumberFormat('es-MX');
const whatsappNumber = '523221606843';

function getWhatsAppLink(menu: Menu) {
  const message = `Hola Chef Franko, me interesa reservar el menú ${menu.title} ($${priceFormatter.format(menu.price)} MXN por persona, de 2 a 20 personas). ¿Tienen disponibilidad?`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const MenuPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

  const normalizedQuery = query.trim().toLocaleLowerCase('es-MX');
  const filteredMenus = menus.filter((menu) => {
    const matchesSearch = !normalizedQuery
      || `${menu.title} ${menu.titleEn} ${menu.cuisineLabels.join(' ')}`
        .toLocaleLowerCase('es-MX')
        .includes(normalizedQuery);
    const matchesCuisine = cuisine === 'all' || menu.cuisines.includes(cuisine);
    const matchesPrice = priceRange === 'all'
      || (priceRange === 'up-to-1000' && menu.price <= 1000)
      || (priceRange === '1001-1200' && menu.price >= 1001 && menu.price <= 1200)
      || (priceRange === 'over-1200' && menu.price > 1200);
    return matchesSearch && matchesCuisine && matchesPrice;
  });

  const resetFilters = () => {
    setQuery('');
    setCuisine('all');
    setPriceRange('all');
  };

  return (
    <section className="min-h-[70vh] bg-[#0a0a0a] px-4 py-16 text-stone-100 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <header className="max-w-3xl">
          <h1 className="font-serif text-4xl font-light text-white sm:text-6xl">Menús privados</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-stone-300 sm:text-lg">
            Diez propuestas para compartir en casa, en tu villa o durante una celebración.
            Servicio para grupos de 2 a 20 personas.
          </p>
          <p className="mt-3 text-sm text-stone-400">Precios por persona en pesos mexicanos (MXN).</p>
        </header>

        <div className="mt-10 grid gap-4 rounded-2xl border border-stone-800 bg-[#121110] p-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label htmlFor="menu-search" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-300">
              Buscar / Search
            </label>
            <div className="relative">
              <Search aria-hidden="true" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-500" />
              <input
                id="menu-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Menú, ingrediente o cocina"
                className="min-h-11 w-full rounded-lg border border-stone-700 bg-[#0a0a0a] py-2.5 pl-10 pr-3 text-sm text-white placeholder:text-stone-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8b96d]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="menu-cuisine" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-300">
              Tipo de cocina / Cuisine
            </label>
            <select
              id="menu-cuisine"
              value={cuisine}
              onChange={(event) => setCuisine(event.target.value)}
              className="min-h-11 w-full rounded-lg border border-stone-700 bg-[#0a0a0a] px-3 py-2.5 text-sm text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8b96d]"
            >
              <option value="all">Todas las cocinas / All cuisines</option>
              {cuisineOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </div>

          <div>
            <label htmlFor="menu-price" className="mb-2 block text-xs font-semibold uppercase tracking-wider text-stone-300">
              Rango de precio / Price range
            </label>
            <select
              id="menu-price"
              value={priceRange}
              onChange={(event) => setPriceRange(event.target.value)}
              className="min-h-11 w-full rounded-lg border border-stone-700 bg-[#0a0a0a] px-3 py-2.5 text-sm text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8b96d]"
            >
              <option value="all">Todos los precios / All prices</option>
              <option value="up-to-1000">Hasta $1,000 MXN / pers.</option>
              <option value="1001-1200">$1,001 a $1,200 MXN / pers.</option>
              <option value="over-1200">Más de $1,200 MXN / pers.</option>
            </select>
          </div>

          <p className="self-end pb-3 text-sm text-stone-300" role="status" aria-live="polite" aria-atomic="true">
            Mostrando <span className="font-bold text-[#d8b96d]">{filteredMenus.length}</span> de {menus.length} menús
          </p>
        </div>

        {filteredMenus.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMenus.map((menu) => (
              <article key={menu.id} className="flex flex-col overflow-hidden rounded-2xl border border-stone-800 bg-[#121110]">
                <div className="relative h-52 overflow-hidden bg-stone-900">
                  <img
                    src={menu.image}
                    alt={menu.imageAlt}
                    width="800"
                    height="600"
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {menu.cuisineLabels.map((label) => (
                      <span key={label} className="rounded-full border border-[#c5a059]/30 bg-[#c5a059]/10 px-2.5 py-1 text-xs text-[#e2c987]">
                        {label}
                      </span>
                    ))}
                  </div>
                  <h2 className="font-serif text-2xl text-white">{menu.title}</h2>
                  <p className="mt-1 text-sm italic text-stone-400">{menu.titleEn}</p>
                  <p className="mt-4 flex items-center gap-2 text-sm text-stone-300">
                    <Users aria-hidden="true" className="h-4 w-4 shrink-0 text-[#d8b96d]" />
                    De 2 a 20 personas
                  </p>
                  <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-t border-stone-800 pt-4">
                    <p>
                      <span className="block text-xs text-stone-400">Desde</span>
                      <span className="font-semibold text-white">${priceFormatter.format(menu.price)} MXN</span>
                      <span className="ml-1 text-xs text-stone-400">/ persona</span>
                    </p>
                    <a
                      href={getWhatsAppLink(menu)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-[#c5a059] px-4 py-2.5 text-sm font-bold text-[#11100e] transition-colors hover:bg-[#d8b96d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Consultar
                      <MessageCircle aria-hidden="true" className="h-4 w-4" />
                      <span className="sr-only">por WhatsApp sobre {menu.title}</span>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-stone-700 px-6 py-14 text-center">
            <p className="text-stone-300">No se encontraron menús con esos filtros.</p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 min-h-11 rounded-lg px-4 py-2 text-sm font-semibold text-[#e2c987] underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d8b96d]"
            >
              Restablecer filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
