import React, { useState } from 'react';
import { Menu, X, Calendar } from 'lucide-react';

interface NavbarProps { onOpenQuote: () => void; onOpenAI: () => void; currentPath?: string; onNavigate?: (path:string)=>void; }
export const Navbar: React.FC<NavbarProps> = ({onOpenQuote,currentPath='/',onNavigate}) => {
 const [open,setOpen]=useState(false);
 const go=(e:React.MouseEvent<HTMLAnchorElement>,path:string)=>{e.preventDefault();setOpen(false);if(onNavigate)onNavigate(path);else{window.history.pushState({},'',path);window.dispatchEvent(new Event('popstate'));}};
 const links=[['/experiencias','Experiences'],['/chef-franko','About Chef Franko'],['/galeria','Gallery']];
 return <header className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-stone-800/80 text-stone-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
   <a href="/" onClick={e=>go(e,'/')} className="font-serif text-lg sm:text-xl font-bold text-white">Chef 4 You <span className="text-[#c5a059] text-xs font-sans uppercase">by Franko</span></a>
   <nav className="hidden md:flex items-center gap-7 text-sm text-stone-300">{links.map(([path,label])=><a key={path} href={path} onClick={e=>go(e,path)} className={currentPath===path?'text-[#d8b96d] font-semibold':'hover:text-[#d8b96d]'}>{label}</a>)}</nav>
   <div className="flex items-center gap-2">
    <button onClick={onOpenQuote} className="inline-flex items-center gap-2 px-3 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d8b96d] to-[#9e7c33] text-stone-950 font-bold text-xs sm:text-sm"><Calendar className="w-4 h-4"/><span>Request an Experience</span></button>
    <button onClick={()=>setOpen(!open)} className="md:hidden p-2 rounded-xl border border-stone-800" aria-label="Open menu">{open?<X className="w-5 h-5"/>:<Menu className="w-5 h-5"/>}</button>
   </div>
  </div>
  {open&&<div className="md:hidden border-t border-stone-800 bg-[#0d0d0d] px-6 py-5 space-y-3">{links.map(([path,label])=><a key={path} href={path} onClick={e=>go(e,path)} className="block py-2 text-sm text-stone-200">{label}</a>)}<button onClick={()=>{setOpen(false);onOpenQuote();}} className="w-full mt-2 px-5 py-3 rounded-xl bg-[#c5a059] text-stone-950 font-bold">Request an Experience</button></div>}
 </header>;
};