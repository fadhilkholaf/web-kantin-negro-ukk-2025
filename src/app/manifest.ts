import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Kantin Negro",
    short_name: "Kantin Negro",
    description: "Find your perfect foods and drinks",
    orientation: "portrait",
    start_url: "/",
    icons: [
      {
        src: "/images/icons/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/images/icons/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    theme_color: "#ffffff",
    background_color: "#F4FFC3",
    display: "standalone",
  };
}
