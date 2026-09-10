import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-stone-400 py-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        <div>
          <h4 className="font-serif text-lg font-bold text-white tracking-wide">
            Chef4You <span className="text-[#8c6a24] text-xs font-sans uppercase">by Franko</span>
          </h4>
          <p className="text-xs text-stone-500 mt-2 leading-relaxed">
            Servicios de Chef Privado & Catering de Lujo en Puerto Vallarta, Punta Mita, Sayulita y Riviera Nayarit.
          </p>
        </div>

        <div className="space-y-1 text-xs">
          <h5 className="font-bold text-stone-200 uppercase tracking-wider mb-2">Enlaces Rápidos</h5>
          <p><a href="#experiencias" className="hover:text-[#8c6a24]">Experiencias Culinarias</a></p>
          <p><a href="#banner-servicios" className="hover:text-[#8c6a24]">Servicios VIP</a></p>
          <p><a href="#chef-franko" className="hover:text-[#8c6a24]">Acerca del Chef Franko</a></p>
          <p><a href="/admin" className="hover:text-[#8c6a24]">Acceso Administrador</a></p>
        </div>

        <div className="text-xs space-y-1">
          <h5 className="font-bold text-stone-200 uppercase tracking-wider mb-2">Contacto & Reservas</h5>
          <p>Email: <a href="mailto:info@chef4you.com" className="text-gold-400 hover:underline">info@chef4you.com</a></p>
          <p>Teléfono / WhatsApp: <a href="https://wa.me/523221606843" className="text-gold-400 hover:underline">+52 322 160 6843</a></p>
          <p className="text-stone-500 text-[11px] mt-2">© {new Date().getFullYear()} Chef4You by Franko Salgado. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
