import { ReactNode } from "react";

import type { Metadata, Viewport } from "next";
import { Inter, Oxanium } from "next/font/google";

import "./global.css";

const oxanium = Oxanium({
  weight: ["500", "600"],
  subsets: ["latin"],
  variable: "--font-oxanium",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    template: "%s | NeXTverso",
    default: "NeXTverso",
  },
  description: "",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${oxanium.variable} ${inter.variable}`}
      data-theme="dark"
    >
      <body className="bg-white dark:bg-black">
        <main className="relative min-h-screen">{children}</main>
      </body>
    </html>
  );
}
