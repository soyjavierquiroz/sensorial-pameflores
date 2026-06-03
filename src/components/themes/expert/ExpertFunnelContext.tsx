import { createContext, useContext, type ReactNode } from 'react';
import { DNA_BY_VERSION, getDnaNumericPrices, type DnaConfig, type FunnelVersion } from '../../../dna.config';
import { resolveFunnelConfig, type FunnelConfig } from '../../../core/config/funnel.config';

interface ExpertFunnelContextValue {
  version: FunnelVersion;
  dna: DnaConfig;
  funnelConfig: FunnelConfig;
  numericPrices: ReturnType<typeof getDnaNumericPrices>;
}

const defaultDna = DNA_BY_VERSION.v2;

const ExpertFunnelContext = createContext<ExpertFunnelContextValue>({
  version: 'v2',
  dna: defaultDna,
  funnelConfig: resolveFunnelConfig('v2'),
  numericPrices: getDnaNumericPrices(defaultDna),
});

interface ExpertFunnelProviderProps {
  version: FunnelVersion;
  children: ReactNode;
}

export function ExpertFunnelProvider({ version, children }: ExpertFunnelProviderProps) {
  const dna = DNA_BY_VERSION[version];

  return (
    <ExpertFunnelContext.Provider
      value={{
        version,
        dna,
        funnelConfig: resolveFunnelConfig(version),
        numericPrices: getDnaNumericPrices(dna),
      }}
    >
      {children}
    </ExpertFunnelContext.Provider>
  );
}

export function useExpertFunnel() {
  return useContext(ExpertFunnelContext);
}
