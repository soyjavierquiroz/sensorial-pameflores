import { Check, CreditCard, Lock, ShieldCheck } from 'lucide-react';
import { ExpertCtaButton } from './ExpertCtaButton';
import { useExpertFunnel } from './ExpertFunnelContext';

const certaintyItems = [
  { id: 'secure-payment', label: 'Pago 100% Seguro', icon: Lock },
  { id: 'guarantee', label: 'Garantía de 30 Días', icon: ShieldCheck },
  { id: 'ssl', label: 'Encriptación SSL 256-bit', icon: CreditCard },
] as const;

export function ExpertOfferStack() {
  const { dna, version } = useExpertFunnel();
  const savings = dna.prices.savings ?? String(Number(dna.prices.totalValue) - Number(dna.prices.main));
  const stackItems = version === 'v2' && dna.copy.fastActionBonus.value
    ? [
        ...dna.copy.modules,
        {
          title: dna.copy.fastActionBonus.title,
          value: dna.copy.fastActionBonus.value,
        },
      ]
    : dna.copy.modules;

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16">
      <div className="max-w-4xl mx-auto rounded-sm border-4 border-dashed border-brand-primary bg-white p-8 shadow-2xl md:p-12">
        <h2 className="mb-8 text-center text-4xl font-black uppercase text-gray-900">
          {dna.copy.offerStackTitle}
        </h2>

        <ul className="space-y-4">
          {stackItems.map((module) => (
            <li
              key={`${module.title}-${module.value}`}
              className="flex items-start gap-3 rounded-sm border border-gray-200 bg-gray-50 px-4 py-4 shadow-sm sm:items-center"
            >
              <Check className="mt-1 h-6 w-6 shrink-0 text-green-500 sm:mt-0" strokeWidth={3} aria-hidden="true" />
              <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-lg font-extrabold text-gray-900 sm:text-xl">{module.title}</span>
                <span className="text-lg font-extrabold text-brand-primary sm:text-right sm:text-xl">{module.value}</span>
              </div>
            </li>
          ))}
        </ul>

        <hr className="my-6 border-2 border-gray-300" />

        <div className="space-y-3">
          <p className="text-center text-2xl font-bold text-gray-900">
            {version === 'v2' ? 'Precio Total' : 'Valor Total'}: ${dna.prices.totalValue}
          </p>
          {version === 'v2' ? (
            <p className="text-center text-xl font-black text-brand-accent">Te ahorras US${savings}</p>
          ) : (
            <p className="text-center text-xl text-gray-500 line-through">Precio Regular: ${dna.prices.regularPrice}</p>
          )}
          <p className="my-4 animate-pulse text-center text-5xl font-black text-brand-primary">¡HOY SOLO ${dna.prices.main}!</p>
        </div>

        <div className="mt-8">
          <ExpertCtaButton
            href="#checkout"
            label={version === 'v2' ? dna.copy.finalCtaText ?? 'Quiero comprar ahora' : '¡SÍ, QUIERO SER PARTE!'}
            fullWidth
            className="py-6 text-2xl"
          />

          <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm font-bold text-gray-600">
            {certaintyItems.map(({ id, label, icon: Icon }) => (
              <div key={id} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-brand-accent" strokeWidth={2.25} aria-hidden="true" />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExpertOfferStack;
