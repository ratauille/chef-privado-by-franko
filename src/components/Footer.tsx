import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
interface FooterProps { onNavigate?: (path:string)=>void; }
export const Footer: React.FC<FooterProps> = ({onNavigate}) => {
 const go=(e:React.MouseEvent<HTMLAnchorElement>,path:string)=>{if(onNavigate){e.preventDefault();onNavigate(path);}};
 return <footer className="bg-[#050505] text-stone-400 py-16 border-t border-stone-800/80">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
   <div><h3 className="font-serif text-2xl font-bold text-white">Chef 4 You <span className="text-[#c5a059] text-xs font-sans uppercase">by Franko</span></h3><h4 className="font-serif text-xl text-white mt-5">Private dining, thoughtfully hosted.</h4><p className="text-sm mt-3 leading-relaxed">Chef 4 You by Franko creates private dining experiences for villas, residences and destination stays in Puerto Vallarta, Punta Mita and Nuevo Nayarit.</p></div>
   <div className="space-y-3 text-sm"><h4 className="text-white uppercase tracking-widest text-xs">Explore</h4><p><a href="/experiencias" onClick={e=>go(e,'/experiencias')} className="hover:text-[#d8b96d]">Experiences</a></p><p><a href="/chef-franko" onClick={e=>go(e,'/chef-franko')} className="hover:text-[#d8b96d]">About Chef Franko</a></p><p><a href="/galeria" onClick={e=>go(e,'/galeria')} className="hover:text-[#d8b96d]">Gallery</a></p><p><a href="/reservar" onClick={e=>go(e,'/reservar')} className="text-[#d8b96d] font-semibold">Request an Experience</a></p></div>
   <div className="text-sm space-y-3"><h4 className="text-white uppercase tracking-widest text-xs">Contact</h4><div className="flex gap-2 items-center"><Mail className="w-4 h-4 text-[#c5a059]"/><a href="mailto:info@chef4you.com" className="hover:text-[#d8b96d]">info@chef4you.com</a></div><div className="flex gap-2 items-center"><Phone className="w-4 h-4 text-[#c5a059]"/><a href="https://wa.me/523221606843" className="hover:text-[#d8b96d]">+52 322 160 6843</a></div><div className="flex gap-2 items-center"><MapPin className="w-4 h-4 text-[#c5a059]"/><span>Puerto Vallarta · Punta Mita · Nuevo Nayarit</span></div><p className="text-xs text-stone-600 pt-4">© {new Date().getFullYear()} Chef 4 You by Franko. The Art of Living.</p></div>
  </div>
 </footer>;
};