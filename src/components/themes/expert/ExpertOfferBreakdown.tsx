import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useExpertFunnel } from './ExpertFunnelContext';

export function ExpertOfferBreakdown() {
  const { dna, version } = useExpertFunnel();
  const isV2 = version === 'v2';
  // Inicializamos el contador en 60 minutos (3600 segundos)
  const [timeLeft, setTimeLeft] = useState(3600);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Formateador para pasar los segundos a formato MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <section className={isV2 ? 'px-4 py-14 sm:px-6 sm:py-20' : 'px-4 py-16 sm:px-6'} style={{ backgroundColor: 'rgba(var(--color-primary), 0.03)' }}>
      <div className="mx-auto max-w-[1000px]">
        <div className="mb-10 text-center">
          <h2
            className={isV2 ? 'text-3xl font-black uppercase leading-tight text-[#2d203d] md:text-5xl' : 'text-3xl font-black uppercase leading-tight md:text-5xl'}
            style={{ color: 'rgb(var(--color-text-main))' }}
          >
            Tendrás acceso a
          </h2>
        </div>
        
        {/* Entregables del Paquete */}
        <div className={isV2 ? 'space-y-6 sm:space-y-8' : 'space-y-8'}>
          {dna.copy.modules.map((module, index) => (
            <div
              key={index}
              className={isV2 ? 'flex flex-col overflow-hidden rounded-2xl border border-brand-accent/10 bg-white shadow-[0_18px_46px_rgba(107,67,155,0.1)] md:flex-row' : 'flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_16px_44px_rgba(17,17,17,0.08)] md:flex-row'}
            >
              <div className={isV2 ? 'relative flex items-center justify-center bg-white p-5 sm:p-6 md:w-2/5' : 'relative flex items-center justify-center bg-white p-6 md:w-2/5'}>
                <img
                  src={module.image}
                  alt={module.title}
                  className="relative z-10 h-auto w-full rounded-2xl shadow-sm object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className={isV2 ? 'flex flex-col justify-center p-6 sm:p-8 md:w-3/5' : 'flex flex-col justify-center p-8 md:w-3/5'}>
                <h3
                  className={isV2 ? 'mb-3 text-[1.65rem] font-black leading-tight sm:text-3xl' : 'mb-3 text-2xl font-black leading-tight'}
                  style={{ color: 'rgb(var(--color-text-main))' }}
                >
                  {module.title}
                </h3>
                <p
                  className={isV2 ? 'mb-6 text-base leading-relaxed sm:text-lg' : 'mb-6 text-lg leading-relaxed'}
                  style={{ color: 'rgb(var(--color-text-muted))' }}
                >
                  {module.description}
                </p>
                <div
                  className={isV2 ? 'mt-auto inline-block self-start rounded-full px-5 py-2 text-sm font-black uppercase tracking-wide shadow-[0_10px_24px_rgba(216,99,184,0.18)]' : 'mt-auto inline-block self-start rounded-full px-5 py-2 text-sm font-bold shadow-sm'}
                  style={{
                    backgroundColor: isV2 ? 'rgb(var(--color-brand-accent))' : 'rgba(var(--color-brand-accent), 0.1)',
                    color: isV2 ? 'white' : 'rgb(var(--color-brand-accent))',
                  }}
                >
                  Valorado en {module.value}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bloque de Bono de Acción Rápida con CONTADOR REGRESIVO INTEGRADO */}
        {dna.copy.fastActionBonus && (
          <div
            className={isV2 ? 'relative mt-16 overflow-hidden rounded-3xl border-2 p-7 text-center shadow-[0_28px_70px_rgba(107,67,155,0.14)] transition-transform hover:-translate-y-1 sm:p-10 md:p-12' : 'relative mt-16 overflow-hidden rounded-3xl border-2 p-8 text-center shadow-2xl transition-transform hover:-translate-y-1 md:p-12'}
            style={{
              background: isV2 ? 'linear-gradient(180deg, #fffdf7 0%, #fff7d6 100%)' : 'white',
              borderColor: 'rgb(var(--color-highlight))',
            }}
          >
            <div
              className="absolute left-0 top-0 h-3 w-full"
              style={{ backgroundColor: 'rgb(var(--color-highlight))' }}
            ></div>

            {isV2 ? (
              <div className="mx-auto mb-5 inline-flex rounded-full bg-brand-primary px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-[#ffd966] shadow-sm">
                Bono de acción rápida
              </div>
            ) : null}

            <p
              className="mb-4 text-sm font-black uppercase tracking-widest md:text-base"
              style={{ color: 'rgb(var(--color-text-muted))' }}
            >
              {dna.copy.fastActionBonus.timeLimit}
            </p>
            
            <h3
              className="mb-3 text-[1.8rem] font-black leading-tight md:text-[2.5rem]"
              style={{ color: 'rgb(var(--color-text-main))' }}
            >
              {dna.copy.fastActionBonus.title}
            </h3>
            
            <p
              className="text-xl font-medium md:text-2xl mb-8"
              style={{ color: 'rgb(var(--color-brand-primary))' }}
            >
              {dna.copy.fastActionBonus.subtitle}
            </p>

            {dna.copy.fastActionBonus.image ? (
              <img
                src={dna.copy.fastActionBonus.image}
                alt={dna.copy.fastActionBonus.title}
                className="mx-auto mb-8 w-full max-w-[360px] rounded-2xl object-contain shadow-lg"
                loading="lazy"
              />
            ) : null}

            {dna.copy.fastActionBonus.value ? (
              <div
                className="mx-auto mb-8 inline-block rounded-full px-5 py-2 text-sm font-bold shadow-sm"
                style={{
                  backgroundColor: 'rgba(var(--color-brand-accent), 0.1)',
                  color: 'rgb(var(--color-brand-accent))',
                }}
              >
                Valorado en {dna.copy.fastActionBonus.value}
              </div>
            ) : null}

            {/* RELOJ REGRESIVO DE IMPACTO */}
            <div 
              className="inline-flex flex-col sm:flex-row items-center justify-center gap-3 px-6 py-3 rounded-2xl border shadow-inner bg-gray-50/50 animate-pulse"
              style={{ borderColor: 'rgba(var(--color-brand-primary), 0.15)' }}
            >
              <div className="flex items-center gap-2 font-black text-xs md:text-sm uppercase tracking-wider" style={{ color: 'rgb(var(--color-text-main))' }}>
                <Clock className="h-5 w-5" style={{ color: 'rgb(var(--color-brand-primary))' }} />
                <span>Esta oportunidad expira en:</span>
              </div>
              <div 
                className="font-mono text-2xl font-black px-4 py-1 rounded-xl text-white tracking-widest shadow-md"
                style={{ backgroundColor: 'rgb(var(--color-brand-primary))' }}
              >
                {formattedTime}
              </div>
            </div>

          </div>
        )}
      </div>
    </section>
  );
}
