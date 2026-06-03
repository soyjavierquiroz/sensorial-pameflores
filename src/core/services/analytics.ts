import funnelConfig from '../config/funnel.config';

type AnalyticsPrimitive = string | number | boolean | null | undefined;

export type AnalyticsEventData =
  | AnalyticsPrimitive
  | AnalyticsPrimitive[]
  | {
      [key: string]: AnalyticsEventData;
    };

export interface TrackEventResult {
  eventId: string;
  metaBrowserSent: boolean;
  tiktokBrowserSent: boolean;
  capiSent: boolean;
  capiStatus: number | null;
}

type MetaFbqQueueEntry = Array<unknown>;

interface MetaFbqFunction {
  (...args: readonly unknown[]): void;
  queue?: MetaFbqQueueEntry[];
  loaded?: boolean;
  version?: string;
  callMethod?: (...args: readonly unknown[]) => void;
}

interface TikTokTrackFunction extends Array<unknown> {
  methods?: string[];
  setAndDefer?: (target: TikTokTrackFunction, method: string) => void;
  instance?: (instanceName?: string) => TikTokTrackFunction;
  load?: (pixelId: string, options?: Record<string, unknown>) => void;
  page?: (payload?: Record<string, unknown>) => void;
  track?: (eventName: string, payload?: Record<string, unknown>) => void;
  identify?: (payload: Record<string, string>) => void;
  _i?: Array<[string, Record<string, unknown>?]>;
  _t?: Record<string, number>;
  [key: string]: unknown;
}

interface TrackingCookies {
  _fbp: string | null;
  _fbc: string | null;
  ttclid: string | null;
}

interface AttributionData {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  utm_id: string | null;
  fbclid: string | null;
  ttclid: string | null;
  landing_page: string | null;
  referrer: string | null;
  captured_at: string | null;
}

interface PreparedUserData {
  raw: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
  };
  hashed: {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
  };
}

interface CapiPayload {
  siteId: string;
  provider: 'agnostic';
  event_name: string;
  event_id: string;
  event_time: number;
  event_source_url: string;
  action_source: 'website';
  anonymous_id: string;
  integrations: {
    metaPixelId: string | null;
    tiktokPixelId: string | null;
  };
  attribution: AttributionData;
  cookies: TrackingCookies;
  data: Record<string, unknown>;
  user_data: {
    external_id: string;
    client_user_agent?: string;
    fbp?: string;
    fbc?: string;
    ttclid?: string;
    em?: string;
    ph?: string;
    fn?: string;
    ln?: string;
  };
}

declare global {
  interface Window {
    fbq?: MetaFbqFunction;
    _fbq?: MetaFbqFunction;
    ttq?: TikTokTrackFunction;
    TiktokAnalyticsObject?: string;
  }
}

const META_PIXEL_SCRIPT_ID = 'boilerplate-meta-pixel-script';
const META_PIXEL_SCRIPT_URL = 'https://connect.facebook.net/en_US/fbevents.js';
const TIKTOK_PIXEL_SCRIPT_ID = 'boilerplate-tiktok-pixel-script';
const TIKTOK_PIXEL_SCRIPT_BASE_URL = 'https://analytics.tiktok.com/i18n/pixel/events.js';
const ANALYTICS_STORAGE_PREFIX = 'boilerplate.analytics';
const ATTRIBUTION_STORAGE_KEY = `${ANALYTICS_STORAGE_PREFIX}.attribution`;
const ANONYMOUS_ID_STORAGE_KEY = `${ANALYTICS_STORAGE_PREFIX}.anonymous_id`;
const META_STANDARD_EVENTS = new Set([
  'PageView',
  'ViewContent',
  'Search',
  'AddToCart',
  'AddToWishlist',
  'InitiateCheckout',
  'AddPaymentInfo',
  'Purchase',
  'Lead',
  'CompleteRegistration',
  'Contact',
  'CustomizeProduct',
  'Donate',
  'FindLocation',
  'Schedule',
  'StartTrial',
  'SubmitApplication',
  'Subscribe',
]);

const DEFAULT_ATTRIBUTION: AttributionData = {
  utm_source: null,
  utm_medium: null,
  utm_campaign: null,
  utm_term: null,
  utm_content: null,
  utm_id: null,
  fbclid: null,
  ttclid: null,
  landing_page: null,
  referrer: null,
  captured_at: null,
};

