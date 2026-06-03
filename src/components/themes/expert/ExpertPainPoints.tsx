import { X } from 'lucide-react';
import { ExpertCtaButton } from './ExpertCtaButton';
import { useExpertFunnel } from './ExpertFunnelContext';

export function ExpertPainPoints() {
  const { dna } = useExpertFunnel();

  return (
    <section
      className="px-4 py-16 sm:px-6"
      style={{ backgroundColor: 'rgb(var(--color-brand-primary))' }}
    >
      <div className="mx-auto max-w-[800px] text-center">
        <h2
          className="mb-4 text-3xl font-black uppercase tracking-wide leading-tight md:text-4xl"
          style={{ color: 'rgb(var(--color-highlight))' }}
        >
          {dna.copy.painPoints.headline}
        </h2>

        <p className="mb-10 text-xl font-medium leading-relaxed text-white md:text-2xl">
          {dna.copy.painPoints.subtitle}
        </p>

        <div className="mb-12 rounded-3xl border border-white/20 bg-white/10 p-6 text-left shadow-xl backdrop-blur-sm md:p-10">
          <ul className="space-y-5">
            {dna.copy.painPoints.bullets.map((bullet, index) => (
              <li key={index} className="flex items-start gap-4 text-lg text-white">
                <X
                  className="mt-1 h-6 w-6 shrink-0"
                  style={{ color: 'rgb(var(--color-highlight))' }}
                />
                <span className="leading-relaxed">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        <h3 className="mb-8 text-2xl font-black text-white md:text-3xl">
          {dna.copy.painPoints.transitionText}
        </h3>

        <div className="mx-auto mb-4 max-w-md">
          <ExpertCtaButton
            href="#checkout"
            label={dna.copy.ctaText}
            fullWidth={true}
          />
        </div>

        <div className="font-mono text-sm uppercase tracking-wide text-white/70">
          {dna.copy.specialOfferGuarantee}
        </div>
      </div>
    </section>
  );
}
