"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type Project = {
  id: string; 
  title: string; 
  subtitle: string;
  description: string;
  duration: string;
  language: string;
  framework: string;
  styling: string;
  hosting?: string;
  database?: string;
  difficulty: number;
  features: string[];
  images: string[];
  projectUrl: string | null;
  previewUrl?: string;
  status: "COMPLETED PROJECT" | "COMING SOON";
  details?: {
    explanation: string;
    challenge?: string;
    solution?: string;
    features: string[];
    role: string;
  };
};

const PROJECTS: Project[] = [
  {
    id: "pt-isa-building-workshop",  
    title: "PT ISA Building Workshop",
    subtitle: "COMPANY PROFILE WEBSITE",
    description: "A responsive website created to introduce the company, services, completed projects, and contact information through a clear and professional experience.",
    duration: "4 WEEKS",
    language: "TYPESCRIPT",
    framework: "NEXT.JS",
    styling: "TAILWIND CSS",
    difficulty: 3,
    features: ["RESPONSIVE", "SERVICES", "PROJECT GALLERY", "CONTACT"],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop",
    ],
    projectUrl: "https://ptisabuildingworkshop.vercel.app/",
    details: {
      explanation: "PT ISA Building Workshop is a company profile website designed to present the company identity, construction services, completed work, and contact information in one clear digital experience. The interface guides visitors from the main value proposition to service details, project proof, and a direct inquiry path while remaining comfortable to use across desktop and mobile devices.",
      challenge: "The main challenge was organizing a large amount of company information without making the page feel crowded. Each section also needed to build trust quickly and help potential clients find services, portfolio examples, and contact access with minimal effort.",
      solution: "The content was arranged as a focused one-page journey with strong visual hierarchy, reusable interface sections, responsive layouts, and smooth navigation. A consistent construction-oriented visual direction keeps the brand professional while clear calls to action lead visitors toward contacting the company.",
      features: [
        "Responsive hero section with a clear company introduction and primary call to action",
        "Structured services section that makes every offered service easy to understand",
        "Project portfolio showcase for presenting completed construction work",
        "Contact section and direct inquiry flow for prospective clients",
        "Responsive navigation and layout optimized for desktop, tablet, and mobile",
      ],
      role: "Handled the UI/UX direction, content hierarchy, responsive frontend development, reusable component implementation, and interaction details from initial layout through final deployment.",
    }, 
    status: "COMPLETED PROJECT",
  },
  { 
    id: "justwed-wedding-invitation",  
    title: "JustWed",
    subtitle: "DIGITAL WEDDING INVITATION",
    description: "A responsive digital wedding invitation that presents event information in an elegant format and lets guests leave comments in real time.",
    duration: "COMPLETED",
    language: "JAVASCRIPT",
    framework: "VANILLA JS",
    styling: "HTML · CSS",
    hosting: "HOSTINGER",
    database: "FIREBASE",
    difficulty: 3,
    features: ["RESPONSIVE", "WEDDING DETAILS", "REALTIME COMMENTS", "FIREBASE"],
    images: [
      "/images/projects/justwed/invitation.png",
      "/images/projects/justwed/gallery.png",
      "/images/projects/justwed/comments.png",
      "/images/projects/justwed/wedding-gift.png",
    ],
    projectUrl: "https://justwed.my.id/",
    previewUrl: "https://justwed.my.id/isi.html",
    details: {
      explanation: "JustWed is a digital wedding invitation built with HTML, CSS, and JavaScript. It provides guests with a convenient way to open the invitation, read the event information, explore the wedding content, and leave messages directly from their browser without installing an application.",
      challenge: "The experience needed to remain elegant and easy to use while loading reliably on different mobile devices. Guest comments also had to appear dynamically without requiring a manual page refresh.",
      solution: "The interface was developed with lightweight native web technologies and deployed through Hostinger. Firebase powers the realtime comment feature so new guest messages can be stored and displayed dynamically while the invitation remains responsive and accessible through a custom domain.",
      features: [
        "Responsive digital invitation for desktop and mobile devices",
        "Structured wedding and event information",
        "Realtime guest comments powered by Firebase",
        "Custom-domain deployment and hosting through Hostinger",
        "Lightweight implementation using native HTML, CSS, and JavaScript",
      ],
      role: "Handled the interface design, responsive HTML and CSS implementation, JavaScript interactions, Firebase realtime comment integration, and website deployment on Hostinger.",
    },
    status: "COMPLETED PROJECT" 
  },
  { 
    id: "coming-soon-03", 
    title: "COMING SOON", 
    subtitle: "FUTURE CONCEPT",
    description: "Another exciting concept slated for release later this season with advanced animation frameworks.",
    duration: "TBD",
    language: "TYPESCRIPT",
    framework: "REACT",
    styling: "TAILWIND CSS",
    difficulty: 5,
    features: ["ANIMATION", "3D WEB", "EXPERIMENT"],
    images: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop",
    ],
    projectUrl: null, 
    status: "COMING SOON" 
  },
];

