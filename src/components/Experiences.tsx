import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ExperiencesProps { onOpenQuote?: () => void; isFullView?: boolean; }
const experiences=[
 ['Private Villa Dinner','A relaxed, beautifully hosted meal in the comfort of your villa or residence, designed around your guests and your evening.','Plan a Villa Dinner','/assets/banquete_gala_frente_al_mar.jpg'],
 ['Culinary Experience Inspired by Mexico','A private dining experience inspired by the flavors, ingredients and culinary character of Mexico, shaped with Chef Franko’s personal style.','Explore a Culinary Experience','/assets/cena_degustacion_5_tiempos.png'],
 ['Romantic Dinner','A private dinner for two, created for an anniversary, proposal, birthday or simply an evening worth slowing down for.','Plan a Dinner for Two','/assets/IMG_1937.jpg'],
 ['Family Celebration','A warm, effortless way to bring family and friends together for a birthday, reunion or special gathering.','Plan a Celebration','/assets/belli_pure_cebolla_tatemada.png'],
 ['Chef’s Table at Your Villa','An intimate, chef-led evening where the preparation, flavors and conversation become part of the experience.','Request a Chef’s Table','/assets/creme_brulee_cangrejo_real.png'],
 ['Cooking Experience','A hands-on culinary moment for guests who want to cook, taste and discover cuisine together.','Plan a Cooking Experience','/assets/IMG_1389.jpg']
];
export const Experiences: React.FC<ExperiencesProps> = ({onOpenQuote}) => (
<section id="experiencias" className="py-24 bg-[#0d0d0d] text-stone-100 border-b border-stone-800/80">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="text-center max-w-3xl mx-auto"><Sparkles className="w-5 h-5 text-[#d8b96d] mx-auto mb-4"/><h2 className="font-serif text-3xl sm:text-5xl font-light">Experiences made for <span className="italic text-[#d8b96d]">the way you want to gather.</span></h2><p className="mt-4 text-stone-400 text-lg">From an intimate dinner for two to a villa celebration, each experience is shaped around the people, place and occasion.</p></div>
  <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
   {experiences.map(([title,body,cta,image],i)=><motion.article key={title} className="rounded-3xl overflow-hidden bg-[#141312] border border-stone-800 flex flex-col" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.05}}>
    <img src={image} alt={title} loading="lazy" className="w-full h-64 object-cover"/>
    <div className="p-7 flex flex-col flex-1"><h3 className="font-serif text-2xl text-white">{title}</h3><p className="mt-3 text-stone-400 leading-relaxed flex-1">{body}</p><button onClick={onOpenQuote} className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#c5a059] text-stone-950 font-bold text-sm">{cta}<ArrowRight className="w-4 h-4"/></button></div>
   </motion.article>)}
  </div>
 </div>
</section>);
