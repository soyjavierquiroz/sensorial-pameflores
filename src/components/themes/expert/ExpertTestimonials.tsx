import { ExpertCtaButton } from './ExpertCtaButton';
import { useExpertFunnel } from './ExpertFunnelContext';

export function ExpertTestimonials() {
  const { dna } = useExpertFunnel();

  if (!dna.copy.testimonials?.items?.length) return null;

  return (
    <section className="border-t border-gray-100 bg-gray-50 px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-[1100px]">
        <div className="mb-14 text-center">
          <h2
            className="text-3xl font-black leading-tight tracking-tight md:text-5xl"
            style={{ color: 'rgb(var(--color-text-main))' }}
          >
            {dna.copy.testimonials.headline}
          </h2>
          <p
            className="mx-auto mt-6 max-w-3xl text-xl font-medium leading-relaxed md:text-2xl"
            style={{ color: 'rgb(var(--color-text-muted))' }}
          >
            {dna.copy.testimonials.subtitle}
          </p>
        </div>

        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {dna.copy.testimonials.items.map((testimonial, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center rounded-3xl border border-gray-100 bg-white p-6 text-center shadow-xl transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="mb-6 flex w-full items-center justify-center overflow-hidden rounded-xl border border-gray-100 bg-gray-50">
                <img
                  src={testimonial.image}
                  alt={`Testimonio de ${testimonial.name}`}
                  className="h-auto w-full object-contain"
                  loading="lazy"
                />
              </div>
              <h3
                className="mb-3 text-xl font-black uppercase tracking-wide"
                style={{ color: 'rgb(var(--color-text-main))' }}
              >
                {testimonial.name}
              </h3>
              <p
                className="text-base font-bold italic"
                style={{ color: 'rgb(var(--color-brand-primary))' }}
              >
                {testimonial.quote}
              </p>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-md text-center">
          <div className="mb-4">
            <ExpertCtaButton href="#checkout" label={dna.copy.ctaText} fullWidth={true} />
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

export default ExpertTestimonials;
