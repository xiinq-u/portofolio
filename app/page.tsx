"use client";

import IntroLoading from "./components/home/IntroLoading";
import Navbar from "./components/navigation/navbar";
import KontrolUtilitas from "./components/navigation/KontrolUtilitas";
import FeaturedRoute from "./components/home/FeaturedRoute";
import Hero from "./components/home/hero/hero";

export default function Home() {
    return (
        <main className="home-page relative min-h-screen bg-slate-950">
            <IntroLoading />
            <Hero />
            <Navbar />
            <KontrolUtilitas />
            <FeaturedRoute />


        </main>
    );
}
