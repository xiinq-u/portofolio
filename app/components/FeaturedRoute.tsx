"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

type FeaturedProject = {
    title: string;
    accentTitle: string;
    category: string;
    description: string;
};

const FEATURED_PROJECTS: FeaturedProject[] = [
    { title: "The Digital", accentTitle: "Journey", category: "UI/UX DESIGN · WEB DEVELOPMENT", description: "Turning ideas into thoughtful digital experiences." },
];

function scrollKeSection(id: "projects" | "about") {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function FeaturedRoute() {
    const router = useRouter();
    const [projectAktif, setProjectAktif] = useState(0);
    const [terlihat, setTerlihat] = useState(false);
    const [kontenTerlihat, setKontenTerlihat] = useState(true);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const project = FEATURED_PROJECTS[projectAktif];

    useEffect(() => {
        const frame = requestAnimationFrame(() => setTerlihat(true));
        return () => cancelAnimationFrame(frame);
    }, []);

    useEffect(() => () => {
        if (timerRef.current) clearTimeout(timerRef.current);
    }, []);

    const pindahProject = (arah: -1 | 1) => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setKontenTerlihat(false);
        timerRef.current = setTimeout(() => {
            setProjectAktif((index) => (index + arah + FEATURED_PROJECTS.length) % FEATURED_PROJECTS.length);
            requestAnimationFrame(() => setKontenTerlihat(true));
        }, 180);
    };

    return (
<section
    className={`fixed top-1/2 right-[max(72px,calc(50%-88.8889vh+72px))] z-40 w-[min(350px,calc(50vw-80px))] min-w-[290px] bg-transparent pt-7 pr-[38px] pb-6 pl-2 text-white transition-all duration-700 ease-out max-[1100px]:right-[max(38px,calc(50%-88.8889vh+38px))] max-[1100px]:w-[300px] max-[1100px]:min-w-0 max-[1100px]:pr-[30px] [@media(orientation:landscape)_and_(max-height:500px)]:right-[max(18px,calc(50%-88.8889vh+18px))] [@media(orientation:landscape)_and_(max-height:500px)]:w-[250px] [@media(orientation:landscape)_and_(max-height:500px)]:origin-right [@media(orientation:landscape)_and_(max-height:500px)]:px-1 [@media(orientation:landscape)_and_(max-height:500px)]:py-3 ${terlihat ? "translate-y-[-46%] opacity-100 [@media(orientation:landscape)_and_(max-height:500px)]:translate-y-[-43%] [@media(orientation:landscape)_and_(max-height:500px)]:scale-[0.84]" : "translate-y-[calc(-46%+24px)] opacity-0 [@media(orientation:landscape)_and_(max-height:500px)]:translate-y-[calc(-43%+18px)] [@media(orientation:landscape)_and_(max-height:500px)]:scale-[0.84]"}`}
    aria-labelledby="featured-route-title"
>
    {/* Gradien Radial Tengah (Smooth & Bebas Kotak) */}
    <div 
        className="pointer-events-none absolute -inset-10 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(2,10,25,0.75)_0%,rgba(2,10,25,0.35)_50%,transparent_80%)] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]" 
        aria-hidden="true" 
    />

    {/* Garis Cahaya Menyilang Terang & Burung Putih Dua Lengkungan */}
    <div className="pointer-events-none absolute -inset-x-8 -inset-y-6 overflow-visible" aria-hidden="true">
        {/* Garis Terang Menyilang */}
        <span className="absolute top-[15%] right-[10px] h-px w-[130px] origin-right -rotate-[32deg] bg-linear-to-r from-transparent via-sky-300 to-white shadow-[0_0_10px_rgba(56,189,248,0.9)]" />
        <span className="absolute right-[10px] bottom-[20%] h-px w-[130px] origin-right rotate-[28deg] bg-linear-to-r from-transparent via-sky-300 to-white shadow-[0_0_10px_rgba(56,189,248,0.9)]" />

        {/* Siluet Burung Putih (Masing-masing memiliki dua lengkungan sayap yang elegan) */}
        <svg
            className="absolute top-[18px] right-[14px] w-24 h-11 text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]"
            viewBox="0 0 130 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* Burung 1 (Kiri - Dua Lengkungan Sayap) */}
            <path d="M 12 32 Q 18 20 24 28 Q 30 20 36 34" />
            
            {/* Burung 2 (Tengah - Terpisah Jauh & Dua Lengkungan Sayap) */}
            <path d="M 52 24 Q 58 12 64 20 Q 70 12 76 26" />
            
            {/* Burung 3 (Kanan - Terpisah Jauh & Dua Lengkungan Sayap) */}
            <path d="M 94 28 Q 100 18 106 24 Q 112 18 118 30" />
        </svg>
    </div>

    {/* Konten Utama Teks (Font Asli Dipertahankan) */}
    <div className={`transition-all duration-300 ${kontenTerlihat ? "translate-x-0 opacity-100" : "translate-x-3 opacity-0"}`}>
        <p className="mb-[19px] font-serif text-[9px] tracking-[0.36em] text-sky-200/80 [@media(orientation:landscape)_and_(max-height:500px)]:mb-2.5 [@media(orientation:landscape)_and_(max-height:500px)]:text-[7px]"></p>

        <h2 id="featured-route-title" className="m-0 flex flex-col font-serif text-[clamp(34px,3vw,52px)] leading-[0.88] font-normal tracking-[-0.035em] drop-shadow-[0_3px_18px_rgba(0,0,0,0.48)] max-[1100px]:text-[38px] [@media(orientation:landscape)_and_(max-height:500px)]:text-[34px]">
            <span>{project.title}</span>
            <span className="mt-[5px] font-['Great_Vibes','Segoe_Script',cursive] text-[1.28em] tracking-[0.015em] text-[#d9f6ff] drop-shadow-[0_0_15px_rgba(125,211,252,0.35)]">{project.accentTitle}</span>
        </h2>

        <p className="mt-[23px] text-[15px] leading-[1.6] tracking-[0.2em] text-sky-200/75 [@media(orientation:landscape)_and_(max-height:500px)]:mt-[13px] [@media(orientation:landscape)_and_(max-height:500px)]:text-[6px]">{project.category}</p>
        <p className="mt-[11px] max-w-[285px] font-serif text-[13px] leading-[1.65] text-slate-50/80 max-[1100px]:max-w-[245px] max-[1100px]:text-xs [@media(orientation:landscape)_and_(max-height:500px)]:mt-1.5 [@media(orientation:landscape)_and_(max-height:500px)]:text-[10px] [@media(orientation:landscape)_and_(max-height:500px)]:leading-[1.45]">{project.description}</p>

        <div className="mt-[25px] flex flex-col items-start gap-[13px] [@media(orientation:landscape)_and_(max-height:500px)]:mt-3.5 [@media(orientation:landscape)_and_(max-height:500px)]:gap-2">
            <RouteButton utama onClick={() => router.push("/portfolio")}>VIEW PROJECT</RouteButton>
            <RouteButton onClick={() => scrollKeSection("about")}>DISCOVER PROFILE</RouteButton>
        </div>
    </div>

    {/* Navigasi Indikator Project */}
    <div className="mt-7 flex items-center gap-3 font-serif text-[9px] tracking-[0.14em] text-slate-200/70 [@media(orientation:landscape)_and_(max-height:500px)]:mt-[13px]" aria-label="Navigasi featured project">
        <NavigationButton label="Project sebelumnya" onClick={() => pindahProject(-1)}>‹</NavigationButton>
        <span>{String(projectAktif + 1).padStart(2, "0")} / {String(FEATURED_PROJECTS.length).padStart(2, "0")}</span>
        <NavigationButton label="Project berikutnya" onClick={() => pindahProject(1)}>›</NavigationButton>
    </div>

    {/* Garis Indikator Samping dengan Berlian */}
    <div className="absolute top-[4%] right-0 h-[92%] w-px bg-linear-to-b from-transparent via-cyan-300/60 to-transparent shadow-[0_0_8px_rgba(34,211,238,0.25)]" aria-hidden="true">
        <span className="absolute top-[calc(44%-7px)] right-[15px] font-serif text-[10px] tracking-[0.16em] text-sky-100/60">{String(projectAktif + 1).padStart(2, "0")}</span>
        <span className="absolute top-[44%] left-1/2 h-[9px] w-[9px] -translate-1/2 rotate-45 border border-cyan-100/90 bg-sky-950/80 shadow-[0_0_12px_rgba(34,211,238,0.5)] motion-safe:animate-pulse" />
    </div>

    {/* Titik Cahaya Kilau */}
    <span className="absolute top-[12%] right-[22px] h-[3px] w-[3px] rounded-full bg-sky-100 shadow-[0_0_8px_rgba(103,232,249,0.7)]" aria-hidden="true" />
    <span className="absolute right-10 bottom-[10%] h-[3px] w-[3px] rounded-full bg-sky-100 shadow-[0_0_8px_rgba(103,232,249,0.7)]" aria-hidden="true" />
</section>
    );
}

