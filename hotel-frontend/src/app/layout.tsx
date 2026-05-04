import type { Metadata } from "next";
import "./globals.css";
import { SITE } from "@/data";

export const metadata: Metadata = {
  title: `${SITE.name} | Five-Star Hotel by the Pyramids of Giza`,
  description:
    "Royal Crown Hotel - Pyramids: panoramic suites overlooking the Great Pyramid of Giza, rooftop pool, fine dining and curated Egyptian experiences.",
  metadataBase: new URL("https://royalcrownhotelpyramids.com"),
  openGraph: {
    title: SITE.name,
    description: SITE.tagline,
    images: ["/images/sphinx.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
