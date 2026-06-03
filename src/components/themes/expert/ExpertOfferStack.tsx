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
  const isV2 = version === 'v2';
  const savings = dna.prices.savings ?? String(Number(dna.prices.totalValue) - Number(dna.prices.main));
  const stackItems = isV2 && dna.copy.fastActionBonus.value
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
      <div className={isV2 ? 'mx-auto max-w-4xl rounded-3xl border-2 border-brand-accent bg-white p-6 shadow-[0_30px_80px_rgba(107,67,155,0.16)] sm:p-8 md:p-12' : 'max-w-4xl mx-auto rounded-sm border-4 border-dashed border-brand-primary bg-white p-8 shadow-2xl md:p-12'}>
        <h2 className={isV2 ? 'mb-8 text-center text-3xl font-black uppercase leading-tight text-[#2d203d] sm:text-4xl' : 'mb-8 text-center text-4xl font-black uppercase text-gray-900'}>
          {dna.copy.offerStackTitle}
        </h2>

        <ul className={isV2 ? 'space-y-3 sm:space-y-4' : 'space-y-4'}>
          {stackItems.map((module) => (
            <li
              key={`${module.title}-${module.value}`}
              className={isV2 ? 'flex items-start gap-3 rounded-2xl border border-brand-accent/10 bg-[#fbf8ff] px-4 py-4 shadow-sm sm:items-center' : 'flex items-start gap-3 rounded-sm border border-gray-200 bg-gray-50 px-4 py-4 shadow-sm sm:items-center'}
            >
              <Check className={isV2 ? 'mt-1 h-6 w-6 shrink-0 text-brand-accent sm:mt-0' : 'mt-1 h-6 w-6 shrink-0 text-green-500 sm:mt-0'} strokeWidth={3} aria-hidden="true" />
              <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className={isV2 ? 'text-lg font-black leading-snug text-gray-900 sm:text-xl' : 'text-lg font-extrabold text-gray-900 sm:text-xl'}>{module.title}</span>
                <span className={isV2 ? 'inline-flex self-start rounded-full bg-brand-accent px-4 py-1.5 text-sm font-black uppercase tracking-wide text-white shadow-[0_10px_22px_rgba(216,99,184,0.2)] sm:self-auto sm:text-right' : 'text-lg font-extrabold text-brand-primary sm:text-right sm:text-xl'}>{module.value}</span>
              </div>
            </li>
          ))}
        </ul>

        <hr className={isV2 ? 'my-8 border border-brand-accent/20' : 'my-6 border-2 border-gray-300'} />

        <div className={isV2 ? 'space-y-2 rounded-3xl bg-[#fbf8ff] px-5 py-6 text-center sm:px-8' : 'space-y-3'}>
          {isV2 ? (
            <>
              <p className="text-xl font-bold text-gray-700">Precio total: US${dna.prices.totalValue}</p>
              <p className="text-2xl font-black text-[#b58a00]">Te ahorras: US${savings}</p>
              <p className="pt-2 text-2xl font-black uppercase text-[#2d203d]">Hoy solo:</p>
              <p className="text-[4.75rem] font-black leading-none text-brand-primary sm:text-[6.25rem]">
                US${dna.prices.main}
              </p>
            </>
          ) : (
            <>
              <p className="text-center text-2xl font-bold text-gray-900">Valor Total: ${dna.prices.totalValue}</p>
              <p className="text-center text-xl text-gray-500 line-through">Precio Regular: ${dna.prices.regularPrice}</p>
              <p className="my-4 animate-pulse text-center text-5xl font-black text-brand-primary">¡HOY SOLO ${dna.prices.main}!</p>
            </>
          )}
        </div>

        <div className="mt-8">
          <ExpertCtaButton
            href="#checkout"
            label={isV2 ? dna.copy.finalCtaText ?? 'Quiero comprar ahora' : '¡SÍ, QUIERO SER PARTE!'}
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
