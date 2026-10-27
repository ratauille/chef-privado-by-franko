/**
 * Configuración centralizada de datos de contacto de Chef4You by Franko.
 *
 * Datos confirmados por el propietario:
 * - Correo oficial: frankocheff99@gmail.com
 * - Enlace oficial PayPal: https://paypal.me/frankosalgado?locale.x=es_XC&country.x=MX
 */
export const contactConfig = {
  // Correo de contacto oficial confirmado
  email: ((typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_CONTACT_EMAIL) || 'frankocheff99@gmail.com').trim(),

  // Enlace oficial de PayPal (destinado a las instrucciones de anticipo tras confirmar disponibilidad)
  paypalMeUrl: 'https://paypal.me/frankosalgado?locale.x=es_XC&country.x=MX',

  // Teléfono y WhatsApp oficiales
  phoneDisplay: '+52 322 160 6843',
  phoneClean: '+523221606843',
  whatsappUrl: 'https://wa.me/523221606843',

  // Cobertura de servicio
  locationCoverage: 'Puerto Vallarta · Punta Mita · Nuevo Nayarit',
};
