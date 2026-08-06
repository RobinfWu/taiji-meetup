import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Chen Family Taijiquan | Gongfu Jia",
  description: "Experience traditional Chen Style Taijiquan.",
  keywords: ["Taijiquan", "Chen Style Tai Chi", "Internal Martial Arts", "Push Hands"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${jakarta.variable} scroll-smooth antialiased h-full`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FBF9F5] text-[#1F2421] selection:bg-[#4A6B5D]/20 selection:text-[#3D5A4C]">
        {children}
      </body>
    </html>
  );
}

