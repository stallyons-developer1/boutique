import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import SnapScroll from "@/components/shared/SnapScroll";
import BottomPrompt from "@/components/shared/BottomPrompt";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Maison — Boutique Fashion",
    template: "%s · Maison",
  },
  description:
    "Curated boutique fashion. Timeless pieces, crafted with care.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="bg-background font-sans text-foreground">
        <Navbar />
        <SnapScroll>{children}</SnapScroll>
        <BottomPrompt />
      </body>
    </html>
  );
}
