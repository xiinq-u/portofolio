"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import CasingLoading from "./CasingLoading";

const FPS = 60;
const START_FRAME = 15;
const END_FRAME = 193;
const FRAME_FOLDER = "/images/loading_Screen";
const FIRST_FRAME_PATH = getFramePath(START_FRAME);

type LoadingProps = {
    progress: number;
    isComplete: boolean;
};

function getFramePath(frameIndex: number) {
    const frameNumber = String(frameIndex).padStart(6, "0");
    return `${FRAME_FOLDER}/frame_${frameNumber}.jpg`;
}

export default function Loading({ progress, isComplete }: LoadingProps) {
    const progressTerbatas = Math.min(Math.max(progress, 0), 100);
    const progressBulat = Math.round(progressTerbatas);
    const skalaProgress = progressTerbatas / 100;
    const animationContainerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const animationContainer = animationContainerRef.current;
        const context = canvas?.getContext("2d");

        if (!canvas || !context || !animationContainer) return;

        const loadingCanvas = canvas;
        const loadingContext = context;
        const loadingAnimationContainer = animationContainer;

        const imageCache = new Map<number, HTMLImageElement>();
        let animationFrameId = 0;
        let currentFrame = START_FRAME;
        let lastFrameTime = performance.now();
        let isDestroyed = false;
        loadingContext.imageSmoothingEnabled = true;
        loadingContext.imageSmoothingQuality = "high";

        function resizeCanvas() {
            const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
            const { width, height } = loadingAnimationContainer.getBoundingClientRect();
            loadingCanvas.width = Math.round(width * devicePixelRatio);
            loadingCanvas.height = Math.round(height * devicePixelRatio);
            loadingCanvas.style.width = `${width}px`;
            loadingCanvas.style.height = `${height}px`;

            const currentImage = imageCache.get(currentFrame);
            if (currentImage) drawFrame(currentImage);
        }

        function drawFrame(image: HTMLImageElement) {
            // Keep the complete 16:9 frame visible; never crop it to the viewport.
            const scale = Math.min(loadingCanvas.width / image.width, loadingCanvas.height / image.height);
            const width = image.width * scale;
            const height = image.height * scale;
            const x = (loadingCanvas.width - width) / 2;
            const y = (loadingCanvas.height - height) / 2;

            loadingContext.clearRect(0, 0, loadingCanvas.width, loadingCanvas.height);
            loadingContext.drawImage(image, x, y, width, height);
        }

        function loadFrame(frameIndex: number) {
            const cachedImage = imageCache.get(frameIndex);
            if (cachedImage) return Promise.resolve(cachedImage);

            return new Promise<HTMLImageElement | null>((resolve) => {
                const image = new window.Image();
                image.src = getFramePath(frameIndex);
                image.onload = async () => {
                    try {
                        await image.decode();
                    } catch {
                        // The browser may have decoded the image during onload.
                    }
                    if (!isDestroyed) imageCache.set(frameIndex, image);
                    resolve(image);
                };
                image.onerror = () => {
                    resolve(null);
                };
            });
        }

        function render(time: number) {
            if (isDestroyed) return;

            const frameDuration = 1000 / FPS;
            const elapsedTime = time - lastFrameTime;
            if (elapsedTime >= frameDuration) {
                const image = imageCache.get(currentFrame);
                if (image) {
                    drawFrame(image);
                    currentFrame = currentFrame >= END_FRAME ? START_FRAME : currentFrame + 1;
                }
                lastFrameTime = time - (elapsedTime % frameDuration);
            }

            animationFrameId = requestAnimationFrame(render);
        }

        resizeCanvas();
        void loadFrame(START_FRAME).then((image) => {
            if (isDestroyed) return;
            if (image) {
                drawFrame(image);
            }
            lastFrameTime = performance.now();
            animationFrameId = requestAnimationFrame(render);
        });

        async function preloadRemainingFrames() {
            for (let frameIndex = START_FRAME + 1; frameIndex <= END_FRAME; frameIndex++) {
                if (isDestroyed) return;
                await loadFrame(frameIndex);
            }
        }
        void preloadRemainingFrames();
        const resizeObserver = new ResizeObserver(resizeCanvas);
        resizeObserver.observe(loadingAnimationContainer);

        return () => {
            isDestroyed = true;
            cancelAnimationFrame(animationFrameId);
            resizeObserver.disconnect();
            imageCache.clear();
        };
    }, []);

  return (
        <>
            <style>{`
                .glass-particle {
                    position: absolute;
                    background: linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(165,243,252,0.8) 100%);
                    box-shadow: 0 0 8px rgba(34, 211, 238, 0.9);
                    opacity: 0;
                    animation: shatter infinite cubic-bezier(0.25, 1, 0.5, 1);
                    pointer-events: none;
                }
                .shard-1 { width: 6px; height: 14px; clip-path: polygon(50% 0%, 0% 100%, 100% 100%); animation-duration: 0.8s; animation-delay: 0.1s; top: -12px; right: 0; }
                .shard-2 { width: 8px; height: 10px; clip-path: polygon(0 0, 100% 20%, 50% 100%); animation-duration: 1.1s; animation-delay: 0.3s; top: 6px; right: 0; }
                .shard-3 { width: 5px; height: 16px; clip-path: polygon(20% 0%, 100% 30%, 0% 100%); animation-duration: 0.9s; animation-delay: 0.5s; top: -6px; right: 2px; }
                .shard-4 { width: 4px; height: 9px; clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%); animation-duration: 1s; animation-delay: 0.2s; top: 3px; right: 5px; }
                .shard-5 { width: 7px; height: 15px; clip-path: polygon(0 0, 100% 0, 50% 100%); animation-duration: 0.7s; animation-delay: 0.6s; top: 10px; right: 1px; }
                .shard-6 { width: 5px; height: 11px; clip-path: polygon(50% 0%, 0% 100%, 100% 100%); animation-duration: 1.2s; animation-delay: 0.4s; top: -14px; right: -2px; }

                @keyframes shatter {
                    0% { 
                        transform: translate(0, 0) rotate(0deg) scale(1); 
                        opacity: 1; 
                    }
                    100% { 
                        transform: translate(-70px, calc(-25px + 50px * var(--dir-y))) rotate(calc(200deg * var(--rot))) scale(0); 
                        opacity: 0; 
                    }
                }

                .shard-1 { --dir-y: 0.3; --rot: 1.2; }
                .shard-2 { --dir-y: 1.6; --rot: -1.8; }
                .shard-3 { --dir-y: -0.6; --rot: 2.2; }
                .shard-4 { --dir-y: 0.9; --rot: -1.2; }
                .shard-5 { --dir-y: 1.9; --rot: 1.4; }
                .shard-6 { --dir-y: -1.4; --rot: -2.5; }
            `}</style>

            <div
                className="fixed inset-0 z-[200] flex flex-col justify-end overflow-hidden bg-slate-950 text-white"
                role="progressbar"
                aria-label="Menyiapkan halaman Home"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progressBulat}
                aria-valuetext={`${progressBulat}%`}
            >
                <CasingLoading />

                {/* Area animasi tetap 16:9 seperti frame idle HeroCharacter. */}
                <div
                    ref={animationContainerRef}
                    className="absolute left-1/2 top-1/2 z-10 aspect-video w-[min(100vw,177.778vh)] -translate-x-1/2 -translate-y-1/2 overflow-hidden"
                >
                    <Image src={FIRST_FRAME_PATH} className="object-contain" alt="" fill priority sizes="100vw" />
                    <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
                </div>
                
                {/* Logo dipindah ke sini (sebelum overlay hitam) agar ikut meredup/gelap */}
                <Image
                    src="/images/Logo/logo_nama.png"
                    alt="Portfolio logo"
                    width={280}
                    height={96}
                    className="absolute top-6 z-10 h-auto w-44 object-contain [left:max(1.5rem,calc(50%-88.8889vh+1.5rem))] md:top-8 md:w-60 [@media(orientation:landscape)_and_(max-height:500px)]:top-3 [@media(orientation:landscape)_and_(max-height:500px)]:w-32"
                    priority
                />

                {/* Overlay Lapis 2 (Menutupi gambar, canvas, DAN logo) */}
                <div className="absolute inset-0 bg-slate-950/20 z-20" aria-hidden="true" />
                
                {/* Container Loading di bawah */}
                <div className="relative z-30 flex w-[min(100vw,177.778vh)] self-center flex-col px-8 pb-12 md:px-24 md:pb-16 [@media(orientation:landscape)_and_(max-height:500px)]:px-8 [@media(orientation:landscape)_and_(max-height:500px)]:pb-5">
                    <div className="flex items-end justify-between mb-3">
                        <p className="text-sm tracking-[0.3em] font-medium text-white/90 [@media(orientation:landscape)_and_(max-height:500px)]:text-[10px]">
                            {/* Pastikan `isComplete` sudah dideklarasikan di komponen Anda */}
                            {isComplete || progressTerbatas >= 100 ? "COMPLETE" : "LOADING CHARACTER"}
                        </p>
                        <p className="text-base md:text-lg font-medium text-cyan-300 tabular-nums leading-none [@media(orientation:landscape)_and_(max-height:500px)]:text-xs">
                            {progressBulat}%
                        </p>
                    </div>

                    <div className="relative h-1 w-full rounded-full bg-white/20 md:h-0.5">
                        <div 
                            className="absolute inset-0 origin-left rounded-full bg-cyan-400 shadow-[0_0_12px_2px_rgba(34,211,238,0.6)] will-change-transform" 
                            style={{ transform: `scaleX(${skalaProgress})` }}
                            aria-hidden="true"
                        />

                        {progressTerbatas > 0 && progressTerbatas < 100 && (
                            <div
                                className="absolute inset-0 z-10 origin-left will-change-transform"
                                style={{ transform: `scaleX(${skalaProgress})` }}
                                aria-hidden="true"
                            >
                                <div
                                    className="absolute right-0 top-1/2 size-0 origin-right -translate-y-1/2 will-change-transform"
                                    style={{ transform: `scaleX(${1 / skalaProgress})` }}
                                >
                                    {/* Ekor Cahaya (Tail Glow) */}
                                    <div className="absolute right-0 top-1/2 h-3 w-16 -translate-y-1/2 bg-gradient-to-l from-cyan-100 to-transparent opacity-90 blur-[2px]" />

                                    {/* Titik Cahaya Inti di Ujung (Core Flare) */}
                                    <div className="absolute right-0 top-1/2 size-2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_8px_3px_rgba(103,232,249,0.8)]" />

                                    {/* Serpihan Kaca */}
                                    <div className="glass-particle shard-1" />
                                    <div className="glass-particle shard-2" />
                                    <div className="glass-particle shard-3" />
                                    <div className="glass-particle shard-4" />
                                    <div className="glass-particle shard-5" />
                                    <div className="glass-particle shard-6" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