let isInitialized = false;
let metaScriptPromise: Promise<void> | null = null;
let tiktokScriptPromise: Promise<void> | null = null;
let initializedMetaPixelId: string | null = null;
let initializedTikTokPixelId: string | null = null;

const isBrowserEnvironment = (): boolean => typeof window !== 'undefined' && typeof document !== 'undefined';

const ORGANIC_ROUTES = new Set(['/libro', '/libro-v1']);

const normalizePathname = (pathname: string): string =>
  pathname === '/' ? pathname : pathname.replace(/\/+$/, '');

const isOrganicRoute = (): boolean =>
  isBrowserEnvironment() && ORGANIC_ROUTES.has(normalizePathname(window.location.pathname));

const normalizeNullable = (value: string | null | undefined): string | null => {
  if (typeof value !== 'string') {
    return null;
  }

  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
};

const normalizePixelId = (value: string): string | null => normalizeNullable(value);

const toRecord = (value: unknown): Record<string, unknown> => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {};
  }

  return value as Record<string, unknown>;
};

const safeJsonParse = <T,>(value: string | null): T | null => {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
};

const readStorageValue = (key: string): string | null => {
  if (!isBrowserEnvironment()) {
    return null;
  }

  try {
    return (
      normalizeNullable(window.localStorage.getItem(key)) ??
      normalizeNullable(window.sessionStorage.getItem(key))
    );
  } catch {
    return null;
  }
};

const writeStorageValue = (key: string, value: string): void => {
  if (!isBrowserEnvironment()) {
    return;
  }

  try {
    window.localStorage.setItem(key, value);
    window.sessionStorage.setItem(key, value);
  } catch {
    // Ignore storage write failures.
  }
};

const readCookieValue = (name: string): string | null => {
  if (!isBrowserEnvironment()) {
    return null;
  }

  const encodedName = `${name}=`;
  const segments = document.cookie.split('; ');
  const target = segments.find((segment) => segment.startsWith(encodedName));

  if (!target) {
    return null;
  }

  return normalizeNullable(decodeURIComponent(target.slice(encodedName.length)));
};

const writeCookieValue = (name: string, value: string, days = 90): void => {
  if (!isBrowserEnvironment()) {
    return;
  }

  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; Expires=${expires}; Path=/; SameSite=Lax${secure}`;
};

const createAnonymousId = (): string => {
  if (typeof globalThis.crypto !== 'undefined' && typeof globalThis.crypto.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }

  return `anon_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
};

const getAnonymousId = (): string => {
  const stored = readStorageValue(ANONYMOUS_ID_STORAGE_KEY);

  if (stored) {
    return stored;
  }

  const created = createAnonymousId();
  writeStorageValue(ANONYMOUS_ID_STORAGE_KEY, created);
  return created;
};

const createMetaFbp = (): string => `fb.1.${Date.now()}.${Math.floor(Math.random() * 10_000_000_000)}`;

const createMetaFbc = (fbclid: string): string => `fb.1.${Date.now()}.${fbclid}`;

const parseAttributionFromUrl = (): AttributionData => {
  if (!isBrowserEnvironment()) {
    return { ...DEFAULT_ATTRIBUTION };
  }

  const params = new URLSearchParams(window.location.search);

  return {
    utm_source: normalizeNullable(params.get('utm_source')),
    utm_medium: normalizeNullable(params.get('utm_medium')),
    utm_campaign: normalizeNullable(params.get('utm_campaign')),
    utm_term: normalizeNullable(params.get('utm_term')),
    utm_content: normalizeNullable(params.get('utm_content')),
    utm_id: normalizeNullable(params.get('utm_id')),
    fbclid: normalizeNullable(params.get('fbclid')),
    ttclid: normalizeNullable(params.get('ttclid')),
    landing_page: `${window.location.pathname}${window.location.search}${window.location.hash}`,
    referrer: normalizeNullable(document.referrer),
    captured_at: new Date().toISOString(),
  };
};