const PT_ISA_PREVIEW_SECTIONS = [
  { id: "home", label: "HERO" },
  { id: "services", label: "SERVICES" },
  { id: "portfolio", label: "PORTFOLIO" },
  { id: "contact", label: "CONTACT" },
] as const;

const JUSTWED_PREVIEW_SECTIONS = [
  { id: ":~:text=We%20are%20getting%20married!", label: "INVITATION" },
  { id: ":~:text=Our%20Moment", label: "GALLERY" },
  { id: ":~:text=Harapan%20%26%20Doa", label: "COMMENTS" },
  { id: ":~:text=Wedding%20Gift", label: "WEDDING GIFT" },
] as const;

export default function Portfolio() {
  const [index, setIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState(0); 
  const [detailTerbuka, setDetailTerbuka] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>();
  
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sedangBeranimasiRef = useRef(false);
  const project = PROJECTS[index];

  const pindahProject = useCallback((arah: -1 | 1) => {
    if (sedangBeranimasiRef.current) return;
    sedangBeranimasiRef.current = true;
    
    setIndex((nilai) => (nilai + arah + PROJECTS.length) % PROJECTS.length);
    setCardIndex(0); 
    
    setTimeout(() => {
      sedangBeranimasiRef.current = false;
    }, 350);
  }, []);

  const handleCardClick = (targetCardIdx: number) => {
    setCardIndex(targetCardIdx);
  };

  const handleWaterClick = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newRipple = { id: Date.now(), x, y };
    setRipples((prev: any) => [...(prev || []).slice(-5), newRipple]);
  };

  useEffect(() => {
    const navigasiKeyboard = (event: KeyboardEvent) => {
      if (detailTerbuka || !sectionRef.current) return;
      const posisi = sectionRef.current.getBoundingClientRect();
      if (posisi.bottom <= 0 || posisi.top >= innerHeight) return;
      if (event.key === "ArrowLeft") pindahProject(-1);
      if (event.key === "ArrowRight") pindahProject(1);
    };
    addEventListener("keydown", navigasiKeyboard);
    return () => removeEventListener("keydown", navigasiKeyboard);
  }, [detailTerbuka, pindahProject]);

  return (
    <section 
      ref={sectionRef} 
      id="portfolio" 
      onClick={handleWaterClick}
      className="portfolio-page relative isolate flex min-h-screen cursor-pointer select-none flex-col items-center justify-between overflow-hidden bg-[#020617] px-4 py-6 text-white sm:px-8 lg:h-dvh lg:min-h-0 lg:px-12 lg:py-4" 
      aria-labelledby="portfolio-title"
    >
      
      {/* CSS Animasi Air, Teratai, Riak, & Sci-Fi HUD */}
      <style>{`
        @keyframes rippleWave {
          0% { transform: scale(0.8) translate(0, 0); opacity: 0.7; }
          28% { opacity: 0.46; }
          57% { opacity: 0.24; }
          79% { opacity: 0.08; }
          100% { transform: scale(2.5) translate(var(--ripple-x), var(--ripple-y)); opacity: 0; }
        }
        @keyframes surfaceShimmer {
          0%, 100% { opacity: 0.4; transform: translateY(0) scale(1); }
          50% { opacity: 0.7; transform: translateY(-8px) scale(1.02); }
        }
        @keyframes bgWaterRefract {
          0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.4; }
          50% { transform: scale(1.15) translate(-15px, 15px); opacity: 0.75; }
        }
        @keyframes floatLotus {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(2deg); }
        }
        @keyframes clickRipple {
          0% { width: 0px; height: 0px; opacity: 0.8; transform: translate(-50%, -50%) scale(0.5); }
          100% { width: 180px; height: 180px; opacity: 0; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes objectRipple {
          0% { transform: translate(-50%, -50%) scale(0.28); opacity: 0; }
          12% { opacity: 0.55; }
          55% { opacity: 0.2; }
          100% { transform: translate(-50%, -50%) scale(2.15); opacity: 0; }
        }
        @keyframes paginationBloom {
          0% { transform: scale(0.28) rotate(-14deg); opacity: 0.35; filter: brightness(0.65); }
          62% { transform: scale(1.16) rotate(5deg); opacity: 1; filter: brightness(1.08); }
          82% { transform: scale(0.94) rotate(-2deg); }
          100% { transform: scale(1) rotate(0deg); opacity: 1; filter: brightness(0.9); }
        }
        @keyframes paginationBudSway {
          0%, 100% { transform: rotate(-3deg) translateY(0); }
          50% { transform: rotate(3deg) translateY(-1px); }
        }
        .water-pool-bg {
          background: radial-gradient(
            ellipse at 50% 25%,
            rgba(56, 189, 248, 0.55) 0%,
            rgba(3, 105, 161, 0.75) 38%,
            rgba(2, 45, 72, 0.9) 70%,
            #010d18 100%
          );
        }
        .bg-water-reflection {
          position: absolute;
          width: 140%;
          height: 140%;
          top: -20%;
          left: -20%;
          background: radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.4) 0%, rgba(14, 116, 144, 0.25) 40%, transparent 70%);
          animation: bgWaterRefract 8s ease-in-out infinite;
          mix-blend-mode: screen;
          pointer-events: none;
          z-index: 1;
        }
        .ripple-ring {
          position: absolute;
          border: 1.5px solid rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          animation-name: rippleWave;
          animation-timing-function: cubic-bezier(0.14, 0.38, 0.24, 1);
          animation-iteration-count: infinite;
          pointer-events: none;
        }
        .ripple-ring:nth-child(1) { --ripple-x: -18px; --ripple-y: 13px; animation-duration: 7.4s; animation-delay: -1.1s; }
        .ripple-ring:nth-child(2) { --ripple-x: 9px; --ripple-y: 17px; animation-duration: 8.65s; animation-delay: -5.3s; }
        .ripple-ring:nth-child(3) { --ripple-x: -7px; --ripple-y: 10px; animation-duration: 10.1s; animation-delay: -8.2s; }
        .water-shimmer { animation: surfaceShimmer 7s ease-in-out infinite; }
        .floating-lotus { animation: floatLotus 5s ease-in-out infinite; }
        .object-ripple {
          position: absolute; left: 50%; top: 55%; width: 88%; aspect-ratio: 1/1;
          border: 1px solid rgba(224, 242, 254, 0.56); border-radius: 999px;
          box-shadow: 0 0 8px rgba(125, 211, 252, 0.2);
          animation: objectRipple var(--object-ripple-duration, 7.4s) cubic-bezier(0.14, 0.38, 0.24, 1) infinite;
          animation-delay: var(--object-ripple-delay, 0s); pointer-events: none;
        }
        .pagination-flower-open {
          animation: paginationBloom 620ms cubic-bezier(0.16, 1, 0.3, 1) both;
          transform-origin: center bottom;
        }
        .pagination-flower-bud {
          animation: paginationBudSway 2.8s ease-in-out infinite;
          transform-origin: center bottom;
        }
        @media (prefers-reduced-motion: reduce) {
          .pagination-flower-open, .pagination-flower-bud, .bg-water-reflection { animation: none; }
        }
        .click-ripple-effect {
          position: absolute; border: 2px solid rgba(255, 255, 255, 0.8); border-radius: 50%;
          animation: clickRipple 0.8s ease-out forwards; pointer-events: none;
        }

        {/* HUD Sci-Fi Border Style */}
        .sci-fi-hud-box {
          position: relative;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(2, 132, 199, 0.05) 50%, rgba(3, 7, 18, 0.85) 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 2.5px solid rgba(56, 189, 248, 0.7);
          box-shadow: 0 0 50px rgba(56, 189, 248, 0.5), inset 0 0 25px rgba(56, 189, 248, 0.3);
          border-radius: 22px;
        }
        .sci-fi-hud-box::before, .sci-fi-hud-box::after {
          content: "";
          position: absolute;
          width: 18px;
          height: 18px;
          border-color: #38bdf8;
          border-style: solid;
          pointer-events: none;
        }
        .sci-fi-hud-box::before { top: -3px; left: -3px; border-width: 4px 0 0 4px; }
        .sci-fi-hud-box::after { bottom: -3px; right: -3px; border-width: 0 4px 4px 0; }
      `}</style>

      {/* LAYER 1: DASAR KOLAM AIR */}
      <div className="pointer-events-none absolute inset-0 water-pool-bg" />

      {/* PANTULAN CAHAYA AIR */}
      <div className="bg-water-reflection" />

      {/* LAYER 3: RIAK AIR LATAR BELAKANG */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden flex items-center justify-center opacity-45">
        <div className="ripple-ring w-[400px] h-[400px]" />
        <div className="ripple-ring w-[700px] h-[700px]" />
        <div className="ripple-ring w-[1000px] h-[1000px]" />
      </div>

      {/* LAYER 4: DAUN TERATAI & BUNGA TERATAI MENGAPUNG (LENGKAP) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="floating-lotus absolute top-[8%] left-[6%] size-24 opacity-85 lg:size-28 [--object-ripple-delay:-2.1s] [--object-ripple-duration:7.4s]">
          <span className="object-ripple" />
          <Image src="/images/flower/leaf.png" alt="" fill sizes="112px" className="relative z-10 object-contain brightness-[0.78] saturate-90 drop-shadow-[0_10px_14px_rgba(0,0,0,0.42)]" />
        </div>
        <div className="floating-lotus absolute right-[7%] bottom-[6%] size-36 opacity-95 lg:size-44 [--object-ripple-delay:-5.3s] [--object-ripple-duration:8.65s]">
          <span className="object-ripple" />
          <Image src="/images/flower/leaf.png" alt="" fill sizes="176px" className="relative z-10 object-contain brightness-[0.78] saturate-90 drop-shadow-[0_12px_18px_rgba(0,0,0,0.48)]" />
          <div className="absolute -top-[28%] left-1/2 z-20 size-[78%] -translate-x-1/2">
            <Image src="/images/flower/water%20lily.png" alt="" fill sizes="138px" className="object-contain brightness-[0.82] saturate-90 drop-shadow-[0_0_12px_rgba(244,114,182,0.28)]" />
          </div>
        </div>
        <div className="floating-lotus absolute bottom-[15%] left-[10%] size-16 opacity-75 lg:size-20 [--object-ripple-delay:-8.2s] [--object-ripple-duration:10.1s]" style={{ animationDelay: '1s' }}>
          <span className="object-ripple" />
          <Image src="/images/flower/leaf.png" alt="" fill sizes="80px" className="relative z-10 object-contain brightness-[0.78] saturate-90 drop-shadow-[0_8px_12px_rgba(0,0,0,0.4)]" />
        </div>
      </div>

      {/* LAYER 5: KILAU PERMUKAAN PUTIH */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/30 via-sky-300/10 to-transparent water-shimmer" />

      {/* EFEK RIAK KLIK */}
      {ripples?.map((r) => (
        <span key={r.id} className="click-ripple-effect" style={{ left: r.x, top: r.y }} />
      ))}

      {/* KONTEN UTAMA FULL LAYAR */}
      <div className="portfolio-content relative z-10 mx-auto flex h-full min-h-0 w-full max-w-[100rem] flex-col items-center justify-center lg:origin-center">
        
        {/* Header Title */}
        <header className="shrink-0 pb-1 pt-2 text-center lg:pb-1">
          <h2 id="portfolio-title" className="font-['Great_Vibes','Segoe_Script',cursive] text-4xl sm:text-5xl font-normal text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.8)]">Portfolio</h2>
        </header>

        {/* GRID UTAMA DIPERBESAR MAKSIMAL SATU LAYAR */}
        <div ref={contentRef} className="portfolio-grid relative my-auto grid w-full grid-cols-1 items-center gap-6 transition-all duration-300 lg:my-0 lg:h-[min(68vh,620px)] lg:min-h-0 lg:flex-none lg:grid-cols-[1fr_2fr_1fr] lg:grid-rows-[minmax(0,1fr)] lg:gap-8">
          
          {/* KOLOM KIRI: Info Proyek */}
          <div className="flex flex-col justify-center text-left space-y-4 px-4 lg:px-4">
            <div className="inline-flex items-center gap-2">
            </div>
            <h3 className="text-3xl sm:text-5xl font-serif tracking-tight text-white drop-shadow-md">
              {project.title} 
              {/* <span className="font-['Great_Vibes','Segoe_Script',cursive] text-cyan-200 text-4xl sm:text-6xl">{project.title.split(" ").slice(1).join(" ")}</span> */}
            </h3>
            <p className="font-mono text-xs sm:text-sm tracking-widest text-cyan-100/90 uppercase">{project.subtitle}</p>
            <p className="text-sm sm:text-base leading-relaxed text-slate-100 font-light">{project.description}</p>
            
            <div className="pt-2 flex flex-wrap gap-2">
              {project.features.map((feat, i) => (
                <span key={i} className="rounded-full border border-white/40 bg-white/10 px-3.5 py-1.5 font-mono text-[10px] tracking-wider text-cyan-100 backdrop-blur-md shadow-sm">
                  {feat}
                </span>
              ))}
            </div>
          </div>

          {/* KOLOM TENGAH: CARD UTAMA DIPERBESAR (MAKSIMAL FULL SCREEN) */}
          <div className="portfolio-cards relative mx-auto flex h-[380px] w-full max-w-[840px] select-none items-center justify-center sm:h-[480px] lg:h-full lg:min-h-0 lg:max-h-[560px]">
    <style>{`
        @keyframes floatCenter {
            0%, 100% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
            50% { transform: translate(0px, -10px) scale(1) rotate(1deg); }
        }
        @keyframes floatLeft {
            0%, 100% { transform: translate(var(--card-left-offset, -170px), 15px) scale(0.8) rotate(-6deg); }
            50% { transform: translate(var(--card-left-offset, -170px), 8px) scale(0.8) rotate(-4.5deg); }
        }
        @keyframes floatRight {
            0%, 100% { transform: translate(var(--card-right-offset, 170px), 15px) scale(0.8) rotate(6deg); }
            50% { transform: translate(var(--card-right-offset, 170px), 8px) scale(0.8) rotate(4.5deg); }
        }
        .animate-float-center {
            animation: floatCenter 5s ease-in-out infinite;
        }
        .animate-float-left {
            animation: floatLeft 6s ease-in-out infinite;
        }
        .animate-float-right {
            animation: floatRight 5.5s ease-in-out infinite;
        }
    `}</style>

    {project.images.map((imgUrl, idx) => {
        const isCenter = idx === cardIndex;
        const isLeft = idx === (cardIndex - 1 + project.images.length) % project.images.length;
        const isRight = idx === (cardIndex + 1) % project.images.length;
        const previewSection = project.id === "pt-isa-building-workshop"
          ? PT_ISA_PREVIEW_SECTIONS[idx]
          : project.id === "justwed-wedding-invitation"
            ? JUSTWED_PREVIEW_SECTIONS[idx]
            : null;

        if (!isCenter && !isLeft && !isRight) return null;

        let zIndexVal = 30;
        let opacityVal = 1;
        let floatClass = "animate-float-center";
        let filterVal = "none";

        if (isLeft) {
            zIndexVal = 10;
            opacityVal = 0.55;
            floatClass = "animate-float-left";
            filterVal = "blur(1.5px) brightness(0.6)";
        } else if (isRight) {
            zIndexVal = 10;
            opacityVal = 0.55;
            floatClass = "animate-float-right";
            filterVal = "blur(1.5px) brightness(0.6)";
        }

        return (
            <div
                key={idx}
                onClick={(e) => {
                    e.stopPropagation();
                    handleCardClick(idx);
                }}
                style={{
                    zIndex: zIndexVal,
                    opacity: opacityVal,
                    filter: filterVal,
                }}
                className={`absolute transition-all duration-500 ease-out cursor-pointer bg-white text-slate-900 shadow-2xl flex flex-col justify-between ${floatClass} ${
                    isCenter 
                        ? "aspect-[1/1.25] h-[86%] w-auto max-w-[min(72vw,480px)] p-4 sm:p-5 pb-8 sm:pb-10 rounded-sm" 
                        : "aspect-[1/1.25] h-[70%] w-auto max-w-[min(50vw,350px)] p-3 pb-6 rounded-sm"
                }`}
            >
                {/* Area Foto di dalam bingkai putih */}
                <div className="relative h-[89%] w-full overflow-hidden bg-slate-950 shadow-inner">
                    {project.id === "pt-isa-building-workshop" && previewSection && project.projectUrl ? (
                        <iframe
                            src={previewSection.id
                              ? `${project.previewUrl ?? project.projectUrl}#${previewSection.id}`
                              : (project.previewUrl ?? project.projectUrl)}
                            title={`Preview ${previewSection.label} — ${project.title}`}
                            loading={isCenter ? "eager" : "lazy"}
                            tabIndex={-1}
                            className="pointer-events-none absolute top-0 left-0 h-[400%] w-[400%] origin-top-left border-0 [transform:scale(0.25)]"
                        />
                    ) : (
                        <img src={imgUrl} alt="" className="h-full w-full object-cover object-top" />
                    )}
                </div>

                {/* Bagian Bawah Polaroid (Ruang Tulisan) */}
                <div className="flex items-center justify-between pt-3 px-1 font-mono">
                    <span className="text-[10px] sm:text-sm font-bold tracking-widest text-slate-800">
                        {String(index + 1).padStart(2, "0")} — {previewSection?.label ?? `MEMORY 0${idx + 1}`}
                    </span>
                </div>
            </div>
        );
    })}
</div>

          {/* KOLOM KANAN: Spesifikasi & Tombol Aksi */}
          <div className="flex flex-col justify-center text-left space-y-6 px-4 lg:px-4">
            <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/30 font-mono">
              <div>
                <p className="text-[10px] text-cyan-200 tracking-wider mb-1">LANGUAGE</p>
                <p className="text-sm font-semibold text-white">{project.language}</p>
              </div>
              <div>
                <p className="text-[10px] text-cyan-200 tracking-wider mb-1">FRAMEWORK</p>
                <p className="text-sm font-semibold text-cyan-300">{project.framework}</p>
              </div>
              {project.hosting && (
                <div>
                  <p className="mb-1 text-[10px] tracking-wider text-cyan-200">HOSTING</p>
                  <p className="text-sm font-semibold text-white">{project.hosting}</p>
                </div>
              )}
              {project.database && (
                <div>
                  <p className="mb-1 text-[10px] tracking-wider text-cyan-200">REALTIME DATA</p>
                  <p className="text-sm font-semibold text-cyan-300">{project.database}</p>
                </div>
              )}
            </div>

            <div className="space-y-3 font-mono">
              <p className="text-[10px] text-cyan-200 tracking-widest">DIFFICULTY LEVEL</p>
              <div className="flex items-center gap-2 text-cyan-300">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className={`size-3 rotate-45 border border-white ${star <= project.difficulty ? "bg-white shadow-[0_0_12px_#fff]" : "bg-transparent"}`} />
                ))}
                <span className="ml-2 text-sm text-white font-semibold">{project.difficulty === 3 ? "INTERMEDIATE" : "ADVANCED"}</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {project.projectUrl ? (
                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-mono text-xs tracking-widest text-slate-950 font-bold shadow-[0_0_25px_rgba(255,255,255,0.6)] transition-all hover:bg-cyan-200">
                  VIEW PROJECT →
                </a>
              ) : (
                <div className="inline-flex items-center justify-center rounded-xl bg-slate-900/80 px-6 py-3.5 font-mono text-xs tracking-widest text-slate-400 border border-white/30">
                  COMING SOON
                </div>
              )}
              <button type="button" onClick={() => setDetailTerbuka(true)} className="cursor-pointer inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/[0.08] px-6 py-3.5 font-mono text-xs tracking-widest text-cyan-100 backdrop-blur-md transition-all hover:bg-white/20">
                DETAILS
              </button>
            </div>
          </div>

        </div>

        {/* Navigasi Pagination Bawah */}
      <div className="flex shrink-0 items-center justify-center gap-6 pb-2 pt-3 font-mono text-xs tracking-[0.2em] text-cyan-200 lg:pt-4">
    {/* Tombol Navigasi Kiri */}
    <button 
        type="button" 
        aria-label="Project sebelumnya" 
        onClick={() => pindahProject(-1)} 
        className="group relative flex size-10 cursor-pointer items-center justify-center transition-transform hover:scale-110 active:scale-95"
    >
        <span className="absolute inset-0 rounded-full bg-cyan-950/60 border border-cyan-400/40 backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all group-hover:bg-cyan-900/80 group-hover:border-cyan-300" />
        <span className="relative z-10 text-cyan-200 text-base font-bold group-hover:text-white pb-0.5">‹</span>
    </button>

    {/* Bunga mekar untuk project aktif, kuncup untuk project lainnya */}
    <div className="flex items-end gap-3 px-4 py-1.5">
        {PROJECTS.map((projectItem, idx) => {
            const isActive = idx === index;
            return (
                <button
                    key={projectItem.id}
                    type="button"
                    aria-label={`Pindah ke project 0${idx + 1}`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={(event) => {
                        event.stopPropagation();
                        if (sedangBeranimasiRef.current) return;
                        sedangBeranimasiRef.current = true;
                        setIndex(idx);
                        setCardIndex(0);
                        setTimeout(() => {
                            sedangBeranimasiRef.current = false;
                        }, 350);
                    }}
                    className="group relative grid size-9 cursor-pointer place-items-center border-0 bg-transparent p-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-cyan-200/80"
                >
                    {isActive ? (
                        <span className="pagination-flower-open relative block size-9">
                            <Image
                                src="/images/flower/water%20lily.png"
                                alt=""
                                fill
                                sizes="36px"
                                className="object-contain drop-shadow-[0_0_8px_rgba(244,114,182,0.5)]"
                            />
                        </span>
                    ) : (
                        <span className="pagination-flower-bud relative block size-7 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110">
                            <Image
                                src="/images/flower/flower%20kuncup.png"
                                alt=""
                                fill
                                sizes="28px"
                                className="object-contain brightness-90 drop-shadow-[0_0_6px_rgba(244,114,182,0.35)]"
                            />
                        </span>
                    )}
                </button>
            );
        })}
    </div>

    {/* Tombol Navigasi Kanan */}
    <button 
        type="button" 
        aria-label="Project berikutnya" 
        onClick={() => pindahProject(1)} 
        className="group relative flex size-10 cursor-pointer items-center justify-center transition-transform hover:scale-110 active:scale-95"
    >
        <span className="absolute inset-0 rounded-full bg-cyan-950/60 border border-cyan-400/40 backdrop-blur-md shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all group-hover:bg-cyan-900/80 group-hover:border-cyan-300" />
        <span className="relative z-10 text-cyan-200 text-base font-bold group-hover:text-white pb-0.5">›</span>
    </button>
</div>

      </div>

      {/* Modal Detail */}
      {detailTerbuka && project.details && <Modal project={project} tutup={() => setDetailTerbuka(false)} />}
    </section>
  );
}

