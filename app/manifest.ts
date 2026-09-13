import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Arief Hidayat Portfolio",
    short_name: "Arief Portfolio",
    description: "Portfolio, skills, dan perjalanan Arief Hidayat.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "landscape",
    background_color: "#020617",
    theme_color: "#020617",
    icons: [{ src: "/favicon.ico", sizes: "any", type: "image/x-icon" }],
  };
}
