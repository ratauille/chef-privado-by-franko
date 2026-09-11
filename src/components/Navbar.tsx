import React, { useState } from 'react';
import { Globe, Sparkles, PhoneCall, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenQuote: () => void;
  onOpenAI: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuote, onOpenAI }) => {
  const [lang, setLang] = useState<'ES' | 'EN'>('ES');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLang = () => {
    setLang(prev => (prev === 'ES' ? 'EN' : 'ES'));
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 text-stone-900 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-full bg-black border border-[#8c6a24]/40 flex items-center justify-center text-[#8c6a24] font-serif font-bold text-lg shadow-md group-hover:scale-105 transition-transform overflow-hidden">
            C4Y
          </div>
          <div>
            <div className="font-serif text-lg font-bold tracking-wide text-stone-900 group-hover:text-[#8c6a24] transition-colors">
              Chef4You <span className="text-[#8c6a24] text-xs font-sans uppercase font-normal tracking-wider block sm:inline sm:ml-1">by Franko</span>
            </div>
            <p className="text-[10px] text-stone-500 font-sans tracking-widest uppercase hidden sm:block">
              Private Chef & Haute Cuisine
            </p>
          </div>
        </a>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <a href="#experiencias" className="hover:text-[#8c6a24] transition-colors">Experiencias</a>
          <a href="#galeria" className="hover:text-[#8c6a24] transition-colors">Galería</a>
          <a href="#banner-servicios" className="hover:text-[#8c6a24] transition-colors">Servicios</a>
          <a href="#chef-franko" className="hover:text-[#8c6a24] transition-colors">Chef Franko</a>
          <a href="#testimonios" className="hover:text-[#8c6a24] transition-colors">Testimonios</a>
          <a href="/admin" className="hover:text-[#8c6a24] transition-colors text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-stone-100 border border-stone-200">Admin</a>
        </nav>

        {/* Actions & Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher */}
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-stone-200 hover:border-stone-400 text-stone-900 text-xs font-bold transition-all shadow-xs"
            title="Cambiar Idioma"
          >
            <Globe className="w-3.5 h-3.5 text-[#8c6a24]" />
            <span>{lang === 'ES' ? '🇲🇽 ES' : '🇺🇸 EN'}</span>
          </button>

          {/* Status Indicator */}
          <div className="hidden lg:flex items-center px-3 py-1.5 rounded-lg bg-white border border-stone-200 text-xs">
            <span className="status-dot status-online"></span>
            <span className="text-[11px] font-semibold uppercase text-stone-800 tracking-wider">Operativo</span>
          </div>

          {/* Franko AI Button */}
          <button
            onClick={onOpenAI}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gold-50 border border-gold-200 text-[#8c6a24] hover:bg-gold-100 transition-colors text-xs sm:text-sm font-semibold"
          >
            <Sparkles className="w-4 h-4 text-[#8c6a24] animate-pulse" />
            <span className="hidden sm:inline">Franko AI</span>
          </button>

          {/* Quote Button CTA */}
          <button
            onClick={onOpenQuote}
            className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-black hover:bg-stone-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Cotizar Evento</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-stone-600 hover:bg-stone-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-stone-200 bg-white px-4 py-4 space-y-3">
          <a href="#experiencias" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-stone-700">Experiencias</a>
          <a href="#galeria" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-stone-700">Galería</a>
          <a href="#banner-servicios" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-stone-700">Servicios</a>
          <a href="#chef-franko" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-stone-700">Chef Franko</a>
          <a href="#testimonios" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-sm font-medium text-stone-700">Testimonios</a>
          <a href="/admin" className="block py-2 text-sm font-bold text-[#8c6a24]">Panel de Administración</a>
        </div>
      )}
    </header>
  );
};
