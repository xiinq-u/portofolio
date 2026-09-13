"use client";

import HeroCharacter from "./HeroCharacter";
import CasingUtama from "./CasingUtama";

type HeroProps = {
	onLoadingChange?: (isLoading: boolean) => void;
	onLoadingProgress?: (progress: number) => void;
	onLoadingComplete?: () => void;
};

// Loading callbacks report when the first video frame is available.
export default function Hero({ onLoadingChange, onLoadingProgress, onLoadingComplete }: HeroProps) {
	return (
		<section className="hero-scene relative min-h-screen overflow-hidden bg-slate-950">
			<CasingUtama />
			<HeroCharacter
				className="absolute inset-0 z-10"
				onLoadingChange={onLoadingChange}
				onLoadingProgress={onLoadingProgress}
				onReady={onLoadingComplete}
			/>
		</section>
	);
}
