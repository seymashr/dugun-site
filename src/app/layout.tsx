import type { Metadata } from "next";
import {
  Great_Vibes,
  Cormorant_Garamond,
} from "next/font/google";
import "./globals.css";

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: "Sabiha & Görkem",
  description: "Düğün Davetiyesi",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${greatVibes.variable} ${cormorant.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}