const mergeAttribution = (incoming: AttributionData): AttributionData => {
  const persisted = safeJsonParse<AttributionData>(readStorageValue(ATTRIBUTION_STORAGE_KEY));
  const current = persisted ?? DEFAULT_ATTRIBUTION;

  const next: AttributionData = {
    utm_source: incoming.utm_source ?? current.utm_source,
    utm_medium: incoming.utm_medium ?? current.utm_medium,
    utm_campaign: incoming.utm_campaign ?? current.utm_campaign,
    utm_term: incoming.utm_term ?? current.utm_term,
    utm_content: incoming.utm_content ?? current.utm_content,
    utm_id: incoming.utm_id ?? current.utm_id,
    fbclid: incoming.fbclid ?? current.fbclid,
    ttclid: incoming.ttclid ?? current.ttclid,
    landing_page: incoming.landing_page ?? current.landing_page,
    referrer: incoming.referrer ?? current.referrer,
    captured_at: incoming.captured_at ?? current.captured_at,
  };

  writeStorageValue(ATTRIBUTION_STORAGE_KEY, JSON.stringify(next));

  return next;
};

const syncTrackingCookies = (attribution: AttributionData): TrackingCookies => {
  let fbp = readCookieValue('_fbp');
  let fbc = readCookieValue('_fbc');
  let ttclid = readCookieValue('ttclid') ?? readCookieValue('ttc');

  if (!fbp) {
    fbp = createMetaFbp();
    writeCookieValue('_fbp', fbp);
  }

  if (!fbc && attribution.fbclid) {
    fbc = createMetaFbc(attribution.fbclid);
    writeCookieValue('_fbc', fbc);
  }

  if (!ttclid && attribution.ttclid) {
    ttclid = attribution.ttclid;
    writeCookieValue('ttclid', ttclid);
  }

  return {
    _fbp: fbp,
    _fbc: fbc,
    ttclid,
  };
};

const ensureInitialized = (): { anonymousId: string; attribution: AttributionData; cookies: TrackingCookies } => {
  const anonymousId = getAnonymousId();
  const attribution = mergeAttribution(parseAttributionFromUrl());
  const cookies = syncTrackingCookies(attribution);

  if (!isInitialized) {
    isInitialized = true;
  }

  return { anonymousId, attribution, cookies };
};

const createEventId = (): string => {
  if (typeof globalThis.crypto !== 'undefined' && typeof globalThis.crypto.randomUUID === 'function') {
    return globalThis.crypto.randomUUID();
  }

  return `evt_${Date.now()}_${Math.random().toString(36).slice(2, 12)}`;
};

const extractStringValue = (value: unknown): string | undefined => {
  if (typeof value !== 'string') {
    return undefined;
  }

  const normalized = value.trim();
  return normalized.length > 0 ? normalized : undefined;
};

const extractUserData = (data: Record<string, unknown>): PreparedUserData['raw'] => {
  const lead = toRecord(data.lead);
  const rawEmail = extractStringValue(data.email) ?? extractStringValue(lead.email);
  const rawPhone =
    extractStringValue(data.phone) ??
    extractStringValue(data.whatsapp) ??
    extractStringValue(lead.whatsapp);
  const rawFirstName =
    extractStringValue(data.firstName) ??
    extractStringValue(data.nombre) ??
    extractStringValue(lead.nombre);
  const rawLastName =
    extractStringValue(data.lastName) ??
    extractStringValue(data.apellido) ??
    extractStringValue(lead.apellido);

  return {
    email: rawEmail?.toLowerCase(),
    phone: rawPhone?.replace(/\D/g, ''),
    firstName: rawFirstName?.trim().toLowerCase(),
    lastName: rawLastName?.trim().toLowerCase(),
  };
};

const sha256Hash = async (value: string): Promise<string> => {
  const encodedValue = new TextEncoder().encode(value);
  const digest = await globalThis.crypto.subtle.digest('SHA-256', encodedValue);
  const hashBytes = Array.from(new Uint8Array(digest));

  return hashBytes.map((byte) => byte.toString(16).padStart(2, '0')).join('');
};

const prepareUserData = async (data: Record<string, unknown>): Promise<PreparedUserData> => {
  const raw = extractUserData(data);

  if (typeof globalThis.crypto === 'undefined' || !globalThis.crypto.subtle) {
    return { raw, hashed: { ...raw } };
  }

  const [email, phone, firstName, lastName] = await Promise.all([
    raw.email ? sha256Hash(raw.email) : Promise.resolve(undefined),
    raw.phone ? sha256Hash(raw.phone) : Promise.resolve(undefined),
    raw.firstName ? sha256Hash(raw.firstName) : Promise.resolve(undefined),
    raw.lastName ? sha256Hash(raw.lastName) : Promise.resolve(undefined),
  ]);

  return {
    raw,
    hashed: {
      email,
      phone,
      firstName,
      lastName,
    },
  };
};

