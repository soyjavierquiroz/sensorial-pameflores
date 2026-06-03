interface FakeProgressBarProps {
  color?: string;
  currentTime: number;
  duration: number;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getPsychologicalProgress(currentTime: number, duration: number) {
  const safeCurrentTime = Number.isFinite(currentTime) ? Math.max(currentTime, 0) : 0;
  const safeDuration = duration > 0 ? duration : 1;
  const normalizedProgress = clamp(safeCurrentTime / safeDuration, 0, 1);
  const fakeProgress = Math.pow(normalizedProgress, 0.4) * 100;

  return clamp(fakeProgress, 0, 98);
}

export function FakeProgressBar({ color, currentTime, duration }: FakeProgressBarProps) {
  const progress = getPsychologicalProgress(currentTime, duration);

  return (
    <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[60] h-[6px] w-full overflow-hidden bg-black/20" aria-hidden="true">
      <div
        className="h-full transition-all duration-300 ease-linear rounded-r-full"
        style={{
          width: `${progress}%`,
          backgroundColor: color || '#10b981',
        }}
      />
    </div>
  );
}
