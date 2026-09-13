import Navigasi from "../components/navigasi";
import Story from "../components/story";

export default function StoryPage() {
  return (
    <main className="relative min-h-screen bg-slate-950">
      <div className="landscape-back fixed left-4 top-4 z-50 sm:left-6 sm:top-6">
        <Navigasi />
      </div>
      <Story />
    </main>
  );
}
