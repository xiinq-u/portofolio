"use client";

import { useEffect, useRef, useState } from "react";

import Loading from "./hero_page/loading";

const DURASI_LOADING = 5_000;
const KUNCI_LOADING_SESSION = "portfolio_intro_loaded";

export default function IntroLoading() {
    const [ditampilkan, setDitampilkan] = useState(true);
    const [progress, setProgress] = useState(0);
    const waktuMulaiRef = useRef<number | null>(null);

    useEffect(() => {
        try {
            if (sessionStorage.getItem(KUNCI_LOADING_SESSION) === "true") {
                setDitampilkan(false);
                return;
            }
        } catch {
            // Loading tetap berjalan jika penyimpanan sesi diblokir browser.
        }

        let animationFrameId = 0;
        waktuMulaiRef.current ??= performance.now();

        const perbaruiProgress = (waktuSekarang: number) => {
            const waktuBerjalan = waktuSekarang - (waktuMulaiRef.current ?? waktuSekarang);
            const progressAktual = Math.min((waktuBerjalan / DURASI_LOADING) * 100, 100);
            setProgress(progressAktual);

            if (progressAktual >= 100) {
                try {
                    sessionStorage.setItem(KUNCI_LOADING_SESSION, "true");
                } catch {
                    // Abaikan jika penyimpanan sesi tidak tersedia.
                }

                setProgress(100);
                setDitampilkan(false);
                return;
            }

            animationFrameId = requestAnimationFrame(perbaruiProgress);
        };

        animationFrameId = requestAnimationFrame(perbaruiProgress);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    if (!ditampilkan) return null;

    return <Loading progress={progress} isComplete={progress >= 100} />;
}
