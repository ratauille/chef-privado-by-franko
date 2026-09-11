import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  return (
    <footer className="bg-[#050505] text-stone-400 py-16 border-t border-stone-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        <div className="space-y-3">
          <h3 className="font-serif text-2xl font-bold text-white tracking-wide">
            Chef4You <span className="text-[#c5a059] text-xs font-sans uppercase font-light">by Franko</span>
          </h3>
          <p className="text-xs text-stone-400 leading-relaxed font-light">
            Servicios de Chef Privado & Catering de Lujo en Puerto Vallarta, Punta Mita, Sayulita y Riviera Nayarit. Experiencias gastronómicas de autor diseñadas a la medida.
          </p>
          <div className="flex items-center justify-center md:justify-start gap-3 pt-2 text-[#c5a059]">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#141312] border border-stone-800 hover:border-[#c5a059] transition-colors" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-[#141312] border border-stone-800 hover:border-[#c5a059] transition-colors" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-widest mb-3">Navegación & Secciones</h4>
          <p><a href="/" onClick={(e) => handleLinkClick(e, '/')} className="hover:text-[#d8b96d] transition-colors">Inicio & Propuesta</a></p>
          <p><a href="/experiencias" onClick={(e) => handleLinkClick(e, '/experiencias')} className="hover:text-[#d8b96d] transition-colors">Experiencias & Menús de Autor</a></p>
          <p><a href="/galeria" onClick={(e) => handleLinkClick(e, '/galeria')} className="hover:text-[#d8b96d] transition-colors">Galería Culinaria</a></p>
          <p><a href="/chef-franko" onClick={(e) => handleLinkClick(e, '/chef-franko')} className="hover:text-[#d8b96d] transition-colors">Chef Franko Salgado</a></p>
          <p><a href="/reservar" onClick={(e) => handleLinkClick(e, '/reservar')} className="hover:text-[#d8b96d] transition-colors font-bold text-[#c5a059]">Reservas & Cotización</a></p>
          <p><a href="/admin" onClick={(e) => handleLinkClick(e, '/admin')} className="hover:text-[#d8b96d] transition-colors text-stone-500">Panel de Administración</a></p>
        </div>

        <div className="text-xs space-y-3">
          <h4 className="font-serif text-sm font-semibold text-white uppercase tracking-widest mb-3">Contacto Directo</h4>
          <div className="flex items-center justify-center md:justify-start gap-2 text-stone-300">
            <Mail className="w-4 h-4 text-[#c5a059] shrink-0" />
            <a href="mailto:info@chef4you.com" className="hover:text-[#d8b96d] transition-colors">info@chef4you.com</a>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2 text-stone-300">
            <Phone className="w-4 h-4 text-[#c5a059] shrink-0" />
            <a href="https://wa.me/523221606843" className="hover:text-[#d8b96d] transition-colors font-mono font-semibold">+52 322 160 6843</a>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2 text-stone-400">
            <MapPin className="w-4 h-4 text-[#c5a059] shrink-0" />
            <span>Puerto Vallarta, Punta Mita & Riviera Nayarit, México.</span>
          </div>
          <p className="text-stone-500 text-[11px] pt-3 border-t border-stone-900">
            © {new Date().getFullYear()} Chef4You by Franko Salgado. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
