import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

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
        className={`${geistSans.className} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <NextTopLoader shadow={false} showSpinner={false} />
        <Toaster expand richColors />
        {children}
        <Footer />
      </body>
    </html>
  );
}
