"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  GraduationCap, 
  Globe, 
  FileText, 
  CheckCircle2,
  Wrench,
  Code
} from 'lucide-react';

export const EDUCATION_ENTRIES = [
  { id: "degree", label: "S1 Sastra Inggris" },
  { id: "bootcamp", label: "Pengembangan Web" },
  { id: "school", label: "TKJ" },
] as const;
export type EducationId = typeof EDUCATION_ENTRIES[number]["id"];

export default function StoryEducation({ entryId }: { entryId: EducationId }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const stage = stageRef.current;
    const panel = stage?.querySelector<HTMLElement>('.story-education-panel');
    if (!stage || !panel) return;
    const mobile = window.matchMedia('(hover: none) and (pointer: coarse) and (orientation: landscape) and (max-height: 600px)');
    let frame = 0;
    const fit = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!mobile.matches) {
          stage.style.removeProperty('--story-panel-scale');
          return;
        }
        const style = getComputedStyle(stage);
        const width = stage.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
        const height = stage.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
        // Measure the complete, unscaled panel, including the header and footer.
        const scale = Math.max(0.1, Math.min(1, width / panel.offsetWidth, height / panel.offsetHeight));
        stage.style.setProperty('--story-panel-scale', String(Math.floor(scale * 1000) / 1000));
      });
    };
    const observer = new ResizeObserver(fit);
    observer.observe(stage);
    observer.observe(panel);
    mobile.addEventListener('change', fit);
    fit();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      mobile.removeEventListener('change', fit);
      stage.style.removeProperty('--story-panel-scale');
    };
  }, []);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Jakarta' }));
      setCurrentDate(now.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Jakarta' }));
    };
    const initial = setTimeout(updateClock, 0);
    const interval = setInterval(updateClock, 1000);
    return () => { clearTimeout(initial); clearInterval(interval); };
  }, []);

  return (
    <div ref={stageRef} className="story-education min-h-dvh w-full text-white flex items-center justify-center px-3 pb-8 pt-24 sm:px-6 font-sans relative z-10">
      
      {/* Glass Panel with White, Soft Blue, and Deep Black Gradient Transparency */}
      <div className="story-education-panel relative z-10 w-full max-w-5xl min-h-[580px] bg-gradient-to-br from-white/[0.06] via-blue-950/30 to-black/60 rounded-3xl border-t border-l border-white/40 border-b border-r border-blue-200/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden p-4 sm:p-6 transition-all duration-500">
        
        {/* Specular Highlight - Efek kilau cahaya atas */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent"></div>
        <div className="absolute top-0 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-blue-200 to-transparent shadow-[0_0_12px_rgba(147,197,253,0.6)]"></div>
        
        {/* TOP HEADER BAR */}
        <div className="flex flex-wrap gap-4 items-center justify-between pb-3 border-b border-white/15 shrink-0">
          
          {/* Left: Clock and Date */}
          <div className="flex items-center space-x-3">
            <div className="text-2xl sm:text-3xl font-light tracking-wider text-white font-mono drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {currentTime}
            </div>
            <div className="text-xs text-blue-100 font-medium tracking-wide uppercase drop-shadow">
              {currentDate}
            </div>
          </div>

          {/* Center Title area */}
          <div className="text-center">
            <h1 className="text-lg sm:text-xl font-semibold tracking-wider uppercase text-white drop-shadow">
              Education & Training History
            </h1>
            <p className="text-[10px] text-blue-200 tracking-[0.2em] uppercase font-mono drop-shadow">
              LEARNING TODAY, A BRIGHTER TOMORROW
            </p>
          </div>

          {/* HUD Right indicators */}
          <div className="flex items-center space-x-3 text-white">
            <div className="flex items-center space-x-1.5 text-xs font-mono bg-blue-950/40 border border-blue-200/30 px-2.5 py-0.5 rounded-full shadow-inner">
              <span>100%</span>
            </div>
            <div className="w-7 h-7 rounded-full border border-blue-200/30 flex items-center justify-center bg-blue-950/40 shadow-inner">
              <Globe className="w-3.5 h-3.5 text-blue-200 animate-spin" style={{ animationDuration: '12s' }} />
            </div>
          </div>
        </div>

        {/* MAIN BODY LAYOUT: SCROLLABLE CONTAINER FOR MULTIPLE ENTRIES */}
        <div className="flex-1 my-3 relative overflow-y-auto space-y-4 pr-1">
          
          {/* ================= 1. S1 SASTRA INGGRIS ================= */}
          {entryId === "degree" && (
          <div className="relative bg-gradient-to-br from-white/[0.03] via-blue-950/20 to-black/40 border-t border-l border-white/25 border-b border-r border-blue-200/15 rounded-2xl p-4 sm:p-6 hover:border-white/40 transition-all duration-300 flex flex-col justify-between shadow-inner">
            
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blue-200/70"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blue-200/70"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-blue-200/70"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blue-200/70"></div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/15 shrink-0">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-blue-950/40 border border-blue-200/30 flex items-center justify-center shrink-0 shadow-inner">
                  <GraduationCap className="w-6 h-6 text-blue-200 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2 text-blue-200 font-mono text-[10px] tracking-widest mb-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-300"></span>
                    <span>BACHELOR DEGREE PROGRAM</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-wide text-white drop-shadow">
                    S1 Sastra Inggris
                  </h2>
                  <p className="text-xs sm:text-sm text-blue-100 font-medium">
                    Universitas Islam 45 Bekasi
                  </p>
                </div>
              </div>

              <div className="bg-blue-950/40 border border-blue-200/30 px-3 py-1 rounded-xl text-xs font-mono text-blue-100 flex items-center space-x-2 shrink-0 shadow-inner">
                <span>2022 – 2026</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3 items-center">
              <div className="md:col-span-3 space-y-3">
                <div className="bg-gradient-to-r from-blue-950/30 to-black/40 border border-blue-200/20 rounded-xl p-3.5 shadow-inner">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-blue-200 mb-1.5 flex items-center space-x-2">
                    <FileText className="w-3.5 h-3.5 text-blue-200" />
                    <span>Program Overview & Focus</span>
                  </h3>
                  <p className="text-xs text-white leading-relaxed">
                    Menempuh studi S1 Sastra Inggris dengan penekanan mendalam pada linguistik terapan, penulisan akademik tingkat lanjut, studi penerjemahan profesional, serta metodologi penelitian sastra kontemporer. Mengasah kemampuan komunikasi lintas budaya dan analisis kritis teks sastra maupun media digital.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { title: 'Penulisan Akademik', desc: 'Advanced essay & research composition' },
                    { title: 'Linguistik Terapan', desc: 'Phonology, morphology & discourse' },
                    { title: 'Studi Penerjemahan', desc: 'Literary & technical translation' },
                    { title: 'Metodologi Penelitian', desc: 'Quantitative & qualitative frameworks' }
                  ].map((mod, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-blue-950/30 to-black/40 border border-blue-200/20 p-2.5 rounded-xl hover:border-blue-200/40 transition-colors shadow-inner">
                      <div className="flex items-center space-x-1.5 text-[11px] font-semibold text-white mb-0.5">
                        <CheckCircle2 className="w-3 h-3 text-blue-200 shrink-0" />
                        <span>{mod.title}</span>
                      </div>
                      <p className="text-[10px] text-blue-100 font-mono pl-4.5">{mod.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>


          )}
          {/* ================= 2. BOOTCAMP PENGEMBANGAN WEB ================= */}
          {entryId === "bootcamp" && (
          <div className="relative bg-gradient-to-br from-white/[0.03] via-blue-950/20 to-black/40 border-t border-l border-white/25 border-b border-r border-blue-200/15 rounded-2xl p-4 sm:p-6 hover:border-white/40 transition-all duration-300 flex flex-col justify-between shadow-inner">
            
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blue-200/70"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blue-200/70"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-blue-200/70"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blue-200/70"></div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/15 shrink-0">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-blue-950/40 border border-blue-200/30 flex items-center justify-center shrink-0 shadow-inner">
                  <Code className="w-6 h-6 text-blue-200 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2 text-blue-200 font-mono text-[10px] tracking-widest mb-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-300"></span>
                    <span>INTENSIVE BOOTCAMP</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-wide text-white drop-shadow">
                    Pengembangan Web
                  </h2>
                  <p className="text-xs sm:text-sm text-blue-100 font-medium">
                    Haltev IT Learning Center
                  </p>
                </div>
              </div>

              <div className="bg-blue-950/40 border border-blue-200/30 px-3 py-1 rounded-xl text-xs font-mono text-blue-100 flex items-center space-x-2 shrink-0 shadow-inner">
                <span>2025 – 2026</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3 items-center">
              <div className="md:col-span-3 space-y-3">
                <div className="bg-gradient-to-r from-blue-950/30 to-black/40 border border-blue-200/20 rounded-xl p-3.5 shadow-inner">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-blue-200 mb-1.5 flex items-center space-x-2">
                    <FileText className="w-3.5 h-3.5 text-blue-200" />
                    <span>Skills & Technologies Mastered</span>
                  </h3>
                  <p className="text-xs text-white leading-relaxed">
                    HTML & CSS, JavaScript, React.js, Next.js, Laravel, Pengembangan REST API, Database MySQL, Git & GitHub, Deployment, Kolaborasi Tim Agile.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { title: 'Frontend Development', desc: 'HTML & CSS, JavaScript, React.js, Next.js' },
                    { title: 'Backend & API', desc: 'Laravel & REST API Development' },
                    { title: 'Database & Version Control', desc: 'MySQL Database, Git & GitHub' },
                    { title: 'Workflow & Deployment', desc: 'Deployment & Agile Team Collaboration' }
                  ].map((mod, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-blue-950/30 to-black/40 border border-blue-200/20 p-2.5 rounded-xl hover:border-blue-200/40 transition-colors shadow-inner">
                      <div className="flex items-center space-x-1.5 text-[11px] font-semibold text-white mb-0.5">
                        <CheckCircle2 className="w-3 h-3 text-blue-200 shrink-0" />
                        <span>{mod.title}</span>
                      </div>
                      <p className="text-[10px] text-blue-100 font-mono pl-4.5">{mod.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>


          )}
          {/* ================= 3. SMKN 2 KOTA BEKASI (TKJ) ================= */}
          {entryId === "school" && (
          <div className="relative bg-gradient-to-br from-white/[0.03] via-blue-950/20 to-black/40 border-t border-l border-white/25 border-b border-r border-blue-200/15 rounded-2xl p-4 sm:p-6 hover:border-white/40 transition-all duration-300 flex flex-col justify-between shadow-inner">
            
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-blue-200/70"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-blue-200/70"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-blue-200/70"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-blue-200/70"></div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-white/15 shrink-0">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-blue-950/40 border border-blue-200/30 flex items-center justify-center shrink-0 shadow-inner">
                  <Wrench className="w-6 h-6 text-blue-200 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center space-x-2 text-blue-200 font-mono text-[10px] tracking-widest mb-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-300"></span>
                    <span>VOCATIONAL HIGH SCHOOL</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold tracking-wide text-white drop-shadow">
                    Teknik Komputer dan Jaringan (TKJ)
                  </h2>
                  <p className="text-xs sm:text-sm text-blue-100 font-medium">
                    SMKN 2 Kota Bekasi
                  </p>
                </div>
              </div>

              <div className="bg-blue-950/40 border border-blue-200/30 px-3 py-1 rounded-xl text-xs font-mono text-blue-100 flex items-center space-x-2 shrink-0 shadow-inner">
                <span>2019 – 2022</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-3 items-center">
              <div className="md:col-span-3 space-y-3">
                <div className="bg-gradient-to-r from-blue-950/30 to-black/40 border border-blue-200/20 rounded-xl p-3.5 shadow-inner">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-blue-200 mb-1.5 flex items-center space-x-2">
                    <FileText className="w-3.5 h-3.5 text-blue-200" />
                    <span>Program Overview & Focus</span>
                  </h3>
                  <p className="text-xs text-white leading-relaxed">
                    Fokus pada dasar-dasar jaringan, pemeliharaan sistem, serta pemecahan masalah perangkat keras dan lunak komputer. Mempelajari konfigurasi perangkat jaringan dasar, troubleshooting sistem operasi, serta pemeliharaan infrastruktur IT.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    { title: 'Dasar Jaringan', desc: 'Routing, switching & cabling fundamentals' },
                    { title: 'Pemeliharaan Sistem', desc: 'OS configuration & maintenance' },
                    { title: 'Troubleshooting Hardware', desc: 'PC & network component repair' },
                    { title: 'Troubleshooting Software', desc: 'System diagnostics & error recovery' }
                  ].map((mod, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-blue-950/30 to-black/40 border border-blue-200/20 p-2.5 rounded-xl hover:border-blue-200/40 transition-colors shadow-inner">
                      <div className="flex items-center space-x-1.5 text-[11px] font-semibold text-white mb-0.5">
                        <CheckCircle2 className="w-3 h-3 text-blue-200 shrink-0" />
                        <span>{mod.title}</span>
                      </div>
                      <p className="text-[10px] text-blue-100 font-mono pl-4.5">{mod.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          )}

        </div>

        {/* BOTTOM STATUS BAR */}
        <div className="pt-2 border-t border-blue-200/20 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono text-blue-100 tracking-widest gap-1 shrink-0">
        </div>

        {/* Bottom edge reflection */}
        <div className="absolute bottom-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-blue-200/40 to-transparent"></div>
      </div>

    </div>
  );
}
