import type { Metadata } from "next";
import { Geist, Geist_Mono, Italiana } from "next/font/google";
import Image from "next/image";

import { SessionProvider } from "next-auth/react";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";

import "./globals.css";

export const revalidate = 0;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  weight: ["400"],
});

const baseUrl = "https://kantin.fadhilkholaf.my.id";

export const metadata: Metadata = {
  metadataBase: new URL("/", baseUrl),
  title: { default: "Kantin Negro", template: "%s | Kantin Negro" },
  description: "Find your perfect foods and drinks",
  applicationName: "Kantin Negro",
  authors: {
    name: "Muhammad Fadhil Kholaf",
    url: "https://fadhilkholaf.my.id",
  },
  generator: "Next.js",
  keywords:
    "Kantin Negro, Kantin, Negro, SMK Telkom Malang, SMK, Telkom, Malang, UKK SMK, UKK, SMK, Ujian Kompentensi Keahlian, Moklet",
  referrer: "origin",
  creator: "Muhammad Fadhil Kholaf",
  publisher: "Vercel",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: baseUrl },
  openGraph: {
    type: "website",
    countryName: "Indonesia",
    locale: "id_ID",
    url: baseUrl,
  },
  twitter: {
    card: "summary_large_image",
    creator: "@fadhilkholaf",
  },
  appleWebApp: {
    capable: true,
    startupImage: `${baseUrl}/images/icons/web-app-manifest-192x192.png`,
    title: "Kantin Negro",
  },
  assets: `${baseUrl}/images`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.className} ${geistMono.variable} ${italiana.variable} antialiased`}
      >
        <SessionProvider>
          <NextTopLoader shadow={false} showSpinner={false} color="#b2b377" />
          <Toaster expand richColors position="bottom-center" />
          <Image
            src="/images/noise.svg"
            alt="Noise"
            width={500}
            height={500}
            priority
            className="fixed left-0 top-0 -z-50 h-full w-full object-cover contrast-50"
          />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
