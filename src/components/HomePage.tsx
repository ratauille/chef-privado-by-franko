import React from 'react';
import { ArrowRight, Calendar, MapPin, Menu, Star, X, Sparkles } from 'lucide-react';
import { useLanguage } from '../lib/i18n';

const WA_HREF =
  'https://wa.me/5213221606843?text=Hola%20Chef%20Franko%2C%20quisiera%20informaci%C3%B3n%20para%20una%20experiencia%20de%20chef%20privado.';

const WhatsAppIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const FacebookIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.883v2.27h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
  </svg>
);

const InstagramIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

interface HomePageProps {
  onOpenQuote: () => void;
  onOpenAI?: () => void;
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenQuote, onOpenAI, onNavigate }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { lang, setLang, t } = useLanguage();

  const waHref = `https://wa.me/5213221606843?text=${encodeURIComponent(t.nav.whatsappMessage)}`;
  const prefix = lang === 'es' ? '/es' : '';
  const experiencesPath = `${prefix}/experiencias/`;
  const puntaMitaPath = lang === 'es' ? '/es/chef-privado-punta-mita/' : '/private-chef-punta-mita/';
  const nuevoNayaritPath = lang === 'es' ? '/es/chef-privado-nuevo-nayarit/' : '/private-chef-nuevo-nayarit/';
  const chefFrankoPath = `${prefix}/chef-franko/`;
  const galleryPath = `${prefix}/galeria/`;
  const reservarPath = `${prefix}/reservar/`;

  const go = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault();
    setMenuOpen(false);
    onNavigate(path);
  };

  const experienceImages = [
    '/assets/banquete_gala_frente_al_mar.jpg',
    '/assets/cena_degustacion_5_tiempos.webp',
    '/assets/IMG_1937.webp',
  ];

  const signatureExperiences = t.experiences.items.slice(0, 3);
  const signatureImageAlts = [
    'Luxury private banquet dish with edible flowers at a private dinner',
    'Five-course private tasting dinner in Puerto Vallarta',
    'Private dining experience prepared by Chef Franko with plated lamb and fish',
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f8f5] text-[#102f33] selection:bg-[#0e7778] selection:text-white">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2.5 focus:bg-[#0e6f71] focus:text-white focus:font-bold focus:rounded-xl focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-white"
      >
        {lang === 'es' ? 'Saltar al contenido' : 'Skip to main content'}
      </a>
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-40 border-b border-white/20 text-white">
        <div className="mx-auto flex h-24 max-w-[1480px] items-center justify-between px-6 lg:px-12">
          <a href={prefix ? `${prefix}/` : '/'} onClick={event => go(event, prefix ? `${prefix}/` : '/')} className="font-serif text-2xl tracking-wide group">
            Chef 4 You{' '}
            <span className="ml-1 font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-[#bfe0dc] transition-colors group-hover:text-white">
              by Franko
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-7 text-xs font-semibold uppercase tracking-[0.16em] lg:flex">
            <a href={experiencesPath} onClick={event => go(event, experiencesPath)} className="transition-colors hover:text-[#bfe0dc]">
              {t.nav.experiences}
            </a>
            <a href={puntaMitaPath} onClick={event => go(event, puntaMitaPath)} className="transition-colors hover:text-[#bfe0dc]">
              {t.nav.puntaMita}
            </a>
            <a href={nuevoNayaritPath} onClick={event => go(event, nuevoNayaritPath)} className="transition-colors hover:text-[#bfe0dc]">
              {t.nav.nuevoNayarit}
            </a>
            <a href={chefFrankoPath} onClick={event => go(event, chefFrankoPath)} className="transition-colors hover:text-[#bfe0dc]">
              {t.nav.chefFranko}
            </a>
            <a href={galleryPath} onClick={event => go(event, galleryPath)} className="transition-colors hover:text-[#bfe0dc]">
              {t.nav.gallery}
            </a>
            <a href={reservarPath} onClick={event => go(event, reservarPath)} className="transition-colors hover:text-[#bfe0dc]">
              {lang === 'es' ? 'Reservar' : 'Book'}
            </a>
          </nav>

          {/* Actions & Language Switcher */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Language Switcher Pill */}
            <div className="flex items-center p-1 rounded-full bg-black/40 border border-white/20 text-[11px] font-mono backdrop-blur-md">
              <button
                type="button"
                onClick={() => setLang('en')}
                aria-label="EN - English"
                className={`px-2 py-0.5 rounded-full transition-all ${
                  lang === 'en'
                    ? 'bg-white text-[#124e52] font-bold shadow-sm'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang('es')}
                aria-label="ES - Español"
                className={`px-2 py-0.5 rounded-full transition-all ${
                  lang === 'es'
                    ? 'bg-white text-[#124e52] font-bold shadow-sm'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                ES
              </button>
            </div>

            {onOpenAI && (
              <button
                type="button"
                onClick={onOpenAI}
                aria-label="Franko AI"
                className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-[#d8b96d]/60 bg-black/35 px-4 py-2.5 text-xs font-bold text-[#f3dca2] backdrop-blur-sm transition hover:bg-black/55 active:scale-95"
              >
                <Sparkles className="h-3.5 w-3.5 text-[#d8b96d]" />
                <span>Franko AI</span>
              </button>
            )}

            <button
              type="button"
              onClick={onOpenQuote}
              className="hidden rounded-full border border-white/55 px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] transition hover:bg-white hover:text-[#124e52] sm:inline-flex active:scale-95"
            >
              {t.nav.requestExperience}
            </button>

            {/* WhatsApp desktop header */}
            <a
              id="homepage-header-whatsapp-btn"
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.nav.whatsappCta}
              className="hidden rounded-full px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] transition active:scale-95 sm:inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-stone-950"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span className="hidden xl:inline">{t.nav.whatsappCta}</span>
              <span className="xl:hidden">WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen(value => !value)}
              className="rounded-full border border-white/40 p-2.5 lg:hidden"
              aria-label={menuOpen ? t.nav.close : t.nav.menu}
              aria-expanded={menuOpen}
              aria-controls="homepage-mobile-nav"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div id="homepage-mobile-nav" className="mx-4 rounded-2xl bg-[#0d4145]/95 p-6 shadow-2xl backdrop-blur-xl lg:hidden animate-in slide-in-from-top-4 duration-200">
            <div className="space-y-4 text-sm uppercase tracking-[0.14em]">
              <a href={experiencesPath} onClick={event => go(event, experiencesPath)} className="block py-1 hover:text-[#bfe0dc]">
                {t.nav.experiences}
              </a>
              <a href={puntaMitaPath} onClick={event => go(event, puntaMitaPath)} className="block py-1 hover:text-[#bfe0dc]">
                {t.nav.puntaMita}
              </a>
              <a href={nuevoNayaritPath} onClick={event => go(event, nuevoNayaritPath)} className="block py-1 hover:text-[#bfe0dc]">
                {t.nav.nuevoNayarit}
              </a>
              <a href={chefFrankoPath} onClick={event => go(event, chefFrankoPath)} className="block py-1 hover:text-[#bfe0dc]">
                {t.nav.chefFranko}
              </a>
              <a href={galleryPath} onClick={event => go(event, galleryPath)} className="block py-1 hover:text-[#bfe0dc]">
                {t.nav.gallery}
              </a>
              <a href={reservarPath} onClick={event => go(event, reservarPath)} className="block py-1 hover:text-[#bfe0dc]">
                {lang === 'es' ? 'Reservar' : 'Book'}
              </a>

              {onOpenAI && (
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenAI();
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-full border border-[#d8b96d]/60 bg-black/35 px-5 py-3 text-xs font-bold text-[#f3dca2]"
                >
                  <Sparkles className="w-4 h-4 text-[#d8b96d]" />
                  <span>Franko AI Assistant</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full rounded-full bg-white px-5 py-3 font-bold text-[#124e52] mt-2"
              >
                {t.nav.requestExperience}
              </button>

              {/* WhatsApp mobile menu */}
              <a
                id="homepage-mobile-whatsapp-btn"
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 w-full flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] px-5 py-3 font-bold text-stone-950 text-xs uppercase tracking-[0.12em] transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
                {t.nav.whatsappCta}
              </a>
            </div>
          </div>
        )}
      </header>

      <main id="main-content" tabIndex={-1} className="outline-none">
        {/* Hero Section — Instant paint without JS opacity delay for fast mobile LCP */}
        <section className="relative flex min-h-[92vh] items-end overflow-hidden bg-[#0d4145] text-white">
          <img
            src="/assets/chef_franko_team.webp"
            alt="Chef Franko Salgado and his culinary team preparing a private dining experience in Puerto Vallarta"
            width={1024}
            height={722}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,42,45,.92)_0%,rgba(7,42,45,.62)_48%,rgba(7,42,45,.18)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(6,34,37,.65)_0%,transparent_48%)]" />

          <div className="relative mx-auto w-full max-w-[1480px] px-6 pb-16 pt-40 sm:pt-44 lg:px-12 lg:pb-24">
            <h1 className="max-w-4xl">
              <span className="mb-6 flex items-center gap-3 font-sans text-xs font-semibold uppercase tracking-[0.26em] text-[#bfe0dc]">
                <span className="h-px w-10 bg-[#bfe0dc]" />
                {t.hero.badge}
              </span>
              <span className="block font-serif text-5xl font-light leading-[0.98] sm:text-7xl lg:text-[96px]">
                {t.hero.titleLine1}
                <br />
                <span className="italic text-[#cfe8e4]">{t.hero.titleLine2}</span>
              </span>
            </h1>
            <p className="mt-7 max-w-xl text-base font-light leading-7 sm:leading-8 text-white/85 sm:text-lg">
              {t.hero.subtitle}
            </p>
            <div className="mt-9 flex flex-col gap-3.5 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={onOpenQuote}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#f6f5ef] px-7 py-4 text-sm font-bold text-[#124e52] shadow-[0_18px_45px_rgba(0,0,0,.18)] transition hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
              >
                <Calendar className="h-4 w-4" /> {t.hero.ctaPrimary} <ArrowRight className="h-4 w-4" />
              </button>
              {/* WhatsApp Hero CTA */}
              <a
                id="hero-whatsapp-btn"
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] px-7 py-4 text-sm font-bold text-stone-950 shadow-[0_18px_45px_rgba(37,211,102,.22)] transition hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {t.nav.whatsappCta}
              </a>
              <a
                href={experiencesPath}
                onClick={event => go(event, experiencesPath)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-4 text-sm font-semibold transition hover:bg-white/10"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>

            {/* Social Links Row */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80">
                {t.nav.socialLabel}
              </span>
              {/* WhatsApp */}
              <a
                id="hero-social-whatsapp-btn"
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.nav.followWhatsApp}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-[#25D366] hover:text-stone-950 hover:border-[#25D366] hover:-translate-y-0.5 active:scale-95"
              >
                <WhatsAppIcon className="h-3.5 w-3.5 shrink-0" />
                <span>{t.nav.followWhatsApp}</span>
              </a>
              {/* Facebook */}
              <a
                id="hero-social-facebook-btn"
                href="https://www.facebook.com/1847927896"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.nav.followFacebook}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-[#1877F2] hover:border-[#1877F2] hover:-translate-y-0.5 active:scale-95"
              >
                <FacebookIcon className="h-3.5 w-3.5 shrink-0" />
                <span>{t.nav.followFacebook}</span>
              </a>
              {/* Instagram */}
              <a
                id="hero-social-instagram-btn"
                href="https://www.instagram.com/franko_s83"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.nav.followInstagram}
                className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-gradient-to-r hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] hover:border-transparent hover:-translate-y-0.5 active:scale-95"
              >
                <InstagramIcon className="h-3.5 w-3.5 shrink-0" />
                <span>{t.nav.followInstagram}</span>
              </a>
            </div>
          </div>
        </section>

        {/* Location Sub-banner */}
        <section className="border-b border-[#153f42]/10 bg-[#eef3ef] px-6 py-6 lg:px-12">
          <div className="mx-auto flex max-w-[1480px] flex-col justify-between gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#315d60] sm:flex-row sm:items-center">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#0b6668]" />
              {t.hero.locationBar}
            </span>
            <span>{t.hero.serviceTag}</span>
          </div>
        </section>

        {/* Curated Experiences Showcase */}
        <section className="px-6 py-20 lg:px-12 lg:py-32">
          <div className="mx-auto max-w-[1480px]">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#0b6668]">{t.home.curatedTitle}</p>
                <h2 className="mt-5 max-w-4xl font-serif text-4xl font-light leading-[1.05] text-[#153f42] sm:text-6xl">
                  {t.home.curatedSubtitle}{' '}
                  <span className="italic text-[#0b6668]">
                    {lang === 'es' ? 'elijas reunirte.' : 'you choose to gather.'}
                  </span>
                </h2>
              </div>
              <p className="max-w-md leading-7 text-[#4a6466] lg:col-span-4">{t.home.curatedCopy}</p>
            </div>

            <div className="mt-14 grid gap-7 lg:grid-cols-3">
              {signatureExperiences.map((experience, index) => (
                <article
                  key={experience.title}
                  className="group overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_70px_rgba(25,67,69,.10)] flex flex-col transition-transform duration-300 hover:-translate-y-1"
                >
                  <div className="h-72 sm:h-80 overflow-hidden bg-[#dce5e2]">
                    <img
                      src={experienceImages[index] || experienceImages[0]}
                      alt={signatureImageAlts[index] || signatureImageAlts[0]}
                      width={800}
                      height={600}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-7 sm:p-8 flex flex-col flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#0b6668]">
                      0{index + 1} · {t.home.signatureTag}
                    </p>
                    <h3 className="mt-4 font-serif text-3xl text-[#153f42]">{experience.title}</h3>
                    <p className="mt-4 min-h-20 leading-7 text-[#4a6466] flex-1">{experience.desc}</p>
                    <button
                      type="button"
                      onClick={onOpenQuote}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0b6668] group-hover:text-[#084c4e] transition-colors"
                    >
                      {experience.cta} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works / Full-Service Inclusion */}
        <section className="bg-[#eef3ef] px-6 py-20 lg:px-12 lg:py-28 border-y border-[#153f42]/10">
          <div className="mx-auto max-w-[1480px]">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#0b6668]">
              {t.home.processBadge}
            </p>
            <h2 className="mt-4 max-w-3xl font-serif text-3xl font-light text-[#153f42] sm:text-5xl">
              {t.home.processTitle}
            </h2>
            <div className="mt-12 grid gap-8 lg:grid-cols-3">
              {t.home.processSteps.map(item => (
                <div
                  key={item.step}
                  className="rounded-3xl bg-white p-8 shadow-[0_14px_40px_rgba(21,63,66,0.06)] border border-[#153f42]/10"
                >
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#0b6668]">
                    {item.step}
                  </span>
                  <h3 className="mt-3 font-serif text-2xl text-[#153f42]">{item.title}</h3>
                  <p className="mt-3 leading-7 text-[#4a6466] text-sm sm:text-base">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Destinations Served (Puerto Vallarta, Punta Mita, Nuevo Nayarit) */}
        <section className="px-6 py-20 lg:px-12 lg:py-28 bg-[#f7f8f5]">
          <div className="mx-auto max-w-[1480px]">
            <div className="max-w-3xl">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#0b6668]">
                {t.home.destinationsBadge}
              </p>
              <h2 className="mt-4 font-serif text-3xl font-light text-[#153f42] sm:text-5xl">
                {t.home.destinationsTitle}
              </h2>
              <p className="mt-4 leading-7 text-[#4a6466]">{t.home.destinationsCopy}</p>
            </div>

            <div className="mt-12 grid gap-7 lg:grid-cols-3">
              {t.home.destinations.map(dest => (
                <article
                  key={dest.name}
                  className="rounded-3xl bg-white p-8 shadow-[0_18px_50px_rgba(21,63,66,0.08)] border border-[#153f42]/10 flex flex-col justify-between"
                >
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#0b6668]">
                      {dest.tag}
                    </p>
                    <h3 className="mt-3 font-serif text-3xl text-[#153f42]">{dest.name}</h3>
                    <p className="mt-3 leading-7 text-[#4a6466] text-sm sm:text-base">{dest.desc}</p>
                  </div>
                  <div className="pt-6">
                    <a
                      href={dest.href}
                      onClick={event => go(event, dest.href)}
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#0b6668] hover:text-[#084c4e]"
                    >
                      <span>{dest.cta}</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Chef Bio Editorial Showcase */}
        <section className="bg-[#123f43] px-6 py-20 text-white lg:px-12 lg:py-32">
          <div className="mx-auto grid max-w-[1480px] gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-12">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9ed3cf]">{t.home.bioBadge}</p>
              <h2 className="mt-6 font-serif text-4xl font-light leading-[1.08] sm:text-6xl">
                {t.home.bioTitle1}
                <br />
                <span className="italic text-[#bfe0dc]">{t.home.bioTitle2}</span>
              </h2>
              <p className="mt-7 max-w-2xl text-lg font-light leading-8 text-white/85">{t.home.bioText}</p>
              <a
                href={chefFrankoPath}
                onClick={event => go(event, chefFrankoPath)}
                className="mt-9 inline-flex items-center gap-3 border-b border-[#9ed3cf]/70 pb-2 text-sm font-bold text-[#cfe8e4] hover:text-white transition-colors"
              >
                {t.home.bioCta} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Testimonial Quote */}
        <section className="bg-white px-6 py-20 text-center lg:px-12 lg:py-28 border-b border-[#153f42]/10">
          <div className="mx-auto max-w-4xl">
            <div className="flex justify-center gap-1 text-[#0b6668]">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="mt-8 font-serif text-3xl font-light leading-snug text-[#153f42] sm:text-5xl">
              {t.home.testimonialQuote}
            </p>
            <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-[#4a6466]">
              {t.home.testimonialAuthor}
            </p>
          </div>
        </section>

        {/* Frequently Asked Questions */}
        <section className="bg-[#f7f8f5] px-6 py-20 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#0b6668]">
                {t.home.faqBadge}
              </p>
              <h2 className="mt-4 font-serif text-3xl font-light text-[#153f42] sm:text-5xl">
                {t.home.faqTitle}
              </h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {t.home.faqs.map(faq => (
                <div
                  key={faq.q}
                  className="rounded-3xl bg-white p-7 shadow-[0_12px_35px_rgba(21,63,66,0.06)] border border-[#153f42]/10"
                >
                  <h3 className="font-serif text-xl font-medium text-[#153f42]">{faq.q}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#4a6466]">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Bar */}
        <section className="relative overflow-hidden bg-[#e5efeb] px-6 py-20 text-center lg:px-12 lg:py-32">
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#5eb3ad]/15 blur-3xl" />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#0b6668]">
              {lang === 'es' ? 'Tu mesa te espera' : 'Your table awaits'}
            </p>
            <h2 className="mt-5 font-serif text-4xl font-light text-[#153f42] sm:text-6xl">
              {lang === 'es'
                ? 'Permítenos crear una velada que pertenezca solo a ti.'
                : 'Let us create an evening that belongs only to you.'}
            </h2>
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={onOpenQuote}
                className="inline-flex items-center gap-3 rounded-full bg-[#0e6f71] px-8 py-4 text-sm font-bold text-white shadow-[0_18px_40px_rgba(14,111,113,.22)] transition hover:-translate-y-0.5 active:scale-95 hover:bg-[#0b5052]"
              >
                {t.hero.ctaPrimary} <ArrowRight className="h-4 w-4" />
              </button>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] px-7 py-4 text-sm font-bold text-stone-950 shadow-lg transition hover:-translate-y-0.5 active:scale-95"
              >
                <WhatsAppIcon className="h-4 w-4" />
                <span>{t.nav.whatsappCta}</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#082f33] px-6 py-14 text-white/80 lg:px-12">
        <div className="mx-auto flex max-w-[1480px] flex-col justify-between gap-8 border-b border-white/10 pb-10 md:flex-row md:items-end">
          <div>
            <p className="font-serif text-3xl text-white">
              Chef 4 You{' '}
              <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#9ed3cf]">
                by Franko
              </span>
            </p>
            <p className="mt-3 max-w-md text-sm leading-6">{t.footer.description}</p>
          </div>
          <div className="flex flex-wrap gap-6 text-xs font-semibold uppercase tracking-[0.14em]">
            <a href={experiencesPath} onClick={event => go(event, experiencesPath)} className="hover:text-[#bfe0dc]">
              {t.nav.experiences}
            </a>
            <a href={puntaMitaPath} onClick={event => go(event, puntaMitaPath)} className="hover:text-[#bfe0dc]">
              {t.nav.puntaMita}
            </a>
            <a href={nuevoNayaritPath} onClick={event => go(event, nuevoNayaritPath)} className="hover:text-[#bfe0dc]">
              {t.nav.nuevoNayarit}
            </a>
            <a href={chefFrankoPath} onClick={event => go(event, chefFrankoPath)} className="hover:text-[#bfe0dc]">
              {t.nav.chefFranko}
            </a>
            <a href={galleryPath} onClick={event => go(event, galleryPath)} className="hover:text-[#bfe0dc]">
              {t.nav.gallery}
            </a>
            <a href={reservarPath} onClick={event => go(event, reservarPath)} className="hover:text-[#bfe0dc]">
              {lang === 'es' ? 'Reservar' : 'Book'}
            </a>
          </div>
        </div>
        <div className="mx-auto mt-8 flex max-w-[1480px] flex-col justify-between gap-3 text-xs md:flex-row">
          <span>© {new Date().getFullYear()} Chef 4 You by Franko.</span>
          <span>{t.footer.rights}</span>
        </div>
      </footer>
    </div>
  );
};

