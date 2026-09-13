"use client";

import IntroLoading from "./components/IntroLoading";
import Navbar from "./components/navbar";
import KontrolUtilitas from "./components/KontrolUtilitas";
import FeaturedRoute from "./components/FeaturedRoute";
import Hero from "./components/hero_page/hero";

export default function Home() {
    return (
        <main className="relative min-h-screen bg-slate-950">
            <IntroLoading />
            <Hero />
            <Navbar />
            <KontrolUtilitas />
            <FeaturedRoute />


        </main>
    );
}
