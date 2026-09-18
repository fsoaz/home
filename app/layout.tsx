import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://fsoaz.github.io/home/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Francisco Micael — Backend & AI Engineer",
  description: "Backend and AI engineer building dependable systems, applied AI products, and thoughtful interfaces.",
  applicationName: "Francisco Micael Portfolio",
  authors: [{ name: "Francisco Micael", url: "https://github.com/fsoaz" }],
  keywords: ["Backend Engineer", "AI Engineer", "Python", "FastAPI", "Next.js", "Brazil"],
  alternates: { canonical: siteUrl },
  openGraph: { type: "website", url: siteUrl, title: "Francisco Micael — Backend & AI Engineer", description: "Dependable backend systems, applied AI, and thoughtful product engineering.", siteName: "Francisco Micael", locale: "en_US", alternateLocale: "pt_BR", images: [{ url: `${siteUrl}opengraph-image.png`, width: 1200, height: 630, alt: "Francisco Micael — Backend & AI Engineer" }] },
  twitter: { card: "summary_large_image", title: "Francisco Micael — Backend & AI Engineer", description: "Dependable backend systems, applied AI, and thoughtful product engineering.", images: [`${siteUrl}opengraph-image.png`] },
  icons: { icon: `${siteUrl}favicon.svg` },
};

export const viewport: Viewport = { themeColor: "#050505", colorScheme: "dark", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
