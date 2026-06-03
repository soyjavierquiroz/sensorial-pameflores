export type DnaTheme = 'expert' | 'panda';

export interface DnaConfig {
  theme: DnaTheme;
  fonts: {
    sans: string;
    body: string;
  };
  vslVideoId: string;
  checkoutUrl: string; // VARIABLE GLOBAL DE PASARELA
  colors: {
    primary: string;
    accent: string;
    highlight: string;
  };
  surface: {
    page: string;
    panel: string;
  };
  text: {
    main: string;
    muted: string;
    onPrimary: string;
    onAccent: string;
  };
  cta: {
    bg: string;
    text: string;
    hoverBg: string;
  };
  prices: {
    main: string;
    bump: string;
    totalValue: string;
    regular: string;
    regularPrice: string;
    savings?: string;
  };
  copy: {
    productName: string;
    headline: string;
    headlineHighlight: string;
    subheadline: string;
    ctaText: string;
    orderBumpTitle: string;
    salesLetter: {
      title: string;
      part1: string[];
      highlight: string;
      part2: string[];
      image: string;
      ctaText: string;
    };
    offerStackTitle: string;
    benefits: string[];
    specialOfferTitle: string;
    specialOfferSubtitle: string;
    specialOfferGuarantee: string;
    specialOfferImage: string;
    presentationPreTitle: string;
    presentationTitle: string;
    presentationImage: string;
    presentationCtaText?: string;
    finalCtaText?: string;
    showPainPoints?: boolean;
    showSalesLetter?: boolean;
    confidenceBooster: {
      headline: string;
      paragraphs: string[];
      bullets: string[];
    };
    sewingBonus: {
      title: string;
      image: string;
      description: string;
    };
    painPoints: {
      headline: string;
      subtitle: string;
      bullets: string[];
      transitionText: string;
    };
    modules: Array<{
      title: string;
      value: string;
      description: string;
      image: string;
    }>;
    fastActionBonus: {
      timeLimit: string;
      title: string;
      subtitle: string;
      value?: string;
      image?: string;
    };
    testimonials: {
      headline: string;
      subtitle: string;
      items: Array<{
        name: string;
        quote: string;
        image: string;
      }>;
    };
    faq: {
      title: string;
      items: Array<{
        question: string;
        answer: string;
      }>;
    };
  };
}

function parsePrice(value: string) {
  const normalizedValue = value.replace(/,/g, '').trim();
  const parsedValue = Number(normalizedValue);

  if (!Number.isFinite(parsedValue)) {
    throw new Error(`[DNA] Invalid price value: "${value}"`);
  }

  return parsedValue;
}

function hexToRgbTriplet(hex: string) {
  const normalizedHex = hex.replace('#', '').trim();

  if (!/^[\da-f]{6}$/i.test(normalizedHex)) {
    throw new Error(`[DNA] Invalid hex color value: "${hex}"`);
  }

  const red = Number.parseInt(normalizedHex.slice(0, 2), 16);
  const green = Number.parseInt(normalizedHex.slice(2, 4), 16);
  const blue = Number.parseInt(normalizedHex.slice(4, 6), 16);

  return `${red} ${green} ${blue}`;
}

function normalizeColorValue(value: string) {
  const normalizedValue = value.trim();

  if (normalizedValue.startsWith('#')) {
    return hexToRgbTriplet(normalizedValue);
  }

  if (/^\d{1,3}\s+\d{1,3}\s+\d{1,3}(?:\s*\/\s*(?:\d{1,3}%|0?\.\d+|1(?:\.0+)?))?$/.test(normalizedValue)) {
    return normalizedValue.replace(/\s+/g, ' ');
  }

  throw new Error(`[DNA] Invalid color value: "${value}"`);
}

function toRgbTriplet(value: string) {
  const normalizedValue = normalizeColorValue(value);
  const [triplet] = normalizedValue.split('/');
  return triplet.trim();
}

