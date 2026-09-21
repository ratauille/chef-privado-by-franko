import React from 'react';
import { motion } from 'motion/react';
import { Calendar, ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps { onOpenQuote: () => void; onOpenAI: () => void; }

export const Hero: React.FC<HeroProps> = ({ onOpenQuote }) => (
  <section id="hero" className="relative min-h-[90vh] bg-[#0a0a0a] text-stone-100 flex items-center overflow-hidden border-b border-stone-800/80">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,160,89,0.15),transparent_45%)] pointer-events-none" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
      <motion.div className="lg:col-span-7 space-y-8" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.8}}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#181715] border border-[#c5a059]/40 text-[#d8b96d] text-xs font-semibold tracking-[0.2em] uppercase">
          <Sparkles className="w-3.5 h-3.5" /><span>Chef 4 You by Franko · The Art of Living</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.08]">
          The Art of Living, <span className="italic text-[#d8b96d]">Private Dining by Chef Franko.</span>
        </h1>
        <p className="text-stone-300 text-lg sm:text-xl max-w-2xl leading-relaxed font-light">
          Private dining experiences for villas, residences and destination stays in Puerto Vallarta, Punta Mita and Nuevo Nayarit.
        </p>
        <p className="text-stone-400 max-w-2xl leading-relaxed">
          Chef 4 You by Franko brings personal hospitality to your table, with every experience shaped around your occasion, your guests and your setting.
        </p>
        <button onClick={onOpenQuote} className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d8b96d] to-[#9e7c33] hover:brightness-110 text-stone-950 font-bold shadow-xl inline-flex items-center justify-center gap-3 transition-all">
          <Calendar className="w-5 h-5" /><span>Request Your Experience</span><ArrowRight className="w-5 h-5" />
        </button>
      </motion.div>
      <motion.div className="lg:col-span-5" initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} transition={{duration:.9,delay:.15}}>
        <div className="relative rounded-3xl overflow-hidden border border-stone-800 bg-[#141312] shadow-2xl">
          <img src="/assets/chef_franko_team.webp" alt="Chef Franko creating a private dining experience" width={800} height={1000} loading="eager" className="w-full h-[520px] object-cover brightness-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6"><p className="font-serif text-xl text-white">Private hospitality, thoughtfully hosted.</p></div>
        </div>
      </motion.div>
    </div>
  </section>
);
