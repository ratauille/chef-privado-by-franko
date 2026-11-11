import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'es';

export interface LocationPageContent {
  badge: string;
  h1Eyebrow: string;
  h1Title: string;
  h1Accent: string;
  subtitle: string;
  ctaPrimary: string;
  ctaWhatsapp: string;
  whatsappText: string;
  highlightsTitle: string;
  highlightsSubtitle: string;
  highlights: {
    title: string;
    desc: string;
  }[];
  logisticsBadge: string;
  logisticsTitle: string;
  logisticsIntro: string;
  logisticsItems: {
    title: string;
    desc: string;
  }[];
  areasTitle: string;
  areasCopy: string;
  areasList: string[];
  faqTitle: string;
  faqs: {
    q: string;
    a: string;
  }[];
  finalTitle: string;
  finalSub: string;
}

export interface TranslationDictionary {
  nav: {
    experiences: string;
    puntaMita: string;
    nuevoNayarit: string;
    chefFranko: string;
    gallery: string;
    requestExperience: string;
    whatsappCta: string;
    whatsappMessage: string;
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
    processBadge: string;
    processTitle: string;
    processSteps: {
      step: string;
      title: string;
      desc: string;
    }[];
    destinationsBadge: string;
    destinationsTitle: string;
    destinationsCopy: string;
    destinations: {
      name: string;
      tag: string;
      desc: string;
      href: string;
      cta: string;
    }[];
    bioBadge: string;
    bioTitle1: string;
    bioTitle2: string;
    bioText: string;
    bioCta: string;
    testimonialQuote: string;
    testimonialAuthor: string;
    faqBadge: string;
    faqTitle: string;
    faqs: {
      q: string;
      a: string;
    }[];
  };
  experiences: {
    badge: string;
    title1: string;
    title2: string;
    subtitle: string;
    sectionHeading: string;
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
    sectionHeading: string;
    p1: string;
    p2: string;
    cta: string;
  };
  gallery: {
    badge: string;
    title1: string;
    title2: string;
    sectionHeading: string;
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
    formSectionHeading: string;
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
    paypalDepositNote: string;
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
    destinations: string;
    contact: string;
    rights: string;
  };
  locations: {
    puntaMita: LocationPageContent;
    nuevoNayarit: LocationPageContent;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    nav: {
      experiences: 'Experiences',
      puntaMita: 'Punta Mita',
      nuevoNayarit: 'Nuevo Nayarit',
      chefFranko: 'Chef Franko',
      gallery: 'Gallery',
      requestExperience: 'Request an Experience',
      whatsappCta: 'WhatsApp · Check Availability',
      whatsappMessage:
        'Hello Chef Franko, I would like information and availability for a private chef experience in Puerto Vallarta / Punta Mita.',
      menu: 'Menu',
      close: 'Close',
      followWhatsApp: 'Chat on WhatsApp',
      followFacebook: 'Follow on Facebook',
      followInstagram: 'Follow on Instagram',
      socialLabel: 'Follow us',
    },
    hero: {
      badge: 'Private Chef in Puerto Vallarta & Punta Mita',
      titleLine1: 'The art of living,',
      titleLine2: 'served at your table.',
      subtitle:
        'Bespoke in-villa private dining, contemporary Mexican tasting menus and fresh Pacific seafood for luxury villas and residences in Puerto Vallarta, Punta Mita and Nuevo Nayarit.',
      ctaPrimary: 'Request your experience',
      ctaSecondary: 'Explore the experiences',
      locationBar: 'Puerto Vallarta · Punta Mita · Nuevo Nayarit · Riviera Nayarit',
      serviceTag: 'Private villas · Tasting menus · Full table service',
    },
    home: {
      curatedTitle: 'Private Dining & Tasting Menus in Puerto Vallarta',
      curatedSubtitle: 'A private restaurant appears wherever',
      curatedCopy:
        'Every menu begins with a conversation. Fresh local seafood, seasonal Mexican produce, pacing and table service are composed meticulously around the guests at your villa.',
      signatureTag: 'Signature experience',
      planCta: 'Plan this experience',
      processBadge: 'Effortless Villa Hospitality',
      processTitle: 'What Is Included in Every Private Chef Experience',
      processSteps: [
        {
          step: '01',
          title: 'Bespoke Menu Design & Dietary Care',
          desc: 'We tailor each course to your group’s preferences, allergies, gluten-free or plant-based needs, and children’s menus.',
        },
        {
          step: '02',
          title: 'Local Market & Pacific Seafood Sourcing',
          desc: 'Chef Franko personally selects line-caught Pacific fish, prime cuts and regional produce on the day of your dinner.',
        },
        {
          step: '03',
          title: 'In-Villa Preparation, Service & Spotless Cleanup',
          desc: 'Our brigade handles cooking, plated table service and full kitchen cleanup so you simply relax with your guests.',
        },
      ],
      destinationsBadge: 'Where We Cook',
      destinationsTitle: 'Private Chef Services Across Banderas Bay & Riviera Nayarit',
      destinationsCopy:
        'Whether your villa overlooks the ocean in Conchas Chinas, sits inside the gates of Punta Mita, or fronts the beach in Nuevo Nayarit, our culinary team travels directly to your residence.',
      destinations: [
        {
          name: 'Puerto Vallarta Villas',
          tag: 'Conchas Chinas · Zona Romántica · Marina · Mismaloya',
          desc: 'Private tasting menus, romantic dinners for two and group celebrations in hillside and oceanfront villas across Puerto Vallarta.',
          href: '/experiencias',
          cta: 'Explore Vallarta Dining',
        },
        {
          name: 'Private Chef Punta Mita',
          tag: 'Punta Mita Peninsula · Kupuri · Litibú · Luxury Estates',
          desc: 'Private villa dinners and intimate celebrations with bespoke tasting menus, table service and full kitchen cleanup in Punta Mita.',
          href: '/private-chef-punta-mita',
          cta: 'View Punta Mita Service',
        },
        {
          name: 'Nuevo Vallarta / Nuevo Nayarit',
          tag: 'Nuevo Nayarit · Flamingos · Bucerías · Riviera Nayarit',
          desc: 'Family meals, group gatherings and vacation dinners prepared at your residence or beachfront villa in Nuevo Nayarit.',
          href: '/private-chef-nuevo-nayarit',
          cta: 'View Nuevo Nayarit Service',
        },
      ],
      bioBadge: 'Chef Franko Salgado',
      bioTitle1: 'Hospitality is not an extra.',
      bioTitle2: 'It is the heart of the experience.',
      bioText:
        'Cooking inside a private villa asks for more than refined technique. It asks for discretion, intuition and the ability to make every guest feel genuinely pampered and cared for.',
      bioCta: "Discover Chef Franko's story",
      testimonialQuote:
        '“It was truly an unforgettable culinary experience. Every single detail made our celebration feel deeply personal and extraordinary.”',
      testimonialAuthor: 'Eva M. · Private villa celebration in Punta Mita',
      faqBadge: 'Guest & Concierge FAQ',
      faqTitle: 'Frequently Asked Questions About Hiring a Private Chef',
      faqs: [
        {
          q: 'What is included when we book Chef Franko for our villa?',
          a: 'Every experience includes personalized menu planning, all ingredient shopping and provisioning, in-villa preparation, course-by-course table presentation, and complete kitchen cleanup at the end of the evening.',
        },
        {
          q: 'Which areas do you serve in Puerto Vallarta and Riviera Nayarit?',
          a: 'We serve private villas, condos and residences throughout Puerto Vallarta (Conchas Chinas, Amapas, Zona Romántica, Marina Vallarta, Mismaloya), Punta Mita, Nuevo Nayarit (Nuevo Vallarta), Flamingos, Bucerías and Sayulita.',
        },
        {
          q: 'Can you accommodate food allergies, vegan/gluten-free diets or children?',
          a: 'Yes. Every menu is custom-built from scratch. We regularly adapt tasting menus for shellfish or nut allergies, celiac/gluten-free guests, vegetarian/vegan diners and dedicated children’s menus.',
        },
        {
          q: 'How far in advance should we reserve our date?',
          a: 'For peak season dates, holidays and large villa celebrations in Puerto Vallarta or Punta Mita, we recommend inquiring 2 to 6 weeks in advance. For last-minute stays, message us directly on WhatsApp to check immediate availability.',
        },
      ],
    },
    experiences: {
      badge: 'Private Dining Puerto Vallarta & Punta Mita',
      title1: 'Experiences made for',
      title2: 'the way you want to gather.',
      sectionHeading: 'Signature Private Dining & Tasting Menu Formats',
      subtitle:
        'From an intimate romantic dinner for two to a multi-course contemporary Mexican tasting menu or villa celebration, each experience is tailored around your guests and setting.',
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
          title: 'Chef’s Table & Fresh Pacific Seafood',
          desc: 'An interactive, chef-led dining showcase where line-caught regional seafood, live plating and culinary storytelling take center stage.',
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
      badge: 'Meet Chef Franko Salgado · Puerto Vallarta & Punta Mita',
      title1: 'Private dining shaped by',
      title2: 'the people around the table.',
      sectionHeading: 'Contemporary Mexican Author Cuisine & Private Villa Hospitality',
      p1: 'Chef 4 You by Franko was born from the conviction that an extraordinary meal can become the most enduring memory of a journey or celebration. With classical training at Le Cordon Bleu and years leading luxury hospitality kitchens, Chef Franko brings fine-dining culinary standards straight into private residences.',
      p2: 'Whether you are hosting an intimate sunset dinner in Punta Mita or celebrating with family in a Puerto Vallarta or Nuevo Nayarit villa, every detail—from daily Pacific seafood procurement to customized pairings and discreet table service—is executed with seamless elegance.',
      cta: 'Plan Your Experience with Chef Franko',
    },
    gallery: {
      badge: 'Private Chef Gallery · Puerto Vallarta & Punta Mita',
      title1: 'Artistry on Every',
      title2: 'Plate & Moment.',
      sectionHeading: 'Signature Plating, Fresh Seafood & Private Villa Setups',
      subtitle:
        'A photographic journey through our private villa dinners, contemporary Mexican plating techniques and culinary brigade in Banderas Bay.',
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
      reservationBadge: 'Book Private Chef · Puerto Vallarta & Punta Mita',
      reservationTitle: 'Design Your Custom',
      reservationTitleAccent: 'Gourmet Experience',
      reservationSubtitle:
        'Fill in your event details below. Chef Franko Salgado will review your request and send a tailored menu proposal for your villa.',
      formSectionHeading: 'Event Details & Custom Menu Request',
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
      notesLabel: 'Villa Location or Preferred Time (Optional)',
      notesPlaceholder: 'Villa or neighborhood (Puerto Vallarta, Punta Mita, Nuevo Nayarit), preferred dining time or general questions (dietary needs will be coordinated upon date confirmation)...',
      submitBtn: 'Send Reservation Request',
      submittingBtn: 'Sending your request securely...',
      successTitle: 'Request Received Successfully!',
      successMsg: 'Thank you for reaching out to Chef 4 You by Franko Salgado.',
      successSubmsg:
        'We have received your event details. Chef Franko will contact you shortly via WhatsApp or email with your bespoke menu proposal.',
      closeBtn: 'Close',
      whatsappDirect: 'Chat with Chef Franko on WhatsApp',
      directContactNote: 'Need immediate confirmation? Contact Chef Franko directly:',
      calendarBookingBtn: 'Schedule an intro call on Calendar',
      paypalDepositNote: 'Once availability is confirmed, you will receive instructions to coordinate your reservation deposit via bank transfer or direct arrangement.',
    },
    chat: {
      title: 'Franko AI',
      subtitle: 'Live Gastronomic Assistant',
      greeting:
        "Hello! I am Franko AI, Chef Franko Salgado's virtual sommelier & culinary assistant. How can I help you regarding our villa tasting menus, pairings, or dates in Puerto Vallarta & Punta Mita?",
      placeholder: 'Ask about menus, pricing, dietary options, or locations...',
      loading: 'Franko AI is composing your answer...',
      errorMsg:
        'We experienced a temporary network connection issue. Please feel free to message Chef Franko directly on WhatsApp for instant assistance.',
    },
    footer: {
      tagline: 'Private dining, thoughtfully hosted.',
      description:
        'Chef 4 You by Franko creates bespoke private dining experiences for luxury villas, residences and destination stays in Puerto Vallarta, Punta Mita and Nuevo Nayarit.',
      explore: 'Explore',
      destinations: 'Destinations',
      contact: 'Direct Contact',
      rights: 'Chef 4 You by Franko. The Art of Living.',
    },
    locations: {
      puntaMita: {
        badge: 'Private Chef Punta Mita · Riviera Nayarit',
        h1Eyebrow: 'Private Villa Dining & Intimate Celebrations',
        h1Title: 'Private Chef in Punta Mita',
        h1Accent: '',
        subtitle:
          'Personalized private villa dinners and intimate celebrations prepared in your kitchen by Chef Franko Salgado. Enjoy custom multi-course tasting menus, fresh Pacific seafood sourcing, plated table service and full kitchen cleanup.',
        ctaPrimary: 'Request a Booking',
        ctaWhatsapp: 'WhatsApp · Punta Mita Availability',
        whatsappText:
          'Hello Chef Franko, I would like to inquire about availability and menus for a private chef experience at our villa in Punta Mita.',
        highlightsTitle: 'Private Villa Dinners & Intimate Celebrations in Punta Mita',
        highlightsSubtitle:
          'From romantic dinners for two to multi-course tasting menus for close friends and family, every dish is prepared fresh in your villa.',
        highlights: [
          {
            title: 'Private Villa Dinners',
            desc: 'Relaxed, course-by-course plated dinners prepared in your villa kitchen with ingredient shopping and complete cleanup included.',
          },
          {
            title: 'Intimate Celebrations & Romantic Evenings',
            desc: 'Five-course tasting menus crafted for anniversaries, birthdays, proposals and special gatherings around your private table.',
          },
          {
            title: 'Contemporary Mexican & Fresh Pacific Seafood',
            desc: 'Seasonal regional produce and fresh local catch prepared with contemporary Mexican culinary technique.',
          },
        ],
        logisticsBadge: 'Full-Service Villa Hospitality',
        logisticsTitle: 'What Is Included in Every Punta Mita Private Dinner',
        logisticsIntro:
          'Each service is planned around your guest count, menu preferences and villa dining space so you can focus entirely on your evening.',
        logisticsItems: [
          {
            title: 'Ingredient Sourcing & Market Selection',
            desc: 'All proteins, fresh Pacific seafood, produce and herbs are selected and brought to your villa by our culinary team.',
          },
          {
            title: 'Custom Menus & Dietary Care',
            desc: 'Menus adapted to food allergies, gluten-free, dairy-free, vegetarian and vegan guests, as well as children.',
          },
          {
            title: 'Plated Table Service & Kitchen Cleanup',
            desc: 'Thoughtful course pacing at your dining table or terrace, leaving your villa kitchen spotless at the end of the evening.',
          },
        ],
        areasTitle: 'Communities & Residences Served Around Punta Mita',
        areasCopy:
          'We provide private chef and in-villa dining services across the Punta Mita peninsula and northern Riviera Nayarit coast:',
        areasList: [
          'Punta Mita Residential Estates & Villas',
          'Kupuri, Porta Fortuna & Lagos del Mar',
          'Litibú & Higuera Blanca Oceanfront Villas',
          'Costa Banderas Private Residences',
          'Sayulita & San Pancho Villas',
        ],
        faqTitle: 'Frequently Asked Questions — Private Chef in Punta Mita',
        faqs: [
          {
            q: 'Do we need to shop for any ingredients before Chef Franko arrives?',
            a: 'No. Every experience includes complete ingredient shopping and market sourcing, brought directly to your villa.',
          },
          {
            q: 'What group sizes do you serve for villa dinners and intimate celebrations?',
            a: 'Our private menus are designed for intimate dinners for 2 guests up to villa celebrations of 20 guests, with custom proposals available upon request.',
          },
          {
            q: 'Can you adapt the tasting menu for food allergies or vegetarian guests?',
            a: 'Yes. We tailor courses to accommodate food allergies, gluten-free, dairy-free, vegetarian and vegan preferences.',
          },
        ],
        finalTitle: 'Plan Your Private Villa Dinner in Punta Mita',
        finalSub: 'Share your date, guest count and villa location to receive a custom menu proposal from Chef Franko Salgado.',
      },
      nuevoNayarit: {
        badge: 'Private Chef Nuevo Nayarit · Riviera Nayarit',
        h1Eyebrow: 'Family Meals, Group Gatherings & Vacation Dinners',
        h1Title: 'Private Chef in Nuevo Nayarit',
        h1Accent: '',
        subtitle:
          'Relaxed family meals, group gatherings and memorable vacation dinners prepared right in your residence. Chef Franko Salgado and his team handle menu planning, same-day ingredient shopping, cooking, table service and complete kitchen cleanup.',
        ctaPrimary: 'Request a Booking',
        ctaWhatsapp: 'WhatsApp · Nuevo Nayarit Inquiry',
        whatsappText:
          'Hello Chef Franko, I would like to check availability for a private chef dinner in Nuevo Nayarit / Nuevo Vallarta.',
        highlightsTitle: 'Family & Group Dining in Nuevo Nayarit',
        highlightsSubtitle:
          'Skip restaurant logistics and group transportation. Enjoy chef-prepared meals served at your own pace in the comfort of your vacation residence.',
        highlights: [
          {
            title: 'Family Meals & Multi-Generational Tables',
            desc: 'Warm, unhurried dining for families and groups of 2 to 20 guests where everyone shares the table in comfort.',
          },
          {
            title: 'Group Gatherings & Vacation Dinners',
            desc: 'Custom menus for vacation nights, reunions and birthdays—from casual chef specials to five-course tasting dinners.',
          },
          {
            title: 'Contemporary Mexican & Coastal Cuisine',
            desc: 'Fresh Pacific seafood, local ingredients and signature dishes prepared fresh in your condo, penthouse or beachfront home.',
          },
        ],
        logisticsBadge: 'Effortless Vacation Dining',
        logisticsTitle: 'How Our Private Chef Service Works at Your Residence',
        logisticsIntro:
          'Whether you are staying in a beachfront residence, marina villa or vacation condominium in Nuevo Nayarit, our team takes care of every step.',
        logisticsItems: [
          {
            title: 'Same-Day Ingredient Shopping',
            desc: 'We select fresh local seafood, meats and seasonal produce before your dinner—no grocery shopping needed from your group.',
          },
          {
            title: 'On-Site Preparation for Condos & Homes',
            desc: 'Our culinary team prepares and plates each course directly in your residence kitchen for groups of 2 to 20 guests.',
          },
          {
            title: 'Table Service & Full Kitchen Cleanup',
            desc: 'From the first course to dessert and final kitchen cleanup, every detail is handled so your group can relax.',
          },
        ],
        areasTitle: 'Areas Served Across Nuevo Nayarit & Nearby Coast',
        areasCopy:
          'Our culinary team serves private residences, villas and vacation rentals throughout Nuevo Nayarit and neighboring coastal communities:',
        areasList: [
          'Nuevo Nayarit / Nuevo Vallarta Beachfront & Marina Zones',
          'El Tigre & Paradise Village Private Residences',
          'Flamingos Beachfront Condos & Villas',
          'Bucerías (Zona Dorada & Oceanfront Homes)',
          'Puerto Vallarta & Banderas Bay Villas',
        ],
        faqTitle: 'Frequently Asked Questions — Private Chef in Nuevo Nayarit',
        faqs: [
          {
            q: 'Do you serve both Nuevo Nayarit and Nuevo Vallarta?',
            a: 'Yes—Nuevo Nayarit and Nuevo Vallarta refer to the same destination in Riviera Nayarit, and we serve residences across the beach, marina and golf areas.',
          },
          {
            q: 'Can you cook for our family or group in a vacation condo or house?',
            a: 'Yes. We regularly prepare family dinners, group celebrations and tasting menus inside vacation homes, penthouses and condominiums.',
          },
          {
            q: 'How are dietary preferences and children’s meals handled?',
            a: 'Every menu is customized for your group, including adaptations for food allergies, gluten-free, vegetarian or vegan guests and options for children.',
          },
        ],
        finalTitle: 'Plan Your Group or Family Dinner in Nuevo Nayarit',
        finalSub: 'Tell us your date, guest count and residence area to receive a personalized menu proposal.',
      },
    },
  },
  es: {
    nav: {
      experiences: 'Experiencias',
      puntaMita: 'Punta Mita',
      nuevoNayarit: 'Nuevo Nayarit',
      chefFranko: 'Chef Franko',
      gallery: 'Galería',
      requestExperience: 'Cotizar Experiencia',
      whatsappCta: 'WhatsApp · Consultar disponibilidad',
      whatsappMessage:
        'Hola Chef Franko, quisiera información y disponibilidad para una experiencia de chef privado en Puerto Vallarta / Punta Mita.',
      menu: 'Menú',
      close: 'Cerrar',
      followWhatsApp: 'Chatear por WhatsApp',
      followFacebook: 'Seguir en Facebook',
      followInstagram: 'Seguir en Instagram',
      socialLabel: 'Síguenos',
    },
    hero: {
      badge: 'Chef Privado en Puerto Vallarta y Punta Mita',
      titleLine1: 'El arte de vivir,',
      titleLine2: 'servido en tu mesa.',
      subtitle:
        'Experiencias gastronómicas privadas, menús degustación de cocina mexicana contemporánea y mariscos frescos para villas y residencias en Puerto Vallarta, Punta Mita y Nuevo Nayarit.',
      ctaPrimary: 'Cotiza tu experiencia',
      ctaSecondary: 'Ver experiencias',
      locationBar: 'Puerto Vallarta · Punta Mita · Nuevo Nayarit · Riviera Nayarit',
      serviceTag: 'Villas privadas · Menús degustación · Servicio completo',
    },
    home: {
      curatedTitle: 'Cenas Privadas y Menús Degustación en Puerto Vallarta',
      curatedSubtitle: 'Un restaurante privado cobra vida donde',
      curatedCopy:
        'Cada menú comienza con una conversación. Los ingredientes frescos del Pacífico, el ritmo del servicio y el montaje en mesa se diseñan minuciosamente para tus invitados.',
      signatureTag: 'Experiencia insignia',
      planCta: 'Planear esta experiencia',
      processBadge: 'Hospitalidad Integral en tu Villa',
      processTitle: 'Qué Incluye Cada Experiencia de Chef Privado',
      processSteps: [
        {
          step: '01',
          title: 'Diseño de Menú a Medida y Alergias',
          desc: 'Adaptamos cada tiempo a los gustos de tu grupo, restricciones alimentarias, opciones sin gluten, veganas o menús infantiles.',
        },
        {
          step: '02',
          title: 'Compra de Ingredientes y Pesca del Día',
          desc: 'El Chef Franko selecciona personalmente mariscos frescos de la bahía, cortes selectos e ingredientes locales el mismo día de tu cena.',
        },
        {
          step: '03',
          title: 'Cocina en Vivo, Servicio en Mesa y Limpieza Total',
          desc: 'Nuestro equipo se encarga de la preparación, el servicio por tiempos y de entregar tu cocina impecable al finalizar la velada.',
        },
      ],
      destinationsBadge: 'Zonas de Cobertura',
      destinationsTitle: 'Servicio de Chef Privado en Bahía de Banderas y Riviera Nayarit',
      destinationsCopy:
        'Ya sea en una villa frente al mar en Conchas Chinas, una residencia en Punta Mita o un penthouse en Nuevo Nayarit, trasladamos la experiencia completa a tu mesa.',
      destinations: [
        {
          name: 'Puerto Vallarta',
          tag: 'Conchas Chinas · Zona Romántica · Marina · Mismaloya',
          desc: 'Cenas privadas, menús degustación de autor y veladas románticas en villas y residencias de Puerto Vallarta.',
          href: '/experiencias',
          cta: 'Ver Experiencias en Vallarta',
        },
        {
          name: 'Chef Privado Punta Mita',
          tag: 'Península de Punta Mita · Kupuri · Litibú · Villas de Lujo',
          desc: 'Cenas privadas en villa y celebraciones íntimas con menús degustación, servicio en mesa y limpieza de cocina en Punta Mita.',
          href: '/private-chef-punta-mita',
          cta: 'Ver Servicio en Punta Mita',
        },
        {
          name: 'Nuevo Nayarit / Nuevo Vallarta',
          tag: 'Nuevo Nayarit · Flamingos · Bucerías · Riviera Nayarit',
          desc: 'Comidas familiares, reuniones de grupo y cenas durante las vacaciones en residencias de Nuevo Nayarit y Bucerías.',
          href: '/private-chef-nuevo-nayarit',
          cta: 'Ver Servicio en Nuevo Nayarit',
        },
      ],
      bioBadge: 'Chef Franko Salgado',
      bioTitle1: 'La hospitalidad no es un extra.',
      bioTitle2: 'Es el alma de la experiencia.',
      bioText:
        'Cocinar en una villa privada exige más que técnica depurada. Requiere discreción absoluta, intuición y la calidez para hacer sentir a cada comensal profundamente atendido.',
      bioCta: 'Conoce la historia del Chef Franko',
      testimonialQuote:
        '“Fue una experiencia gastronómica inolvidable. Cada tiempo y detalle hicieron que nuestra celebración fuera completamente personal y memorable.”',
      testimonialAuthor: 'Eva M. · Cena privada en villa en Punta Mita',
      faqBadge: 'Preguntas Frecuentes',
      faqTitle: 'Preguntas Frecuentes sobre Contratar un Chef Privado',
      faqs: [
        {
          q: '¿Qué incluye el servicio de chef privado en nuestra villa o residencia?',
          a: 'Incluye el diseño personalizado del menú, la compra y traslado de todos los ingredientes frescos, la preparación en tu cocina, el servicio emplatado tiempo por tiempo y la limpieza completa de la cocina al terminar.',
        },
        {
          q: '¿En qué zonas de Puerto Vallarta y Riviera Nayarit prestan servicio?',
          a: 'Atendemos villas y residencias en todo Puerto Vallarta (Conchas Chinas, Amapas, Zona Romántica, Marina, Mismaloya), Punta Mita, Nuevo Nayarit (Nuevo Vallarta), Flamingos, Bucerías y Sayulita.',
        },
        {
          q: '¿Pueden adaptar el menú a alergias, dietas veganas, sin gluten o niños?',
          a: 'Sí. Cada menú se diseña a medida y adaptamos tiempos para alergias alimentarias, comensales celíacos, vegetarianos/veganos y menús especiales para niños.',
        },
        {
          q: '¿Con cuánta anticipación se recomienda reservar?',
          a: 'Para fechas de temporada alta, puentes o celebraciones grupales en Puerto Vallarta y Punta Mita recomendamos cotizar con 2 a 6 semanas de anticipación. Si tu viaje es próximo, contáctanos por WhatsApp para revisar disponibilidad inmediata.',
        },
      ],
    },
    experiences: {
      badge: 'Experiencias Gastronómicas en Puerto Vallarta y Punta Mita',
      title1: 'Experiencias creadas para',
      title2: 'la forma en que deseas reunirte.',
      sectionHeading: 'Formatos de Cenas Privadas y Menús Degustación a Domicilio',
      subtitle:
        'Desde una cena romántica de 5 tiempos hasta banquetes familiares en villa privada, cada experiencia se diseña en torno a tus invitados, la residencia y la ocasión.',
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
          title: 'Chef’s Table & Mariscos del Pacífico',
          desc: 'Una experiencia interactiva donde la pesca fresca de la bahía, el emplatado en vivo y la conversación culinaria son protagonistas.',
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
      badge: 'Chef Franko Salgado · Puerto Vallarta y Punta Mita',
      title1: 'Alta cocina guiada por',
      title2: 'las personas en la mesa.',
      sectionHeading: 'Cocina Mexicana Contemporánea de Autor y Hospitalidad en Villas',
      p1: 'Chef 4 You by Franko nace de la certeza de que una gran comida se convierte en el recuerdo más entrañable de un viaje o celebración. Con formación en Le Cordon Bleu y trayectoria en resorts de gran lujo, el Chef Franko traslada los estándares de un restaurante de autor directamente a tu residencia.',
      p2: 'Ya sea una cena íntima al atardecer en Punta Mita o una celebración familiar en Puerto Vallarta o Nuevo Nayarit, cada detalle—desde la selección diaria de mariscos del Pacífico hasta el servicio en mesa—se ejecuta con discreción y excelencia.',
      cta: 'Planear Experiencia con el Chef Franko',
    },
    gallery: {
      badge: 'Galería de Chef Privado · Puerto Vallarta y Punta Mita',
      title1: 'Arte en Cada',
      title2: 'Plato & Momento.',
      sectionHeading: 'Emplatados de Autor, Mariscos del Pacífico y Montajes en Villa',
      subtitle:
        'Un recorrido visual por nuestras cenas privadas en villas, técnicas de emplatado contemporáneo y brigada culinaria en Bahía de Banderas.',
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
      reservationBadge: 'Reservar Chef Privado · Puerto Vallarta y Punta Mita',
      reservationTitle: 'Diseña Tu Experiencia',
      reservationTitleAccent: 'Gourmet a Medida',
      reservationSubtitle:
        'Completa los detalles de tu cena y el Chef Franko Salgado te enviará una propuesta de menú personalizada para tu villa o residencia.',
      formSectionHeading: 'Datos del Evento y Solicitud de Menú Personalizado',
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
      notesLabel: 'Ubicación de la Villa u Horario Deseado (Opcional)',
      notesPlaceholder: 'Zona o villa (Puerto Vallarta, Punta Mita, Nuevo Nayarit), horario estimado o preguntas generales (los requerimientos dietéticos y alergias se coordinarán al confirmar la fecha)...',
      submitBtn: 'Enviar Solicitud de Reserva',
      submittingBtn: 'Enviando solicitud de forma segura...',
      successTitle: '¡Solicitud Recibida con Éxito!',
      successMsg: 'Gracias por ponerte en contacto con Chef 4 You by Franko Salgado.',
      successSubmsg:
        'Hemos recibido los detalles de tu evento. Franko se comunicará contigo vía WhatsApp o correo electrónico para coordinar tu propuesta gastronómica.',
      closeBtn: 'Cerrar',
      whatsappDirect: 'Contactar al Chef Franko por WhatsApp',
      directContactNote: '¿Deseas atención inmediata? Escríbenos directamente:',
      calendarBookingBtn: 'Agendar llamada exploratoria en Calendario',
      paypalDepositNote: 'Una vez confirmada la disponibilidad, recibirás las instrucciones para coordinar tu anticipo mediante transferencia bancaria directa o acuerdo previo.',
    },
    chat: {
      title: 'Franko AI',
      subtitle: 'Asistente Gastronómico en Vivo',
      greeting:
        '¡Hola! Soy Franko AI, el asistente gastronómico del Chef Franko Salgado. ¿En qué puedo orientarte hoy sobre nuestras cenas de autor, maridaje o disponibilidad en villa?',
      placeholder: 'Pregunta sobre menús, maridajes, cotizaciones o zonas...',
      loading: 'Franko AI está redactando tu respuesta...',
      errorMsg:
        'Ocurrió un inconveniente temporal de conexión. Puedes escribirle directamente al Chef Franko por WhatsApp para atenderte de inmediato.',
    },
    footer: {
      tagline: 'Alta cocina privada, servida con calidez.',
      description:
        'Chef 4 You by Franko crea experiencias gastronómicas privadas para villas, residencias y estancias de lujo en Puerto Vallarta, Punta Mita y Nuevo Nayarit.',
      explore: 'Explorar',
      destinations: 'Destinos',
      contact: 'Contacto Directo',
      rights: 'Chef 4 You by Franko. El Arte de Vivir.',
    },
    locations: {
      puntaMita: {
        badge: 'Chef Privado en Punta Mita · Riviera Nayarit',
        h1Eyebrow: 'Cenas Privadas en Villa y Celebraciones Íntimas',
        h1Title: 'Chef Privado en Punta Mita',
        h1Accent: '',
        subtitle:
          'Cenas privadas en villa y celebraciones íntimas preparadas en tu cocina por el Chef Franko Salgado. Disfruta de menús degustación personalizados, compra de mariscos frescos del Pacífico, servicio emplatado en mesa y limpieza total de la cocina.',
        ctaPrimary: 'Solicitar reserva',
        ctaWhatsapp: 'WhatsApp · Disponibilidad Punta Mita',
        whatsappText:
          'Hola Chef Franko, me gustaría consultar disponibilidad y menús para una cena de chef privado en nuestra villa en Punta Mita.',
        highlightsTitle: 'Cenas en Villa y Celebraciones Íntimas en Punta Mita',
        highlightsSubtitle:
          'Desde veladas románticas para dos hasta menús degustación de varios tiempos para celebrar en privado dentro de tu residencia.',
        highlights: [
          {
            title: 'Cenas Privadas en Villa',
            desc: 'Veladas relajadas servidas tiempo por tiempo en la comodidad de tu villa, con compra de insumos y limpieza completa incluidas.',
          },
          {
            title: 'Celebraciones Íntimas y Veladas para Dos',
            desc: 'Menús degustación de 5 tiempos diseñados para aniversarios, cumpleaños, pedidas de mano y reuniones especiales.',
          },
          {
            title: 'Cocina Mexicana Contemporánea y Pesca del Pacífico',
            desc: 'Mariscos frescos de la región e ingredientes de temporada preparados al momento con técnica de autor.',
          },
        ],
        logisticsBadge: 'Hospitalidad Integral en tu Villa',
        logisticsTitle: 'Qué Incluye Nuestro Servicio en Punta Mita',
        logisticsIntro:
          'Cada experiencia se planea alrededor de tus invitados, preferencias de menú y espacio en tu villa para que disfrutes sin preocupaciones.',
        logisticsItems: [
          {
            title: 'Compra y Selección de Ingredientes',
            desc: 'Seleccionamos y llevamos todos los insumos frescos, proteínas, mariscos y guarniciones directamente a tu villa.',
          },
          {
            title: 'Menús Personalizados y Atención a Alergias',
            desc: 'Adaptamos los tiempos para alergias alimentarias, opciones sin gluten, sin lácteos, vegetarianas, veganas y menús para niños.',
          },
          {
            title: 'Servicio en Mesa y Limpieza Total',
            desc: 'Presentación cuidada en cada tiempo y entrega de la cocina completamente limpia al finalizar la velada.',
          },
        ],
        areasTitle: 'Comunidades y Villas que Atendemos en Punta Mita',
        areasCopy:
          'Brindamos servicio de chef privado a domicilio en la península de Punta Mita y costa norte de Riviera Nayarit:',
        areasList: [
          'Residencias y Villas Privadas en Punta Mita',
          'Kupuri, Porta Fortuna y Lagos del Mar',
          'Villas Frente al Mar en Litibú e Higuera Blanca',
          'Costa Banderas y Residencias de Playa',
          'Villas Privadas en Sayulita y San Pancho',
        ],
        faqTitle: 'Preguntas Frecuentes — Chef Privado en Punta Mita',
        faqs: [
          {
            q: '¿Debemos comprar algún ingrediente antes de la llegada del Chef?',
            a: 'No. Nuestro servicio incluye el 100% de las compras de ingredientes frescos, proteínas y mariscos llevados directamente a tu villa.',
          },
          {
            q: '¿Para cuántas personas cocinan en cenas en villa y celebraciones íntimas?',
            a: 'Nuestros menús privados están diseñados para cenas desde 2 hasta 20 personas, con propuestas personalizadas según tu grupo.',
          },
          {
            q: '¿Pueden adaptar el menú a alergias o dietas vegetarianas y sin gluten?',
            a: 'Sí. Diseñamos y adaptamos los tiempos para alergias alimentarias, comensales sin gluten, sin lácteos, vegetarianos o veganos.',
          },
        ],
        finalTitle: 'Planea tu Cena Privada en Punta Mita',
        finalSub: 'Compártenos tu fecha, número de comensales y ubicación en Punta Mita para recibir una propuesta personalizada.',
      },
      nuevoNayarit: {
        badge: 'Chef Privado en Nuevo Nayarit · Riviera Nayarit',
        h1Eyebrow: 'Comidas Familiares, Reuniones de Grupo y Cenas en Vacaciones',
        h1Title: 'Chef Privado en Nuevo Nayarit',
        h1Accent: '',
        subtitle:
          'Comidas familiares, reuniones de grupo y cenas durante las vacaciones preparadas directamente en tu residencia. El Chef Franko Salgado y su equipo se encargan del diseño del menú, la compra de ingredientes del día, la preparación, el servicio en mesa y la limpieza completa de tu cocina.',
        ctaPrimary: 'Solicitar reserva',
        ctaWhatsapp: 'WhatsApp · Disponibilidad Nuevo Nayarit',
        whatsappText:
          'Hola Chef Franko, me gustaría consultar disponibilidad para una cena de chef privado en Nuevo Nayarit / Nuevo Vallarta.',
        highlightsTitle: 'Comidas Familiares y Reuniones de Grupo en Nuevo Nayarit',
        highlightsSubtitle:
          'Olvídate de traslados grupales y esperas en restaurantes. Disfruta de una comida o cena preparada en casa a tu propio ritmo durante tus vacaciones.',
        highlights: [
          {
            title: 'Comidas Familiares en Total Comodidad',
            desc: 'Servicio cálido para grupos de 2 a 20 personas donde toda la familia convive alrededor de su propia mesa.',
          },
          {
            title: 'Reuniones de Grupo y Cenas en Vacaciones',
            desc: 'Propuestas para noches de vacaciones, cumpleaños y reencuentros: desde menús relajados del chef hasta degustaciones de 5 tiempos.',
          },
          {
            title: 'Mariscos del Pacífico y Sabores de México',
            desc: 'Pesca fresca del día, ingredientes locales y platillos de autor preparados en tu casa, departamento o villa frente al mar.',
          },
        ],
        logisticsBadge: 'Servicio Completo en tus Vacaciones',
        logisticsTitle: 'Cómo Funciona el Servicio en tu Residencia',
        logisticsIntro:
          'Ya sea en una casa frente al mar, villa en la marina o condominio vacacional en Nuevo Nayarit, nuestro equipo se encarga de cada etapa.',
        logisticsItems: [
          {
            title: 'Compra de Ingredientes del Mismo Día',
            desc: 'Seleccionamos mariscos frescos, cortes e ingredientes locales horas antes de tu cena sin que tengas que ir de compras.',
          },
          {
            title: 'Preparación en Casas, Condominios y Villas',
            desc: 'Cocinamos y emplatamos cada tiempo directamente en la cocina de tu residencia para grupos de 2 a 20 comensales.',
          },
          {
            title: 'Servicio en Mesa y Limpieza de Cocina',
            desc: 'Desde el primer tiempo hasta el postre y la limpieza final de la cocina, todo queda resuelto para que solo disfrutes.',
          },
        ],
        areasTitle: 'Zonas que Atendemos en Nuevo Nayarit y Alrededores',
        areasCopy:
          'Atendemos residencias privadas, condominios y rentas vacacionales en Nuevo Nayarit y la costa cercana:',
        areasList: [
          'Nuevo Nayarit / Nuevo Vallarta (Zona Playa, Marina y Canales)',
          'Residencias en El Tigre y Paradise Village',
          'Condominios y Villas en Flamingos',
          'Bucerías (Zona Dorada y Casas Frente al Mar)',
          'Puerto Vallarta y Bahía de Banderas',
        ],
        faqTitle: 'Preguntas Frecuentes — Chef Privado en Nuevo Nayarit',
        faqs: [
          {
            q: '¿Atienden tanto Nuevo Nayarit como Nuevo Vallarta?',
            a: 'Sí. Nuevo Nayarit y Nuevo Vallarta son el mismo destino en Riviera Nayarit y atendemos todas sus zonas residenciales, de playa y marina.',
          },
          {
            q: '¿Pueden cocinar para nuestra familia o grupo en un departamento vacacional?',
            a: 'Sí. Preparamos comidas familiares, cenas grupales y menús degustación tanto en casas de playa como en condominios y penthouses.',
          },
          {
            q: '¿Cómo adaptan el menú para niños o restricciones alimentarias?',
            a: 'Personalizamos cada propuesta para el grupo, incluyendo opciones para niños y adaptaciones por alergias, dieta sin gluten, vegetariana o vegana.',
          },
        ],
        finalTitle: 'Planea tu Cena Familiar o Grupal en Nuevo Nayarit',
        finalSub: 'Indícanos tu fecha, número de personas y zona residencial para enviarte una propuesta a medida.',
      },
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

export const LanguageProvider: React.FC<{ children: ReactNode; initialLang?: Language }> = ({
  children,
  initialLang = 'en',
}) => {
  // Deterministic initial language matching SSR prerendered route ('es' on /es/* routes, 'en' otherwise)
  const [lang, setLangState] = useState<Language>(initialLang);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const pathIsSpanish =
        window.location.pathname === '/es' || window.location.pathname.startsWith('/es/');
      if (pathIsSpanish) {
        setLangState('es');
        document.documentElement.lang = 'es-MX';
        return;
      }
      const saved = localStorage.getItem('chef4you_lang');
      const preferred: Language =
        saved === 'en' || saved === 'es'
          ? saved
          : (navigator.language || '').toLowerCase().startsWith('es')
          ? 'es'
          : 'en';
      if (preferred !== initialLang) {
        setLangState(preferred);
      }
      document.documentElement.lang = preferred === 'es' ? 'es-MX' : 'en';
    }
  }, [initialLang]);

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

