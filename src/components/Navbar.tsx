import React, { useState } from 'react';
import { Menu, X, Calendar, Sparkles, Globe } from 'lucide-react';
import { useLanguage } from '../lib/i18n';

interface NavbarProps {
  onOpenQuote: () => void;
  onOpenAI: () => void;
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenQuote,
  onOpenAI,
  currentPath = '/',
  onNavigate,
}) => {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const go = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setOpen(false);
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new Event('popstate'));
    }
  };

  const links = [
    { path: '/experiencias', label: t.nav.experiences },
    { path: '/chef-franko', label: t.nav.chefFranko },
    { path: '/galeria', label: t.nav.gallery },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-stone-800/80 text-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <a href="/" onClick={e => go(e, '/')} className="font-serif text-lg sm:text-2xl font-bold tracking-wide text-white group">
          Chef 4 You{' '}
          <span className="text-[#c5a059] text-xs font-sans uppercase tracking-[0.2em] ml-1 transition-colors group-hover:text-[#d8b96d]">
            by Franko
          </span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.16em] font-semibold text-stone-300">
          {links.map(({ path, label }) => (
            <a
              key={path}
              href={path}
              onClick={e => go(e, path)}
              className={`transition-colors py-1 ${
                currentPath === path
                  ? 'text-[#d8b96d] border-b-2 border-[#c5a059]'
                  : 'hover:text-[#d8b96d]'
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Actions & Language Switcher */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Language Toggle Pill */}
          <div className="flex items-center p-1 rounded-full bg-[#161513] border border-stone-800 text-[11px] font-mono">
            <button
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 rounded-full transition-all ${
                lang === 'en'
                  ? 'bg-[#c5a059] text-stone-950 font-bold shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang('es')}
              className={`px-2 py-0.5 rounded-full transition-all ${
                lang === 'es'
                  ? 'bg-[#c5a059] text-stone-950 font-bold shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              ES
            </button>
          </div>

          {/* AI Assistant Trigger */}
          <button
            onClick={onOpenAI}
            aria-label="Abrir asistente Franko AI"
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#181715] hover:bg-[#22201d] border border-[#c5a059]/40 text-[#d8b96d] text-xs font-semibold transition-all hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#c5a059] animate-pulse" />
            <span>Franko AI</span>
          </button>

          {/* Primary CTA Button */}
          <button
            onClick={onOpenQuote}
            className="inline-flex items-center gap-2 px-3.5 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d8b96d] to-[#9e7c33] text-stone-950 font-bold text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition-all active:scale-95"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.nav.requestExperience}</span>
            <span className="sm:hidden">{lang === 'es' ? 'Cotizar' : 'Book'}</span>
          </button>

          {/* WhatsApp CTA Button */}
          <a
            id="navbar-whatsapp-btn"
            href="https://wa.me/5213221606843?text=Hola%20Chef%20Franko%2C%20quisiera%20informaci%C3%B3n%20para%20una%20experiencia%20de%20chef%20privado."
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.nav.whatsappCta}
            className="hidden sm:inline-flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all active:scale-95"
          >
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span className="hidden lg:inline">{t.nav.whatsappCta}</span>
            <span className="lg:hidden">WhatsApp</span>
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-xl border border-stone-800 text-stone-300 hover:text-white hover:bg-stone-900"
            aria-label={open ? t.nav.close : t.nav.menu}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden border-t border-stone-800 bg-[#0d0d0d] px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          {links.map(({ path, label }) => (
            <a
              key={path}
              href={path}
              onClick={e => go(e, path)}
              className={`block py-2 text-sm uppercase tracking-wider ${
                currentPath === path ? 'text-[#d8b96d] font-bold' : 'text-stone-300'
              }`}
            >
              {label}
            </a>
          ))}

          <div className="pt-3 border-t border-stone-800 flex flex-col gap-3">
            <button
              onClick={() => {
                setOpen(false);
                onOpenAI();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#181715] border border-[#c5a059]/40 text-[#d8b96d] text-xs font-bold"
            >
              <Sparkles className="w-4 h-4 text-[#c5a059]" />
              <span>Franko AI Assistant</span>
            </button>

            <button
              onClick={() => {
                setOpen(false);
                onOpenQuote();
              }}
              className="w-full py-3.5 rounded-xl bg-[#c5a059] text-stone-950 font-bold text-xs uppercase tracking-wider"
            >
              {t.nav.requestExperience}
            </button>

            {/* WhatsApp mobile */}
            <a
              id="navbar-mobile-whatsapp-btn"
              href="https://wa.me/5213221606843?text=Hola%20Chef%20Franko%2C%20quisiera%20informaci%C3%B3n%20para%20una%20experiencia%20de%20chef%20privado."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              {t.nav.whatsappCta}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};