const ensureFbqStub = (): MetaFbqFunction => {
  if (!isBrowserEnvironment()) {
    throw new Error('fbq is only available in the browser.');
  }

  if (typeof window.fbq === 'function') {
    return window.fbq;
  }

  const fbq: MetaFbqFunction = (...args: readonly unknown[]) => {
    if (typeof fbq.callMethod === 'function') {
      fbq.callMethod(...args);
      return;
    }

    if (!Array.isArray(fbq.queue)) {
      fbq.queue = [];
    }

    fbq.queue.push([...args]);
  };

  fbq.queue = [];
  fbq.loaded = false;
  fbq.version = '2.0';
  window.fbq = fbq;
  window._fbq = fbq;

  return fbq;
};

const ensureMetaReady = async (pixelId: string): Promise<void> => {
  if (!isBrowserEnvironment() || isOrganicRoute()) {
    return;
  }

  const fbq = ensureFbqStub();

  if (initializedMetaPixelId !== pixelId) {
    fbq('init', pixelId);
    initializedMetaPixelId = pixelId;
  }

  const existingScript = document.getElementById(META_PIXEL_SCRIPT_ID);
  if (existingScript) {
    return;
  }

  if (metaScriptPromise) {
    return metaScriptPromise;
  }

  metaScriptPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.id = META_PIXEL_SCRIPT_ID;
    script.async = true;
    script.src = META_PIXEL_SCRIPT_URL;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Meta Pixel script failed to load.'));
    document.head.appendChild(script);
  });

  return metaScriptPromise;
};

const ensureTikTokStub = (): TikTokTrackFunction => {
  if (!isBrowserEnvironment()) {
    throw new Error('ttq is only available in the browser.');
  }

  if (window.ttq) {
    return window.ttq;
  }

  const ttq = [] as unknown as TikTokTrackFunction;
  ttq.methods = [
    'page',
    'track',
    'identify',
    'instances',
    'debug',
    'on',
    'off',
    'once',
    'ready',
    'alias',
    'group',
    'enableCookie',
    'disableCookie',
    'holdConsent',
    'revokeConsent',
    'grantConsent',
  ];
  ttq.setAndDefer = (target, method) => {
    target[method] = (...args: readonly unknown[]) => {
      ttq.push([method, ...args]);
    };
  };
  ttq.instance = () => ttq;
  ttq.methods.forEach((method) => ttq.setAndDefer?.(ttq, method));
  ttq.load = (pixelId, options) => {
    ttq._i = ttq._i ?? [];
    ttq._i.push([pixelId, options]);
  };

  window.TiktokAnalyticsObject = 'ttq';
  window.ttq = ttq;

  return ttq;
};

const ensureTikTokReady = async (pixelId: string): Promise<void> => {
  if (!isBrowserEnvironment() || isOrganicRoute()) {
    return;
  }

  const ttq = ensureTikTokStub();

  if (initializedTikTokPixelId !== pixelId) {
    ttq.load?.(pixelId);
    initializedTikTokPixelId = pixelId;
  }

  const existingScript = document.getElementById(TIKTOK_PIXEL_SCRIPT_ID);
  if (existingScript) {
    return;
  }

  if (tiktokScriptPromise) {
    return tiktokScriptPromise;
  }

  tiktokScriptPromise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.id = TIKTOK_PIXEL_SCRIPT_ID;
    script.async = true;
    script.src = `${TIKTOK_PIXEL_SCRIPT_BASE_URL}?sdkid=${encodeURIComponent(pixelId)}&lib=ttq`;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('TikTok Pixel script failed to load.'));
    document.head.appendChild(script);
  });

  return tiktokScriptPromise;
};

