import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CATEGORIES, WORKERS } from "@/lib/data";
import { WorkerCard } from "@/components/WorkerCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SkillConnect AI — Find trusted local workers & artisans" },
      { name: "description", content: "Describe what you need and AI matches you with local workers across 30 categories by skill, location, availability and budget." },
      { property: "og:title", content: "SkillConnect AI — Find trusted local workers & artisans" },
      { property: "og:description", content: "AI-powered matching for 30 categories of local workers and traditional artisans." },
    ],
  }),
  component: Index,
});

const EXAMPLES = [
  "Need a plumber in Chennai on Saturday, budget ₹800",
  "Mehndi artist for a wedding in Madurai this Sunday",
  "Handloom silk saree from a weaver in Coimbatore",
];

function Index() {
  const [q, setQ] = useState("");
  const nav = useNavigate();
  const go = (query: string) => query.trim().length > 2 && nav({ to: "/find", search: { q: query } });
  const artisans = WORKERS.filter((w) => ["weaver", "goldsmith", "handicraft"].includes(w.categoryId) && w.id.endsWith("-1"));

  return (
    <div>
      <section className="bg-hero text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-20">
          <span className="inline-flex items-center gap-1 rounded-full bg-background/20 px-3 py-1 text-sm"><Sparkles className="h-4 w-4" /> AI-powered local employment</span>
          <h1 className="mt-5 max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">Tell us what you need. We'll find the right hands.</h1>
          <p className="mt-4 max-w-2xl text-lg opacity-90">Connect with plumbers, tailors, weavers, mehndi artists and 26 more trades — ranked by skill, location, availability and budget.</p>
          <form onSubmit={(e) => { e.preventDefault(); go(q); }} className="mt-8 flex max-w-2xl gap-2 rounded-2xl bg-card p-2 shadow-warm">
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. Electrician in Kochi tomorrow under ₹600" className="flex-1 bg-transparent px-3 text-foreground outline-none placeholder:text-muted-foreground" />
            <Button type="submit" size="lg">Match me <ArrowRight className="h-4 w-4" /></Button>
          </form>
          <div className="mt-4 flex flex-wrap gap-2">
            {EXAMPLES.map((e) => (
              <button key={e} onClick={() => go(e)} className="rounded-full border border-primary-foreground/40 px-3 py-1 text-sm hover:bg-background/15">{e}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="flex items-end justify-between">
          <h2 className="text-3xl font-bold">30 worker categories</h2>
          <Link to="/categories" className="text-sm font-medium text-primary">View all →</Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
          {CATEGORIES.slice(0, 10).map((c) => (
            <Link key={c.id} to="/categories" hash={c.id} className="rounded-xl border bg-card p-4 text-center hover:bg-muted">
              <div className="text-3xl">{c.emoji}</div>
              <div className="mt-2 text-sm font-medium">{c.name}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-muted/60 py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold">Featured traditional artisans</h2>
          <p className="mt-2 text-muted-foreground">Helping craftspeople showcase their work to new customers.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {artisans.map((w) => <WorkerCard key={w.id} worker={w} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
