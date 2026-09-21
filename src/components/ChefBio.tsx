import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
interface ChefBioProps { onOpenQuote?:()=>void; isFullView?:boolean; }
export const ChefBio: React.FC<ChefBioProps> = ({onOpenQuote}) => (
<section id="chef-franko" className="py-24 bg-[#0a0a0a] text-stone-100 border-b border-stone-800/80">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
  <motion.div className="lg:col-span-5" initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}}><img src="/assets/chef_franko_brigada.jpg" alt="Chef Franko" loading="lazy" className="w-full h-[520px] object-cover rounded-3xl border border-stone-800"/></motion.div>
  <motion.div className="lg:col-span-7" initial={{opacity:0,x:20}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>
   <p className="text-xs uppercase tracking-[0.2em] text-[#d8b96d]">Meet Chef Franko</p>
   <h2 className="mt-4 font-serif text-3xl sm:text-5xl font-light text-white">Private dining shaped by <span className="italic text-[#d8b96d]">the people around the table.</span></h2>
   <p className="mt-6 text-stone-300 text-lg leading-relaxed">Chef 4 You by Franko is built around the belief that a meal can become one of the lasting memories of a trip, celebration or time together. Each private dining experience is approached with personal attention, culinary character and care for the setting, the guests and the occasion.</p>
   <p className="mt-4 text-stone-400 leading-relaxed">Whether you are hosting family in a villa, planning a dinner for two or gathering friends for a special celebration, the experience is designed to feel effortless, personal and fully yours.</p>
   {onOpenQuote&&<button onClick={onOpenQuote} className="mt-8 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d8b96d] to-[#9e7c33] text-stone-950 font-bold">Plan Your Experience with Chef Franko <ArrowRight className="w-4 h-4"/></button>}
  </motion.div>
 </div>
</section>);
