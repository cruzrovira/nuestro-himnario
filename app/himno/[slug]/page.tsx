import { getAllHymns, getHymn } from "@/lib/hymns";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const hymns = getAllHymns();
  return hymns.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const hymn = getHymn(slug);

  if (!hymn) {
    return { title: "Canto no encontrado — Nuestro Himnario" };
  }

  return {
    title: `${hymn.title} — Nuestro Himnario`,
    description: `Letra de "${hymn.title}"`,
  };
}

export default async function HymnPage({ params }: Props) {
  const { slug } = await params;
  const hymn = getHymn(slug);

  if (!hymn) {
    notFound();
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 sm:py-12">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-600 transition hover:bg-zinc-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Todos los cantos
      </Link>

      <div className="mb-8 rounded-2xl border border-zinc-200 bg-white px-6 py-7 dark:border-slate-700 dark:bg-slate-900">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-slate-50 sm:text-4xl">
          {hymn.title}
        </h1>

        {hymn.page !== undefined && (
          <p className="mt-4 inline-flex rounded-md border border-zinc-200 bg-zinc-50 px-3 py-1 text-sm font-medium text-zinc-700 dark:border-slate-500 dark:bg-slate-800 dark:text-slate-200">
            Pagina del himnario: {hymn.page}
          </p>
        )}
      </div>

      <div className="prose prose-zinc max-w-none rounded-2xl border border-zinc-200 bg-white px-6 py-7 dark:prose-invert dark:border-slate-700 dark:bg-slate-900 sm:px-8 sm:py-9 [&_h2]:mb-2 [&_h2]:mt-6 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:uppercase [&_h2]:tracking-wide [&_h2]:text-zinc-800 dark:[&_h2]:text-slate-200 [&_p]:leading-8 [&_p]:text-zinc-700 dark:[&_p]:text-slate-100">
        <ReactMarkdown>{hymn.content}</ReactMarkdown>
      </div>
    </div>
  );
}
