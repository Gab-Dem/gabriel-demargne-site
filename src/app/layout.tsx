import type { Metadata, Viewport } from "next";
import { ImageProtection } from "@/components/image-protection";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://gabrieldemargne.com"),
  title: {
    default: "Gabriel Demargne",
    template: "%s | Gabriel Demargne",
  },
  description:
    "Independent designer and consultant specialising in website design, UX, research, strategy, and photography.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://gabrieldemargne.com",
    siteName: "Gabriel Demargne",
    title: "Gabriel Demargne",
    description:
      "Independent designer and consultant specialising in website design, UX, research, strategy, and photography.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriel Demargne",
    description:
      "Independent designer and consultant specialising in website design, UX, research, strategy, and photography.",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ImageProtection />
        {children}
      </body>
    </html>
  );
}
