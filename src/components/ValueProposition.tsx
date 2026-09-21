import React from 'react';
import { motion } from 'motion/react';
import { Heart, MapPin, Sparkles, ArrowRight } from 'lucide-react';

interface ValuePropositionProps { onOpenQuote: () => void; }
const pillars = [
 {icon:Heart,title:'Made for your occasion',description:'Your experience is planned around your gathering, preferences and dietary needs.'},
 {icon:MapPin,title:'At home in your destination',description:'Enjoy private dining in your villa, residence or chosen setting.'},
 {icon:Sparkles,title:'Personal, attentive service',description:'Chef Franko and the experience stay focused on your guests, your privacy and the moment you came to celebrate.'}
];
export const ValueProposition: React.FC<ValuePropositionProps> = ({onOpenQuote}) => (
<section className="relative bg-[#0d0d0d] py-20 lg:py-28 border-b border-stone-800/80 text-stone-100">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="text-center max-w-3xl mx-auto mb-14">
   <h2 className="font-serif text-3xl sm:text-5xl font-light text-white">Every detail, <span className="italic text-[#d8b96d]">thoughtfully hosted.</span></h2>
   <p className="mt-4 text-stone-400 text-lg">Private hospitality that feels personal from the first conversation to the final course.</p>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
   {pillars.map((p,i)=>{const Icon=p.icon;return <motion.div key={p.title} className="p-8 rounded-2xl bg-[#141312] border border-stone-800" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.08}}>
    <Icon className="w-7 h-7 text-[#d8b96d] mb-5"/><h3 className="font-serif text-xl text-white mb-3">{p.title}</h3><p className="text-stone-400 leading-relaxed">{p.description}</p>
   </motion.div>})}
  </div>
  <div className="mt-12 text-center"><button onClick={onOpenQuote} className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d8b96d] to-[#9e7c33] text-stone-950 font-bold">Plan Your Private Dining Experience <ArrowRight className="w-4 h-4"/></button></div>
 </div>
</section>);