export const DNA_V1 = {
  theme: 'expert',
  fonts: {
    sans: 'Montserrat',
    body: 'Open Sans',
  },
  vslVideoId: import.meta.env.VITE_VSL_VIDEO_ID ?? '',
  // ENLACE GLOBAL CONECTADO DIRECTO A HOTMART
  checkoutUrl: 'https://pay.hotmart.com/D75923457J?off=cir53koj&checkoutMode=10',
  colors: {
    primary: '107 67 155',
    accent: '216 99 184',
    highlight: '255 215 0',
  },
  surface: {
    page: '255 255 255',
    panel: '255 255 255',
  },
  text: {
    main: '45 32 61',
    muted: '95 74 115',
    onPrimary: '255 255 255',
    onAccent: '255 255 255',
  },
  cta: {
    bg: '216 99 184',
    text: '255 255 255',
    hoverBg: '216 99 184 / 90%',
  },
  prices: {
    main: '27',
    bump: '0',
    totalValue: '60',
    regular: '60',
    regularPrice: '60',
  },
  copy: {
    productName: 'Mi Primer Libro Sensorial',
    headline: 'Crea tu primer libro sensorial y haz tu primera venta en 7 días',
    headlineHighlight: 'aunque hoy no sepas por dónde empezar',
    subheadline:
      'Descubre el método exacto que usan cientos de mamás para crear libros sensoriales desde cero y empezar a generar ingresos extra desde casa.',
    ctaText: '¡Estoy lista para empezar!',
    orderBumpTitle: '',
    salesLetter: {
      title: 'De la Confusión a tu Primera Venta',
      part1: [
        'Cuando descubrí los libros sensoriales, pasé por lo mismo que tú…',
        'Tenía ganas de emprender y hacer algo creativo desde casa, pero no sabía por dónde empezar. Guardaba ideas, veía videos, compraba materiales… y aun así seguía sintiéndome perdida.',
        'No sabía qué actividades hacer.',
        'No sabía qué materiales usar.',
        'Y mucho menos cómo convertir eso en algo realmente vendible.',
        'Como alguien que quería generar ingresos con algo que tuviera propósito, eso me frustraba muchísimo. Porque sentía que tenía creatividad… pero no dirección.',
      ],
      highlight: 'Pero un día entendí algo que lo cambió todo.',
      part2: [
        'No necesitaba empezar desde cero improvisando.',
        'Necesitaba una ruta clara.',
        'Modelos listos.',
        'Y entender qué hace que un libro sensorial realmente se vea lindo, útil y vendible.',
        'Ahí fue cuando dejé de solo guardar ideas… y empecé a crear libros sensoriales que las personas realmente querían comprar.',
        'Pasé de sentirme confundida… a lograr mis primeras ventas y descubrir una oportunidad hermosa desde casa.',
        'Y eso es exactamente lo que quiero enseñarte dentro de “Lánzate con tu Primer Libro Sensorial”.',
      ],
      image: '/assets/familia-pame.jpg',
      ctaText: '¡Estoy lista quiero acceder!',
    },
    offerStackTitle: 'LO QUE TE LLEVAS HOY...',
    specialOfferTitle: 'Oferta Especial',
    specialOfferSubtitle: 'Genera tus <strong>primeros ingresos desde casa</strong> creando libros sensoriales para niños, incluso si hoy no tienes experiencia ni sabes por dónde empezar.',
    specialOfferGuarantee: 'Pago 100% seguro • Acceso inmediato',
    specialOfferImage: '/assets/pameflores.webp',
    presentationPreTitle: 'Te presento:',
    presentationTitle: '<span style="color: rgb(var(--color-brand-primary))">Lánzate</span> con tu primer<br/>libro sensorial',
    presentationImage: '/assets/curso.webp',
    showPainPoints: true,
    showSalesLetter: true,
    confidenceBooster: {
      headline: '¿Miedo a no saber si vas por buen camino?',
      paragraphs: [
        'No te preocupes aquí tienes la ruta exacta para crear tu primer libro sensorial y llevarlo a tu primera venta sin perder tiempo ni dudar en el proceso.',
        'Será como si me tuvieras a tu lado acompañándote en cada etapa…',
        'Para que avances con total seguridad: sin dudas, sin perder tiempo y trabajando desde el día 1 como una experta',
      ],
      bullets: [
        'Checklist de verificación en cada etapa',
        'Videos guía para romper miedos y resolver dudas mientras avanzas',
      ],
    },
    sewingBonus: {
      title: 'Bono de principiante a experta cosiendo',
      image: '/assets/de_principiante_a_experta_cosiendo.webp',
      description:
        'Si no sabes coser o no tienes máquina, te incluyo un bono Principiante a experta cosiendo, para que puedas empezar sin problema con puntadas sencillas y fáciles',
    },
    painPoints: {
      headline: '¿Te suena familiar?',
      subtitle:
        'Esto es lo que viven muchas mujeres cuando quieren empezar a vender libros sensoriales…',
      bullets: [
        'Tienes ideas hermosas… pero no sabes por dónde empezar.',
        'Compras cursos o guardas ideas… pero nunca logras pasar a la acción.',
        'Sientes miedo de mostrar lo que haces porque piensas que “aún no está perfecto”.',
        'Te frustras porque no sabes qué materiales usar ni cómo hacer libros realmente lindos y vendibles.',
        'Te da miedo cobrar por tu trabajo porque no sabes cuánto vale realmente.',
        'Sientes que podrías crear algo hermoso… pero terminas paralizada sin saber qué hacer primero.',
        'Quieres generar ingresos desde casa con algo que tenga propósito… pero no encuentras una oportunidad clara.',
        'Te emociona la idea de emprender con algo creativo y relacionado con niños… pero sientes que te falta guía.',
      ],
      transitionText: 'Entonces empieza ahora con Lánzate con tu Primer Libro Sensorial',
    },
    benefits: [
      'Crea tu primer libro sensorial paso a paso',
      'Logra tu primera venta en pocos días',
      'Aprende cómo hacer libros lindos, útiles y vendibles',
      'Descubre cómo cobrar sin miedo y vender con seguridad',
      'Empieza un proyecto creativo con propósito desde casa',
      'Trabaja con modelos listos para crear y vender',
    ],
    modules: [
      {
        title: 'Masterclass: De 0 a tu primera venta',
        value: '$97',
        description:
          'Descubrirás mi estrategia probada de cómo lograr tu primera venta de libros sensoriales en pocos días sin perder tiempo dudando ni pensando qué hacer.',
        image: '/assets/masterclass_de_cero_tu_primera_venta.webp',
      },
      {
        title: '3 modelos probados para que no tengas que empezar desde cero y puedas vender más rápido',
        value: '$97',
        description:
          'Arranca con modelos de libros sensoriales lindos, atractivos y vendibles con mi método AES y el paso a paso que puedes replicar fácilmente para empezar. No empiezas de cero, empiezas con modelos listos para vender.',
        image: '/assets/3libros_sensoriales.webp',
      },
      {
        title: '2 kits adicionales con diseños novedosos',
        value: '$47',
        description:
          'Diferénciate y aumenta tus ingresos con 2 kits adicionales listos para crear y vender. Tendrás más opciones para ofrecer y más oportunidades de generar ingresos con libros sensoriales tiernos, atractivos y vendibles.',
        image: '/assets/2proyectos_de_juguetes_didacticos.webp',
      },
      {
        title: 'Mensajes listos para responder clientes y cerrar tus primeras ventas aunque te dé pena vender',
        value: '$47',
        description:
          'Genera ventas en pocos días sabiendo qué decir, cómo responder y cómo cerrar sin sentirte incómoda. Obtén claridad absoluta con esta herramienta.',
        image: '/assets/plantillas_para_vender_whatsApp_.webp',
      },
      {
        title: 'Cómo poner precios justos sin complicarte',
        value: '$97',
        description:
          'Mi fórmula mágica para no regalar tu trabajo, cobrar bien por tu trabajo con precios justos. Pierde el miedo a cobrar definitivamente.',
        image: '/assets/precios_sin_dramas.webp',
      },
      {
        title: 'Fotos y videos que venden',
        value: '$47',
        description:
          'Mis técnicas para tomar fotos y videos que venden libros sensoriales, para que generen interés y te escriban diciendo “quiero uno”, usando solo tu celular.',
        image: '/assets/fotos_y_videos_que_venden.webp',
      },
      {
        title: 'La lista exacta de materiales para evitar compras innecesarias y ahorrar dinero desde el inicio',
        value: '$27',
        description:
          'Mis secretos para elegir materiales lindos y funcionales para que sepas exactamente qué usar sin gastar de más ni confundirte.',
        image: '/assets/guia_maestra_de_materiales.webp',
      },
      {
        title: 'Envío perfecto',
        value: '$47',
        description:
          'Conquista a tus clientes para que te compren una y otra vez con ideas de empaques lindos, económicos y prácticos. Para que enamores a tus clientes y aumenten el valor percibido.',
        image: '/assets/kit_envIo_perfecto.webp',
      },
    ],
    fastActionBonus: {
      timeLimit: 'Si te inscribes en los próximos 60 minutos',
      title: '🚀 Sistema Lánzate en 7 días',
      subtitle: 'Crea y valida tu primer libro sensorial paso a paso',
    },
    testimonials: {
      headline: 'Ellas también pensaban que “no podían”',
      subtitle:
        'Hoy ya están creando libros sensoriales, vendiendo sus productos y construyendo algo propio desde casa.',
      items: [
        {
          name: 'Marisol Guzmán',
          quote: '“Convirtió sus manualidades en una nueva oportunidad de vida”',
          image: '/assets/testimonio1.webp',
        },
        {
          name: 'Andrea Garzón',
          quote: '“Pasó de crear por hobby… a pensar como emprendedora”',
          image: '/assets/testimonio2.webp',
        },
        {
          name: 'Aly Barrera',
          quote: '“Corrigió errores en su negocio y logró sus primeras ventas”',
          image: '/assets/testimonio3.webp',
        },
        {
          name: 'Maleja Riaño',
          quote: '“Encontró una comunidad y una habilidad que le quedará para siempre”',
          image: '/assets/testimonio4.webp',
        },
        {
          name: 'Aliz Rguez',
          quote: '“Empezó sin saber cómo… y hoy tiene una ruta clara para cumplir su sueño”',
          image: '/assets/testimonio5.webp',
        },
      ],
    },
    faq: {
      title: 'PREGUNTAS FRECUENTES',
      items: [
        {
          question: '¿Necesito experiencia previa?',
          answer: 'No.<br/><br/>Este programa está diseñado para principiantes completas. Vas a aprender paso a paso cómo crear, diseñar y vender tu primer libro sensorial aunque hoy sientas que “no eres creativa”.'
        },
        {
          question: '¿Cuándo puedo empezar?',
          answer: 'Inmediatamente después de tu compra.<br/><br/>Recibirás acceso automático al curso para que puedas comenzar hoy mismo y avanzar a tu ritmo.'
        },
        {
          question: '¿En cuánto tiempo puedo crear mi primer libro sensorial?',
          answer: 'Muchas alumnas crean su primer libro en pocos días siguiendo el sistema paso a paso.<br/><br/>La velocidad dependerá del tiempo que le dediques, pero el objetivo es ayudarte a pasar de “no sé cómo empezar” a tener tu primer libro listo lo más rápido posible.'
        },
        {
          question: '¿Qué incluye exactamente el programa?',
          answer: 'Tendrás acceso a:<br/><br/>• Clases paso a paso<br/>• Modelos de libros listos para usar<br/>• Plantillas<br/>• Guías de materiales<br/>• Fotos y mockups<br/>• Estrategias para vender<br/>• Comunidad privada de apoyo<br/><br/>Todo pensado para que no tengas que empezar desde cero.'
        },
        {
          question: '¿Voy a tener ayuda si me bloqueo o tengo dudas?',
          answer: 'Sí.<br/><br/>Tendrás acceso a una comunidad privada donde podrás resolver dudas, compartir avances y recibir apoyo durante tu proceso.'
        },
        {
          question: '¿Desde qué dispositivos puedo ver el curso?',
          answer: 'Desde celular, tablet o computadora.<br/><br/>Puedes avanzar desde donde quieras y cuando quieras.'
        },
        {
          question: '¿El acceso es para siempre?',
          answer: 'Sí.<br/><br/>Pagas una sola vez y tendrás acceso ilimitado al contenido para revisarlo las veces que necesites.'
        },
        {
          question: '¿El pago es seguro?',
          answer: 'Sí.<br/><br/>La compra se procesa a través de Hotmart, una plataforma internacional utilizada por millones de personas y con sistemas de pago 100% seguros.'
        },
        {
          question: '¿Qué métodos de pago aceptan?',
          answer: 'Puedes pagar con tarjeta, PayPal y métodos locales disponibles en tu país.<br/><br/>Al hacer clic en el botón de acceso, verás automáticamente las opciones disponibles para ti.'
        },
        {
          question: '¿Y si hoy siento que esto “no es para mí”?',
          answer: 'Perfecto.<br/><br/>La mayoría de las alumnas también empezó con dudas, miedo o sin experiencia.<br/><br/>Por eso este programa existe: para darte un sistema claro y simple que te ayude a crear algo hermoso y empezar aunque hoy no sepas por dónde comenzar.'
        }
      ]
    }
  },
} as const satisfies DnaConfig;

