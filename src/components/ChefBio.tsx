import React from 'react';
import { motion } from 'motion/react';
import { ChefHat, Wine, ShieldCheck, Award, BookOpen, UtensilsCrossed, ArrowRight } from 'lucide-react';

interface ChefBioProps {
  onOpenQuote?: () => void;
  isFullView?: boolean;
}

export const ChefBio: React.FC<ChefBioProps> = ({ onOpenQuote, isFullView = false }) => {
  return (
    <section id="chef-franko" className="py-24 bg-[#0a0a0a] text-stone-100 border-b border-stone-800/80 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(197,160,89,0.1),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Media Column */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative rounded-3xl overflow-hidden border border-stone-800 bg-[#141312] shadow-2xl group">
              <img
                src="/assets/chef_franko_brigada.jpg"
                alt="Chef Franko Salgado y su Brigada Culinaria de Élite"
                width={800}
                height={900}
                loading="lazy"
                className="w-full h-[520px] object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/30 to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#141312]/95 backdrop-blur-md border border-stone-800/90 shadow-xl">
                <span className="text-[#c5a059] text-xs font-mono uppercase font-bold tracking-widest block mb-1">
                  Chef Ejecutivo & Consultor Internacional
                </span>
                <h3 className="font-serif text-2xl font-bold text-white">Chef Franko Salgado</h3>
                <p className="text-xs text-stone-400 mt-2 font-light leading-relaxed">
                  Más de 20 años de trayectoria internacional en hotelería de ultra lujo & diplomado por Le Cordon Bleu París.
                </p>
              </div>

              <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-stone-950/90 border border-[#c5a059]/40 text-[#d8b96d] text-xs font-semibold flex items-center gap-1.5 shadow-md">
                <Award className="w-4 h-4 text-[#c5a059]" />
                <span>+20 Años Experiencia</span>
              </div>
            </div>
          </motion.div>

          {/* Right Content Column */}
          <motion.div
            className="lg:col-span-7 space-y-6 text-left"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181715] border border-[#c5a059]/40 text-[#d8b96d] text-xs font-semibold uppercase tracking-[0.2em]">
              <ChefHat className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Trayectoria de Excelencia</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight">
              "No solo servimos platillos, creamos <span className="italic text-[#d8b96d]">memorias culinarias imborrables</span>."
            </h2>

            <p className="text-stone-300 text-base sm:text-lg leading-relaxed font-light">
              Con sólida formación académica en <strong className="text-white font-normal">Le Cordon Bleu París</strong> y experiencia en la alta dirección gastronómica de resorts de ultra lujo como <strong className="text-white font-normal">Four Seasons Hotels and Resorts</strong> y <strong className="text-white font-normal">Tabacón Thermal Resort</strong>, el Chef Franko lidera una brigada de élite dedicada al servicio privado personalizado.
            </p>

            <p className="text-stone-400 text-sm leading-relaxed font-light">
              Fundador de <strong className="text-[#d8b96d] font-semibold">Chef4You</strong> y autor del libro <em>"La Receta del Éxito"</em>, ha colaborado con reconocidos maestros culinarios como Thierry Blouet, Memo Wulff y Bernhard Güth en Puerto Vallarta, Punta Mita y Costa Rica.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-5 rounded-2xl bg-[#141312] border border-stone-800 flex items-start gap-4 shadow-lg">
                <div className="p-3 rounded-xl bg-[#1f1d1a] border border-[#c5a059]/30 text-[#d8b96d] shrink-0">
                  <Wine className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-white">Sommelier & Maridaje</h4>
                  <p className="text-xs text-stone-400 mt-1 font-light leading-relaxed">
                    Selección exclusiva de vinos boutique, mezcales artesanales y maridajes diseñados a medida.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#141312] border border-stone-800 flex items-start gap-4 shadow-lg">
                <div className="p-3 rounded-xl bg-[#1f1d1a] border border-[#c5a059]/30 text-[#d8b96d] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-semibold text-white">Garantía Limpieza Total</h4>
                  <p className="text-xs text-stone-400 mt-1 font-light leading-relaxed">
                    Tu cocina y vajilla quedan impecables, relucientes y desinfectadas al terminar el banquete.
                  </p>
                </div>
              </div>
            </div>

            {isFullView && (
              <div className="pt-6 border-t border-stone-800/80 space-y-4">
                <h4 className="font-serif text-xl text-white font-medium">Filosofía Culinaria</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-300">
                  <div className="p-4 rounded-xl bg-[#141312] border border-stone-800">
                    <BookOpen className="w-4 h-4 text-[#c5a059] mb-2" />
                    <strong className="block text-white mb-1">Técnica Francesa</strong>
                    <span>Respeto por los fondos, reducciones y puntos exactos de cocción.</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#141312] border border-stone-800">
                    <UtensilsCrossed className="w-4 h-4 text-[#c5a059] mb-2" />
                    <span>Frescura del Pacífico</span>
                    <span className="block mt-1">Mariscos y pescados de pesca del día en Riviera Nayarit.</span>
                  </div>
                  <div className="p-4 rounded-xl bg-[#141312] border border-stone-800">
                    <Award className="w-4 h-4 text-[#c5a059] mb-2" />
                    <strong className="block text-white mb-1">Servicio de Gala</strong>
                    <span>Puntualidad, discreción y protocolo internacional en tu residencia.</span>
                  </div>
                </div>
              </div>
            )}

            {onOpenQuote && (
              <div className="pt-6">
                <button
                  onClick={onOpenQuote}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#c5a059] via-[#d8b96d] to-[#9e7c33] text-stone-950 font-bold text-sm shadow-xl hover:brightness-110 transition-all"
                >
                  <span>Reservar Evento con Chef Franko</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
