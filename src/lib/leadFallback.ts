interface LeadDraft {
  clientName: string;
  email: string;
  phone: string;
  date: string;
  guests: number;
  serviceName: string;
  notes: string;
}

// Canonical commercial number documented by the main site and secondary source.
export const CHEF_WHATSAPP_NUMBER = '523221606843';

export function chefWhatsAppUrl(message: string): string {
  return `https://wa.me/${CHEF_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Opening WhatsApp is not a saved lead; the visitor must send the message.
export function leadWhatsAppUrl(lead: LeadDraft): string {
  const message = [
    'Hola, Chef Franko. Quiero solicitar una cotización.',
    `Nombre: ${lead.clientName}`,
    `Correo: ${lead.email}`,
    `Teléfono: ${lead.phone}`,
    `Fecha: ${lead.date}`,
    `Personas: ${lead.guests}`,
    `Experiencia: ${lead.serviceName}`,
    lead.notes ? `Notas: ${lead.notes}` : '',
  ].filter(Boolean).join('\n');
  return chefWhatsAppUrl(message);
}
