"use client";

import { useEffect, useRef, useState } from "react";
import { hasFullscreen, togglePageFullscreen } from "../../lib/fullscreen";

type MediaElement = HTMLAudioElement | HTMLVideoElement;

const kelasItem = "group/utilitas relative";
const kelasTombol =
    "grid size-[38px] cursor-pointer place-items-center rounded-full border border-white/80 bg-[linear-gradient(135deg,rgba(15,23,42,0.6)_0%,rgba(56,189,248,0.1)_100%)] text-white shadow-[inset_0_1px_2px_rgba(255,255,255,0.5),0_4px_10px_rgba(0,0,0,0.3)] backdrop-blur-[12px] transition-all duration-300 ease-in-out hover:scale-110 hover:bg-white/15 hover:shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_0_12px_rgba(255,255,255,0.8),0_0_6px_#38bdf8] focus-visible:scale-110 focus-visible:bg-white/15 focus-visible:shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_0_12px_rgba(255,255,255,0.8),0_0_6px_#38bdf8] [&[aria-pressed=true]]:scale-110 [&[aria-pressed=true]]:bg-white/15 [&[aria-pressed=true]]:shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_0_12px_rgba(255,255,255,0.8),0_0_6px_#38bdf8] [@media(orientation:landscape)_and_(max-height:500px)]:size-8";
const kelasTooltip =
    "pointer-events-none absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 -translate-y-[5px] whitespace-nowrap border border-white/80 bg-slate-900/85 px-3 py-1.5 text-[10px] font-semibold tracking-[0.1em] text-white opacity-0 shadow-[0_5px_15px_rgba(0,0,0,0.5)] backdrop-blur-[8px] transition-[opacity,transform] duration-200 group-hover/utilitas:translate-y-0 group-hover/utilitas:opacity-100 group-focus-within/utilitas:translate-y-0 group-focus-within/utilitas:opacity-100 [@media(orientation:landscape)_and_(max-height:500px)]:top-[calc(100%+8px)] [@media(orientation:landscape)_and_(max-height:500px)]:px-2 [@media(orientation:landscape)_and_(max-height:500px)]:py-1 [@media(orientation:landscape)_and_(max-height:500px)]:text-[9px]";
const kelasIkon =
    "size-[18px] fill-none stroke-current stroke-[1.5] [stroke-linecap:round] [stroke-linejoin:round] drop-shadow-[0_2px_3px_rgba(0,0,0,0.6)] [@media(orientation:landscape)_and_(max-height:500px)]:size-[15px]";

function aturMedia(muted: boolean, volume: number) {
    document.querySelectorAll<MediaElement>("audio, video").forEach((media) => {
        media.muted = muted;
        media.volume = volume;
    });
}

