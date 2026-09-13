import Navigasi from "../components/navigation/navigasi";
import Portfolio from "../components/portfolio/Portfolio";

export default function PortfolioPage() {
  return (
    <main className="relative min-h-screen bg-[#020617] lg:h-dvh lg:overflow-hidden">
      <div className="landscape-back fixed top-4 left-4 z-50 sm:top-6 sm:left-6">
        <Navigasi />
      </div>
      <Portfolio />
    </main>
  );
}
