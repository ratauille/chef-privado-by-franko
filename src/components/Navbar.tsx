import React, { useState } from 'react';
import { Globe, Sparkles, PhoneCall, Menu, X, Calendar } from 'lucide-react';
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react';

interface NavbarProps {
  onOpenQuote: () => void;
  onOpenAI: () => void;
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

const clerkEnabled = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote, onOpenAI, currentPath = '/', onNavigate }) => {
  const [lang, setLang] = useState<'ES' | 'EN'>('ES');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLang = () => {
    setLang(prev => (prev === 'ES' ? 'EN' : 'ES'));
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new Event('popstate'));
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-stone-800/80 text-stone-100 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="flex items-center gap-3 group"
        >
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#181715] to-[#25231f] border border-[#c5a059]/50 flex items-center justify-center text-[#d8b96d] font-serif font-bold text-lg shadow-md group-hover:scale-105 transition-transform overflow-hidden">
            C4Y
          </div>
          <div>
            <div className="font-serif text-lg font-bold tracking-wide text-white group-hover:text-[#d8b96d] transition-colors">
              Chef4You <span className="text-[#c5a059] text-xs font-sans uppercase font-normal tracking-wider block sm:inline sm:ml-1">by Franko</span>
            </div>
            <p className="text-[10px] text-stone-400 font-sans tracking-widest uppercase hidden sm:block">
              Private Chef & Haute Cuisine
            </p>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-300">
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className={`transition-colors hover:text-[#d8b96d] ${currentPath === '/' ? 'text-[#d8b96d] font-semibold' : ''}`}
          >
            Inicio
          </a>
          <a
            href="/experiencias"
            onClick={(e) => handleLinkClick(e, '/experiencias')}
            className={`transition-colors hover:text-[#d8b96d] ${currentPath === '/experiencias' ? 'text-[#d8b96d] font-semibold' : ''}`}
          >
            Experiencias
          </a>
          <a
            href="/galeria"
            onClick={(e) => handleLinkClick(e, '/galeria')}
            className={`transition-colors hover:text-[#d8b96d] ${currentPath === '/galeria' ? 'text-[#d8b96d] font-semibold' : ''}`}
          >
            Galería
          </a>
          <a
            href="/chef-franko"
            onClick={(e) => handleLinkClick(e, '/chef-franko')}
            className={`transition-colors hover:text-[#d8b96d] ${currentPath === '/chef-franko' ? 'text-[#d8b96d] font-semibold' : ''}`}
          >
            Chef Franko
          </a>
          <a
            href="/reservar"
            onClick={(e) => handleLinkClick(e, '/reservar')}
            className={`transition-colors hover:text-[#d8b96d] ${currentPath === '/reservar' ? 'text-[#d8b96d] font-semibold' : ''}`}
          >
            Reservar
          </a>
          <a
            href="/admin"
            onClick={(e) => handleLinkClick(e, '/admin')}
            className="hover:text-[#d8b96d] transition-colors text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-[#161513] border border-stone-800 text-stone-400"
          >
            Admin
          </a>
        </nav>

        {/* Actions & Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#141312] border border-stone-800 hover:border-stone-600 text-stone-200 text-xs font-bold transition-all shadow-xs"
            title="Cambiar Idioma"
            aria-label="Cambiar Idioma"
          >
            <Globe className="w-3.5 h-3.5 text-[#c5a059]" />
            <span>{lang === 'ES' ? '🇲🇽 ES' : '🇺🇸 EN'}</span>
          </button>

          {clerkEnabled && (
            <>
              <Show when="signed-out">
                <SignInButton mode="modal">
                  <button className="hidden sm:inline-flex px-3 py-2 rounded-xl border border-stone-800 text-xs font-semibold text-stone-300 hover:border-[#c5a059] hover:text-[#d8b96d] transition-colors">
                    Iniciar sesión
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="hidden sm:inline-flex px-3 py-2 rounded-xl bg-[#1c1b18] border border-[#c5a059]/40 text-xs font-semibold text-[#d8b96d] hover:bg-[#252420] transition-colors">
                    Crear cuenta
                  </button>
                </SignUpButton>
              </Show>

              <Show when="signed-in">
                <UserButton />
              </Show>
            </>
          )}

          {/* Franko AI Button */}
          <button
            onClick={onOpenAI}
            aria-label="Abrir Franko AI"
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#181715] border border-[#c5a059]/40 text-[#d8b96d] hover:bg-[#22201c] transition-colors text-xs font-semibold"
          >
            <Sparkles className="w-4 h-4 text-[#c5a059]" />
            <span className="hidden lg:inline">Franko AI</span>
          </button>

          {/* Quote Button CTA */}
          <a
            href="/reservar"
            onClick={(e) => {
              e.preventDefault();
              onOpenQuote();
            }}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d8b96d] to-[#9e7c33] hover:brightness-110 text-stone-950 font-bold text-xs sm:text-sm shadow-md transition-all transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Calendar className="w-4 h-4" />
            <span>Cotizar Evento</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir Menú Móvil"
            className="md:hidden p-2 rounded-xl text-stone-300 hover:bg-stone-900 border border-stone-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-800 bg-[#0d0d0d] px-6 py-5 space-y-4 shadow-2xl">
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className={`block py-2 text-sm font-medium text-stone-200 ${currentPath === '/' ? 'text-[#d8b96d] font-bold' : ''}`}
          >
            Inicio
          </a>
          <a
            href="/experiencias"
            onClick={(e) => handleLinkClick(e, '/experiencias')}
            className={`block py-2 text-sm font-medium text-stone-200 ${currentPath === '/experiencias' ? 'text-[#d8b96d] font-bold' : ''}`}
          >
            Experiencias de Autor
          </a>
          <a
            href="/galeria"
            onClick={(e) => handleLinkClick(e, '/galeria')}
            className={`block py-2 text-sm font-medium text-stone-200 ${currentPath === '/galeria' ? 'text-[#d8b96d] font-bold' : ''}`}
          >
            Galería Gastronómica
          </a>
          <a
            href="/chef-franko"
            onClick={(e) => handleLinkClick(e, '/chef-franko')}
            className={`block py-2 text-sm font-medium text-stone-200 ${currentPath === '/chef-franko' ? 'text-[#d8b96d] font-bold' : ''}`}
          >
            Chef Franko Salgado
          </a>
          <a
            href="/reservar"
            onClick={(e) => handleLinkClick(e, '/reservar')}
            className={`block py-2 text-sm font-medium text-stone-200 ${currentPath === '/reservar' ? 'text-[#d8b96d] font-bold' : ''}`}
          >
            Reservar & Cotizar
          </a>
          <a
            href="/admin"
            onClick={(e) => handleLinkClick(e, '/admin')}
            className="block py-2 text-sm font-bold text-[#c5a059]"
          >
            Panel de Administración
          </a>

          <div className="pt-4 border-t border-stone-800/80 flex items-center justify-between">
            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="px-4 py-2 rounded-xl border border-stone-800 text-xs font-semibold text-stone-200">
                  Iniciar sesión
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-4 py-2 rounded-xl bg-[#c5a059] text-stone-950 font-bold text-xs">
                  Crear cuenta
                </button>
              </SignUpButton>
            </Show>

            <Show when="signed-in">
              <UserButton />
            </Show>
          </div>
        </div>
      )}
    </header>
  );
};