function RouteButton({ utama = false, onClick, children }: { utama?: boolean; onClick: () => void; children: React.ReactNode }) {
    return (
        <button type="button" onClick={onClick} className={`group flex cursor-pointer items-center gap-2.5 border-0 bg-transparent py-0.5 font-serif text-[9px] tracking-[0.2em] transition-all duration-200 hover:translate-x-1 hover:text-cyan-100 focus-visible:translate-x-1 focus-visible:text-cyan-100 focus-visible:outline-none [@media(orientation:landscape)_and_(max-height:500px)]:text-[7px] ${utama ? "text-slate-100/80" : "text-slate-200/50"}`}>
            <span className={`h-[7px] w-[7px] shrink-0 rotate-45 border border-current transition-all duration-200 group-hover:bg-cyan-100/80 group-hover:shadow-[0_0_11px_rgba(34,211,238,0.62)] ${utama ? "bg-sky-100/75 shadow-[0_0_8px_rgba(103,232,249,0.55)]" : ""}`} aria-hidden="true" />
            <span>{children}</span>
            {utama && <span className="ml-[3px] h-px w-12 origin-left bg-linear-to-r from-sky-200/60 to-transparent transition-all duration-200 group-hover:scale-x-110 group-hover:brightness-150" aria-hidden="true" />}
        </button>
    );
}

function NavigationButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
    return <button type="button" aria-label={label} onClick={onClick} className="cursor-pointer border-0 bg-transparent px-[3px] pb-0.5 font-serif text-xl leading-none text-sky-100/60 transition-all duration-200 hover:scale-110 hover:text-cyan-100 focus-visible:text-cyan-100 focus-visible:outline-none">{children}</button>;
}