export const DNA_V2 = {
  ...DNA_V1,
  vslVideoId: 'https://vz-ed6c1082-e76.b-cdn.net/a0ab4472-cf7a-4d8d-8956-95601ca89c76/playlist.m3u8',
  prices: {
    ...DNA_V1.prices,
    main: '27',
    bump: '0',
    totalValue: '553',
    regular: '100',
    regularPrice: '100',
    savings: '526',
  },
  copy: {
    ...DNA_V1.copy,
    productName: 'Lánzate con tu Primer Libro Sensorial',
    headline: 'Descubre cómo empezar a generar ingresos extra con libros sensoriales desde casa esta misma semana.',
    headlineHighlight: '',
    subheadline:
      'Y da tus primeros pasos para construir un negocio propio que combine tu amor por los niños y las manualidades.',
    ctaText: 'Estoy lista para empezar',
    salesLetter: {
      ...DNA_V1.copy.salesLetter,
      ctaText: 'Estoy lista para empezar',
    },
    offerStackTitle: 'Mira lo que te llevas',
    benefits: [
      'Crear tu primer libro sensorial paso a paso',
      'Lograr tu primera venta en pocos días',
      'Aprender cómo hacer libros lindos, útiles y vendibles',
      'Descubrir cómo cobrar sin miedo y vender con seguridad',
      'Empezar con un proyecto creativo con propósito desde casa',
      'Trabajar con modelos listos para crear y vender',
    ],
    specialOfferTitle: '¿Qué lograrás con Lánzate con tu Primer Libro Sensorial?',
    specialOfferSubtitle:
      'Generar tus <strong>primeros ingresos desde casa</strong> creando libros sensoriales para niños, incluso si hoy no tienes experiencia ni sabes por dónde empezar.',
    specialOfferGuarantee: 'Pago 100% seguro • Acceso inmediato',
    specialOfferImage: '',
    presentationPreTitle: '',
    presentationTitle: 'LÁNZATE CON TU PRIMER LIBRO SENSORIAL',
    presentationImage: '/assets/muckup-con-pame.webp',
    presentationCtaText: 'Acceder a Lánzate con tu Primer Libro Sensorial',
    finalCtaText: 'Quiero comprar ahora',
    showPainPoints: false,
    showSalesLetter: false,
    confidenceBooster: {
      headline: '¿Miedo a no saber si vas por buen camino?',
      paragraphs: [
        'No te preocupes, aquí tienes la ruta exacta para crear tu primer libro sensorial y llevarlo a tu primera venta sin perder tiempo ni dudar en el proceso.',
        'Será como si me tuvieras a tu lado acompañándote en cada etapa…',
        'Para que avances con total seguridad: sin dudas, sin perder tiempo y trabajando desde el día 1 como una experta.',
      ],
      bullets: [
        'Checklist de verificación en cada etapa',
        'Videos guía para romper miedos y resolver dudas mientras avanzas',
      ],
    },
    sewingBonus: {
      title: 'Bono de principiante a experta cosiendo',
      image: '/assets/de_principiante_a_experta_cosiendo.webp',
      description:
        'Si no sabes coser o no tienes máquina, te incluyo un bono Principiante a experta cosiendo, para que puedas empezar sin problema con puntadas sencillas y fáciles.',
    },
    modules: [
      {
        title: 'Masterclass: De 0 a tu primera venta',
        value: '$97',
        description:
          'Descubrirás mi estrategia probada de cómo lograr tu primera venta de libros sensoriales en pocos días sin perder tiempo dudando ni pensando qué hacer.',
        image: '/assets/masterclass_de_cero_tu_primera_venta.webp',
      },
      {
        title: '3 modelos de libros sensoriales listos para crear y vender',
        value: '$97',
        description:
          'Arranca con modelos de libros sensoriales lindos, atractivos y vendibles con mi método AES y el paso a paso que puedes replicar fácilmente para empezar. No empiezas de cero, empiezas con modelos listos para vender.',
        image: '/assets/3libros_sensoriales.webp',
      },
      {
        title: '2 kits adicionales con diseños novedosos',
        value: '$47',
        description:
          'Diferénciate y aumenta tus ingresos con 2 kits adicionales listos para crear y vender. Tendrás más opciones para ofrecer y más oportunidades de generar ingresos con libros sensoriales tiernos, atractivos y vendibles.',
        image: '/assets/2proyectos_de_juguetes_didacticos.webp',
      },
      {
        title: 'Plantillas de mensajes listas para cerrar tus primeras ventas',
        value: '$47',
        description:
          'Genera ventas en pocos días sabiendo qué decir, cómo responder y cómo cerrar sin sentirte incómoda. Obtén claridad absoluta con esta herramienta.',
        image: '/assets/plantillas_para_vender_whatsApp_.webp',
      },
      {
        title: 'Cómo poner precios justos sin complicarte',
        value: '$97',
        description:
          'Mi fórmula mágica para no regalar tu trabajo, cobrar bien por tu trabajo con precios justos. Pierde el miedo a cobrar definitivamente.',
        image: '/assets/precios_sin_dramas.webp',
      },
      {
        title: 'Fotos y videos que venden',
        value: '$47',
        description:
          'Mis técnicas para tomar fotos y videos que venden libros sensoriales, para que generen interés y te escriban diciendo “quiero uno”, usando solo tu celular.',
        image: '/assets/fotos_y_videos_que_venden.webp',
      },
      {
        title: 'Lista maestra de materiales',
        value: '$27',
        description:
          'Mis secretos para elegir materiales lindos y funcionales para que sepas exactamente qué usar sin gastar de más ni confundirte.',
        image: '/assets/guia_maestra_de_materiales.webp',
      },
      {
        title: 'Envío perfecto',
        value: '$47',
        description:
          'Conquista a tus clientes para que te compren una y otra vez con ideas de empaques lindos, económicos y prácticos. Para que enamores a tus clientes y aumenten el valor percibido.',
        image: '/assets/kit_envIo_perfecto.webp',
      },
    ],
    fastActionBonus: {
      timeLimit: 'Si te inscribes en los próximos 60 minutos',
      title: '🚀 Sistema Lánzate en 7 días',
      subtitle: 'Crea y valida tu primer libro sensorial paso a paso',
      value: '$47',
      image: '/assets/sistema-lanzate.webp',
    },
  },
} as const satisfies DnaConfig;