export default function KontrolUtilitas() {
    const [soundAktif, setSoundAktif] = useState(true);
    const [settingsTerbuka, setSettingsTerbuka] = useState(false);
    const [fullscreenAktif, setFullscreenAktif] = useState(false);
    const [volume, setVolume] = useState(0.7);
    const settingsRef = useRef<HTMLDivElement>(null);
    const fullscreenDialogRef = useRef<HTMLDialogElement>(null);
    const [fullscreenMessage, setFullscreenMessage] = useState("");
    const [showInstallSteps, setShowInstallSteps] = useState(false);

    useEffect(() => {
        const sinkronkanFullscreen = () => setFullscreenAktif(hasFullscreen(document));
        sinkronkanFullscreen();
        document.addEventListener("fullscreenchange", sinkronkanFullscreen);
        document.addEventListener("webkitfullscreenchange", sinkronkanFullscreen);
        return () => {
            document.removeEventListener("fullscreenchange", sinkronkanFullscreen);
            document.removeEventListener("webkitfullscreenchange", sinkronkanFullscreen);
        };
    }, []);

    useEffect(() => {
        if (!settingsTerbuka) return;

        const tutupPanel = (event: PointerEvent) => {
            if (!settingsRef.current?.contains(event.target as Node)) setSettingsTerbuka(false);
        };
        const tutupDenganEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") setSettingsTerbuka(false);
        };

        document.addEventListener("pointerdown", tutupPanel);
        document.addEventListener("keydown", tutupDenganEscape);
        return () => {
            document.removeEventListener("pointerdown", tutupPanel);
            document.removeEventListener("keydown", tutupDenganEscape);
        };
    }, [settingsTerbuka]);

    const toggleSound = () => {
        const statusBaru = !soundAktif;
        setSoundAktif(statusBaru);
        aturMedia(!statusBaru, volume);
    };

    const ubahVolume = (nilai: number) => {
        setVolume(nilai);
        if (nilai > 0 && !soundAktif) setSoundAktif(true);
        aturMedia(nilai === 0, nilai);
    };

    const toggleFullscreen = async () => {
        const iphone = /iPhone/i.test(navigator.userAgent);
        const standalone = window.matchMedia("(display-mode: standalone)").matches
            || Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
        const showHelp = (message: string, install = false) => {
            setFullscreenMessage(message);
            setShowInstallSteps(install);
            fullscreenDialogRef.current?.showModal();
        };
        if (standalone && !hasFullscreen(document)) {
            showHelp("Website sudah terbuka sebagai aplikasi tanpa bilah alamat browser. Untuk keluar, gunakan gestur Home di HP kamu.");
            return;
        }
        try {
            const result = await togglePageFullscreen(document);
            if (result === "unsupported") {
                showHelp(iphone
                    ? "Safari iPhone tidak mendukung fullscreen seluruh halaman lewat tombol ini. Buka sebagai aplikasi dari Layar Utama untuk menghilangkan bilah Safari."
                    : "Browser ini belum mendukung fullscreen halaman. Coba buka website langsung di Safari, Chrome, atau browser lain yang mendukungnya.", iphone);
            }
        } catch {
            showHelp(iphone
                ? "Safari tidak mengizinkan fullscreen di tab ini. Kamu bisa membuka website dari Layar Utama tanpa bilah Safari."
                : "Permintaan fullscreen ditolak browser. Coba lagi dari tab website langsung, bukan dari tampilan preview.", iphone);
        }
    };

    return (
        <div className="utility-controls fixed top-9 right-10 z-[60] [font-family:Arial,Helvetica,sans-serif] [@media(min-aspect-ratio:16/9)]:right-[max(40px,calc(50%-88.8889vh+16px))] [@media(orientation:landscape)_and_(max-height:500px)]:top-[14px] [@media(orientation:landscape)_and_(max-height:500px)]:right-[max(14px,calc(50%-88.8889vh+14px))] [@media(orientation:landscape)_and_(max-height:380px)]:top-[9px] [@media(orientation:landscape)_and_(max-height:380px)]:right-[max(9px,calc(50%-88.8889vh+9px))] [@media(orientation:landscape)_and_(max-height:380px)]:scale-90 [@media(orientation:landscape)_and_(max-height:380px)]:origin-top-right [@media(max-width:640px)_and_(orientation:portrait)]:top-4 [@media(max-width:640px)_and_(orientation:portrait)]:right-4" ref={settingsRef}>
            <dialog ref={fullscreenDialogRef} aria-labelledby="fullscreen-help-title"
                className="fixed inset-0 m-auto max-h-[85dvh] w-[min(420px,calc(100vw-32px))] overflow-y-auto rounded-2xl border border-sky-200/40 bg-slate-950 p-5 text-sm leading-relaxed text-sky-50 shadow-2xl backdrop:bg-black/75">
                <h2 id="fullscreen-help-title" className="mb-3 text-lg font-semibold">Tampilan layar penuh</h2>
                <p>{fullscreenMessage}</p>
                {showInstallSteps && (
                    <ol className="my-4 list-decimal space-y-2 pl-5">
                        <li>Buka website ini di Safari, lalu ketuk Bagikan (Share).</li>
                        <li>Pilih Tambah ke Layar Utama (Add to Home Screen).</li>
                        <li>Aktifkan Buka sebagai App (Open as Web App) jika tersedia, lalu ketuk Tambah.</li>
                        <li>Buka ikon dari Layar Utama dan putar HP ke landscape.</li>
                    </ol>
                )}
                <form method="dialog" className="mt-4 flex justify-end">
                    <button autoFocus className="min-h-11 rounded-lg bg-sky-100 px-5 font-semibold text-slate-950">Mengerti</button>
                </form>
            </dialog>
            <div className="flex items-center gap-3 [@media(orientation:landscape)_and_(max-height:500px)]:gap-2" aria-label="Kontrol halaman">
                <div className={kelasItem}>
                    <button
                        type="button"
                        className={kelasTombol}
                        aria-label={soundAktif ? "Matikan sound" : "Aktifkan sound"}
                        aria-pressed={!soundAktif}
                        onClick={toggleSound}
                    >
                        {soundAktif ? <SoundAktifIcon /> : <SoundMatiIcon />}
                    </button>
                    <span className={kelasTooltip} role="tooltip">Sound</span>
                </div>

                <div className={kelasItem}>
                    <button
                        type="button"
                        className={kelasTombol}
                        aria-label="Buka settings"
                        aria-expanded={settingsTerbuka}
                        aria-controls="panel-settings"
                        onClick={() => setSettingsTerbuka((terbuka) => !terbuka)}
                    >
                        <SettingsIcon />
                    </button>
                    <span className={kelasTooltip} role="tooltip">Settings</span>
                </div>

                <div className={kelasItem}>
                    <button
                        type="button"
                        className={kelasTombol}
                        aria-label={fullscreenAktif ? "Keluar dari fullscreen" : "Masuk fullscreen"}
                        aria-pressed={fullscreenAktif}
                        onClick={() => void toggleFullscreen()}
                    >
                        {fullscreenAktif ? <KeluarFullscreenIcon /> : <FullscreenIcon />}
                    </button>
                    <span className={kelasTooltip} role="tooltip">Fullscreen</span>
                </div>
            </div>

            <div
                id="panel-settings"
                className="invisible absolute top-[52px] right-[46px] w-[220px] -translate-y-[10px] border border-white/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.2)_0%,rgba(56,189,248,0.1)_40%,rgba(2,6,23,0.6)_100%)] px-5 pt-[18px] pb-[22px] opacity-0 shadow-[0_15px_30px_rgba(0,0,0,0.9),inset_0_2px_4px_rgba(255,255,255,0.7),inset_0_-10px_20px_rgba(15,23,42,0.6)] backdrop-blur-[12px] [clip-path:polygon(0_0,100%_0,100%_100%,15px_100%,0_calc(100%-15px))] transition-[opacity,transform,visibility] duration-250 [&[data-terbuka=true]]:visible [&[data-terbuka=true]]:translate-y-0 [&[data-terbuka=true]]:opacity-100 [@media(orientation:landscape)_and_(max-height:500px)]:top-[43px] [@media(orientation:landscape)_and_(max-height:500px)]:right-9 [@media(orientation:landscape)_and_(max-height:500px)]:w-[174px] [@media(orientation:landscape)_and_(max-height:500px)]:px-[15px] [@media(orientation:landscape)_and_(max-height:500px)]:pt-[14px] [@media(orientation:landscape)_and_(max-height:500px)]:pb-4"
                data-terbuka={settingsTerbuka}
                aria-hidden={!settingsTerbuka}
            >
                <div className="mb-4 flex items-center justify-between text-[11px] font-bold tracking-[0.15em] text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.9)]">
                    <span>SETTINGS</span>
                    <span className="size-1.5 rotate-45 bg-white shadow-[0_0_10px_#fff,0_0_14px_#38bdf8]" aria-hidden="true" />
                </div>
                <label className="mb-2.5 flex items-center justify-between text-[11px] tracking-[0.05em] text-sky-100/90 [text-shadow:0_1px_2px_rgba(0,0,0,0.8)]" htmlFor="volume-hero">
                    <span>Volume</span>
                    <span>{Math.round(volume * 100)}%</span>
                </label>
                <input
                    id="volume-hero"
                    className="h-[3px] w-full cursor-pointer border border-white/50 bg-white/30 accent-sky-400 shadow-[0_0_4px_rgba(56,189,248,0.4)]"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={(event) => ubahVolume(Number(event.target.value))}
                    tabIndex={settingsTerbuka ? 0 : -1}
                />
            </div>
        </div>
    );
}

