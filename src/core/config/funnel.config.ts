import {
  DNA_BY_VERSION,
  type DnaConfig,
  type FunnelVersion,
  getDnaNumericPrices,
  resolveDnaFunnelTheme,
} from '../../dna.config';

export type VideoProvider = 'youtube' | 'bunnynet' | 'vimeo' | 'wistia' | 'html5';
export type OverlayPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';

export interface MutedPreviewConfig {
  enabled: boolean;
  overlayImageUrl?: string;
  overlayPosition?: OverlayPosition;
  buttonText?: string;
  fallbackColor?: string;
  fallbackText1?: string;
  fallbackText2?: string;
}

export interface CallToActionConfig {
  enabled: boolean;
  displayAtSeconds: number;
  headline: string;
  buttonText: string;
  buttonUrl: string;
  isDismissible?: boolean;
}

export interface SmartPosterConfig {
  enabled?: boolean;
  imageUrl?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  buttonText?: string;
}

export type FunnelTheme = 'theme-expert' | 'theme-panda' | 'light-clean';
export type FunnelFormSuccessRedirectType = 'url' | 'whatsapp';
export type FunnelPricingCurrencyMode = 'fixed-usd' | 'geo-priced';

export interface HeroVideoConfig {
  enabled: boolean;
  provider: VideoProvider;
  videoId: string;
  revealAtSeconds?: number;
  vslMode?: boolean;
  autoplay?: boolean;
  muted?: boolean;
  idleHideControls?: boolean;
  allowFullscreen?: boolean;
  vslProgressBarColor?: string;
  mutedPreview?: MutedPreviewConfig;
  lazyLoadYoutube?: boolean;
  stickyOnScroll?: boolean;
  stickyScroll?: boolean;
  resumePlayback?: boolean;
  onTimeUpdate?: (currentTime: number) => void;
  callToAction?: CallToActionConfig;
  hideYoutubeUi?: boolean;
  smartPoster?: SmartPosterConfig;
  className?: string;
}

export interface FunnelMediaConfig {
  heroVideo: HeroVideoConfig;
}

export interface MainVslContentConfig {
  eyebrow: string;
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaHref: string;
  certaintyText: string;
  useTextGradient?: boolean;
}

export interface BonusItemConfig {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  valueUSD: number;
}

export interface BonusStackConfig {
  eyebrow: string;
  title: string;
  description: string;
  pricingSourceProductKey: string;
  bonuses: BonusItemConfig[];
}

export interface FunnelContentConfig {
  mainVsl: MainVslContentConfig;
  bonusStack: BonusStackConfig;
}

export interface CaptureFormConfig {
  enabled: boolean;
  webhookUrl: string;
  successRedirectType: FunnelFormSuccessRedirectType;
  successRedirectUrl: string;
}

export interface FunnelFormsConfig {
  capture: CaptureFormConfig;
}

export interface FunnelPricingProductConfig {
  basePriceUSD: number;
  hotmartProductId: string;
  checkoutUrl: string;
}

export interface FunnelPricingConfig {
  currencyMode: FunnelPricingCurrencyMode;
  defaultProductKey: string;
  products: Record<string, FunnelPricingProductConfig>;
}

export interface FunnelIntegrationsConfig {
  siteId: string;
  metaPixelId: string;
  tiktokPixelId: string;
  capiWebhookUrl: string;
}

export interface FunnelConfig {
  brandName: string;
  domain: string;
  theme: FunnelTheme;
  media: FunnelMediaConfig;
  content: FunnelContentConfig;
  forms: FunnelFormsConfig;
  pricing: FunnelPricingConfig;
  integrations: FunnelIntegrationsConfig;
}

export interface ResolvedPricingProduct {
  requestedProductKey: string;
  resolvedProductKey: string;
  product: FunnelPricingProductConfig;
  hasRequestedProduct: boolean;
}

export const pricingProductKeys = {
  ofertaPrincipal: 'oferta_principal',
  orderBump: 'order_bump',
  upsellContinuidad: 'upsell_continuidad',
  upsellVip: 'upsell_vip',
} as const;

