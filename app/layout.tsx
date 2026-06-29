import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "The Glass Den",
  description:
    "A modern brunch cafe housed in the historic Pentridge Prison gatehouse. Coburg, Melbourne.",
  openGraph: {
    title: "The Glass Den",
    description:
      "A modern brunch cafe housed in the historic Pentridge Prison gatehouse. Coburg, Melbourne.",
    siteName: "The Glass Den",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Glass Den",
    description:
      "A modern brunch cafe housed in the historic Pentridge Prison gatehouse. Coburg, Melbourne.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${inter.variable} h-full`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
