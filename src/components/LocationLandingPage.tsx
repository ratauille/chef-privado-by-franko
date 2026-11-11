import React from 'react';
import { ArrowRight, Calendar, Camera, CheckCircle2, MapPin, MessageCircle, Sparkles, Utensils } from 'lucide-react';
import { useLanguage } from '../lib/i18n';
import { DESTINATION_IMAGES } from '../lib/destinationImages';

interface LocationLandingPageProps {
  locationKey: 'puntaMita' | 'nuevoNayarit';
  onOpenQuote: () => void;
  onNavigate: (path: string) => void;
}

export const LocationLandingPage: React.FC<LocationLandingPageProps> = ({
  locationKey,
  onOpenQuote,
  onNavigate,
}) => {
  const { lang, t } = useLanguage();
  const loc = t.locations[locationKey];
  const media = DESTINATION_IMAGES[locationKey];
  const heroImg = media.heroBeach;
  const waHref = `https://wa.me/5213221606843?text=${encodeURIComponent(loc.whatsappText)}`;

  const go = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  const experiencesHref = '/experiencias';
  const menuHref = '/menu';
  const bioHref = '/chef-franko';
  const galleryHref = '/galeria';
  const reservarHref = '/reservar';
  const otherLocationHref =
    locationKey === 'puntaMita' ? '/private-chef-nuevo-nayarit' : '/private-chef-punta-mita';

  return (
    <div className="bg-[#0a0a0a] text-stone-100">
      {/* Hero Section with Beach Header Photo */}
      <section className="relative overflow-hidden border-b border-[#153f42]/40 bg-[#082528] py-16 lg:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,119,120,0.22),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(155,27,48,0.14),transparent_45%)] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-[#9b1b30]/60 text-white text-xs font-semibold uppercase tracking-[0.18em]">
              <span className="h-2 w-2 rounded-full bg-[#c8233c]" aria-hidden="true" />
              <Sparkles className="w-3.5 h-3.5 text-[#f3dca2]" />
              <span>{loc.badge}</span>
            </div>

            <div className="space-y-3">
              <p className="font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.22em] text-[#9ed3cf]">
                {loc.h1Eyebrow}
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-[1.06]">
                {loc.h1Title}
              </h1>
            </div>

            <p className="text-stone-200 text-base sm:text-lg leading-relaxed font-light max-w-2xl">
              {loc.subtitle}
            </p>

            <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-4">
              <button
                type="button"
                onClick={onOpenQuote}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-white text-[#102f33] hover:bg-[#f0f5f4] font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all border border-white"
              >
                <Calendar className="w-4 h-4 text-[#9b1b30]" />
                <span>{loc.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 text-[#0b6668]" />
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
            <figure className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-[#0d3538]">
              <img
                src={heroImg.src}
                srcSet={heroImg.srcSet}
                sizes={heroImg.sizes}
                alt={lang === 'es' ? heroImg.altEs : heroImg.altEn}
                width={heroImg.width}
                height={heroImg.height}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-72 sm:h-96 object-cover"
              />
              <figcaption className="p-4 sm:p-5 bg-[#0a272a] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-stone-200">
                <span className="inline-flex items-center gap-2 font-semibold text-[#cfe8e4]">
                  <MapPin className="w-4 h-4 text-[#e04f63] shrink-0" />
                  {locationKey === 'puntaMita'
                    ? 'Punta Mita · Litibú · Kupuri · Riviera Nayarit'
                    : 'Nuevo Nayarit · Nuevo Vallarta · Flamingos · Bucerías'}
                </span>
                {(heroImg.captionEn || heroImg.captionEs) && (
                  <span className="text-[11px] text-stone-400">
                    {lang === 'es' ? heroImg.captionEs : heroImg.captionEn}
                  </span>
                )}
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-[#f7f8f5] text-[#102f33] border-b border-[#153f42]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#9b1b30]">
              {locationKey === 'puntaMita'
                ? lang === 'es'
                  ? 'Cenas en Villa y Celebraciones'
                  : 'Villa Dinners & Celebrations'
                : lang === 'es'
                ? 'Comidas Familiares y Grupos'
                : 'Family & Group Dining'}
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-[#153f42]">
              {loc.highlightsTitle}
            </h2>
            <p className="text-[#4a6466] text-base sm:text-lg font-light leading-relaxed">
              {loc.highlightsSubtitle}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {loc.highlights.map(item => (
              <article
                key={item.title}
                className="p-7 rounded-3xl bg-white border border-[#153f42]/10 shadow-[0_18px_50px_rgba(21,63,66,0.07)] flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-[#eef3ef] border border-[#0b6668]/20 flex items-center justify-center text-[#0b6668]">
                    <Utensils className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-2xl font-light text-[#153f42]">{item.title}</h3>
                  <p className="text-[#4a6466] text-sm leading-relaxed font-light">{item.desc}</p>
                </div>
                <div className="pt-2">
                  <a
                    href={experiencesHref}
                    onClick={e => go(e, experiencesHref)}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0b6668] hover:text-[#9b1b30] transition-colors"
                  >
                    <span>{lang === 'es' ? 'Ver formatos de experiencia' : 'Explore experience formats'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Short 3-Photo Culinary & Table Gallery (Lazy-loaded below the fold) */}
      <section className="py-20 bg-[#0d3538] text-white border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#cfe8e4]">
                <Camera className="w-4 h-4 text-[#e04f63]" />
                <span>
                  {lang === 'es' ? 'Galería de la Experiencia' : 'Culinary & Table Gallery'}
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-light text-white">
                {locationKey === 'puntaMita'
                  ? lang === 'es'
                    ? 'Emplatado de Autor y Servicio en tu Villa'
                    : 'Author Plating & In-Villa Table Service'
                  : lang === 'es'
                  ? 'Platos de Temporada para Compartir en Familia o Grupo'
                  : 'Seasonal Courses for Family & Group Gatherings'}
              </h2>
            </div>
            <a
              href={galleryHref}
              onClick={e => go(e, galleryHref)}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#cfe8e4] hover:text-white"
            >
              <span>{lang === 'es' ? 'Ver galería completa' : 'View full gallery'}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {media.gallery.map(photo => (
              <figure
                key={photo.src}
                className="group rounded-3xl overflow-hidden bg-[#082528] border border-white/15 shadow-xl flex flex-col"
              >
                <div className="h-72 overflow-hidden bg-[#061c1e]">
                  <img
                    src={photo.src}
                    srcSet={photo.srcSet}
                    sizes={photo.sizes}
                    alt={lang === 'es' ? photo.altEs : photo.altEn}
                    width={photo.width}
                    height={photo.height}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                {(photo.captionEn || photo.captionEs) && (
                  <figcaption className="p-5 text-sm text-[#cfe8e4] font-light border-t border-white/10">
                    {lang === 'es' ? photo.captionEs : photo.captionEn}
                  </figcaption>
                )}
              </figure>
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
                  href={menuHref}
                  onClick={e => go(e, menuHref)}
                  className="px-3.5 py-2 rounded-lg bg-[#1c1b18] border border-stone-700 text-stone-200 hover:border-[#c5a059]"
                >
                  {lang === 'es' ? 'Menús' : 'Menus'}
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
                      ? 'Chef Privado en Nuevo Nayarit'
                      : 'Private Chef in Nuevo Nayarit'
                    : lang === 'es'
                    ? 'Chef Privado en Punta Mita'
                    : 'Private Chef in Punta Mita'}
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
      <section className="py-20 bg-[#082528] text-center border-t border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#cfe8e4]">
            {locationKey === 'puntaMita' ? 'Punta Mita · Riviera Nayarit' : 'Nuevo Nayarit · Riviera Nayarit'}
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-white">
            {loc.finalTitle}
          </h2>
          <p className="text-stone-200 text-base sm:text-lg font-light">{loc.finalSub}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={onOpenQuote}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-white text-[#102f33] hover:bg-[#f0f5f4] font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 transition-all"
            >
              <Calendar className="w-4 h-4 text-[#9b1b30]" />
              <span>{loc.ctaPrimary}</span>
              <ArrowRight className="w-4 h-4 text-[#0b6668]" />
            </button>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-lg"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{loc.ctaWhatsapp}</span>
            </a>
            <a
              href={reservarHref}
              onClick={e => go(e, reservarHref)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/30 text-white hover:bg-white/10 font-semibold text-xs uppercase tracking-wider transition-colors"
            >
              <span>{lang === 'es' ? 'Formulario completo' : 'Full booking page'}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
