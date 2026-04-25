import { HymnSearch } from "@/components/HymnSearch";
import { getAllHymns } from "@/lib/hymns";

export default function Home() {
  const hymns = getAllHymns();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-10 rounded-2xl border border-zinc-200 bg-white px-6 py-8 dark:border-slate-700 dark:bg-slate-900 sm:px-8 sm:py-10">
        <p className="mb-3 text-xs font-semibold tracking-wide text-zinc-500 dark:text-slate-400">
          Letras para congregar y cantar
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-slate-50 sm:text-5xl">
          Nuestro Himnario
        </h1>
        <p className="mt-3 max-w-2xl text-zinc-600 dark:text-slate-200 sm:text-lg">
          Busca por nombre o pagina y encuentra rapido cada canto con una
          lectura clara, limpia y agradable en cualquier tema.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900 sm:p-7">
        <h2 className="mb-4 text-lg font-semibold text-zinc-800 dark:text-slate-100">
          Explora cantos
        </h2>
        <p className="mb-6 text-sm text-zinc-600 dark:text-slate-300">
          {hymns.length}{" "}
          {hymns.length === 1 ? "canto disponible" : "cantos disponibles"}
        </p>
        <HymnSearch hymns={hymns} />
      </div>
    </div>
  );
}
