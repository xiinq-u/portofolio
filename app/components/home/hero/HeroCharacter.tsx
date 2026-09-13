"use client";

import AnimationVideo from "../../shared/AnimationVideo";

export interface HeroCharacterProps {
  className?: string;
  onLoadingProgress?: (progress: number) => void;
  onReady?: () => void;
  onLoadingChange?: (isLoading: boolean) => void;
  onError?: (error: Error) => void;
}

export default function HeroCharacter({ className = "", ...callbacks }: HeroCharacterProps) {
  return (
    <div className={`relative isolate h-full min-h-[inherit] w-full overflow-hidden ${className}`.trim()}>
      <AnimationVideo
        src="/videos/hero.mp4"
        poster="/videos/hero-poster.jpg"
        label="Animated hero character"
        className="pointer-events-none absolute bottom-0 left-1/2 block h-full w-auto max-w-none -translate-x-1/2 select-none object-contain object-bottom"
        {...callbacks}
      />
    </div>
  );
}
