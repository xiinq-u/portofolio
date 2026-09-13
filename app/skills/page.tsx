import type { Metadata } from "next";
import Skills from "../components/skills";

export const metadata: Metadata = {
  title: "Skills | Portfolio",
  description: "Keahlian dan perjalanan belajar dalam pengembangan web dan desain.",
};

export default function SkillsPage() {
  return <Skills />;
}
