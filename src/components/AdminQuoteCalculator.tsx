import React, { useMemo, useState } from 'react';
import { Calculator } from 'lucide-react';
import { calculateQuote, QuoteLocation, QuotePackage, QuoteService } from '../lib/quoteCalculator';

const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export const AdminQuoteCalculator: React.FC = () => {
  const [guests, setGuests] = useState(4);
  const [packageType, setPackageType] = useState<QuotePackage>('premium');
  const [location, setLocation] = useState<QuoteLocation>('pv');
  const [service, setService] = useState<QuoteService>('villa');
  const quote = useMemo(() => calculateQuote({ guests, packageType, location, service }), [guests, packageType, location, service]);

  return (
    <section className="bg-white border border-stone-200 rounded-2xl shadow-sm p-4 sm:p-6" aria-labelledby="admin-quote-title">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2 text-[#8c6a24]"><Calculator className="w-5 h-5" /><h2 id="admin-quote-title" className="font-serif text-xl font-bold text-stone-900">Calculadora privada de costos</h2></div>
          <p className="text-xs text-stone-500 mt-1">Estimación interna basada en la calculadora original de AI Studio. No se muestra al cliente.</p>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-stone-500 border border-stone-200 rounded-full px-2 py-1">USD</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <label className="text-xs font-semibold text-stone-600">Comensales<input type="number" min={1} max={500} value={guests} onChange={e => setGuests(Number(e.target.value) || 1)} className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm" /></label>
        <label className="text-xs font-semibold text-stone-600">Paquete<select value={packageType} onChange={e => setPackageType(e.target.value as QuotePackage)} className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"><option value="standard">Standard · $120/persona</option><option value="premium">Premium · $180/persona</option><option value="gold">Gold · $260/persona</option></select></label>
        <label className="text-xs font-semibold text-stone-600">Ubicación<select value={location} onChange={e => setLocation(e.target.value as QuoteLocation)} className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"><option value="pv">Puerto Vallarta · +$0</option><option value="nn">Nuevo Nayarit · +$35</option><option value="pm">Punta Mita · +$55</option></select></label>
        <label className="text-xs font-semibold text-stone-600">Servicio<select value={service} onChange={e => setService(e.target.value as QuoteService)} className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm"><option value="villa">Villa · ×1.00</option><option value="romantic">Romántico · ×1.10</option><option value="wedding">Boda · ×1.35</option><option value="class">Clase · ×0.95</option><option value="yacht">Yate · ×1.25</option></select></label>
      </div>
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
        <div className="rounded-xl bg-stone-50 p-3"><div className="text-[10px] uppercase text-stone-500">Subtotal</div><strong>{currency.format(quote.subtotal)}</strong></div>
        <div className="rounded-xl bg-stone-50 p-3"><div className="text-[10px] uppercase text-stone-500">IVA 16%</div><strong>{currency.format(quote.iva)}</strong></div>
        <div className="rounded-xl bg-stone-50 p-3"><div className="text-[10px] uppercase text-stone-500">Servicio 18%</div><strong>{currency.format(quote.serviceFee)}</strong></div>
        <div className="rounded-xl bg-[#1c2a1e] text-emerald-800 border border-emerald-200 p-3"><div className="text-[10px] uppercase">Total estimado</div><strong>{currency.format(quote.total)}</strong></div>
      </div>
    </section>
  );
};
