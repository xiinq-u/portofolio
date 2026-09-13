"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Navigasi from "../navigation/navigasi";
import "./skills.css";

// Keep scenery movement close to the background; foreground particles move more.
const LAYERS = [
  { file: "01-background.png", depth: 0.12 },
  { file: "02_cool_left_atmosphere.png", depth: 0.12 },
  { file: "03_warm_right_atmosphere.png", depth: 0.12 },
  { file: "05_wisteria_right.png", depth: 0.16 },
  { file: "08_blue_flower_cluster.png", depth: 0.18 },
  { file: "09_pink_flower_cluster.png", depth: 0.18 },
  { file: "10_flower_branch_left.png", depth: 0.22 },
  { file: "11_flower_branch_right.png", depth: 0.22 },
  { file: "12_character_shadow.png", depth: 0.25 },
  { file: "13_character_center.png", depth: 0.25 },
  // { file: "14_user_hand_foreground.png", depth: 0.25 },
  { file: "15_pink_petals.png", depth: 0.55 },
  { file: "16_white_petals.png", depth: 0.6 },
  { file: "17_floating_sparkles.png", depth: 0.45 },
  { file: "18_golden_bokeh.png", depth: 0.5 },
  { file: "19_blue_lens_flare.png", depth: 0.3 },
  { file: "20_cinematic_vignette.png", depth: 0 },
] as const;

const SKILL_GROUPS = [
  {
    title: "Antarmuka & pengalaman",
    subtitle: "FRONTEND / DESIGN",
    skills: [
      { name: "HTML / CSS", value: 60, description: "Cukup lancar menyusun struktur dasar dan styling halaman web." },
      { name: "UI/UX & Desain", value: 60, description: "Mengembangkan kemampuan desain antarmuka dan pengalaman pengguna." },
      { name: "React.js & Next.js", value: 50, description: "Mengeksplorasi pembuatan aplikasi web dan mulai menggunakan TypeScript." },
      { name: "Tailwind CSS", value: 45, description: "Menggunakan utility class untuk styling, sesekali dibantu referensi kelas." },
    ],
    note: "JavaScript / TypeScript: memahami dasar JavaScript dan mulai mempelajari TypeScript.",
  },
  {
    title: "Logika & pengembangan",
    subtitle: "BACKEND / WORKFLOW",
    skills: [
      { name: "Golang", value: 45, description: "Cukup nyaman dengan logika dasar melalui proses ekspor dan impor data." },
      { name: "MySQL & SQL", value: 40, description: "Memahami dasar database relasional; menggunakan tools GUI untuk query tertentu." },
      { name: "PHP & Laravel", value: 30, description: "Belajar dasar PHP, Route, Model, Controller (MVC), dan migration di Laravel." },
      { name: "Tools", value: 50, description: "Menggunakan Git, VS Code, dan alat pendukung dalam proses belajar dan pengembangan." },
    ],
    note: "Terus belajar, mencoba, dan membangun melalui praktik.",
  },
] as const;

