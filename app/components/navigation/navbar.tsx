"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  // State untuk menyimpan tab menu mana yang sedang aktif
  const [selectedTab, setSelectedTab] = useState("HOME");
  const activeTab = pathname === "/portfolio"
    ? "PORTFOLIO"
    : pathname === "/story"
      ? "STORY"
      : pathname === "/skills"
        ? "SKILLS"
        : selectedTab;

  // Array data item navigasi (Label dan Ikon SVG-nya)
  const navItems = [
    {
      label: "HOME",
      icon: (
        // UBAH UKURAN IKON:
        <svg
          className="h-4 w-4 sm:h-5 sm:w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      label: "STORY",
      icon: (
        <svg
          className="h-4 w-4 sm:h-5 sm:w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M12 2C12 2 15 6 15 9C15 11 13.5 12 12 12C10.5 12 9 11 9 9C9 6 12 2 12 2Z" />
          <path d="M12 12C12 12 16 15 16 18C16 20 14.5 21 12 21C9.5 21 8 20 8 18C8 15 12 12 12 12Z" />
          <path d="M2 12C2 12 6 9 9 9C11 9 12 10.5 12 12C12 13.5 11 15 9 15C6 15 2 12 2 12Z" />
          <path d="M22 12C22 12 18 15 15 15C13 15 12 13.5 12 12C12 10.5 13 9 15 9C18 9 22 12 22 12Z" />
        </svg>
      ),
    },
    {
      label: "SKILLS",
      icon: (
        <svg
          className="h-4 w-4 sm:h-5 sm:w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 3v18M3 12h18" />
          <path d="M12 7l3 5-3 5-3-5z" />
        </svg>
      ),
    },
    // {
    //   // label: "CHAPTERS",
    //   // icon: (
    //   //   <svg
    //   //     className="h-4 w-4 sm:h-5 sm:w-5"
    //   //     viewBox="0 0 24 24"
    //   //     fill="none"
    //   //     stroke="currentColor"
    //   //     strokeWidth="1.2"
    //   //   >
    //   //     <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
    //   //     <path d="M7 7h10M7 12h10M7 17h10" />
    //   //   </svg>
    //   // ),
    // },
    {
      label: "PORTFOLIO",
      icon: (
        <svg
          className="h-4 w-4 sm:h-5 sm:w-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      ),
    },
  ];

 return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Great+Vibes&display=swap"
        rel="stylesheet"
      />
      {/* CONTAINER UTAMA / HEADER */}
      {/* Posisi letak navbar di layar (Bawah & Kiri) */}
      <header className="home-navigation fixed bottom-4 left-1/2 z-50 flex w-[calc(100%-1.5rem)] -translate-x-1/2 flex-col items-center filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] landscape:bottom-4 landscape:left-4 landscape:w-auto landscape:translate-x-0 landscape:items-start sm:bottom-8 sm:left-10 sm:w-auto sm:translate-x-0 sm:items-start [@media(min-aspect-ratio:16/9)]:[left:max(2.5rem,calc(50%-88.8889vh+1rem))]! [@media(orientation:landscape)_and_(max-height:500px)]:[left:max(12px,calc(50%-88.8889vh+12px))]! [@media(orientation:landscape)_and_(max-height:500px)]:bottom-[10px]! [@media(orientation:landscape)_and_(max-height:500px)]:scale-[0.72] [@media(orientation:landscape)_and_(max-height:500px)]:origin-bottom-left [@media(orientation:landscape)_and_(max-height:380px)]:[left:max(8px,calc(50%-88.8889vh+8px))]! [@media(orientation:landscape)_and_(max-height:380px)]:bottom-[7px]! [@media(orientation:landscape)_and_(max-height:380px)]:scale-[0.62]">
        {/* BANNER ATAS (TITEL LOGO WEBTOON) */}
        <div
          className="relative w-full bg-linear-to-br from-white/20 via-sky-400/10 to-slate-950/50 backdrop-blur-md border-t border-l border-r border-white/80 px-6 py-5 text-white overflow-hidden shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),inset_0_-10px_20px_rgba(15,23,42,0.6)] landscape:w-[26rem] landscape:px-10 landscape:pb-6 landscape:pr-14 landscape:pt-6 sm:w-[28rem] sm:px-10 sm:pb-7 sm:pr-16 sm:pt-8"
          style={{ clipPath: "polygon(0 0, 75% 0, 100% 100%, 0% 100%)" }}
        >
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
            viewBox="0 0 300 120"
            fill="none"
          >
            <path
              d="M 0 30 L 40 45 L 85 20 L 150 55 L 210 15 L 260 50 L 300 25"
              stroke="#38bdf8"
              strokeWidth="1"
              className="drop-shadow-[0_0_3px_#38bdf8]"
            />
            <path
              d="M 40 45 L 35 90 L 70 120 M 85 20 L 110 0 M 150 55 L 140 100 M 210 15 L 230 0"
              stroke="white"
              strokeWidth="0.8"
              opacity="0.8"
            />
            <circle
              cx="150"
              cy="55"
              r="2"
              fill="white"
              className="animate-pulse"
            />
            <circle cx="40" cy="45" r="1.5" fill="#7dd3fc" />
          </svg>

          {/* Aksesoris Ornamen Titik Cahaya/Glow (Diperbesar) */}
          <div className="absolute top-1 left-4 w-3 h-3 bg-white rounded-full blur-[1.5px] shadow-[0_0_10px_#fff]" />
          <div className="absolute top-1 right-[28%] w-4 h-4 bg-cyan-200 rounded-full blur-[3px] shadow-[0_0_14px_#38bdf8]" />

          <div className="relative z-10 flex flex-col items-start">
            <h1
              className="text-4xl font-normal leading-tight tracking-wide text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] landscape:text-5xl sm:text-6xl"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              Under
            </h1>
            <h2
              className="-mt-3 text-3xl font-light tracking-wider text-sky-100 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] landscape:-mt-4 landscape:text-4xl sm:-mt-5 sm:text-5xl"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              the Azure Sky{" "}
            </h2>
            {/* STRIP BAWAH BANNER */}
            <div className="w-full flex items-center gap-2 mt-3 pt-1.5 border-t border-white/20">
              <span className="text-[10px] font-sans tracking-[0.2em] text-slate-200 font-light drop-shadow sm:text-[12px] sm:tracking-[0.3em]">
                푸른 하늘 아래, 너와 함께해서
              </span>
              <span className="text-[10px] sm:text-[12px] text-sky-300">◆</span>
            </div>
          </div>
        </div>

        {/* CONTAINER MENU NAVIGASI BAWAH */}
        <div className="relative z-10 -mt-1 flex w-full items-center landscape:w-auto sm:w-auto">
          <nav
            className="group relative flex w-full items-center justify-between gap-1 overflow-hidden rounded-r-full border border-white/80 bg-linear-to-r from-slate-900/60 via-white/10 to-sky-500/10 px-2 py-3 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),inset_0_-8px_16px_rgba(15,23,42,0.6)] landscape:w-auto landscape:justify-start landscape:pl-8 landscape:pr-5 landscape:py-3 sm:w-auto sm:justify-start sm:gap-2 sm:pl-10 sm:pr-8 sm:py-4"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 55px 100%)" }}
          >
            {/* SVG Background Garis Cahaya Latar Belakang Navigasi */}
            <svg
              className="absolute inset-0 h-full w-full pointer-events-none opacity-30 transition-opacity duration-300 group-hover:opacity-90"
              viewBox="0 0 700 80"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient
                  id="sharpGlow"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              <path
                d="M 45 80 L 90 20 L 160 50 L 240 10 L 330 60 L 420 15 L 510 55 L 610 20 L 680 70"
                stroke="url(#sharpGlow)"
                strokeWidth="1.5"
                strokeLinecap="square"
                className="filter drop-shadow-[0_0_4px_rgba(56,189,248,0.6)]"
              />
              <g
                stroke="#e0f2fe"
                strokeWidth="0.8"
                opacity="0.75"
                strokeLinecap="square"
              >
                <path d="M 90 20 L 120 0" />
                <path d="M 160 50 L 175 80" />
                <path d="M 240 10 L 270 0" />
                <path d="M 330 60 L 310 80" />
                <path d="M 420 15 L 450 0" />
                <path d="M 510 55 L 535 80" />
                <path d="M 610 20 L 630 0" />
              </g>
              <g fill="#ffffff">
                <polygon points="90,17 93,20 90,23 87,20" />
                <polygon
                  points="240,7 243,10 240,13 237,10"
                  className="animate-pulse"
                />
                <polygon points="420,12 423,15 420,18 417,15" />
                <polygon
                  points="610,17 613,20 610,23 607,20"
                  className="animate-pulse"
                />
              </g>
            </svg>

            <div className="w-2 shrink-0 landscape:w-6 sm:w-8" />
            
            {/* LOOPING ITEM-ITEM MENU NAVIGASI */}
            {navItems.map((item, index) => (
              <div key={item.label} className="relative z-10 flex min-w-0 flex-1 items-center landscape:flex-none sm:flex-none">
                <button
                  onClick={() => {
                    setSelectedTab(item.label);
                    if (item.label === "PORTFOLIO") {
                      router.push("/portfolio");
                    } else if (item.label === "STORY") {
                      router.push("/story");
                    } else if (item.label === "SKILLS") {
                      router.push("/skills");
                    } else if (item.label === "HOME" && pathname !== "/") {
                      router.push("/");
                    }
                  }}
                  className={`relative flex min-w-0 flex-1 flex-col items-center px-1.5 py-1.5 transition-all duration-300 group/btn landscape:px-3 landscape:py-2 sm:px-6 sm:py-2 ${activeTab === item.label ? "text-white scale-110 drop-shadow-[0_0_12px_rgba(255,255,255,1)]" : "text-slate-200/70 hover:text-white hover:scale-105"}`}
                >
                  <div className="mb-1.5 transform transition-transform group-hover/btn:scale-110 sm:mb-2 *:w-6 *:h-6 sm:*:w-7 sm:*:h-7">
                    {/* (Optional): Saya menambahkan *:w-6 *:h-6 untuk memastikan icon SVG Anda membesar, hapus class ini jika SVG Anda punya fixed width/height di file aslinya */}
                    {item.icon}
                  </div>
                  <span
                    className="text-[9px] font-semibold tracking-[0.06em] uppercase landscape:text-[10px] landscape:tracking-[0.15em] sm:text-[13px] sm:tracking-[0.2em]"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {item.label}
                  </span>
                  {activeTab === item.label && (
                    <div className="absolute -bottom-1 h-[3px] w-10 rounded-full bg-white shadow-[0_0_12px_#fff,0_0_6px_#38bdf8] sm:w-14" />
                  )}
                </button>
                {index < navItems.length - 1 && (
                  <div className="mx-1 h-8 w-[1.5px] rotate-[-15deg] bg-linear-to-b from-white via-sky-300 to-transparent shadow-[0_0_8px_rgba(56,189,248,0.8)] filter drop-shadow-[0_0_4px_rgba(255,255,255,0.9)] landscape:mx-2 landscape:h-10 landscape:w-[2px] sm:mx-3 sm:h-12 sm:w-[2px]" />
                )}
              </div>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
