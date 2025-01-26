import { Metadata } from "next";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

import { WithContext, WebApplication } from "schema-dts";

import { auth } from "@/lib/auth";

import LenisWrapper from "./_wrapper/LenisWrapper";

export const metadata: Metadata = {
  title: "Home",
};

const jsonLd: WithContext<WebApplication> = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Kantin Negro",
  description: "Find your perfect foods and drinks",
  url: "https://kantin.fadhilkholaf.my.id",
  creator: {
    "@type": "Person",
    name: "Muhammad Fadhil Kholaf",
    url: "https://fadhilkholaf.my.id",
  },
  applicationCategory: "FoodApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "12.000,00",
    priceCurrency: "IDR",
    description: "Find your perfect foods and drinks",
  },
  image:
    "https://kantin.fadhilkholaf.my.id/images/icons/web-app-manifest-192x192.png",
  softwareVersion: "1.0.0",
};

const MainLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();

  if (session) {
    redirect(`/${session.user.role === "siswa" ? "siswa" : "admin-stan"}`);
  }

  return (
    <>
      <LenisWrapper>{children}</LenisWrapper>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
};

export default MainLayout;
