import type { Metadata } from "next";
import { DotGothic16 } from "next/font/google";
import "./globals.css";

const dotGothic = DotGothic16({
  variable: "--font-dot-gothic",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "酔いどれ注文ミスゲーム",
  description: "AI客のムチャぶり注文に、最高の酒と肴で応えろ。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${dotGothic.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
