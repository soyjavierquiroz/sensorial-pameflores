import { useCallback, useState, type CSSProperties } from 'react';
import { resolveDnaThemeStyle, type FunnelVersion } from '../../../dna.config';
import { ExpertCtaButton } from './ExpertCtaButton';
import { ExpertConfidenceBooster } from './ExpertConfidenceBooster';
import { ExpertFAQ } from './ExpertFAQ';
import { ExpertFunnelProvider, useExpertFunnel } from './ExpertFunnelContext';
import { ExpertHero } from './ExpertHero';
import { ExpertOfferBreakdown } from './ExpertOfferBreakdown';
import { ExpertOfferStack } from './ExpertOfferStack';
import { ExpertPainPoints } from './ExpertPainPoints';
import { ExpertProductPresentation } from './ExpertProductPresentation';
import { ExpertSalesLetter } from './ExpertSalesLetter';
import { ExpertSpecialOffer } from './ExpertSpecialOffer';
import { ExpertTestimonials } from './ExpertTestimonials';

interface ExpertThemeProps {
  version?: FunnelVersion;
}

function ExpertThemeContent() {
  const { dna, funnelConfig, version } = useExpertFunnel();
  const revealAtSeconds = funnelConfig.media.heroVideo.revealAtSeconds ?? 292;
  const shouldRevealImmediately = !funnelConfig.media.heroVideo.enabled || revealAtSeconds <= 0;
  const [isRevealed, setIsRevealed] = useState(shouldRevealImmediately);
  const handleReveal = useCallback(() => {
    setIsRevealed(true);
  }, []);

  return (
    <div
      className="theme-expert min-h-screen bg-page text-[#141414]"
      style={resolveDnaThemeStyle(dna) as CSSProperties}
    >
      <ExpertHero onReveal={handleReveal} />

      {isRevealed ? (
        <>
          <div className="pb-28">
            {version === 'v1' ? (
              <>
                <ExpertSpecialOffer />
                <ExpertProductPresentation />
                <ExpertOfferBreakdown />
                <ExpertConfidenceBooster />
                {dna.copy.showPainPoints ? <ExpertPainPoints /> : null}
                {dna.copy.showSalesLetter ? <ExpertSalesLetter /> : null}
                <ExpertFAQ />
                <ExpertOfferStack />
                <ExpertTestimonials />
              </>
            ) : (
              <>
                <ExpertProductPresentation />
                <ExpertSpecialOffer />
                <ExpertOfferBreakdown />
                <ExpertConfidenceBooster />
                <ExpertFAQ />
                <ExpertTestimonials />
                <ExpertOfferStack />
              </>
            )}

            <footer className="border-t border-black/10 bg-white px-4 py-8 text-center sm:px-6">
              <p className="expert-body text-sm font-semibold uppercase tracking-[0.12em] text-[#4b3d53]">
                {dna.copy.productName}
              </p>
            </footer>
          </div>

          <div className="fixed bottom-0 left-0 right-0 z-[9999] border-t border-gray-200 bg-white p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
            <div className="mx-auto flex max-w-[850px] items-center justify-between gap-4">
              <div className="hidden sm:block">
                <p className="font-bold leading-tight text-gray-900">¡La oferta está disponible!</p>
                <p className="text-sm font-semibold text-brand-primary">Precio especial: ${dna.prices.main}</p>
              </div>
              <div className="w-full flex-1 sm:w-auto sm:flex-none">
                <ExpertCtaButton
                  href="#checkout"
                  label={dna.copy.ctaText || "¡Estoy lista para empezar!"}
                  fullWidth
                />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export function ExpertTheme({ version = 'v2' }: ExpertThemeProps) {
  return (
    <ExpertFunnelProvider version={version}>
      <ExpertThemeContent />
    </ExpertFunnelProvider>
  );
}

export default ExpertTheme;