function createFunnelConfig(dna: DnaConfig, version: FunnelVersion): FunnelConfig {
  const dnaNumericPrices = getDnaNumericPrices(dna);
  const revealAtSeconds = version === 'v2' ? 221 : 292;

  return {
    brandName: dna.copy.productName,
    domain: import.meta.env.VITE_DOMAIN ?? 'localhost',
    theme: resolveDnaFunnelTheme(dna.theme),
    media: {
      heroVideo: {
        enabled: true,
        provider: 'bunnynet',
        videoId: dna.vslVideoId,
        revealAtSeconds,
        vslMode: false,
        autoplay: true,
        muted: true,
        resumePlayback: true,
        smartPoster: {
          enabled: false,
          imageUrl: '',
          eyebrow: dna.copy.productName,
          title: `Mira la presentacion de ${dna.copy.productName}`,
          description: 'Descubre la energia, las modalidades y la preparacion para vivir la ceremonia.',
          buttonText: 'Ver video',
        },
        vslProgressBarColor: '#d6a7c8',
      },
    },
    content: {
      mainVsl: {
        eyebrow: 'Ceremonia Blanca',
        headline: dna.copy.headline,
        subheadline:
          'Elige la modalidad ideal para ti, reserva tu espacio y recibe la guia de preparacion para la ceremonia.',
        ctaLabel: dna.copy.ctaText,
        ctaHref: '#checkout',
        certaintyText: 'Registro guiado en 2 pasos',
      },
      bonusStack: {
        eyebrow: 'Experiencia',
        title: 'Lo que recibes al reservar tu lugar en la ceremonia.',
        description:
          'Preparacion previa, acceso a la experiencia elegida y seguimiento por WhatsApp para que llegues lista a vivir la activacion.',
        pricingSourceProductKey: pricingProductKeys.ofertaPrincipal,
        bonuses: [
          {
            id: 'bonus_01',
            eyebrow: 'Incluye',
            title: 'Videos de preparacion',
            description: 'Contenido previo para abrir tu energia y llegar alineada a la ceremonia.',
            valueUSD: 10,
          },
          {
            id: 'bonus_02',
            eyebrow: 'Incluye',
            title: 'Acompanamiento por WhatsApp',
            description: 'Indicaciones y detalles finales enviados al grupo oficial de la Magia.',
            valueUSD: 15,
          },
          {
            id: 'bonus_03',
            eyebrow: 'Incluye',
            title: 'Acceso a tu modalidad elegida',
            description: 'Participacion virtual por Zoom o asistencia presencial en Cochabamba.',
            valueUSD: 20,
          },
        ],
      },
    },
    forms: {
      capture: {
        enabled: true,
        webhookUrl: 'https://hook.us1.make.com/test-webhook-url',
        successRedirectType: 'url',
        successRedirectUrl: '/confirmacion',
      },
    },
    pricing: {
      currencyMode: 'geo-priced',
      defaultProductKey: pricingProductKeys.ofertaPrincipal,
      products: {
        [pricingProductKeys.ofertaPrincipal]: {
          basePriceUSD: dnaNumericPrices.main,
          hotmartProductId: 'MAGIA_VIRTUAL',
          checkoutUrl: dna.checkoutUrl,
        },
        [pricingProductKeys.orderBump]: {
          basePriceUSD: dnaNumericPrices.bump,
          hotmartProductId: 'MAGIA_PRESENCIAL',
          checkoutUrl: dna.checkoutUrl,
        },
        [pricingProductKeys.upsellContinuidad]: {
          basePriceUSD: dnaNumericPrices.main,
          hotmartProductId: 'MAGIA_PREPARACION',
          checkoutUrl: dna.checkoutUrl,
        },
        [pricingProductKeys.upsellVip]: {
          basePriceUSD: 197,
          hotmartProductId: 'MAGIA_VIP',
          checkoutUrl: dna.checkoutUrl,
        },
      },
    },
    integrations: {
      siteId: import.meta.env.VITE_SITE_ID || 'SENSORIAL',
      capiWebhookUrl: import.meta.env.VITE_CAPI_RELAY_URL || '',
      metaPixelId: import.meta.env.VITE_META_PIXEL_ID || '',
      tiktokPixelId: import.meta.env.VITE_TIKTOK_PIXEL_ID || '',
    },
  };
}

export const funnelConfigByVersion = {
  v1: createFunnelConfig(DNA_BY_VERSION.v1, 'v1'),
  v2: createFunnelConfig(DNA_BY_VERSION.v2, 'v2'),
} as const satisfies Record<FunnelVersion, FunnelConfig>;

export function resolveFunnelConfig(version: FunnelVersion): FunnelConfig {
  return funnelConfigByVersion[version];
}

export const funnelConfig: FunnelConfig = funnelConfigByVersion.v2;

export function resolvePricingProduct(productKey: string) {
  const { defaultProductKey, products } = funnelConfig.pricing;
  const requestedProduct = products[productKey];

  if (requestedProduct) {
    return {
      requestedProductKey: productKey,
      resolvedProductKey: productKey,
      product: requestedProduct,
      hasRequestedProduct: true,
    } satisfies ResolvedPricingProduct;
  }

  const fallbackProduct = products[defaultProductKey];

  if (fallbackProduct) {
    console.warn(
      `[funnelConfig] pricing product "${productKey}" was not found. Falling back to "${defaultProductKey}".`,
    );

    return {
      requestedProductKey: productKey,
      resolvedProductKey: defaultProductKey,
      product: fallbackProduct,
      hasRequestedProduct: false,
    } satisfies ResolvedPricingProduct;
  }

  throw new Error(`[funnelConfig] No pricing products are configured. Missing key: "${productKey}".`);
}

export default funnelConfig;
