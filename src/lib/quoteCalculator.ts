export type QuotePackage = 'standard' | 'premium' | 'gold';
export type QuoteLocation = 'pv' | 'nn' | 'pm';
export type QuoteService = 'villa' | 'romantic' | 'wedding' | 'class' | 'yacht';

export interface QuoteCalculationInput {
  guests: number;
  packageType: QuotePackage;
  location: QuoteLocation;
  service: QuoteService;
}

export interface QuoteCalculation {
  guests: number;
  basePerGuest: number;
  serviceMultiplier: number;
  locationFee: number;
  subtotal: number;
  iva: number;
  serviceFee: number;
  total: number;
}

// Kept identical to the original AI Studio calculator in chef4y-franko.
export const QUOTE_BASE_PER_GUEST: Record<QuotePackage, number> = { standard: 120, premium: 180, gold: 260 };
export const QUOTE_LOCATION_FEE: Record<QuoteLocation, number> = { pv: 0, nn: 35, pm: 55 };
export const QUOTE_SERVICE_MULTIPLIER: Record<QuoteService, number> = { villa: 1, romantic: 1.1, wedding: 1.35, class: 0.95, yacht: 1.25 };
export const QUOTE_IVA_RATE = 0.16;
export const QUOTE_SERVICE_FEE_RATE = 0.18;

export function calculateQuote(input: QuoteCalculationInput): QuoteCalculation {
  const guests = Math.max(1, Math.min(500, Math.trunc(input.guests || 1)));
  const basePerGuest = QUOTE_BASE_PER_GUEST[input.packageType];
  const locationFee = QUOTE_LOCATION_FEE[input.location];
  const serviceMultiplier = QUOTE_SERVICE_MULTIPLIER[input.service];
  const subtotal = guests * basePerGuest * serviceMultiplier + locationFee;
  const iva = subtotal * QUOTE_IVA_RATE;
  const serviceFee = subtotal * QUOTE_SERVICE_FEE_RATE;
  return { guests, basePerGuest, serviceMultiplier, locationFee, subtotal, iva, serviceFee, total: subtotal + iva + serviceFee };
}
