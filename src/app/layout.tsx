import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Analytics } from '@vercel/analytics/next';
 
import "leaflet/dist/leaflet.css";
import ChatbotButton from "@/components/layout/ChatbotButton";
import RulebookPopup from "@/components/layout/RulebookPopup";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inter IIT Cultural Meet 8.0",
  description: "Inter IIT Cultural Meet 8.0 - Celebrating Art, Creativity, and Culture Across IITs",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-grow overflow-x-hidden">
          {children}
          <Analytics />
          <RulebookPopup />
          <ChatbotButton />
        </main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