function SoundAktifIcon() {
    return (
        <svg className={kelasIkon} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 9.2h3.1L12 6v12l-3.9-3.2H5z" />
            <path d="M15 9.2a4 4 0 0 1 0 5.6M17.6 6.8a7.4 7.4 0 0 1 0 10.4" />
        </svg>
    );
}

function SoundMatiIcon() {
    return (
        <svg className={kelasIkon} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 9.2h3.1L12 6v12l-3.9-3.2H5z" />
            <path d="m15.2 9.2 5.2 5.6M20.4 9.2l-5.2 5.6" />
        </svg>
    );
}

function SettingsIcon() {
    return (
        <svg className={kelasIkon} viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 3.2v2M12 18.8v2M20.8 12h-2M5.2 12h-2M18.2 5.8l-1.4 1.4M7.2 16.8l-1.4 1.4M18.2 18.2l-1.4-1.4M7.2 7.2 5.8 5.8" />
            <circle cx="12" cy="12" r="6.8" />
        </svg>
    );
}

function FullscreenIcon() {
    return (
        <svg className={kelasIkon} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 4H4v5M15 4h5v5M20 15v5h-5M9 20H4v-5" />
        </svg>
    );
}

function KeluarFullscreenIcon() {
    return (
        <svg className={kelasIkon} viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 4v5H4M15 4v5h5M20 15h-5v5M4 15h5v5" />
        </svg>
    );
}
