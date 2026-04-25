"use client";

import type { HymnMeta } from "@/lib/hymns";
import Link from "next/link";
import { useState } from "react";

interface HymnSearchProps {
  hymns: HymnMeta[];
}

const PAGE_SIZE = 10;

export function HymnSearch({ hymns }: HymnSearchProps) {
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const normalizedQuery = query.trim().toLowerCase();

  const filtered = hymns.filter((h) => {
    const matchesTitle = h.title.toLowerCase().includes(normalizedQuery);
    const matchesPage = h.page?.toString().includes(normalizedQuery) ?? false;

    return normalizedQuery.length === 0 || matchesTitle || matchesPage;
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * PAGE_SIZE;
  const paginated = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  return (
    <div className="w-full">
      <div className="relative mb-8">
        <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-zinc-500 dark:text-slate-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Buscar por nombre o pagina..."
          className="w-full rounded-xl border border-zinc-200 bg-white py-3.5 pl-11 pr-4 text-zinc-900 placeholder-zinc-400 outline-none ring-0 transition focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200 dark:border-slate-600 dark:bg-slate-800 dark:text-zinc-100 dark:placeholder-slate-400 dark:focus:border-slate-400 dark:focus:ring-slate-700"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-zinc-500 dark:text-slate-200">
          No se encontraron cantos para &quot;{query}&quot;.
        </p>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {paginated.map((hymn) => (
            <li key={hymn.slug} className="w-full overflow-hidden">
              <Link
                href={`/himno/${hymn.slug}`}
                className="group flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-5 py-4 text-zinc-900 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:border-slate-500 dark:hover:bg-slate-700"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 transition dark:bg-slate-700 dark:text-slate-200">
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
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                </span>
                <span className="flex min-w-0 flex-1 items-center justify-between gap-3">
                  <span className="truncate font-medium">{hymn.title}</span>
                  {hymn.page !== undefined && (
                    <span className="shrink-0 rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs font-semibold text-zinc-600 dark:border-slate-500 dark:bg-slate-700 dark:text-slate-200">
                      Pag. {hymn.page}
                    </span>
                  )}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {filtered.length > 0 && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => goToPage(safePage - 1)}
            disabled={safePage === 1}
            className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            Anterior
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => goToPage(page)}
              className={`rounded-md px-3 py-1.5 text-sm transition ${
                page === safePage
                  ? "bg-zinc-900 text-white dark:bg-slate-200 dark:text-slate-900"
                  : "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              }`}
              aria-current={page === safePage ? "page" : undefined}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            onClick={() => goToPage(safePage + 1)}
            disabled={safePage === totalPages}
            className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-700 transition hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
          >
            Siguiente
          </button>
        </div>
      )}

      <p className="mt-6 text-center text-sm text-zinc-500 dark:text-slate-300">
        Mostrando {filtered.length === 0 ? 0 : startIndex + 1} -{" "}
        {Math.min(startIndex + PAGE_SIZE, filtered.length)} de {filtered.length}{" "}
        {filtered.length === 1 ? "canto" : "cantos"}
      </p>
    </div>
  );
}
