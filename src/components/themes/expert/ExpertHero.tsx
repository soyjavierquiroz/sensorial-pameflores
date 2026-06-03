import { Volume2 } from 'lucide-react';
import { DNA } from '../../../dna.config';
import funnelConfig from '../../../core/config/funnel.config';
import { SensorialPlayer as ExpertVideoPlayer } from './components/video-player/src/sensorial-video-player';

interface ExpertHeroProps {
  onReveal?: () => void;
}

export function ExpertHero({ onReveal }: ExpertHeroProps) {
  const heroVideo = funnelConfig.media.heroVideo;
  const revealAtSeconds = heroVideo.revealAtSeconds ?? 292;

  const handleRevealAtTime = (currentTime: number) => {
    heroVideo.onTimeUpdate?.(currentTime);

    if (currentTime >= revealAtSeconds) {
      onReveal?.();
    }
  };

  return (
    <section className="border-b border-gray-200 bg-white pb-[60px]">
      <div className="mx-auto max-w-[1225px] px-4 pt-4 sm:px-6">
        <div className="mx-auto mt-4 w-full max-w-[1200px] md:mt-8 xl:max-w-[1300px]">
          <h1 className="font-sans mt-[20px] text-center text-[1.5rem] font-black uppercase leading-[1.1] tracking-[-0.02em] text-gray-900 sm:text-[2.4rem] lg:text-[3rem]">
            {DNA.copy.headline}{' '}
            <span className="text-brand-primary">{DNA.copy.headlineHighlight}</span>
          </h1>

          {DNA.copy.subheadline && (
            <p className="font-sans mx-auto mt-4 w-full text-center text-[1.1rem] font-medium leading-relaxed text-gray-700 sm:mt-6 sm:text-[1.3rem]">
              {DNA.copy.subheadline}
            </p>
          )}
        </div>

        <div className="mx-auto mt-[10px] flex max-w-[850px] flex-col items-center md:mt-6">
          <div className="w-full">
            <div className="relative flex w-full flex-col overflow-hidden rounded-2xl border-[4px] border-brand-primary bg-gray-900 shadow-2xl md:border-[6px]">
              <div className="flex items-center justify-center gap-[5px] bg-brand-accent px-[5px] py-[11px] text-center text-white">
                <Volume2 className="h-4 w-4 shrink-0" />
                <p className="font-sans text-[12px] font-bold uppercase tracking-[0.08em] leading-[1.3] sm:text-[16px] sm:leading-none">
                  Enciende tus parlantes
                </p>
              </div>

              <div className="relative w-full aspect-video overflow-hidden bg-gray-900">
                {heroVideo.enabled ? (
                  <div className="absolute inset-0 h-full w-full">
                    <ExpertVideoPlayer
                      provider={heroVideo.provider}
                      videoId={heroVideo.videoId}
                      vslMode={true}
                      autoplay={true}
                      muted={true}
                      idleHideControls={true}
                      allowFullscreen={false}
                      resumePlayback={heroVideo.resumePlayback}
                      lazyLoadYoutube={heroVideo.lazyLoadYoutube}
                      hideYoutubeUi={heroVideo.hideYoutubeUi}
                      smartPoster={heroVideo.smartPoster}
                      vslProgressBarColor={heroVideo.vslProgressBarColor}
                      onTimeUpdate={handleRevealAtTime}
                      className="h-full w-full"
                    />
                  </div>
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-900 text-white/50">
                    Video Placeholder
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ExpertHero;