export type FunnelVersion = 'v1' | 'v2';

export const DNA_BY_VERSION = {
  v1: DNA_V1,
  v2: DNA_V2,
} as const satisfies Record<FunnelVersion, DnaConfig>;

export const DNA = DNA_V2;

export function getDnaNumericPrices(dna: DnaConfig) {
  return {
    main: parsePrice(dna.prices.main),
    bump: parsePrice(dna.prices.bump),
    totalValue: parsePrice(dna.prices.totalValue),
    regular: parsePrice(dna.prices.regular),
    regularPrice: parsePrice(dna.prices.regularPrice),
    savings: dna.prices.savings ? parsePrice(dna.prices.savings) : undefined,
  } as const;
}

export const dnaNumericPrices = getDnaNumericPrices(DNA);

export function resolveFunnelVersionFromPath(pathname: string): FunnelVersion {
  return pathname === '/v1' || pathname === '/libro-v1' ? 'v1' : 'v2';
}

export function resolveDnaForPath(pathname: string): DnaConfig {
  return DNA_BY_VERSION[resolveFunnelVersionFromPath(pathname)];
}

export function resolveDnaDocumentTheme(theme: DnaTheme = DNA.theme) {
  return theme === 'expert' ? 'theme-expert' : 'theme-panda';
}

