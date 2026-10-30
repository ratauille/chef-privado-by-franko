import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { contactConfig } from '../lib/contactConfig';
import { useLanguage } from '../lib/i18n';
import { canonicalUrl, getLocalizedPath } from '../lib/pageMetadata';

interface FooterProps { onNavigate?: (path: string) => void; }
export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { lang, t } = useLanguage();
  const href = (path: string) => new URL(canonicalUrl(getLocalizedPath(path, lang))).pathname;
  const go = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) { e.preventDefault(); onNavigate(href(path)); }
  };
  const links = [
    ['/experiencias', t.nav.experiences],
    ['/private-chef-punta-mita', t.nav.puntaMita],
    ['/private-chef-nuevo-nayarit', t.nav.nuevoNayarit],
    ['/menu', lang === 'en' ? 'Menus' : 'Menús'],
    ['/chef-franko', t.nav.chefFranko],
    ['/galeria', t.nav.gallery],
    ['/reservar', t.nav.requestExperience],
  ];
  return <footer className="bg-[#050505] text-stone-400 py-16 border-t border-stone-800/80">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
      <div><h3 className="font-serif text-2xl font-bold text-white">Chef 4 You <span className="text-[#c5a059] text-xs font-sans uppercase">by Franko</span></h3><h4 className="font-serif text-xl text-white mt-5">{t.footer.tagline}</h4><p className="text-sm mt-3 leading-relaxed">{t.footer.description}</p></div>
      <div className="space-y-3 text-sm"><h4 className="text-white uppercase tracking-widest text-xs">{t.footer.explore}</h4>
        {links.map(([path, label]) => <p key={path}><a href={href(path)} onClick={e => go(e, path)} className="hover:text-[#d8b96d]">{label}</a></p>)}
      </div>
      <div className="text-sm space-y-3"><h4 className="text-white uppercase tracking-widest text-xs">{t.footer.contact}</h4>
        {contactConfig.email && <div className="flex gap-2 items-center"><Mail className="w-4 h-4 text-[#c5a059]"/><a href={'mailto:' + contactConfig.email} className="hover:text-[#d8b96d]">{contactConfig.email}</a></div>}
        <div className="flex gap-2 items-center"><Phone className="w-4 h-4 text-[#c5a059]"/><a href={contactConfig.whatsappUrl} className="hover:text-[#d8b96d]">{contactConfig.phoneDisplay}</a></div>
        <div className="flex gap-2 items-center"><MapPin className="w-4 h-4 text-[#c5a059]"/><span>{contactConfig.locationCoverage}</span></div>
        <p className="text-xs text-stone-400 pt-4 flex flex-wrap items-center gap-x-3 gap-y-1"><span>© {new Date().getFullYear()} {t.footer.rights}</span><span>•</span><a href={href('/privacy')} onClick={e => go(e, '/privacy')} className="hover:text-[#d8b96d] underline underline-offset-2">{lang === 'en' ? 'Privacy Notice' : 'Aviso de Privacidad'}</a></p>
      </div>
    </div>
  </footer>;
};
