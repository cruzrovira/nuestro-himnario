import { HymnSearch } from "@/components/HymnSearch";
import { getAllHymns } from "@/lib/hymns";

export default function Home() {
  const hymns = getAllHymns();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-10 rounded-2xl border border-zinc-200 bg-white px-4 py-6 dark:border-slate-700 dark:bg-slate-900 sm:px-6 sm:py-8 md:px-8 md:py-10">
        <p className="mb-3 text-xs font-semibold tracking-wide text-zinc-500 dark:text-slate-400">
          Letras para congregar y cantar
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-slate-50 sm:text-3xl md:text-5xl">
          Nuestro Himnario
        </h1>
        <p className="mt-3  text-zinc-600 dark:text-slate-200 sm:text-lg">
          Es una recopilación de himnos para la adoración y alabanza al Señor,
          con el propósito de facilitar la congregación y el canto en la
          iglesia.
          <br />
          <i>
            “Alabadle con pandero y danza; alabadle con cuerdas y flautas.”
            Salmos 150:4
          </i>
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 sm:p-5 md:p-7">
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
