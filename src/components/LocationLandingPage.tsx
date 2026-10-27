import React from 'react';
import { ArrowRight, Calendar, CheckCircle2, MapPin, MessageCircle, Sparkles, Utensils } from 'lucide-react';
import { useLanguage } from '../lib/i18n';

interface LocationLandingPageProps {
  locationKey: 'puntaMita' | 'nuevoNayarit';
  onOpenQuote: () => void;
  onNavigate: (path: string) => void;
}

const LOCATION_HERO_IMAGES = {
  puntaMita: {
    src: '/assets/banquete_gala_frente_al_mar.jpg',
    altEn: 'Luxury private chef table setup and gourmet plating at a villa in Punta Mita',
    altEs: 'Montaje de cena privada de lujo y plato de autor en una villa en Punta Mita',
  },
  nuevoNayarit: {
    src: '/assets/cena_degustacion_5_tiempos.webp',
    altEn: 'Five-course contemporary Mexican tasting menu served at a private residence in Nuevo Nayarit',
    altEs: 'Menú degustación de cinco tiempos servido en una residencia privada en Nuevo Nayarit',
  },
};

export const LocationLandingPage: React.FC<LocationLandingPageProps> = ({
  locationKey,
  onOpenQuote,
  onNavigate,
}) => {
  const { lang, t } = useLanguage();
  const loc = t.locations[locationKey];
  const heroImg = LOCATION_HERO_IMAGES[locationKey];
  const waHref = `https://wa.me/5213221606843?text=${encodeURIComponent(loc.whatsappText)}`;

  const go = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  const prefix = lang === 'es' ? '/es' : '';
  const experiencesHref = `${prefix}/experiencias/`;
  const bioHref = `${prefix}/chef-franko/`;
  const galleryHref = `${prefix}/galeria/`;
  const reservarHref = `${prefix}/reservar/`;
  const otherLocationHref =
    locationKey === 'puntaMita'
      ? lang === 'es'
        ? '/es/chef-privado-nuevo-nayarit/'
        : '/private-chef-nuevo-nayarit/'
      : lang === 'es'
      ? '/es/chef-privado-punta-mita/'
      : '/private-chef-punta-mita/';

  return (
    <div className="bg-[#0a0a0a] text-stone-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-stone-800/80 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181715] border border-[#c5a059]/40 text-[#d8b96d] text-xs font-semibold uppercase tracking-[0.18em]">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>{loc.badge}</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.06]">
              <span className="block font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-[#d8b96d] mb-3">
                {loc.h1Eyebrow}
              </span>
              {loc.h1Title}{' '}
              <span className="italic text-[#d8b96d]">{loc.h1Accent}</span>
            </h1>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
              {loc.subtitle}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-4">
              <button
                type="button"
                onClick={onOpenQuote}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d8b96d] to-[#9e7c33] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110 active:scale-95 transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>{loc.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{loc.ctaWhatsapp}</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-stone-800 shadow-2xl bg-[#141312]">
              <img
                src={heroImg.src}
                alt={lang === 'es' ? heroImg.altEs : heroImg.altEn}
                width={800}
                height={600}
                loading="eager"
                decoding="async"
                className="w-full h-80 sm:h-96 object-cover"
              />
              <div className="p-5 bg-[#141312] border-t border-stone-800 flex items-center justify-between text-xs text-stone-300">
                <span className="inline-flex items-center gap-2 font-semibold text-[#d8b96d]">
                  <MapPin className="w-4 h-4 text-[#c5a059]" />
                  {locationKey === 'puntaMita'
                    ? 'Punta Mita · Litibú · Kupuri · Riviera Nayarit'
                    : 'Nuevo Nayarit · Nuevo Vallarta · Flamingos · Bucerías'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-[#0d0d0d] border-b border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white">
              {loc.highlightsTitle}
            </h2>
            <p className="text-stone-300 text-base sm:text-lg font-light leading-relaxed">
              {loc.highlightsSubtitle}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {loc.highlights.map(item => (
              <article
                key={item.title}
                className="p-7 rounded-3xl bg-[#141312] border border-stone-800 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1c1a16] border border-[#c5a059]/30 flex items-center justify-center text-[#d8b96d]">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-2xl font-light text-white">{item.title}</h3>
                  <p className="text-stone-300 text-sm leading-relaxed font-light">{item.desc}</p>
                </div>
                <div className="pt-2">
                  <a
                    href={experiencesHref}
                    onClick={e => go(e, experiencesHref)}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d8b96d] hover:underline"
                  >
                    <span>{lang === 'es' ? 'Ver formatos de menú' : 'Explore menu formats'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Logistics & Full-Service Details */}
      <section className="py-20 bg-[#0a0a0a] border-b border-stone-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#d8b96d]">
              {loc.logisticsBadge}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-light text-white leading-tight">
              {loc.logisticsTitle}
            </h2>
            <p className="text-stone-300 text-base leading-relaxed font-light">
              {loc.logisticsIntro}
            </p>

            <div className="space-y-4 pt-2">
              {loc.logisticsItems.map(item => (
                <div
                  key={item.title}
                  className="p-6 rounded-2xl bg-[#141312] border border-stone-800 space-y-2"
                >
                  <h3 className="font-serif text-xl text-white font-medium">{item.title}</h3>
                  <p className="text-stone-300 text-sm leading-relaxed font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 p-8 rounded-3xl bg-[#141312] border border-stone-800 space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-light text-white">
              {loc.areasTitle}
            </h2>
            <p className="text-stone-300 text-sm leading-relaxed font-light">{loc.areasCopy}</p>
            <ul className="space-y-3">
              {loc.areasList.map(area => (
                <li key={area} className="flex items-start gap-3 text-sm text-stone-200">
                  <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                  <span>{area}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4 border-t border-stone-800 space-y-3 text-xs">
              <p className="text-stone-400 uppercase tracking-wider font-semibold">
                {lang === 'es' ? 'Enlaces relacionados' : 'Related pages'}
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={experiencesHref}
                  onClick={e => go(e, experiencesHref)}
                  className="px-3.5 py-2 rounded-lg bg-[#1c1b18] border border-stone-700 text-stone-200 hover:border-[#c5a059]"
                >
                  {t.nav.experiences}
                </a>
                <a
                  href={bioHref}
                  onClick={e => go(e, bioHref)}
                  className="px-3.5 py-2 rounded-lg bg-[#1c1b18] border border-stone-700 text-stone-200 hover:border-[#c5a059]"
                >
                  {t.nav.chefFranko}
                </a>
                <a
                  href={galleryHref}
                  onClick={e => go(e, galleryHref)}
                  className="px-3.5 py-2 rounded-lg bg-[#1c1b18] border border-stone-700 text-stone-200 hover:border-[#c5a059]"
                >
                  {t.nav.gallery}
                </a>
                <a
                  href={otherLocationHref}
                  onClick={e => go(e, otherLocationHref)}
                  className="px-3.5 py-2 rounded-lg bg-[#1c1b18] border border-stone-700 text-[#d8b96d] hover:border-[#c5a059]"
                >
                  {locationKey === 'puntaMita'
                    ? lang === 'es'
                      ? 'Chef Privado Nuevo Nayarit'
                      : 'Private Chef Nuevo Nayarit'
                    : lang === 'es'
                    ? 'Chef Privado Punta Mita'
                    : 'Private Chef Punta Mita'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-[#0d0d0d] border-b border-stone-800/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-light text-white text-center">
            {loc.faqTitle}
          </h2>
          <div className="mt-10 space-y-4">
            {loc.faqs.map(faq => (
              <div
                key={faq.q}
                className="p-6 rounded-2xl bg-[#141312] border border-stone-800 space-y-2"
              >
                <h3 className="font-serif text-xl text-white">{faq.q}</h3>
                <p className="text-stone-300 text-sm leading-relaxed font-light">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-[#0a0a0a] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white">
            {loc.finalTitle}
          </h2>
          <p className="text-stone-300 text-base sm:text-lg font-light">{loc.finalSub}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href={reservarHref}
              onClick={e => go(e, reservarHref)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d8b96d] to-[#9e7c33] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg hover:brightness-110"
            >
              <Calendar className="w-4 h-4" />
              <span>{loc.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{loc.ctaWhatsapp}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
