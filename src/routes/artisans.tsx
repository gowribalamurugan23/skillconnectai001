import { createFileRoute } from "@tanstack/react-router";
import { CATEGORIES, WORKERS } from "@/lib/data";
import { WorkerCard } from "@/components/WorkerCard";

export const Route = createFileRoute("/artisans")({
  head: () => ({
    meta: [
      { title: "Traditional artisans — SkillConnect AI" },
      { name: "description", content: "Discover weavers, goldsmiths, sculptors and other traditional craftspeople near you." },
      { property: "og:title", content: "Traditional artisans — SkillConnect AI" },
      { property: "og:description", content: "Showcasing traditional craftsmanship." },
    ],
  }),
  component: Artisans,
});

function Artisans() {
  const ids = CATEGORIES.filter((c) => c.artisan).map((c) => c.id);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Traditional artisans</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">Handloom weavers, goldsmiths, sculptors, beekeepers and more — order custom work directly from the makers.</p>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {WORKERS.filter((w) => ids.includes(w.categoryId)).map((w) => <WorkerCard key={w.id} worker={w} />)}
      </div>
    </div>
  );
}
