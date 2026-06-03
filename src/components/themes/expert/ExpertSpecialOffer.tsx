import { CheckCircle2 } from 'lucide-react';
import { ExpertCtaButton } from './ExpertCtaButton';
import { useExpertFunnel } from './ExpertFunnelContext';

export function ExpertSpecialOffer() {
  const { dna, version } = useExpertFunnel();
  const hasImage = Boolean(dna.copy.specialOfferImage);
  const isV2 = version === 'v2';

  return (
    <section className="bg-brand-primary px-4 py-14 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-[1200px] overflow-hidden rounded-3xl border-none shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
        <div className={hasImage ? 'flex flex-col lg:flex-row' : 'flex flex-col'}>

          <div className={isV2 ? 'flex flex-1 flex-col justify-center bg-brand-primary p-7 md:p-12 lg:p-16' : 'flex flex-1 flex-col justify-center bg-brand-primary p-7 md:p-12 lg:p-16'}>

            <div
              className={isV2 ? 'mb-5 text-2xl font-black leading-tight text-white md:text-4xl' : 'mb-4 text-2xl font-black leading-tight md:text-4xl'}
              style={isV2 ? undefined : { color: 'rgb(var(--color-highlight))' }}
            >
              {isV2 ? (
                <>
                  ¿Qué lograrás con{' '}
                  <span className="text-[#ffd966]">Lánzate con tu Primer Libro Sensorial</span>?
                </>
              ) : (
                dna.copy.specialOfferTitle
              )}
            </div>

            <p
              className={isV2 ? 'mb-8 text-lg font-medium leading-relaxed text-white/95 md:text-2xl' : 'mb-8 text-lg leading-relaxed text-white md:text-2xl'}
              dangerouslySetInnerHTML={{ __html: dna.copy.specialOfferSubtitle }}
            />

            <ul className={isV2 ? 'mb-10 grid gap-4 md:grid-cols-2 md:gap-5' : 'mb-10 space-y-4'}>
              {dna.copy.benefits?.map((benefit, index) => (
                <li key={index} className={isV2 ? 'flex items-start gap-3 rounded-2xl bg-white/[0.08] p-3 text-[1.05rem] font-semibold leading-relaxed text-white sm:p-4 sm:text-lg' : 'flex items-start gap-3 text-lg text-white'}>
                  <CheckCircle2
                    className={isV2 ? 'mt-0.5 h-7 w-7 shrink-0' : 'mt-0.5 h-6 w-6 shrink-0'}
                    style={{ color: 'rgb(var(--color-highlight))' }}
                  />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="mb-8">
              <span className="mb-1 block text-lg text-gray-300 line-through">
                Precio original US${dna.prices.regular}
              </span>
              <div className="text-3xl font-bold text-white">
                Hoy solo <span className="text-4xl font-black" style={{ color: 'rgb(var(--color-highlight))' }}>US${dna.prices.main}</span>
              </div>
            </div>

            <div className="mb-4">
              <ExpertCtaButton
                href="#checkout"
                label={dna.copy.ctaText}
                fullWidth={false}
              />
            </div>

            <div className="font-mono text-sm uppercase tracking-wide text-gray-300">
              {dna.copy.specialOfferGuarantee}
            </div>
          </div>

          {hasImage ? (
          <div className="flex flex-1 items-center justify-center bg-brand-primary p-8 lg:p-16">
            <div className="flex aspect-[4/5] w-full max-w-md items-center justify-center overflow-hidden rounded-2xl bg-transparent shadow-2xl">
              <img
                src={dna.copy.specialOfferImage}
                alt={dna.copy.productName}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          ) : null}

        </div>
      </div>
    </section>
  );
}
