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

export const metadata: Metadata = {
  title: {
    default: "Home | UKK Kantin 2025",
    template: "%s | UKK Kantin 2025",
  },
  description: "Ujian Kompetensi Keahlian tahun ajaran 2024/2025",
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
