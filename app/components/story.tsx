"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { GlobeCollection } from "./threeui/src/shaders/globe/GlobeCollection";
import "./story.css";
import GlobeOrbit from "./GlobeOrbit";

// Layer 03's planet is replaced by the live ThreeUI Energy Orb.
const PARALLAX_LAYERS = [
  { name: "sky", file: "parallax-01-sky.png", depth: 0.15 },
  { name: "stars", file: "parallax-02-stars.png", depth: 0.3 },
  { name: "rings", file: "parallax-04-orbit-rings.png", depth: 0.35 },
  { name: "mountains", file: "parallax-05-mountains.png", depth: 0.45 },
  { name: "floor", file: "parallax-06-floor-repaired.png", depth: 0.55 },
  { name: "pillars-left", file: "parallax-07-left-pillars-repaired-v3-transparent.png", depth: 0.55 },
  { name: "pillars-right", file: "parallax-08-right-pillars-repaired-removebg-preview_Nero_AI_Image_Upscaler_Photo_Face.png", depth: 0.55 },
  { name: "ornaments", file: "parallax-09-hanging-ornaments.png", depth: 1 },
] as const;

export default function Story() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = true;
    let x = 0, y = 0, targetX = 0, targetY = 0;
    const paint = () => {
      scene.style.setProperty("--parallax-x", `${x.toFixed(2)}px`);
      scene.style.setProperty("--parallax-y", `${y.toFixed(2)}px`);
    };
    const tick = () => {
      frame = 0;
      if (document.hidden || !visible || media.matches) return;
      x += (targetX - x) * 0.075;
      y += (targetY - y) * 0.075;
      paint();
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > 0.05) frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!frame && visible && !document.hidden && !media.matches) frame = requestAnimationFrame(tick);
    };
    const reset = () => { targetX = 0; targetY = 0; start(); };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch" || media.matches) return;
      targetX = (event.clientX / window.innerWidth - 0.5) * 18;
      targetY = (event.clientY / window.innerHeight - 0.5) * 12;
      start();
    };
    const motion = () => {
      cancelAnimationFrame(frame); frame = 0;
      x = y = targetX = targetY = 0; paint();
    };
    const visibility = () => {
      if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
      else start();
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else { cancelAnimationFrame(frame); frame = 0; }
    });
    observer.observe(scene);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    document.addEventListener("visibilitychange", visibility);
    media.addEventListener("change", motion);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
      document.removeEventListener("visibilitychange", visibility);
      media.removeEventListener("change", motion);
    };
  }, []);

  return (
    <>
      <div ref={sceneRef} className="cosmic-story story-parallax" aria-hidden="true">
        {PARALLAX_LAYERS.map(layer => (
          <div key={layer.name} className={`story-parallax-layer story-parallax-${layer.name}`}
            style={{ "--depth": layer.depth, backgroundImage: `url("/images/bahan-bahan/${layer.file}")` } as CSSProperties} />
        ))}
        <div className="story-orb">
          <GlobeCollection variant="energy-orb" speed={1} scale={1}
            smokeScale={1} smokeStrength={1} smokeSpeed={1} hue={0}
            saturation={1} glow={1} starDensity={1} starSpeed={1}
            starSize={1} brightness={1} opacity={1} />
        </div>
        <div className="story-floor-glow" />
        <div className="story-frame">
          <div className="story-frame-bottom">
            <div className="story-frame-paper story-frame-paper-left" />
            <div className="story-frame-paper story-frame-paper-center" />
            <div className="story-frame-paper story-frame-paper-right" />
          </div>
          <div className="story-frame-piece story-frame-left" />
          <div className="story-frame-piece story-frame-right" />
        </div>
        <div className="cosmic-readability" />
      </div>
      <GlobeOrbit />
    </>
  );
}
