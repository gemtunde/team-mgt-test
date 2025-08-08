import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Team Management System",
  description:
    "A comprehensive team management application built with Next.js and TypeScript",
  keywords: ["team management", "organization", "admin dashboard"],
  authors: [{ name: "Team Management App" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full antialiased`}>
        <ErrorBoundary>
          <div className="min-h-full bg-gray-50">
            <main className="container mx-auto px-4 py-8 max-w-7xl">
              {children}
            </main>
          </div>
        </ErrorBoundary>
      </body>
    </html>
  );
}