const buildCapiPayload = ({
  anonymousId,
  attribution,
  cookies,
  data,
  eventId,
  eventName,
  eventTime,
  preparedUserData,
}: {
  anonymousId: string;
  attribution: AttributionData;
  cookies: TrackingCookies;
  data: Record<string, unknown>;
  eventId: string;
  eventName: string;
  eventTime: number;
  preparedUserData: PreparedUserData;
}): CapiPayload => ({
  siteId: funnelConfig.integrations.siteId,
  provider: 'agnostic',
  event_name: eventName,
  event_id: eventId,
  event_time: eventTime,
  event_source_url: isBrowserEnvironment() ? window.location.href : '',
  action_source: 'website',
  anonymous_id: anonymousId,
  integrations: {
    metaPixelId: normalizePixelId(funnelConfig.integrations.metaPixelId),
    tiktokPixelId: normalizePixelId(funnelConfig.integrations.tiktokPixelId),
  },
  attribution,
  cookies,
  data,
  user_data: {
    external_id: anonymousId,
    client_user_agent: isBrowserEnvironment() ? window.navigator.userAgent : undefined,
    fbp: cookies._fbp ?? undefined,
    fbc: cookies._fbc ?? undefined,
    ttclid: cookies.ttclid ?? attribution.ttclid ?? undefined,
    em: preparedUserData.hashed.email,
    ph: preparedUserData.hashed.phone,
    fn: preparedUserData.hashed.firstName,
    ln: preparedUserData.hashed.lastName,
  },
});

const isMetaStandardEvent = (eventName: string): boolean => META_STANDARD_EVENTS.has(eventName);

const trackEvent = async (eventName: string, data: Record<string, unknown> = {}): Promise<TrackEventResult> => {
  if (isOrganicRoute()) {
    console.warn('[Analytics] Modo Organico Activo: Evento silenciado para evitar contaminar el pixel.');

    return {
      eventId: 'organic-route-suppressed',
      metaBrowserSent: false,
      tiktokBrowserSent: false,
      capiSent: false,
      capiStatus: null,
    };
  }

  const { anonymousId, attribution, cookies } = ensureInitialized();
  const eventId = createEventId();
  const eventTime = Math.floor(Date.now() / 1000);
  const preparedUserData = await prepareUserData(data);
  const metaPixelId = normalizePixelId(funnelConfig.integrations.metaPixelId);
  const tiktokPixelId = normalizePixelId(funnelConfig.integrations.tiktokPixelId);
  const capiWebhookUrl = normalizePixelId(funnelConfig.integrations.capiWebhookUrl);

  let metaBrowserSent = false;
  if (metaPixelId && isBrowserEnvironment()) {
    try {
      await ensureMetaReady(metaPixelId);
      const fbq = window.fbq;

      if (typeof fbq === 'function') {
        const method = isMetaStandardEvent(eventName) ? 'track' : 'trackCustom';
        fbq(method, eventName, data, { eventID: eventId });
        metaBrowserSent = true;
      }
    } catch {
      metaBrowserSent = false;
    }
  }

  let tiktokBrowserSent = false;
  if (tiktokPixelId && isBrowserEnvironment()) {
    try {
      await ensureTikTokReady(tiktokPixelId);
      const ttq = window.ttq;

      if (preparedUserData.hashed.email || preparedUserData.hashed.phone) {
        ttq?.identify?.({
          ...(preparedUserData.hashed.email ? { email: preparedUserData.hashed.email } : {}),
          ...(preparedUserData.hashed.phone ? { phone_number: preparedUserData.hashed.phone } : {}),
        });
      }

      if (eventName === 'PageView') {
        ttq?.page?.(data);
      } else {
        ttq?.track?.(eventName, data);
      }

      tiktokBrowserSent = Boolean(ttq?.page || ttq?.track);
    } catch {
      tiktokBrowserSent = false;
    }
  }

  if (!capiWebhookUrl) {
    return {
      eventId,
      metaBrowserSent,
      tiktokBrowserSent,
      capiSent: false,
      capiStatus: null,
    };
  }

  const capiPayload = buildCapiPayload({
    anonymousId,
    attribution,
    cookies,
    data,
    eventId,
    eventName,
    eventTime,
    preparedUserData,
  });

  try {
    const response = await fetch(capiWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(capiPayload),
      keepalive: true,
    });

    return {
      eventId,
      metaBrowserSent,
      tiktokBrowserSent,
      capiSent: response.ok,
      capiStatus: response.status,
    };
  } catch {
    return {
      eventId,
      metaBrowserSent,
      tiktokBrowserSent,
      capiSent: false,
      capiStatus: null,
    };
  }
};

const analytics = {
  trackEvent,
};

export { trackEvent, analytics };
export default analytics;