export function resolveDnaFunnelTheme(theme: DnaTheme = DNA.theme) {
  return theme === 'expert' ? 'theme-expert' : 'theme-panda';
}

export function resolveDnaThemeStyle(dna: DnaConfig = DNA) {
  return {
    '--font-sans': `'${dna.fonts.sans}', sans-serif`,
    '--font-body': `'${dna.fonts.body}', sans-serif`,
    '--color-page': toRgbTriplet(dna.surface.page),
    '--color-surface': toRgbTriplet(dna.surface.panel),
    '--color-primary': toRgbTriplet(dna.colors.primary),
    '--color-secondary': toRgbTriplet(dna.colors.accent),
    '--color-highlight': toRgbTriplet(dna.colors.highlight),
    '--color-accent': toRgbTriplet(dna.cta.bg),
    '--color-border-subtle': toRgbTriplet(dna.text.main),
    '--color-text-main': toRgbTriplet(dna.text.main),
    '--color-text-muted': toRgbTriplet(dna.text.muted),
    '--color-brand-primary': toRgbTriplet(dna.colors.primary),
    '--color-brand-accent': toRgbTriplet(dna.colors.accent),
    '--color-cta-base': toRgbTriplet(dna.cta.bg),
    '--color-cta-hover': toRgbTriplet(dna.cta.hoverBg),
    '--color-cta-text': toRgbTriplet(dna.cta.text),
    '--color-surface-bump': toRgbTriplet(dna.surface.panel),
  } as const;
}