function Arrow({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) { 
  return (
    <button 
      type="button" 
      aria-label={label} 
      onClick={onClick} 
      className="cursor-pointer border border-white/50 bg-slate-950/70 size-10 rounded-full grid place-items-center text-white transition-all hover:bg-white hover:text-slate-950 hover:border-white shadow-[0_0_15px_rgba(255,255,255,0.4)] backdrop-blur-md text-lg leading-none pb-1"
    >
      {children}
    </button>
  ); 
}

function Modal({ project, tutup }: { project: Project; tutup: () => void }) {
  useEffect(() => {
    const escape = (event: KeyboardEvent) => event.key === "Escape" && tutup();
    addEventListener("keydown", escape); 
    document.body.style.overflow = "hidden";
    return () => { 
      removeEventListener("keydown", escape); 
      document.body.style.overflow = ""; 
    };
  }, [tutup]);

  if (!project.details) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto overscroll-contain bg-slate-950/80 p-4 backdrop-blur-xl md:items-center" role="dialog" aria-modal="true" onMouseDown={(event) => event.target === event.currentTarget && tutup()}>
      <div className="relative my-auto grid w-full max-w-5xl overflow-visible rounded-2xl border border-white/40 bg-slate-950/90 p-2 shadow-[0_25px_70px_rgba(0,0,0,0.8)] backdrop-blur-2xl md:h-[92dvh] md:max-h-[850px] md:grid-cols-[1.05fr_1fr] md:grid-rows-[minmax(0,1fr)] md:overflow-hidden">
        <button type="button" onClick={tutup} aria-label="Tutup detail" className="absolute top-4 right-4 z-20 grid h-8 w-8 cursor-pointer place-items-center rounded-full border border-white/40 bg-slate-950 text-white hover:bg-white hover:text-slate-950 transition-all">✕</button>
        
        <div className="relative min-h-[280px] overflow-hidden rounded-xl bg-slate-950 md:min-h-full">
          {project.projectUrl ? (
            <iframe
              src={project.id === "pt-isa-building-workshop"
                ? `${project.projectUrl}#home`
                : (project.previewUrl ?? project.projectUrl)}
              title={`Live preview ${project.title}`}
              loading="eager"
              tabIndex={-1}
              className="pointer-events-none absolute inset-0 h-full w-full border-0 bg-slate-950"
            />
          ) : project.images[0] ? (
            <img src={project.images[0]} alt={`Preview ${project.title}`} className="h-full w-full object-cover object-top" />
          ) : (
            <div className="grid h-full place-items-center font-mono text-xs tracking-[0.25em] text-cyan-200">PREVIEW COMING SOON</div>
          )}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between bg-gradient-to-b from-slate-950/85 to-transparent px-4 pb-8 pt-3 font-mono text-[9px] tracking-[0.2em] text-cyan-100">
            <span>LIVE WEBSITE PREVIEW</span>
            <span>HOME</span>
          </div>
        </div>

        <div className="flex min-h-0 flex-col justify-between overflow-visible p-6 pb-8 sm:p-8 md:h-full md:overflow-y-auto md:overscroll-contain md:pb-10">
          <div>
            <h3 className="mt-2 text-2xl font-bold text-white">{project.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-200 font-light">{project.details.explanation}</p>

            {project.details.challenge && (
              <div className="mt-5">
                <p className="mb-1 font-mono text-[10px] tracking-[0.2em] text-cyan-300">THE CHALLENGE</p>
                <p className="text-xs leading-relaxed text-slate-300">{project.details.challenge}</p>
              </div>
            )}

            {project.details.solution && (
              <div className="mt-4">
                <p className="mb-1 font-mono text-[10px] tracking-[0.2em] text-cyan-300">THE SOLUTION</p>
                <p className="text-xs leading-relaxed text-slate-300">{project.details.solution}</p>
              </div>
            )}
            
            <p className="mt-5 mb-2 font-mono text-[10px] tracking-[0.2em] text-cyan-300">KEY FEATURES</p>
            <ul className="space-y-2 text-sm text-slate-200">
              {project.details.features.map((fitur) => (
                <li key={fitur} className="flex items-center gap-2 font-mono text-xs">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>{fitur}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 grid gap-4 border-t border-white/15 pt-4 sm:grid-cols-2">
              <div>
                <p className="mb-2 font-mono text-[10px] tracking-[0.2em] text-cyan-300">TECHNOLOGY</p>
                <p className="text-xs leading-relaxed text-slate-200">
                  {[project.language, project.framework, project.styling, project.hosting, project.database].filter(Boolean).join(" · ")}
                </p>
              </div>
              <div>
                <p className="mb-2 font-mono text-[10px] tracking-[0.2em] text-cyan-300">MY ROLE</p>
                <p className="text-xs leading-relaxed text-slate-200">{project.details.role}</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/20">
            <a href={project.projectUrl ?? undefined} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-mono text-xs tracking-wider text-slate-950 font-bold transition-all hover:bg-cyan-200 shadow-[0_0_15px_rgba(255,255,255,0.5)]">
              OPEN LIVE PROJECT →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
