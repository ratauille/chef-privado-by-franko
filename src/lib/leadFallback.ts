interface LeadDraft {
  clientName: string;
  email: string;
  phone: string;
  date: string;
  guests: number;
  serviceName: string;
  notes: string;
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
  return `https://wa.me/5213221606843?text=${encodeURIComponent(message)}`;
}
