import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PulseBlog | Modern SSG & SSR Next.js App",
  description: "Next.js Blog application showcasing SSG with local data and SSR dynamic post routing from dummyjson API.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-indigo-500 selection:text-white">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <footer className="border-t border-zinc-200 dark:border-zinc-800/80 py-8 mt-16 bg-white dark:bg-zinc-950 transition-colors">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
            <p className="flex items-center justify-center gap-2">
              Built with Next.js App Router • SSG & SSR Demo • Data powered by{" "}
              <a
                href="https://dummyjson.com"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                DummyJSON
              </a>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
