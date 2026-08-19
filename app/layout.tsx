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
      <body className="min-h-full flex flex-col font-sans bg-[#E8E4DA] text-[#171918] selection:bg-[#9B3D2E]/15 selection:text-[#9B3D2E]">
        {children}
      </body>
    </html>
  );
}

