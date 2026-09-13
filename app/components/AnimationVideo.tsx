"use client";

import { useEffect, useRef, useState } from "react";

type AnimationVideoProps = {
  src: string;
  poster: string;
  className?: string;
  label: string;
  onLoadingProgress?: (progress: number) => void;
  onReady?: () => void;
  onLoadingChange?: (loading: boolean) => void;
  onError?: (error: Error) => void;
};

export default function AnimationVideo({ src, poster, className, label, ...callbacks }: AnimationVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const callbacksRef = useRef(callbacks);
  const readyRef = useRef(false);
  const [needsPlay, setNeedsPlay] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => { callbacksRef.current = callbacks; });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    let disposed = false;
    callbacksRef.current.onLoadingChange?.(true);
    const play = () => {
      if (document.hidden) return;
      void video.play().then(() => {
        if (!disposed) setNeedsPlay(false);
      }).catch((error: DOMException) => {
        if (!disposed && error.name === "NotAllowedError") setNeedsPlay(true);
      });
    };
    const visibility = () => {
      if (document.hidden) video.pause();
      else play();
    };
    play();
    document.addEventListener("visibilitychange", visibility);
    return () => {
      disposed = true;
      document.removeEventListener("visibilitychange", visibility);
      video.pause();
    };
  }, [src]);

  const ready = () => {
    if (readyRef.current) return;
    readyRef.current = true;
    callbacksRef.current.onLoadingProgress?.(100);
    callbacksRef.current.onLoadingChange?.(false);
    callbacksRef.current.onReady?.();
  };

  return (
    <>
      <video
        ref={videoRef}
        className={className}
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        aria-label={label}
        onLoadedData={ready}
        onError={() => {
          setFailed(true);
          callbacksRef.current.onLoadingChange?.(false);
          callbacksRef.current.onError?.(new Error(`Unable to load animation video: ${src}`));
        }}
      />
      {needsPlay && !failed && (
        <button type="button" className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 rounded-full border border-white/40 bg-slate-950/80 px-4 py-2 text-sm text-white"
          onClick={() => {
            void videoRef.current?.play().then(() => setNeedsPlay(false)).catch(() => setNeedsPlay(true));
          }}>
          Putar animasi
        </button>
      )}
    </>
  );
}
