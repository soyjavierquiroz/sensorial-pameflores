import { BadgeCheck, Lock, ShieldCheck } from 'lucide-react';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { DNA, resolveCheckoutUrlForPath } from '../../../dna.config';
import funnelConfig from '../../../core/config/funnel.config';
import { useVisitor } from '../../../core/visitor/VisitorContext';
import { useHotmartPrices } from '../../../core/hooks/useHotmartPrices';
import analytics from '../../../core/services/analytics';

export interface PricingCardProps {
  productId: string;
  productName?: string;
}

export function PricingCard({ productId, productName }: PricingCardProps) {
  const location = useLocation();
  const { visitorData } = useVisitor();
  const { product, resolvedProductKey, scrapedData, status, hasRequestedProduct } = useHotmartPrices(productId);

  const countryCode = visitorData?.country_code?.toUpperCase() ?? 'US';
  const currencyCode = visitorData?.currency?.toUpperCase() ?? 'USD';
  const resolvedCheckoutUrl = hasRequestedProduct ? resolveCheckoutUrlForPath(location.pathname) : undefined;
  const resolvedProductName = productName ?? DNA.copy.productName ?? funnelConfig.brandName;
  const basePriceUSD = product.basePriceUSD;

  const countryPricing = useMemo(() => {
    if (!scrapedData) return undefined;
    return scrapedData[countryCode];
  }, [countryCode, scrapedData]);

  const hasLocalizedPrice = status === 'ready' && Boolean(countryPricing?.total);
  const isArgentinaCase = countryCode === 'AR' && hasLocalizedPrice;
  const isStandardScrapedCase = countryCode !== 'AR' && countryCode !== 'US' && hasLocalizedPrice;
  const localizedValue = Number(countryPricing?.total ?? basePriceUSD);

  const handleCheckoutClick = () => {
    if (!resolvedCheckoutUrl) {
      return;
    }

    void analytics.trackEvent('InitiateCheckout', {
      product_id: resolvedProductKey,
      product_name: resolvedProductName,
      content_name: resolvedProductName,
      checkout_url: resolvedCheckoutUrl,
      hotmart_product_id: product.hotmartProductId,
      country_code: countryCode,
      currency: currencyCode,
      value: Number.isFinite(localizedValue) ? localizedValue : basePriceUSD,
    });
  };

  return (
    <section className="glass-surface rounded-[1.75rem] p-6 md:p-8">
      <div className="mb-5">
        <p className="text-xs uppercase tracking-[0.18em] text-accent">Oferta Especial</p>
        <h3 className="mt-2 text-2xl font-extrabold text-text-main md:text-3xl">
          Activa {resolvedProductName} hoy mismo
        </h3>
        <p className="mt-2 text-sm text-text-muted">Valor base: {basePriceUSD} USD</p>
      </div>

      <div className="rounded-[1.35rem] border border-border-subtle/15 bg-page/70 p-5">
        {isArgentinaCase ? (
          <div className="space-y-3 text-text-main">
            <p className="text-sm text-text-muted line-through">Precio base: {basePriceUSD} USD</p>
            <p className="text-base md:text-lg">
              <span className="text-text-muted">Subtotal:</span> {basePriceUSD} USD
            </p>
            <p className="text-base md:text-lg">
              <span className="text-text-muted">Impuestos locales (PAIS, Ganancias, etc.):</span>{' '}
              {countryPricing?.tax ? `${countryPricing.tax} ${currencyCode}` : `Incluidos ${currencyCode}`}
            </p>
            <p className="text-lg font-bold text-accent md:text-xl">
              Total final en Hotmart: {countryPricing?.total} {currencyCode}
            </p>
          </div>
        ) : null}

        {isStandardScrapedCase ? (
          <div className="space-y-2 text-center">
            <p className="text-sm text-text-muted line-through">{basePriceUSD} USD</p>
            <p className="text-3xl font-extrabold text-accent md:text-4xl">
              {countryPricing?.total} {currencyCode}
            </p>
            <p className="text-xs text-text-muted md:text-sm">(Equivalente a {basePriceUSD} USD. Impuestos incluidos)</p>
          </div>
        ) : null}

        {!isArgentinaCase && !isStandardScrapedCase ? (
          <div className="text-center">
            <p className="text-3xl font-extrabold text-accent md:text-4xl">{basePriceUSD} USD</p>
            <p className="mt-2 text-xs text-text-muted md:text-sm">Precio internacional directo.</p>
          </div>
        ) : null}
      </div>

      <div className="mt-6">
        {resolvedCheckoutUrl ? (
          <a
            href={resolvedCheckoutUrl}
            target="_blank"
            rel="noreferrer"
            onClick={handleCheckoutClick}
            className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-primary px-6 text-base font-bold text-secondary transition hover:opacity-95 md:h-14 md:text-lg"
          >
            Comprar Ahora
          </a>
        ) : (
          <button
            type="button"
            disabled
            className="inline-flex h-12 w-full cursor-not-allowed items-center justify-center rounded-xl bg-primary/60 px-6 text-base font-bold text-secondary opacity-70 md:h-14 md:text-lg"
          >
            Producto no disponible
          </button>
        )}

        <div className="mt-4 grid gap-2 text-xs text-text-muted md:grid-cols-3 md:text-sm">
          <p className="inline-flex items-center justify-center gap-2 rounded-lg border border-border-subtle/15 bg-page/60 px-3 py-2">
            <ShieldCheck className="h-4 w-4 text-accent" />
            Pago seguro
          </p>
          <p className="inline-flex items-center justify-center gap-2 rounded-lg border border-border-subtle/15 bg-page/60 px-3 py-2">
            <Lock className="h-4 w-4 text-accent" />
            Procesado por Hotmart
          </p>
          <p className="inline-flex items-center justify-center gap-2 rounded-lg border border-border-subtle/15 bg-page/60 px-3 py-2">
            <BadgeCheck className="h-4 w-4 text-accent" />
            Acceso inmediato
          </p>
        </div>
      </div>
    </section>
  );
}

export default PricingCard;
