import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { Menu } from "lucide-react";

const inter = Inter({ subsets: ["latin"], variable: '--font-sans' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-serif' });

export const metadata: Metadata = {
  title: "Hola Spanish",
  description: "Learn Spanish Easily",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-white text-gray-900 antialiased`}>
        <div className="flex min-h-screen bg-white">
          
          {/* 1. Sidebar (Fixed Position) */}
          {/* This component floats on the left side. */}
          <div className="hidden lg:block z-40">
             <Suspense fallback={null}>
                <Sidebar />
             </Suspense>
          </div>

          {/* 2. Main Content Wrapper */}
          {/* lg:pl-72 ensures content ALWAYS stays to the right of the full sidebar width (288px),
              even if the sidebar itself collapses visually. */}
          <div className="flex-1 flex flex-col min-w-0 bg-white lg:pl-72 transition-all duration-300">
            
            {/* Mobile Header */}
            <header className="lg:hidden sticky top-0 z-20 bg-white/80 backdrop-blur border-b border-gray-100 px-4 h-14 flex items-center justify-between">
              <span className="font-serif font-bold text-lg text-gray-900">Hola Spanish</span>
              <button className="p-2 text-gray-500">
                <Menu size={20} />
              </button>
            </header>

            {/* Page Content */}
            <main className="flex-1">
               <div className="max-w-[1400px] mx-auto p-6 md:p-10 lg:p-12 animate-in fade-in duration-300 w-full">
                 {children}
               </div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
