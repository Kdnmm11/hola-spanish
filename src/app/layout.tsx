import React, { Suspense } from "react";
import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

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
      <body className="font-sans bg-white text-gray-900 antialiased">
        <ClientLayout>
            <Suspense fallback={null}>
                {children}
            </Suspense>
        </ClientLayout>
      </body>
    </html>
  );
}
