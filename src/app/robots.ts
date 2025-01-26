import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/signup", "/signin"],
        disallow: ["/siswa", "/admin-stan", "/profile"],
      },
    ],
    sitemap: "https://kantin.fadhilkholaf.my.id/sitemap.xml",
    host: "https://kantin.fadhilkholaf.my.id",
  };
}
