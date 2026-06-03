import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { ExpertCtaButton } from './ExpertCtaButton';
import { useExpertFunnel } from './ExpertFunnelContext';

export function ExpertFAQ() {
  const { dna } = useExpertFunnel();
  const [openIndex, setOpenIndex] = useState(0);

  // Si no hay FAQs en el DNA, no renderizamos el bloque
  if (!dna.copy.faq?.items?.length) return null;

  return (
    <section 
      className="px-4 py-16 sm:px-6 sm:py-20" 
      style={{ backgroundColor: 'rgba(var(--color-brand-accent), 0.05)' }}
    >
      <div className="mx-auto max-w-[900px]">
        
        {/* Encabezado */}
        <div className="mb-10 flex items-center gap-6">
          <h2 
            className="text-[2rem] font-black leading-none tracking-tight sm:text-[2.5rem] uppercase"
            style={{ color: 'rgb(var(--color-text-main))' }}
          >
            {dna.copy.faq.title}
          </h2>
          <div className="h-1 flex-1 rounded-full" style={{ backgroundColor: 'rgb(var(--color-brand-accent))' }} />
        </div>

        {/* Acordeón de Preguntas */}
        <div className="space-y-4">
          {dna.copy.faq.items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="rounded-xl border-l-4 bg-white px-6 py-5 shadow-sm transition-all duration-200 hover:shadow-md"
                style={{ borderLeftColor: 'rgb(var(--color-brand-accent))' }}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 text-left focus:outline-none"
                >
                  <span 
                    className="text-[1.1rem] font-bold leading-snug sm:text-[1.3rem]"
                    style={{ color: 'rgb(var(--color-text-main))' }}
                  >
                    {item.question}
                  </span>
                  <span className="shrink-0 transition-transform duration-300" style={{ color: 'rgb(var(--color-brand-accent))' }}>
                    {isOpen ? <Minus className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
                  </span>
                </button>

                {isOpen && (
                  <div 
                    className="mt-4 pr-8 text-base leading-relaxed"
                    style={{ color: 'rgb(var(--color-text-muted))' }}
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Cierre y CTA */}
        <div className="mx-auto mt-12 max-w-md text-center">
          <div className="mb-4">
            <ExpertCtaButton
              href="#checkout"
              label={dna.copy.ctaText}
              fullWidth={true}
            />
          </div>
          <div 
            className="font-mono text-sm uppercase tracking-wide font-bold" 
            style={{ color: 'rgb(var(--color-text-muted))' }}
          >
            {dna.copy.specialOfferGuarantee}
          </div>
        </div>
        
      </div>
    </section>
  );
}

export default ExpertFAQ;
