"use client";

import HeroCharacter from "./HeroCharacter";
import CasingUtama from "./CasingUtama";

type HeroProps = {
	onLoadingChange?: (isLoading: boolean) => void;
	onLoadingProgress?: (progress: number) => void;
	onLoadingComplete?: () => void;
};

// App Router usage example. These callbacks keep the existing portfolio loading
// overlay synchronized with HeroCharacter's complete 1,800-frame preload.
export default function Hero({ onLoadingChange, onLoadingProgress, onLoadingComplete }: HeroProps) {
	return (
		<section className="relative min-h-screen overflow-hidden bg-slate-950">
			<CasingUtama />
			<HeroCharacter
				className="absolute inset-0 z-10"
				idleFPS={60}
				specialFPS={60}
				minIdleLoops={4}
				maxIdleLoops={10}
				onLoadingChange={onLoadingChange}
				onLoadingProgress={onLoadingProgress}
				onReady={onLoadingComplete}
			/>
		</section>
	);
}