export default function Skills() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const layout = root?.querySelector<HTMLElement>(".skills-layout-split");
    if (!root || !layout) return;
    const panels = Array.from(root.querySelectorAll<HTMLElement>(".skills-panel"));
    const mobile = window.matchMedia("(hover: none) and (pointer: coarse) and (orientation: landscape) and (max-height: 600px)");
    let frame = 0;
    const fit = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!mobile.matches) {
          root.style.removeProperty("--skills-card-scale");
          return;
        }
        // Layout dimensions are unaffected by transform: use one scale for both axes.
        const height = Math.max(...panels.map(panel => panel.offsetHeight), 1);
        const columnWidth = Math.max(1, (layout.clientWidth - 24) / 3.3);
        const availableHeight = Math.max(0, layout.clientHeight - 12);
        const width = Math.max(...panels.map(panel => panel.offsetWidth), 1);
        const scale = Math.max(0, Math.min(1, columnWidth / width, availableHeight / height));
        root.style.setProperty("--skills-card-scale", String(Math.floor(scale * 1000) / 1000));
      });
    };
    const observer = new ResizeObserver(fit);
    observer.observe(layout);
    panels.forEach(panel => observer.observe(panel));
    mobile.addEventListener("change", fit);
    fit();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      mobile.removeEventListener("change", fit);
      root.style.removeProperty("--skills-card-scale");
    };
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const layers = Array.from(root.querySelectorAll<HTMLElement>(".skills-art-layer"));
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = true;
    let x = 0, y = 0, targetX = 0, targetY = 0;
    const paint = () => {
      layers.forEach((layer) => {
        const depth = Number(layer.dataset.depth ?? 0);
        layer.style.transform = `translate3d(${(x * depth).toFixed(3)}px, ${(y * depth).toFixed(3)}px, 0)`;
      });
    };
    let previousTime = 0;
    const tick = (time: number) => {
      frame = 0;
      if (media.matches || document.hidden || !visible) return;
      const elapsed = previousTime ? Math.min(time - previousTime, 50) : 16.67;
      previousTime = time;
      const smoothing = 1 - Math.exp(-elapsed / 160);
      x += (targetX - x) * smoothing;
      y += (targetY - y) * smoothing;
      paint();
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > 0.05) frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!frame && !media.matches && !document.hidden && visible) { previousTime = 0; frame = requestAnimationFrame(tick); }
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch" || media.matches) return;
      // Viewport coordinates stay bounded even when the skill content scrolls.
      const clamp = (value: number) => Math.max(-0.5, Math.min(0.5, value));
      targetX = clamp(event.clientX / Math.max(1, window.innerWidth) - 0.5) * 20;
      targetY = clamp(event.clientY / Math.max(1, window.innerHeight) - 0.5) * 14;
      start();
    };
    const reset = () => { targetX = targetY = 0; start(); };
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
    observer.observe(root);
    root.addEventListener("pointermove", move, { passive: true });
    root.addEventListener("pointerleave", reset);
    window.addEventListener("blur", reset);
    document.addEventListener("visibilitychange", visibility);
    media.addEventListener("change", motion);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      root.removeEventListener("pointermove", move);
      root.removeEventListener("pointerleave", reset);
      window.removeEventListener("blur", reset);
      document.removeEventListener("visibilitychange", visibility);
      media.removeEventListener("change", motion);
    };
  }, []);

 return (
    <main ref={rootRef} className="skills-page" aria-labelledby="skills-title">
      <div className="skills-art-layer skills-backdrop" data-art="01" data-depth={LAYERS[0].depth} aria-hidden="true"
        style={{ backgroundImage: `url("/images/bahan_skills/${LAYERS[0].file}")` }} />
      <div className="skills-scene" aria-hidden="true">
        {LAYERS.slice(1).filter(layer => !["05", "08", "09", "10", "11"].includes(layer.file.slice(0, 2))).map((layer, index) => (
          <div key={layer.file} className="skills-art-layer" data-art={layer.file.slice(0, 2)} data-depth={layer.depth} style={{
            backgroundImage: `url("/images/bahan_skills/${layer.file}")`,
            zIndex: index,
          } as CSSProperties} />
        ))}
      </div>
      <div className="skills-flowers" aria-hidden="true">
        {LAYERS.filter(layer => ["05", "08", "09", "10", "11"].includes(layer.file.slice(0, 2))).map(layer => (
          <div key={layer.file} className="skills-art-layer" data-art={layer.file.slice(0, 2)} data-depth={layer.depth}
            style={{ backgroundImage: `url("/images/bahan_skills/${layer.file}")` }} />
        ))}
      </div>
      <div className="skills-back"><Navigasi /></div>
      <div className="skills-content">
        <header className="skills-heading">
          <p className="skills-eyebrow">LEARN / CREATE / GROW</p>
          <h1 id="skills-title">Keahlian</h1>
          <p>Terus belajar, satu proyek dalam satu waktu.</p>
        </header>

        {/* ========================================================== */}
        {/* LAYOUT SPLIT: KIRI (Card 1) - TENGAH (Objek) - KANAN (Card 2) */}
        {/* ========================================================== */}
        <div className="skills-layout-split">
          
          {/* 1. KARTU KIRI (Frontend) */}
          {SKILL_GROUPS[0] && (
            <section className="skills-panel skills-panel-left" aria-labelledby="skills-group-0">
              <p className="skills-eyebrow">01 / FRONTEND</p>
              <h2 id="skills-group-0">Frontend & Design</h2>
              <ul className="skills-list">
                {SKILL_GROUPS[0].skills.map(skill => (
                  <li key={skill.name} className="skills-item" title={skill.description}>
                    <div className="skills-item-heading">
                      <h3>{skill.name}</h3><span>{skill.value}<small>%</small></span>
                    </div>
                    <meter min={0} max={100} value={skill.value} aria-label={`${skill.name}: ${skill.value}%`} />
                    <p>{skill.description}</p>
                  </li>
                ))}
              </ul>
              <p className="skills-note">{SKILL_GROUPS[0].note}</p>
            </section>
          )}

          {/* 2. BAGIAN TENGAH (Tempat Objek / Karakter Anda) */}
          <div className="skills-center-object" style={{ textAlign: "center" }}>
            <div className="skills-mobile-character"></div>
          </div>

          {/* 3. KARTU KANAN (Backend) */}
          {SKILL_GROUPS[1] && (
            <section className="skills-panel skills-panel-right" aria-labelledby="skills-group-1">
              <p className="skills-eyebrow">02 / BACKEND</p>
              <h2 id="skills-group-1">Backend & Tools</h2>
              <ul className="skills-list">
                {SKILL_GROUPS[1].skills.map(skill => (
                  <li key={skill.name} className="skills-item" title={skill.description}>
                    <div className="skills-item-heading">
                      <h3>{skill.name}</h3><span>{skill.value}<small>%</small></span>
                    </div>
                    <meter min={0} max={100} value={skill.value} aria-label={`${skill.name}: ${skill.value}%`} />
                    <p>{skill.description}</p>
                  </li>
                ))}
              </ul>
              <p className="skills-note">{SKILL_GROUPS[1].note}</p>
            </section>
          )}

        </div>

        <p className="skills-caption">Penilaian pribadi / terus berkembang</p>
      </div>
    </main>
  );
}
