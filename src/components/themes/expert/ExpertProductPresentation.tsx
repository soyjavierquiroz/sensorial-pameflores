import { useExpertFunnel } from './ExpertFunnelContext';
import { ExpertCtaButton } from './ExpertCtaButton';

export function ExpertProductPresentation() {
  const { dna } = useExpertFunnel();
  const showOffer = Boolean(dna.copy.presentationCtaText);

  return (
    <section 
      className="py-12 px-4 sm:px-6 text-center sm:py-16"
      style={{ backgroundColor: 'rgb(var(--color-page))' }}
    >
      <div className="mx-auto max-w-[1000px]">
        {dna.copy.presentationPreTitle ? (
          <h2 
            className="text-xl md:text-2xl font-bold uppercase tracking-widest mb-2"
            style={{ color: 'rgb(var(--color-text-muted))' }}
          >
            {dna.copy.presentationPreTitle}
          </h2>
        ) : null}
        
        <h1 
          className="text-[2rem] md:text-[3.5rem] font-black mb-8 leading-tight uppercase" 
          style={{ 
            fontFamily: 'var(--font-sans)',
            color: 'rgb(var(--color-text-main))'
          }}
          dangerouslySetInnerHTML={{ __html: dna.copy.presentationTitle }}
        />
        
        <div className="relative mx-auto mt-6 w-full max-w-[760px]">
          <div 
            className="absolute inset-0 blur-[100px] opacity-15 rounded-full"
            style={{ backgroundColor: 'rgb(var(--color-brand-primary))' }}
          ></div>
          <img 
            src={dna.copy.presentationImage}
            alt={dna.copy.productName}
            className="relative z-10 w-full h-auto drop-shadow-2xl hover:scale-[1.02] transition-transform duration-500"
          />
        </div>

        {showOffer ? (
          <div className="mx-auto mt-8 max-w-[620px] rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_18px_50px_rgba(17,17,17,0.08)] sm:p-7">
            <p className="text-base font-bold text-gray-400 line-through sm:text-lg">
              Valor normal ${dna.prices.regular}
            </p>
            <p className="mt-1 text-3xl font-black text-gray-950 sm:text-4xl">
              Valor hoy <span className="text-brand-primary">${dna.prices.main}</span>
            </p>
            <div className="mx-auto mt-5 max-w-md">
              <ExpertCtaButton href="#checkout" label={dna.copy.presentationCtaText ?? dna.copy.ctaText} fullWidth />
            </div>
            <p className="mt-4 font-mono text-xs font-bold uppercase tracking-wide text-[#6c5a76] sm:text-sm">
              {dna.copy.specialOfferGuarantee}
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
