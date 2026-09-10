import React from 'react';
import { ChefHat, Wine, ShieldCheck } from 'lucide-react';

export const ChefBio: React.FC = () => {
  return (
    <section id="chef-franko" className="py-20 bg-white text-stone-900 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-xl bg-white">
              <img
                src="/assets/chef_franko_brigada.jpg"
                alt="Chef Franko y su Brigada Culinaria de Élite"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent"></div>

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-stone-200 shadow-md">
                <span className="text-[#8c6a24] text-xs font-mono uppercase font-bold">
                  Chef Ejecutivo & Consultor Internacional
                </span>
                <h4 className="font-serif text-lg font-bold text-stone-900">Chef Franko Salgado</h4>
                <p className="text-xs text-stone-600 mt-1">
                  Más de 20 años de trayectoria internacional en hotelería de ultra lujo & Le Cordon Bleu París.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-stone-200 text-[#8c6a24] text-xs font-semibold uppercase tracking-wider">
              <ChefHat className="w-3.5 h-3.5" />
              <span>Trayectoria de Excelencia</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
              "No solo servimos platillos, creamos memorias culinarias imborrables."
            </h2>

            <p className="text-stone-600 text-base leading-relaxed font-light">
              Con formación en <strong className="text-stone-900">Le Cordon Bleu París</strong> y experiencia directiva en destinos de lujo como <strong className="text-stone-900">Four Seasons Hotels and Resorts</strong> y <strong className="text-stone-900">Tabacón Thermal Resort</strong>, el Chef Franko lidera una brigada de élite. Fundador de <strong className="text-[#8c6a24]">Chef4You</strong> y autor de <em>"La Receta del Éxito"</em>, colabora con grandes maestros culinarios como Thierry Blouet, Memo Wulff y Bernhard Güth en Puerto Vallarta y Costa Rica.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-white border border-stone-200 flex items-start gap-3 shadow-xs">
                <div className="p-2 rounded-lg bg-gold-100 text-[#8c6a24] shrink-0">
                  <Wine className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-stone-900">Sommelier & Maridaje</h5>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Selección de vinos boutique, mezcales artesanales y coctelería de autor.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone-200 flex items-start gap-3 shadow-xs">
                <div className="p-2 rounded-lg bg-gold-100 text-[#8c6a24] shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-sm text-stone-900">Garantía Limpieza Total</h5>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Tu cocina queda impecable, reluciente y limpia tras cada banquete.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
