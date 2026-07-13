import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NADZ Healthcare",
    short_name: "NADZ",
    description:
      "NADZ Healthcare — your family doctor at home in Dubai. Doctor on call, nursing, IV drips, labs and more.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#6C2A37",
    icons: [
      { src: "/assets/192.png", sizes: "192x192", type: "image/png" },
      { src: "/assets/512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
