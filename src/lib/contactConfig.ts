/**
 * Configuración centralizada de datos de contacto de Chef4You by Franko.
 *
 * Datos confirmados por el propietario:
 * - Correo oficial: frankocheff99@gmail.com
 * - Enlace oficial PayPal: https://paypal.me/frankosalgado?locale.x=es_XC&country.x=MX
 *
 * WhatsApp canónico: 5213221606843 (wa.me/5213221606843).
 * SUPOSICIÓN — revisar antes de mergear: se unificó a este número porque es
 * el del header y los menús y leadFallback.ts lo documenta como
 * "Canonical commercial number". Si ese número NO es el que recibe los
 * mensajes, corrígelo en este archivo y en functions/src/index.ts
 * (una línea en cada uno); el resto del sitio usa este contactConfig
 * y CHEF_WHATSAPP_NUMBER.
 */
export const contactConfig = {
  // Correo de contacto oficial confirmado
  email: ((typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_CONTACT_EMAIL) || 'frankocheff99@gmail.com').trim(),

  // Enlace oficial de PayPal (destinado a las instrucciones de anticipo tras confirmar disponibilidad)
  paypalMeUrl: 'https://paypal.me/frankosalgado?locale.x=es_XC&country.x=MX',

  // Teléfono y WhatsApp oficiales (canónico: 5213221606843)
  phoneDisplay: '+52 322 160 6843',
  phoneClean: '+5213221606843',
  whatsappUrl: 'https://wa.me/5213221606843',

  // Perfiles sociales oficiales
  facebookUrl: 'https://www.facebook.com/cheffrankosalgado',
  instagramUrl: 'https://www.instagram.com/franko_s83',

  // Cobertura de servicio
  locationCoverage: 'Puerto Vallarta · Punta Mita · Nuevo Nayarit',
};
