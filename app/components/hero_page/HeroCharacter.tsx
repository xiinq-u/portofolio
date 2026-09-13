"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type AnimationType = "idle" | "waving" | "fingerHeart";
type SpecialAnimation = Exclude<AnimationType, "idle">;

const FRAME_COUNT: Record<AnimationType, number> = {
	idle: 600,
	waving: 600,
	fingerHeart: 600,
};

const FRAME_FOLDER: Record<AnimationType, string> = {
	idle: "/images/idle",
	waving: "/images/waving",
	fingerHeart: "/images/finger%20heart",
};

export interface HeroCharacterProps {
	idleFPS?: number;
	specialFPS?: number;
	minIdleLoops?: number;
	maxIdleLoops?: number;
	wavingChance?: number;
	fingerHeartChance?: number;
	className?: string;
	onLoadingProgress?: (progress: number) => void;
	onReady?: () => void;
	onLoadingChange?: (isLoading: boolean) => void;
	onError?: (error: Error) => void;
}

function framePath(animation: AnimationType, frameIndex: number) {
	const frame = String(frameIndex + 1).padStart(6, "0");
	return `${FRAME_FOLDER[animation]}/frame_${frame}.jpg`;
}

function randomInteger(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function HeroCharacter({
	idleFPS = 60,
	specialFPS = 60,
	minIdleLoops = 4,
	maxIdleLoops = 10,
	wavingChance = 0.5,
	fingerHeartChance = 0.5,
	className = "",
	onLoadingProgress,
	onReady,
	onLoadingChange,
	onError,
}: HeroCharacterProps) {
	const imageRef = useRef<HTMLImageElement>(null);
	const callbacksRef = useRef({ onLoadingProgress, onReady, onLoadingChange, onError });
	const [isReady, setIsReady] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);

	const settings = useMemo(() => {
		const minimum = Math.max(1, Math.floor(minIdleLoops));
		const maximum = Math.max(minimum, Math.floor(maxIdleLoops));
		return {
			idleFPS: Math.max(1, idleFPS),
			specialFPS: Math.max(1, specialFPS),
			minIdleLoops: minimum,
			maxIdleLoops: maximum,
			wavingChance: Math.max(0, wavingChance),
			fingerHeartChance: Math.max(0, fingerHeartChance),
		};
	}, [idleFPS, specialFPS, minIdleLoops, maxIdleLoops, wavingChance, fingerHeartChance]);

	const sources = useMemo<Record<AnimationType, string[]>>(
		() => ({
			idle: Array.from({ length: FRAME_COUNT.idle }, (_, index) => framePath("idle", index)),
			waving: Array.from({ length: FRAME_COUNT.waving }, (_, index) => framePath("waving", index)),
			fingerHeart: Array.from({ length: FRAME_COUNT.fingerHeart }, (_, index) => framePath("fingerHeart", index)),
		}),
		[],
	);

	useEffect(() => {
		callbacksRef.current = { onLoadingProgress, onReady, onLoadingChange, onError };
	}, [onLoadingProgress, onReady, onLoadingChange, onError]);

	useEffect(() => {
		let cancelled = false;
		let animationFrameId = 0;
		let lastFrameTime = performance.now();
		let currentAnimation: AnimationType = "idle";
		let currentFrame = 0;
		let idleLoopCount = 0;
		let animationStarted = false;
		let nextSpecialAfter = randomInteger(settings.minIdleLoops, settings.maxIdleLoops);
		let previousSpecial: SpecialAnimation | null = null;
		const decodedFrames: HTMLImageElement[] = [];
		const allSources = [...sources.idle, ...sources.waving, ...sources.fingerHeart];

		function chooseSpecial(): SpecialAnimation {
			// Weight the first choice, then alternate so one gesture cannot repeat forever.
			if (previousSpecial) return previousSpecial === "waving" ? "fingerHeart" : "waving";
			const total = settings.wavingChance + settings.fingerHeartChance;
			if (total === 0) return Math.random() < 0.5 ? "waving" : "fingerHeart";
			return Math.random() * total < settings.wavingChance ? "waving" : "fingerHeart";
		}

		function advanceFrame() {
			currentFrame++;
			if (currentFrame < FRAME_COUNT[currentAnimation]) return;

			currentFrame = 0;
			if (currentAnimation !== "idle") {
				// A special finishes completely before returning to idle frame 000001.
				currentAnimation = "idle";
				idleLoopCount = 0;
				nextSpecialAfter = randomInteger(settings.minIdleLoops, settings.maxIdleLoops);
				return;
			}

			idleLoopCount++;
			if (idleLoopCount >= nextSpecialAfter) {
				const special = chooseSpecial();
				previousSpecial = special;
				currentAnimation = special;
			}
		}

		function render(time: number) {
			if (cancelled) return;
			const fps = currentAnimation === "idle" ? settings.idleFPS : settings.specialFPS;
			const frameDuration = 1000 / fps;
			const elapsed = time - lastFrameTime;

			if (elapsed >= frameDuration) {
				// Catch up after a busy main thread while preserving state boundaries.
				const steps = Math.min(Math.floor(elapsed / frameDuration), 5);
				for (let step = 0; step < steps; step++) advanceFrame();
				const image = imageRef.current;
				if (image) image.src = sources[currentAnimation][currentFrame];
				lastFrameTime = time - (elapsed % frameDuration);
			}

			animationFrameId = requestAnimationFrame(render);
		}

		function startAnimation() {
			if (cancelled || animationStarted) return;
			animationStarted = true;
			setIsReady(true);
			setIsPlaying(!document.hidden);
			callbacksRef.current.onReady?.();
			callbacksRef.current.onLoadingChange?.(false);

			if (!document.hidden) {
				lastFrameTime = performance.now();
				animationFrameId = requestAnimationFrame(render);
			}
		}

		function loadAndDecode(src: string) {
			return new Promise<void>((resolve, reject) => {
				const image = new window.Image();
				image.onload = async () => {
					try {
						await image.decode();
					} catch {
						// Some browsers decode the image before onload fires.
					}
					decodedFrames.push(image);
					resolve();
				};
				image.onerror = () => reject(new Error(`Unable to load animation frame: ${src}`));
				image.src = src;
			});
		}

		async function preloadAllFrames() {
			callbacksRef.current.onLoadingChange?.(true);
			let nextIndex = 0;
			let loaded = 0;
			const worker = async () => {
				while (!cancelled) {
					const index = nextIndex++;
					if (index >= allSources.length) return;
					await loadAndDecode(allSources[index]);
					loaded++;
					callbacksRef.current.onLoadingProgress?.(Math.round((loaded / allSources.length) * 100));
					// Start immediately after the first decoded frame. The remaining frames
					// continue preloading in parallel without freezing the visible Home screen.
					if (loaded === 1) startAnimation();
				}
			};

			// Bounded concurrency avoids opening 1,800 requests simultaneously.
			await Promise.all(Array.from({ length: 12 }, worker));
			if (cancelled) return;
			startAnimation();
		}

		function handleVisibilityChange() {
			if (document.hidden) {
				cancelAnimationFrame(animationFrameId);
				setIsPlaying(false);
			} else if (!cancelled && animationStarted) {
				lastFrameTime = performance.now();
				setIsPlaying(true);
				animationFrameId = requestAnimationFrame(render);
			}
		}

		document.addEventListener("visibilitychange", handleVisibilityChange);
		void preloadAllFrames().catch((reason: unknown) => {
			if (cancelled) return;
			const error = reason instanceof Error ? reason : new Error("Animation preload failed");
			callbacksRef.current.onError?.(error);
			callbacksRef.current.onLoadingChange?.(false);
		});

		return () => {
			cancelled = true;
			cancelAnimationFrame(animationFrameId);
			document.removeEventListener("visibilitychange", handleVisibilityChange);
			decodedFrames.length = 0;
		};
	}, [settings, sources]);

	return (
		<div
			className={`relative isolate h-full min-h-[inherit] w-full overflow-hidden ${className}`.trim()}
			data-ready={isReady}
			data-playing={isPlaying}
			aria-busy={!isReady}
		>
			{/* A native img is intentional: the RAF loop mutates one decoded frame source without React renders. */}
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				ref={imageRef}
				className="pointer-events-none absolute bottom-0 left-1/2 block h-full w-auto max-w-none -translate-x-1/2 select-none object-contain object-bottom"
				src={sources.idle[0]}
				alt="Animated hero character"
				draggable={false}
			/>
		</div>
	);
}
