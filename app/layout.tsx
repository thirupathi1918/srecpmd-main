import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AdminHeader from "@/components/AdminHeader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Control Dashboard",
  description: "Inventory management dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[var(--color-background)]">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased page-enter`}
      >
        <div className="min-h-screen flex flex-col">
          <AdminHeader />

          <main className="flex-1 p-3 md:p-6">
            <div className="max-w-6xl mx-auto panel-card">
              {children}
            </div>
          </main>

          <footer className="text-center text-sm py-3 text-[var(--color-muted)]">
            Dashboard Center © 2025
          </footer>
        </div>
      </body>
    </html>
  );
}
