"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { X } from "lucide-react";
import StoryEducation, { EDUCATION_ENTRIES, type EducationId } from "./StoryEducation";

const ENVELOPE_VARIANTS: Record<EducationId, string> = {
  degree: "env-origami-bird",
  school: "env-paper-plane",
  bootcamp: "env-rose-envelope",
};

export type OrbitPhase = "orbiting" | "opening" | "open" | "closing";
export const ORBIT_SETTINGS = { open: 1.1, close: 1.1, speed: 0.22, radiusX: 0.82, radiusY: 0.23 };

export default function GlobeOrbit() {
  const [phase, setPhase] = useState<OrbitPhase>("orbiting");
  const [activeCard, setActiveCard] = useState<EducationId | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const envelopesRef = useRef<(HTMLButtonElement | null)[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const actions = useRef<{ open: (index: number) => void; close: () => void }>({ open: () => {}, close: () => {} });

  useEffect(() => {
    const card = cardRef.current;
    const envelopes = envelopesRef.current;
    if (!card || envelopes.length !== EDUCATION_ENTRIES.length || envelopes.some(el => !el)) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduced = media.matches;
    let current: OrbitPhase = "orbiting";
    let selected: number | null = null;
    const angles = EDUCATION_ENTRIES.map((_, i) => i * Math.PI * 2 / EDUCATION_ENTRIES.length);
    let timeline: gsap.core.Timeline | null = null;
    let cx = 0, cy = 0, rx = 1, ry = 1;
    const change = (next: OrbitPhase) => { current = next; setPhase(next); };
    const measure = () => {
      const orb = document.querySelector(".story-orb")?.getBoundingClientRect();
      const diameter = orb ? orb.width * .62 : innerHeight * .57;
      cx = orb ? orb.left + orb.width / 2 : innerWidth / 2;
      cy = orb ? orb.top + orb.height / 2 : innerHeight / 2;
      rx = Math.max(30, Math.min(diameter * ORBIT_SETTINGS.radiusX, innerWidth / 2 - 65));
      ry = diameter * ORBIT_SETTINGS.radiusY;
    };
    const position = (index: number) => {
      const angle = angles[index], depth = Math.sin(angle);
      return { x: cx + Math.cos(angle) * rx, y: cy + depth * ry + (reduced ? 0 : Math.sin(angle * 3) * 4), scale: .85 + depth * .19, rotation: Math.cos(angle) * 7, rotationY: Math.cos(angle) * 15, opacity: .82 + depth * .18 };
    };
    const place = (index: number) => gsap.set(envelopes[index], { ...position(index), visibility: "visible" });
    const open = (index: number) => {
      if (current !== "orbiting") return;
      selected = index;
      setActiveCard(EDUCATION_ENTRIES[index].id);
      change("opening");
      card.scrollTop = 0;
      gsap.set(card, { x: 0, y: 0, scale: 1, rotationY: 0, autoAlpha: 0 });
      timeline?.kill();
      timeline = gsap.timeline({ onComplete: () => {
        gsap.set(envelopes[index], { autoAlpha: 0 });
        gsap.set(card, { autoAlpha: 1 });
        change("open"); closeRef.current?.focus();
      } });
      timeline.to(envelopes[index], { x: innerWidth / 2, y: innerHeight / 2, scale: 2.2, rotation: 0, rotationY: 0, opacity: 1, duration: reduced ? .15 : ORBIT_SETTINGS.open, ease: "power3.inOut" });
    };
    const close = () => {
      if (selected === null || (current !== "open" && current !== "opening")) return;
      const index = selected;
      change("closing"); timeline?.kill();
      timeline = gsap.timeline({ onComplete: () => {
        selected = null; setActiveCard(null); change("orbiting");
        place(index); envelopes[index]?.focus();
      } });
      timeline.to(card, { scale: .2, rotationY: -12, autoAlpha: 0, duration: reduced ? .1 : .35 })
        .set(envelopes[index], { x: innerWidth / 2, y: innerHeight / 2, scale: 2.2, autoAlpha: 1 })
        .to(envelopes[index], { ...position(index), duration: reduced ? .15 : ORBIT_SETTINGS.close, ease: "power3.inOut" });
    };
    actions.current = { open, close };
    measure();
    gsap.set(card, { autoAlpha: 0, transformPerspective: 1200 });
    envelopes.forEach((el, i) => {
      gsap.set(el, { xPercent: -50, yPercent: -50, transformPerspective: 1000 });
      place(i);
    });
    const tick = (_time: number, delta: number) => {
      if (document.hidden || reduced) return;
      angles.forEach((_, i) => {
        if (selected === i || envelopes[i] === document.activeElement) return;
        angles[i] += Math.min(delta, 50) / 1000 * ORBIT_SETTINGS.speed;
        place(i);
      });
    };
    const key = (event: KeyboardEvent) => { if (event.key === "Escape" && selected !== null) { event.preventDefault(); close(); } };
    const resize = () => { measure(); envelopes.forEach((_, i) => { if (i !== selected) place(i); }); };
    const motion = () => { reduced = media.matches; resize(); };
    const visibility = () => { if (document.hidden) timeline?.pause(); else timeline?.resume(); };
    gsap.ticker.add(tick);
    window.addEventListener("resize", resize); document.addEventListener("keydown", key); document.addEventListener("visibilitychange", visibility); media.addEventListener("change", motion);
    return () => {
      timeline?.kill(); gsap.killTweensOf([card, ...envelopes]); gsap.ticker.remove(tick);
      window.removeEventListener("resize", resize); document.removeEventListener("keydown", key); document.removeEventListener("visibilitychange", visibility); media.removeEventListener("change", motion);
      actions.current = { open: () => {}, close: () => {} };
    };
  }, []);

  return (
    <div className="globe-orbit" data-phase={phase} data-selected={activeCard ?? undefined}>
      <div ref={cardRef} id="story-active-card" className="orbit-card" hidden={activeCard === null} aria-label="Riwayat pendidikan" inert={phase !== "open"}>
        {activeCard && <StoryEducation key={activeCard} entryId={activeCard} />}
      </div>
      {EDUCATION_ENTRIES.map((entry, index) => (
        <button key={entry.id} ref={el => { envelopesRef.current[index] = el; }} type="button" className={`orbit-envelope ${ENVELOPE_VARIANTS[entry.id]}`}
          aria-label={`Buka ${entry.label}`} aria-expanded={activeCard === entry.id} aria-controls="story-active-card"
          disabled={phase !== "orbiting"} onClick={() => actions.current.open(index)}>
          <span>{entry.label}</span>
        </button>
      ))}
      {activeCard && <button ref={closeRef} className="orbit-close" onClick={() => actions.current.close()} aria-label="Kembalikan card ke surat"><X size={22} /></button>}
    </div>
  );
}
