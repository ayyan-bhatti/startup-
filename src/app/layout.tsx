import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap", variable: "--font-body", adjustFontFallback: true });
/** Used only inside terminal-style windows. */
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400"], display: "swap", variable: "--font-mono-face" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "software development company",
    "website development company",
    "app development company",
    "custom software development",
    "iOS and Android app development",
    "AI automation agency",
    "SEO services",
    "branding agency",
    "3D website design",
    "interactive website development",
  ],
  openGraph: {
    type: "website",
    siteName: siteConfig.name,
    locale: siteConfig.locale,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f5f5f5",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${mono.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col font-sans">
        {/* Home is laid out on a 1440px canvas; on narrower desktops it is zoomed to fit, set before first paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){var r=document.documentElement;function f(){r.style.setProperty('--z',String(Math.min(1,window.innerWidth/1440)))}f();window.addEventListener('resize',f)})()",
          }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-on-accent"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <SmoothScroll />
      </body>
    </html>
  );
}
