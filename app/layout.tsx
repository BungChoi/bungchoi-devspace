import type { Metadata, Viewport } from "next";
import "./globals.css";

import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: SITE_CONFIG.title,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "portfolio",
    "mobile developer",
    "flutter developer",
    "react native",
    "web developer",
    "BungChoi",
  ],
  authors: [{ name: SITE_CONFIG.author }],
  creator: SITE_CONFIG.author,
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
};

// Root layout - minimal wrapper, locale-specific layout handles the rest
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
