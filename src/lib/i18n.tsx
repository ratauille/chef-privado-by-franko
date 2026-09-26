import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'es';

export interface TranslationDictionary {
  nav: {
    experiences: string;
    chefFranko: string;
    gallery: string;
    requestExperience: string;
    whatsappCta: string;
    menu: string;
    close: string;
    followWhatsApp: string;
    followFacebook: string;
    followInstagram: string;
    socialLabel: string;
  };
  hero: {
    badge: string;
    titleLine1: string;
    titleLine2: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    locationBar: string;
    serviceTag: string;
  };
  home: {
    curatedTitle: string;
    curatedSubtitle: string;
    curatedCopy: string;
    signatureTag: string;
    planCta: string;
    bioBadge: string;
    bioTitle1: string;
    bioTitle2: string;
    bioText: string;
    bioCta: string;
    testimonialQuote: string;
    testimonialAuthor: string;
  };
  experiences: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    items: {
      title: string;
      desc: string;
      cta: string;
    }[];
  };
  bio: {
    badge: string;
    title1: string;
    title2: string;
    p1: string;
    p2: string;
    cta: string;
  };
  gallery: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    categories: {
      todos: string;
      platos: string;
      tecnica: string;
      brigada: string;
      eventos: string;
    };
    cta: string;
  };
  forms: {
    quoteBadge: string;
    quoteTitle: string;
    quoteSubtitle: string;
    reservationBadge: string;
    reservationTitle: string;
    reservationTitleAccent: string;
    reservationSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    dateLabel: string;
    guestsLabel: string;
    guestsUnit: string;
    serviceLabel: string;
    servicesList: string[];
    notesLabel: string;
    notesPlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    successTitle: string;
    successMsg: string;
    successSubmsg: string;
    closeBtn: string;
    whatsappDirect: string;
    directContactNote: string;
    calendarBookingBtn: string;
  };
  chat: {
    title: string;
    subtitle: string;
    greeting: string;
    placeholder: string;
    loading: string;
    errorMsg: string;
  };
  footer: {
    tagline: string;
    description: string;
    explore: string;
    contact: string;
    rights: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    nav: {
      experiences: 'Experiences',
      chefFranko: 'Chef Franko',
      gallery: 'Gallery',
      requestExperience: 'Request an Experience',
      whatsappCta: 'WhatsApp · Check Availability',
      menu: 'Menu',
      close: 'Close',
      followWhatsApp: 'Chat on WhatsApp',
      followFacebook: 'Follow on Facebook',
      followInstagram: 'Follow on Instagram',
      socialLabel: 'Follow us',
    },
    hero: {
      badge: 'Private Chef · Puerto Vallarta & Riviera Nayarit',
      titleLine1: 'The art of living,',
      titleLine2: 'served at your table.',
      subtitle: 'Bespoke private dining and tasting menus for luxury villas, residences and destination stays in Puerto Vallarta, Punta Mita and Nuevo Nayarit.',
      ctaPrimary: 'Request your experience',
      ctaSecondary: 'Explore the experiences',
      locationBar: 'Puerto Vallarta · Punta Mita · Nuevo Nayarit · Sayulita',
      serviceTag: 'Private villas · Celebrations · Destination dining',
    },
    home: {
      curatedTitle: 'Curated experiences',
      curatedSubtitle: 'A private restaurant appears wherever',
      curatedCopy: 'Every menu begins with a conversation. The ingredients, pace and service are composed meticulously around the people at your table.',
      signatureTag: 'Signature experience',
      planCta: 'Plan this experience',
      bioBadge: 'Chef Franko Salgado',
      bioTitle1: 'Hospitality is not an extra.',
      bioTitle2: 'It is the heart of the experience.',
      bioText: 'Cooking inside a private villa asks for more than refined technique. It asks for discretion, intuition and the ability to make every guest feel genuinely pampered and cared for.',
      bioCta: "Discover Chef Franko's story",
      testimonialQuote: '“It was truly an unforgettable culinary experience. Every single detail made our celebration feel deeply personal and extraordinary.”',
      testimonialAuthor: 'Eva M. · Verified private celebration in Punta Mita',
    },
    experiences: {
      badge: 'Bespoke Gastronomy',
      title1: 'Experiences made for',
      title2: 'the way you want to gather.',
      subtitle: 'From an intimate anniversary dinner for two to a lavish villa celebration, each experience is tailored around the guests, the setting and the occasion.',
      items: [
        {
          title: 'Private Villa Dinner',
          desc: 'A relaxed, beautifully hosted meal in the comfort of your villa or residence, designed around your guests and your evening.',
          cta: 'Plan a Villa Dinner',
        },
        {
          title: 'The Mexican Contemporary Table',
          desc: 'A private culinary journey through the vibrant heritage and coastal character of Mexico, elevated with modern vanguard techniques.',
          cta: 'Explore Mexican Table',
        },
        {
          title: 'Romantic Evening for Two',
          desc: 'An intimate 5-course tasting ritual crafted for proposals, anniversaries or unforgettable moments under the Pacific stars.',
          cta: 'Plan a Dinner for Two',
        },
        {
          title: 'Family & Group Celebrations',
          desc: 'A warm, effortless way to bring family and close friends together for birthdays, reunions and milestone gatherings.',
          cta: 'Plan a Celebration',
        },
        {
          title: 'Chef’s Table at Your Residence',
          desc: 'An interactive, chef-led dining showcase where live preparations, wine pairings and culinary storytelling take center stage.',
          cta: 'Request a Chef’s Table',
        },
        {
          title: 'Hands-on Cooking Masterclass',
          desc: 'An interactive culinary experience for guests who wish to cook, taste fresh regional catch and explore gastronomy alongside Chef Franko.',
          cta: 'Plan a Cooking Class',
        },
      ],
    },
    bio: {
      badge: 'Meet Chef Franko Salgado',
      title1: 'Private dining shaped by',
      title2: 'the people around the table.',
      p1: 'Chef 4 You by Franko was born from the conviction that an extraordinary meal can become the most enduring memory of a journey or celebration. With classical training at Le Cordon Bleu and years leading five-star luxury resorts, Chef Franko brings Michelin-level culinary standards straight into private residences.',
      p2: 'Whether you are hosting an intimate sunset dinner in Punta Mita or celebrating with family in a Puerto Vallarta villa, every detail—from local seafood procurement to customized wine pairings and discreet table service—is executed with seamless elegance.',
      cta: 'Plan Your Experience with Chef Franko',
    },
    gallery: {
      badge: 'Visual Gastronomy',
      title1: 'Artistry on Every',
      title2: 'Plate & Moment.',
      subtitle: 'A photographic journey through our private villa services, signature plating techniques and elite culinary brigade.',
      categories: {
        todos: 'All Highlights',
        platos: 'Signature Dishes',
        tecnica: 'Technique & Detail',
        brigada: 'Culinary Brigade',
        eventos: 'Villa Atmosphere',
      },
      cta: 'Request This Experience',
    },
    forms: {
      quoteBadge: 'Direct Inquiry',
      quoteTitle: 'Reserve Your Culinary Experience',
      quoteSubtitle: 'Tell us about your upcoming date, guest count and villa location for a tailored proposal.',
      reservationBadge: 'Direct Reservation & Quote',
      reservationTitle: 'Design Your Custom',
      reservationTitleAccent: 'Gourmet Experience',
      reservationSubtitle: 'Fill in your details below. Chef Franko Salgado will promptly review your request and get back with menu proposals.',
      nameLabel: 'Full Name',
      namePlaceholder: 'e.g. Eleanor Vance',
      emailLabel: 'Email Address',
      emailPlaceholder: 'eleanor@example.com',
      phoneLabel: 'Phone / WhatsApp',
      phonePlaceholder: '+1 (555) 000-0000',
      dateLabel: 'Event Date',
      guestsLabel: 'Number of Guests',
      guestsUnit: 'guests',
      serviceLabel: 'Experience / Menu Preference',
      servicesList: [
        '5-Course Author Tasting Menu',
        'Private Villa Dinner & Wine Pairing',
        'Contemporary Mexican Gastronomy',
        'Romantic Dinner for Two',
        'Villa Celebration & Gourmet Buffet',
        'Custom Tailored Experience',
      ],
      notesLabel: 'Dietary Restrictions, Villa Location & Notes',
      notesPlaceholder: 'Allergies, preferred dining time, villa or hotel name, special occasion...',
      submitBtn: 'Send Reservation Request',
      submittingBtn: 'Sending your request securely...',
      successTitle: 'Request Received Successfully!',
      successMsg: 'Thank you for reaching out to Chef 4 You by Franko Salgado.',
      successSubmsg: 'We have received your event details. Chef Franko will contact you shortly via WhatsApp or email with your bespoke menu proposal.',
      closeBtn: 'Close',
      whatsappDirect: 'Chat with Chef Franko on WhatsApp',
      directContactNote: 'Need immediate confirmation? Contact Chef Franko directly:',
      calendarBookingBtn: 'Schedule an intro call on Calendar',
    },
    chat: {
      title: 'Franko AI',
      subtitle: 'Live Gastronomic Assistant',
      greeting: "Hello! I am Franko AI, Chef Franko Salgado's virtual sommelier & culinary assistant. How can I help you regarding our villa tasting menus, pairings, or dates in Puerto Vallarta & Punta Mita?",
      placeholder: 'Ask about menus, pricing, dietary options, or locations...',
      loading: 'Franko AI is composing your answer...',
      errorMsg: 'We experienced a temporary network connection issue. Please feel free to message Chef Franko directly on WhatsApp for instant assistance.',
    },
    footer: {
      tagline: 'Private dining, thoughtfully hosted.',
      description: 'Chef 4 You by Franko creates private dining experiences for villas, residences and destination stays in Puerto Vallarta, Punta Mita and Nuevo Nayarit.',
      explore: 'Explore',
      contact: 'Direct Contact',
      rights: 'Chef 4 You by Franko. The Art of Living.',
    },
  },
  es: {
    nav: {
      experiences: 'Experiencias',
      chefFranko: 'Chef Franko',
      gallery: 'Galería',
      requestExperience: 'Cotizar Experiencia',
      whatsappCta: 'WhatsApp · Consultar disponibilidad',
      menu: 'Menú',
      close: 'Cerrar',
      followWhatsApp: 'Chatear por WhatsApp',
      followFacebook: 'Seguir en Facebook',
      followInstagram: 'Seguir en Instagram',
      socialLabel: 'Síguenos',
    },
    hero: {
      badge: 'Chef Privado · Puerto Vallarta & Riviera Nayarit',
      titleLine1: 'El arte de vivir,',
      titleLine2: 'servido en tu mesa.',
      subtitle: 'Experiencias gastronómicas privadas, menús de autor maridados y catering de lujo para villas, residencias y vacaciones en Puerto Vallarta, Punta Mita y Nuevo Nayarit.',
      ctaPrimary: 'Cotiza tu experiencia',
      ctaSecondary: 'Ver experiencias',
      locationBar: 'Puerto Vallarta · Punta Mita · Nuevo Nayarit · Sayulita',
      serviceTag: 'Villas privadas · Celebraciones · Cenas de autor',
    },
    home: {
      curatedTitle: 'Experiencias de Autor',
      curatedSubtitle: 'Un restaurante privado cobra vida donde',
      curatedCopy: 'Cada menú comienza con una conversación. Los ingredientes frescos, el ritmo del servicio y la atmósfera se diseñan minuciosamente para ti y tus invitados.',
      signatureTag: 'Experiencia insignia',
      planCta: 'Planear esta experiencia',
      bioBadge: 'Chef Franko Salgado',
      bioTitle1: 'La hospitalidad no es un extra.',
      bioTitle2: 'Es el alma de la experiencia.',
      bioText: 'Cocinar en una villa privada exige más que técnica depurada. Requiere discreción absoluta, intuición y la calidez para hacer sentir a cada comensal profundamente atendido.',
      bioCta: 'Conoce la historia del Chef Franko',
      testimonialQuote: '“Fue una experiencia gastronómica inolvidable. Cada tiempo y detalle hicieron que nuestra celebración fuera completamente personal y memorable.”',
      testimonialAuthor: 'Eva M. · Cena de gala privada en Punta Mita',
    },
    experiences: {
      badge: 'Gastronomía a Medida',
      title1: 'Experiencias creadas para',
      title2: 'la forma en que deseas reunirte.',
      subtitle: 'Desde una cena romántica de 5 tiempos hasta banquetes de gala en villa privada, cada momento se diseña en torno a tus invitados, la residencia y la ocasión.',
      items: [
        {
          title: 'Cena Privada en Villa',
          desc: 'Una velada relajada y de alta cocina en el confort de tu villa, diseñada exclusivamente para deleitar a tus comensales.',
          cta: 'Cotizar Cena en Villa',
        },
        {
          title: 'Mesa Mexicana Contemporánea',
          desc: 'Un recorrido gastronómico por los sabores, memorias e ingredientes de México, reinterpretados con técnica de vanguardia.',
          cta: 'Explorar Mesa Mexicana',
        },
        {
          title: 'Velada Romántica para Dos',
          desc: 'Un ritual culinario íntimo de 5 tiempos con maridaje, ideal para propuestas de matrimonio, aniversarios y momentos especiales.',
          cta: 'Planear Cena Romántica',
        },
        {
          title: 'Celebración Familiar & Grupal',
          desc: 'La forma más elegante y cálida de reunir a familia y amigos para cumpleaños, reuniones y fechas memorables.',
          cta: 'Planear Celebración',
        },
        {
          title: 'Chef’s Table en tu Residencia',
          desc: 'Una experiencia interactiva donde la preparación en vivo, maridajes y la conversación culinaria forman parte del espectáculo.',
          cta: 'Solicitar Chef’s Table',
        },
        {
          title: 'Clase Magistral de Cocina',
          desc: 'Un momento práctico y ameno para quienes desean cocinar, degustar mariscos frescos y descubrir secretos de alta cocina junto al Chef.',
          cta: 'Planear Clase de Cocina',
        },
      ],
    },
    bio: {
      badge: 'Conoce al Chef Franko Salgado',
      title1: 'Alta cocina guiada por',
      title2: 'las personas en la mesa.',
      p1: 'Chef 4 You by Franko nace de la certeza de que una gran comida se convierte en el recuerdo más entrañable de un viaje o celebración. Con formación en Le Cordon Bleu y trayectoria en resorts de cinco estrellas, el Chef Franko traslada los estándares de un restaurante de autor a tu villa privada.',
      p2: 'Ya sea una cena íntima al atardecer en Punta Mita o una celebración familiar en Puerto Vallarta, cada detalle—desde la selección de mariscos del Pacífico hasta el servicio de vajilla fina y maridaje—se orquesta con total perfección.',
      cta: 'Planear Experiencia con el Chef Franko',
    },
    gallery: {
      badge: 'Galería Culinaria',
      title1: 'Arte en Cada',
      title2: 'Plato & Momento.',
      subtitle: 'Un recorrido visual por nuestros montajes en villa privada, técnicas de emplatado de autor y brigada culinaria de élite.',
      categories: {
        todos: 'Todas las fotos',
        platos: 'Platos de Autor',
        tecnica: 'Técnica & Detalle',
        brigada: 'Brigada Culinaria',
        eventos: 'Ambiente en Villa',
      },
      cta: 'Cotizar Esta Experiencia',
    },
    forms: {
      quoteBadge: 'Cotización Directa',
      quoteTitle: 'Reserva Tu Experiencia Culinaria',
      quoteSubtitle: 'Indícanos la fecha de tu evento, número de comensales y villa para enviarte una propuesta personalizada.',
      reservationBadge: 'Reserva & Cotización Directa',
      reservationTitle: 'Diseña Tu Experiencia',
      reservationTitleAccent: 'Gourmet a Medida',
      reservationSubtitle: 'Completa el formulario y el Chef Franko Salgado se pondrá en contacto contigo a la brevedad con opciones de menú.',
      nameLabel: 'Nombre Completo',
      namePlaceholder: 'Ej. María González',
      emailLabel: 'Correo Electrónico',
      emailPlaceholder: 'maria@ejemplo.com',
      phoneLabel: 'Teléfono / WhatsApp',
      phonePlaceholder: '+52 322 000 0000',
      dateLabel: 'Fecha del Evento',
      guestsLabel: 'Número de Comensales',
      guestsUnit: 'comensales',
      serviceLabel: 'Experiencia / Menú Solicitado',
      servicesList: [
        'Cena Degustación de Autor 5 Tiempos',
        'Cena en Villa Privada & Maridaje',
        'Mesa Mexicana Contemporánea',
        'Cena Romántica para Dos',
        'Celebración Familiar / Buffet Gourmet',
        'Menú Personalizado a la Carta',
      ],
      notesLabel: 'Alergias, Preferencias o Nombre de la Villa',
      notesPlaceholder: 'Restricciones alimentarias, horario deseado, nombre de la villa u hotel...',
      submitBtn: 'Enviar Solicitud de Reserva',
      submittingBtn: 'Enviando solicitud de forma segura...',
      successTitle: '¡Solicitud Recibida con Éxito!',
      successMsg: 'Gracias por ponerte en contacto con Chef 4 You by Franko Salgado.',
      successSubmsg: 'Hemos recibido los detalles de tu evento. Franko se comunicará contigo vía WhatsApp o correo electrónico para coordinar tu propuesta gastronómica.',
      closeBtn: 'Cerrar',
      whatsappDirect: 'Contactar al Chef Franko por WhatsApp',
      directContactNote: '¿Deseas atención inmediata? Escríbenos directamente:',
      calendarBookingBtn: 'Agendar llamada exploratoria en Calendario',
    },
    chat: {
      title: 'Franko AI',
      subtitle: 'Asistente Gastronómico en Vivo',
      greeting: '¡Hola! Soy Franko AI, el asistente gastronómico del Chef Franko Salgado. ¿En qué puedo orientarte hoy sobre nuestras cenas de autor, maridaje o disponibilidad en villa?',
      placeholder: 'Pregunta sobre menús, maridajes, cotizaciones o zonas...',
      loading: 'Franko AI está redactando tu respuesta...',
      errorMsg: 'Ocurrió un inconveniente temporal de conexión. Puedes escribirle directamente al Chef Franko por WhatsApp para atenderte de inmediato.',
    },
    footer: {
      tagline: 'Alta cocina privada, servida con calidez.',
      description: 'Chef 4 You by Franko crea experiencias gastronómicas privadas para villas, residencias y estancias de lujo en Puerto Vallarta, Punta Mita y Nuevo Nayarit.',
      explore: 'Explorar',
      contact: 'Contacto Directo',
      rights: 'Chef 4 You by Franko. El Arte de Vivir.',
    },
  },
};

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chef4you_lang');
      if (saved === 'en' || saved === 'es') return saved;
      const navLang = navigator.language || '';
      return navLang.toLowerCase().startsWith('es') ? 'es' : 'en';
    }
    return 'en';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('chef4you_lang', newLang);
      document.documentElement.lang = newLang === 'es' ? 'es-MX' : 'en';
    }
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'es' : 'en');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = lang === 'es' ? 'es-MX' : 'en';
    }
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
