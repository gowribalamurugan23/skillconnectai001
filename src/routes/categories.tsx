import { createFileRoute } from "@tanstack/react-router";
import { CATEGORIES, WORKERS } from "@/lib/data";
import { WorkerCard } from "@/components/WorkerCard";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "All 30 categories — SkillConnect AI" },
      { name: "description", content: "Browse local workers across 30 trades from plumbers to goldsmiths." },
      { property: "og:title", content: "All 30 categories — SkillConnect AI" },
      { property: "og:description", content: "Browse local workers across 30 trades." },
    ],
  }),
  component: Categories,
});

function Categories() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">All categories</h1>
      <div className="mt-4 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => <a key={c.id} href={`#${c.id}`} className="rounded-full border bg-card px-3 py-1 text-sm hover:bg-muted">{c.emoji} {c.name}</a>)}
      </div>
      {CATEGORIES.map((c) => (
        <section key={c.id} id={c.id} className="scroll-mt-20 pt-10">
          <h2 className="text-xl font-bold">{c.emoji} {c.name}</h2>
          <div className="mt-3 grid gap-4 md:grid-cols-3">
            {WORKERS.filter((w) => w.categoryId === c.id).map((w) => <WorkerCard key={w.id} worker={w} />)}
          </div>
        </section>
      ))}
    </div>
  );
}
