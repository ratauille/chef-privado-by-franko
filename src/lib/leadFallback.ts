export interface LeadDraft {
  clientName: string;
  email: string;
  phone: string;
  date: string;
  guests: number;
  serviceName: string;
  notes: string;
}

// Canonical commercial number documented by the main site and secondary source.
export const CHEF_WHATSAPP_NUMBER = '5213221606843';
export const CHEF_WA_NUMBER = CHEF_WHATSAPP_NUMBER;

export function chefWhatsAppUrl(customMessage?: string): string {
  const defaultMsg =
    'Hola Chef Franko, quisiera información para una experiencia de chef privado.';
  const text = (customMessage || defaultMsg).trim();
  return `https://wa.me/${CHEF_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

// Opening WhatsApp is not a saved lead; the visitor must send the message.
export function leadWhatsAppUrl(lead: LeadDraft, lang: 'es' | 'en' = 'es'): string {
  const message =
    lang === 'en'
      ? [
          'Hello Chef Franko, I would like to request a quote for a private dining experience.',
          lead.clientName ? `Name: ${lead.clientName}` : '',
          lead.email ? `Email: ${lead.email}` : '',
          lead.phone ? `Phone: ${lead.phone}` : '',
          lead.date ? `Date: ${lead.date}` : '',
          lead.guests ? `Guests: ${lead.guests}` : '',
          lead.serviceName ? `Experience: ${lead.serviceName}` : '',
          lead.notes ? `Notes: ${lead.notes}` : '',
        ]
          .filter(Boolean)
          .join('\n')
      : [
          'Hola, Chef Franko. Quiero solicitar una cotización.',
          lead.clientName ? `Nombre: ${lead.clientName}` : '',
          lead.email ? `Correo: ${lead.email}` : '',
          lead.phone ? `Teléfono: ${lead.phone}` : '',
          lead.date ? `Fecha: ${lead.date}` : '',
          lead.guests ? `Personas: ${lead.guests}` : '',
          lead.serviceName ? `Experiencia: ${lead.serviceName}` : '',
          lead.notes ? `Notas: ${lead.notes}` : '',
        ]
          .filter(Boolean)
          .join('\n');

  return `https://wa.me/${CHEF_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
