import { CheckCircle2 } from 'lucide-react';
import { ExpertCtaButton } from './ExpertCtaButton';
import { useExpertFunnel } from './ExpertFunnelContext';

export function ExpertConfidenceBooster() {
  const { dna, version } = useExpertFunnel();
  const isV2 = version === 'v2';
  const savings = dna.prices.savings ?? String(Number(dna.prices.totalValue) - Number(dna.prices.main));
  const headline = isV2 ? (
    <>
      ¿Miedo a no saber si vas <span className="text-brand-accent">por buen camino</span>?
    </>
  ) : (
    dna.copy.confidenceBooster.headline
  );

  return (
    <section className={isV2 ? 'bg-[#f7f0fb] px-4 py-16 sm:px-6 sm:py-20' : 'bg-white px-4 py-16 sm:px-6'}>
      <div className={isV2 ? 'mx-auto max-w-[900px]' : 'mx-auto max-w-[800px]'}>
        <div className={isV2 ? 'mb-12 rounded-3xl border border-brand-primary/10 bg-white p-7 text-center shadow-[0_24px_70px_rgba(107,67,155,0.1)] sm:p-10' : 'mb-12 text-center'}>
          <h2
            className="mb-6 text-3xl font-black leading-tight md:text-4xl"
            style={{ color: 'rgb(var(--color-brand-primary))' }}
          >
            {headline}
          </h2>
          <div
            className={isV2 ? 'mb-8 space-y-4 text-lg font-medium leading-relaxed md:text-xl' : 'mb-8 space-y-4 text-lg md:text-xl'}
            style={{ color: 'rgb(var(--color-text-main))' }}
          >
            {dna.copy.confidenceBooster.paragraphs.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className={isV2 ? 'inline-block w-full rounded-2xl border border-brand-accent/10 bg-[#fbf8ff] p-6 text-left shadow-sm' : 'inline-block w-full rounded-2xl border border-gray-100 bg-gray-50 p-6 text-left shadow-sm'}>
            <p
              className="mb-4 text-sm font-bold uppercase tracking-wider"
              style={{ color: 'rgb(var(--color-text-muted))' }}
            >
              Incluye:
            </p>
            <ul className="space-y-3">
              {dna.copy.confidenceBooster.bullets.map((bullet, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-lg font-medium"
                  style={{ color: 'rgb(var(--color-text-main))' }}
                >
                  <CheckCircle2
                    className={isV2 ? 'mt-0.5 h-7 w-7 shrink-0' : 'mt-0.5 h-6 w-6 shrink-0'}
                    style={{ color: 'rgb(var(--color-brand-accent))' }}
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={isV2 ? 'mb-16 flex flex-col overflow-hidden rounded-3xl border border-brand-accent/15 bg-white shadow-[0_28px_70px_rgba(107,67,155,0.12)] transition-transform hover:-translate-y-1 md:flex-row' : 'mb-16 flex flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl transition-transform hover:-translate-y-1 md:flex-row'}>
          <div className={isV2 ? 'relative flex items-center justify-center bg-[#fbf8ff] p-6 md:w-2/5' : 'relative flex items-center justify-center bg-gray-50 p-6 md:w-2/5'}>
            <img
              src={dna.copy.sewingBonus.image}
              alt={dna.copy.sewingBonus.title}
              className="relative z-10 h-auto w-full rounded-2xl object-contain shadow-sm transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center p-8 md:w-3/5">
            <div
              className={isV2 ? 'mb-3 inline-block self-start rounded-full bg-brand-primary px-4 py-2 text-xs font-black uppercase tracking-widest text-[#ffd966]' : 'mb-3 inline-block self-start rounded-full px-4 py-1 text-xs font-black uppercase tracking-widest'}
              style={{
                backgroundColor: isV2 ? undefined : 'rgb(var(--color-highlight))',
                color: isV2 ? undefined : 'rgb(var(--color-text-main))',
              }}
            >
              BONO EXCLUSIVO
            </div>
            <h3
              className="mb-4 text-2xl font-black leading-tight md:text-3xl"
              style={{ color: 'rgb(var(--color-text-main))' }}
            >
              {dna.copy.sewingBonus.title}
            </h3>
            <p
              className="text-lg leading-relaxed"
              style={{ color: 'rgb(var(--color-text-muted))' }}
            >
              {dna.copy.sewingBonus.description}
            </p>
          </div>
        </div>

        <div
          className="rounded-3xl border-2 bg-gray-50 p-8 text-center md:p-12"
          style={{ borderColor: 'rgba(var(--color-brand-primary), 0.1)' }}
        >
          <div className="mb-6">
            <span className="mb-1 block text-xl font-medium text-gray-400 line-through">
              {version === 'v2' ? `Precio Total US$${dna.prices.totalValue}` : `Precio original US$${dna.prices.regular}`}
            </span>
            {version === 'v2' ? (
              <p className="mb-2 text-xl font-black text-brand-accent">Te ahorras US${savings}</p>
            ) : null}
            <div
              className="text-4xl font-black md:text-5xl"
              style={{ color: 'rgb(var(--color-text-main))' }}
            >
              Hoy solo{' '}
              <span style={{ color: 'rgb(var(--color-brand-primary))' }}>
                US${dna.prices.main}
              </span>
            </div>
          </div>
          <div className="mx-auto mb-6 max-w-md">
            <ExpertCtaButton
              href="#checkout"
              label={dna.copy.finalCtaText ?? '¡Quiero Comprar ahora!'}
              fullWidth={true}
            />
          </div>
          <div
            className="font-mono text-sm font-bold uppercase tracking-wide"
            style={{ color: 'rgb(var(--color-text-muted))' }}
          >
            {dna.copy.specialOfferGuarantee}
          </div>
        </div>
      </div>
    </section>
  );
}
