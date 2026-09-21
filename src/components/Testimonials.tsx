import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, ArrowRight } from 'lucide-react';

interface TestimonialsProps { onOpenQuote?: () => void; }
export const Testimonials: React.FC<TestimonialsProps> = ({onOpenQuote}) => (
<section id="testimonios" className="py-24 bg-[#0d0d0d] text-stone-100 border-b border-stone-800/80">
 <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
  <MessageSquare className="w-6 h-6 text-[#d8b96d] mx-auto mb-5"/>
  <p className="text-xs uppercase tracking-[0.2em] text-[#d8b96d]">Guest Review · Private Birthday Dinner</p>
  <motion.blockquote className="mt-6 font-serif text-2xl sm:text-4xl font-light leading-relaxed text-white" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
   “We had the pleasure of having Private Chef Franco prepare a very special dinner for my boyfriend’s 60th birthday, and it was truly an unforgettable experience!”
  </motion.blockquote>
  <p className="mt-6 text-stone-300">Eva · September 2026</p><p className="text-xs text-stone-500 mt-1">Verified Airbnb booking</p>
  {onOpenQuote && <button onClick={onOpenQuote} className="mt-8 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#c5a059] text-stone-950 font-bold">Create Your Own Celebration <ArrowRight className="w-4 h-4"/></button>}
 </div>
</section>);
