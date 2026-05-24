import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://gabrieldemargne.com"),
  title: {
    default: "Gabriel Demargne",
    template: "%s | Gabriel Demargne",
  },
  description: "Website exploration for Gabriel Demargne.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://gabrieldemargne.com",
    siteName: "Gabriel Demargne",
    title: "Gabriel Demargne",
    description: "Website exploration for Gabriel Demargne.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gabriel Demargne",
    description: "Website exploration for Gabriel Demargne.",
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
      <body>{children}</body>
    </html>
  );
}
