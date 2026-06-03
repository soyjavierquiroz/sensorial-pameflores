import { useExpertFunnel } from './ExpertFunnelContext';

export function ExpertOrderForm() {
  const { dna } = useExpertFunnel();

  return (
    <aside
      id="checkout"
      className="rounded-sm border-[4px] border-[#111] bg-white px-6 py-8 text-center text-[#2f2535] shadow-2xl"
    >
      <p className="expert-body text-xs font-semibold uppercase tracking-[0.24em] text-brand-primary">
        Checkout Placeholder
      </p>
      <h2 className="expert-headline mt-3 text-[1.9rem] font-extrabold text-[#3b2d42]">
        {dna.copy.productName}
      </h2>
      <p className="expert-body mt-3 text-sm leading-6 text-[#5f4f65]">
        Este bloque quedo desconectado del flujo heredado y se conserva solo como placeholder temporal.
      </p>
    </aside>
  );
}

export default ExpertOrderForm;
