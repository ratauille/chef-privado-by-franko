import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, MapPin, Menu, Star, X, Sparkles } from 'lucide-react';
import { useLanguage } from '../lib/i18n';

const WA_HREF = 'https://wa.me/5213221606843?text=Hola%20Chef%20Franko%2C%20quisiera%20informaci%C3%B3n%20para%20una%20experiencia%20de%20chef%20privado.';

const WhatsAppIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const FacebookIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.883v2.27h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
  </svg>
);

const InstagramIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);


interface HomePageProps {
  onOpenQuote: () => void;
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenQuote, onNavigate }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const { lang, setLang, t } = useLanguage();

  const go = (event: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    event.preventDefault();
    setMenuOpen(false);
    onNavigate(path);
  };

  const experienceImages = [
    '/assets/banquete_gala_frente_al_mar.jpg',
    '/assets/cena_degustacion_5_tiempos.png',
    '/assets/IMG_1937.jpg',
  ];

  const signatureExperiences = t.experiences.items.slice(0, 3);

  return (
    <div className="min-h-screen overflow-hidden bg-[#f7f8f5] text-[#102f33] selection:bg-[#0e7778] selection:text-white">
      {/* Header */}
      <header className="absolute inset-x-0 top-0 z-40 border-b border-white/20 text-white">
        <div className="mx-auto flex h-24 max-w-[1480px] items-center justify-between px-6 lg:px-12">
          <a href="/" onClick={event => go(event, '/')} className="font-serif text-2xl tracking-wide group">
            Chef 4 You{' '}
            <span className="ml-1 font-sans text-[10px] font-semibold uppercase tracking-[0.28em] text-[#bfe0dc] transition-colors group-hover:text-white">
              by Franko
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-9 text-xs font-semibold uppercase tracking-[0.16em] lg:flex">
            <a href="/experiencias" onClick={event => go(event, '/experiencias')} className="transition-colors hover:text-[#bfe0dc]">
              {t.nav.experiences}
            </a>
            <a href="/chef-franko" onClick={event => go(event, '/chef-franko')} className="transition-colors hover:text-[#bfe0dc]">
              {t.nav.chefFranko}
            </a>
            <a href="/galeria" onClick={event => go(event, '/galeria')} className="transition-colors hover:text-[#bfe0dc]">
              {t.nav.gallery}
            </a>
          </nav>

          {/* Actions & Language Switcher */}
          <div className="flex items-center gap-3">
            {/* Language Switcher Pill */}
            <div className="flex items-center p-1 rounded-full bg-black/40 border border-white/20 text-[11px] font-mono backdrop-blur-md">
              <button
                onClick={() => setLang('en')}
                className={`px-2 py-0.5 rounded-full transition-all ${
                  lang === 'en'
                    ? 'bg-white text-[#124e52] font-bold shadow-sm'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('es')}
                className={`px-2 py-0.5 rounded-full transition-all ${
                  lang === 'es'
                    ? 'bg-white text-[#124e52] font-bold shadow-sm'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                ES
              </button>
            </div>

            <button
              onClick={onOpenQuote}
              className="hidden rounded-full border border-white/55 px-6 py-3 text-xs font-bold uppercase tracking-[0.12em] transition hover:bg-white hover:text-[#124e52] sm:inline-flex active:scale-95"
            >
              {t.nav.requestExperience}
            </button>

            {/* WhatsApp desktop header */}
            <a
              id="homepage-header-whatsapp-btn"
              href={WA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t.nav.whatsappCta}
              className="hidden rounded-full px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] transition active:scale-95 sm:inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white"
            >
              <WhatsAppIcon className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">{t.nav.whatsappCta}</span>
              <span className="lg:hidden">WhatsApp</span>
            </a>

            <button
              onClick={() => setMenuOpen(value => !value)}
              className="rounded-full border border-white/40 p-2.5 lg:hidden"
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="mx-4 rounded-2xl bg-[#0d4145]/95 p-6 shadow-2xl backdrop-blur-xl lg:hidden animate-in slide-in-from-top-4 duration-200">
            <div className="space-y-4 text-sm uppercase tracking-[0.14em]">
              <a href="/experiencias" onClick={event => go(event, '/experiencias')} className="block py-1 hover:text-[#bfe0dc]">
                {t.nav.experiences}
              </a>
              <a href="/chef-franko" onClick={event => go(event, '/chef-franko')} className="block py-1 hover:text-[#bfe0dc]">
                {t.nav.chefFranko}
              </a>
              <a href="/galeria" onClick={event => go(event, '/galeria')} className="block py-1 hover:text-[#bfe0dc]">
                {t.nav.gallery}
              </a>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  onOpenQuote();
                }}
                className="w-full rounded-full bg-white px-5 py-3 font-bold text-[#124e52] mt-4"
              >
                {t.nav.requestExperience}
              </button>
              {/* WhatsApp mobile menu */}
              <a
                id="homepage-mobile-whatsapp-btn"
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 w-full flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] px-5 py-3 font-bold text-white text-xs uppercase tracking-[0.12em] transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
                {t.nav.whatsappCta}
              </a>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative flex min-h-[94vh] items-end overflow-hidden bg-[#0d4145] text-white">
          <img
            src="/assets/chef_franko_team.webp"
            alt="Chef Franko hosting a private dining experience"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,42,45,.92)_0%,rgba(7,42,45,.62)_48%,rgba(7,42,45,.18)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(6,34,37,.65)_0%,transparent_48%)]" />

          <motion.div
            className="relative mx-auto w-full max-w-[1480px] px-6 pb-16 pt-44 lg:px-12 lg:pb-24"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <p className="mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.26em] text-[#bfe0dc]">
              <span className="h-px w-10 bg-[#bfe0dc]" />
              {t.hero.badge}
            </p>
            <h1 className="max-w-4xl font-serif text-5xl font-light leading-[0.98] sm:text-7xl lg:text-[96px]">
              {t.hero.titleLine1}
              <br />
              <span className="italic text-[#cfe8e4]">{t.hero.titleLine2}</span>
            </h1>
            <p className="mt-8 max-w-xl text-base font-light leading-8 text-white/78 sm:text-lg">
              {t.hero.subtitle}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <button
                onClick={onOpenQuote}
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#f6f5ef] px-7 py-4 text-sm font-bold text-[#124e52] shadow-[0_18px_45px_rgba(0,0,0,.18)] transition hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
              >
                <Calendar className="h-4 w-4" /> {t.hero.ctaPrimary} <ArrowRight className="h-4 w-4" />
              </button>
              {/* WhatsApp Hero CTA */}
              <a
                id="hero-whatsapp-btn"
                href={WA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] px-7 py-4 text-sm font-bold text-white shadow-[0_18px_45px_rgba(37,211,102,.22)] transition hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {t.nav.whatsappCta}
              </a>
              <a
                href="/experiencias"
                onClick={event => go(event, '/experiencias')}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 px-7 py-4 text-sm font-semibold transition hover:bg-white/10"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>
              {/* Social Links Row */}
              <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/50">
                  {t.nav.socialLabel}
                </span>
                {/* WhatsApp */}
                <a
                  id="hero-social-whatsapp-btn"
                  href={WA_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t.nav.followWhatsApp}
                  className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold text-white backdrop-blur-sm transition hover:bg-[#25D366] hover:border-[#25D366] hover:-translate-y-0.5 active:scale-95"
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
            </motion.div>
          </section>

        {/* Location Sub-banner */}
        <section className="border-b border-[#153f42]/10 bg-[#eef3ef] px-6 py-6 lg:px-12">
          <div className="mx-auto flex max-w-[1480px] flex-col justify-between gap-4 text-xs font-semibold uppercase tracking-[0.18em] text-[#315d60] sm:flex-row sm:items-center">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#0e7778]" />
              {t.hero.locationBar}
            </span>
            <span>{t.hero.serviceTag}</span>
          </div>
        </section>

        {/* Curated Experiences Showcase */}
        <section className="px-6 py-24 lg:px-12 lg:py-36">
          <div className="mx-auto max-w-[1480px]">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#0e7778]">{t.home.curatedTitle}</p>
                <h2 className="mt-5 max-w-4xl font-serif text-4xl font-light leading-[1.05] text-[#153f42] sm:text-6xl">
                  {t.home.curatedSubtitle} <span className="italic text-[#0e7778]">{lang === 'es' ? 'elijas reunirte.' : 'you choose to gather.'}</span>
                </h2>
              </div>
              <p className="max-w-md leading-7 text-[#557174] lg:col-span-4">{t.home.curatedCopy}</p>
            </div>

            <div className="mt-16 grid gap-7 lg:grid-cols-3">
              {signatureExperiences.map((experience, index) => (
                <motion.article
                  key={experience.title}
                  className="group overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_70px_rgba(25,67,69,.10)] flex flex-col"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className="h-80 overflow-hidden">
                    <img
                      src={experienceImages[index] || experienceImages[0]}
                      alt={experience.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#0e7778]">
                      0{index + 1} · {t.home.signatureTag}
                    </p>
                    <h3 className="mt-4 font-serif text-3xl text-[#153f42]">{experience.title}</h3>
                    <p className="mt-4 min-h-20 leading-7 text-[#60787a] flex-1">{experience.desc}</p>
                    <button
                      onClick={onOpenQuote}
                      className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0e6f71] group-hover:text-[#0b5052] transition-colors"
                    >
                      {experience.cta} <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Chef Bio Editorial Showcase */}
        <section className="bg-[#123f43] px-6 py-24 text-white lg:px-12 lg:py-32">
          <div className="mx-auto grid max-w-[1480px] gap-14 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-5">
              <img
                src="/assets/chef_franko_brigada.jpg"
                alt="Chef Franko and his culinary team"
                className="h-[560px] w-full rounded-[2.25rem] object-cover shadow-2xl"
              />
            </div>
            <div className="lg:col-span-7 lg:pl-10">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#9ed3cf]">{t.home.bioBadge}</p>
              <h2 className="mt-6 font-serif text-4xl font-light leading-[1.08] sm:text-6xl">
                {t.home.bioTitle1}
                <br />
                <span className="italic text-[#bfe0dc]">{t.home.bioTitle2}</span>
              </h2>
              <p className="mt-7 max-w-2xl text-lg font-light leading-8 text-white/72">{t.home.bioText}</p>
              <a
                href="/chef-franko"
                onClick={event => go(event, '/chef-franko')}
                className="mt-9 inline-flex items-center gap-3 border-b border-[#9ed3cf]/70 pb-2 text-sm font-bold text-[#cfe8e4] hover:text-white transition-colors"
              >
                {t.home.bioCta} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Testimonial Quote */}
        <section className="bg-white px-6 py-24 text-center lg:px-12 lg:py-32">
          <div className="mx-auto max-w-4xl">
            <div className="flex justify-center gap-1 text-[#0e7778]">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="mt-8 font-serif text-3xl font-light leading-snug text-[#153f42] sm:text-5xl">
              {t.home.testimonialQuote}
            </p>
            <p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-[#668082]">
              {t.home.testimonialAuthor}
            </p>
          </div>
        </section>

        {/* Final CTA Bar */}
        <section className="relative overflow-hidden bg-[#e5efeb] px-6 py-24 text-center lg:px-12 lg:py-32">
          <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#5eb3ad]/15 blur-3xl" />
          <div className="relative mx-auto max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#0e7778]">
              {lang === 'es' ? 'Tu mesa te espera' : 'Your table awaits'}
            </p>
            <h2 className="mt-5 font-serif text-4xl font-light text-[#153f42] sm:text-6xl">
              {lang === 'es'
                ? 'Permítenos crear una velada que pertenezca solo a ti.'
                : 'Let us create an evening that belongs only to you.'}
            </h2>
            <button
              onClick={onOpenQuote}
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#0e6f71] px-8 py-4 text-sm font-bold text-white shadow-[0_18px_40px_rgba(14,111,113,.22)] transition hover:-translate-y-0.5 active:scale-95 hover:bg-[#0b5052]"
            >
              {t.hero.ctaPrimary} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#082f33] px-6 py-14 text-white/70 lg:px-12">
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
            <a href="/experiencias" onClick={event => go(event, '/experiencias')} className="hover:text-[#bfe0dc]">
              {t.nav.experiences}
            </a>
            <a href="/chef-franko" onClick={event => go(event, '/chef-franko')} className="hover:text-[#bfe0dc]">
              {t.nav.chefFranko}
            </a>
            <a href="/galeria" onClick={event => go(event, '/galeria')} className="hover:text-[#bfe0dc]">
              {t.nav.gallery}
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
