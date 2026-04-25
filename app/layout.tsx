import { PwaServiceWorker } from "@/components/PwaServiceWorker";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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
  title: "Nuestro Himnario",
  description: "Visualiza la letra de los cantos del himnario",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col text-zinc-900 dark:text-slate-100">
        <PwaServiceWorker />
        <ThemeProvider>
          <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">
            <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
              <Link
                href="/"
                className="flex items-center gap-2 font-semibold text-zinc-900 transition-colors hover:text-zinc-700 dark:text-slate-100 dark:hover:text-slate-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-zinc-700 dark:text-slate-300"
                >
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
                Nuestro Himnario
              </Link>
              <ThemeToggle />
            </div>
          </header>
          <main className="flex flex-1 flex-col">{children}</main>
          <footer className="border-t border-zinc-200 py-7 text-center text-sm text-zinc-500 dark:border-slate-700 dark:text-slate-400">
            Nuestro Himnario — Para la gloria de Dios
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
