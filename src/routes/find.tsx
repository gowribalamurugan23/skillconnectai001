import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { understandRequest } from "@/lib/ai.functions";
import { rankWorkers, type Requirement } from "@/lib/match";
import { catById } from "@/lib/data";
import { WorkerCard } from "@/components/WorkerCard";

export const Route = createFileRoute("/find")({
  validateSearch: z.object({ q: z.string().optional() }),
  head: () => ({
    meta: [
      { title: "AI Match — SkillConnect AI" },
      { name: "description", content: "Describe your job and get ranked local workers with clear reasons and alternatives." },
      { property: "og:title", content: "AI Match — SkillConnect AI" },
      { property: "og:description", content: "Ranked worker recommendations with explanations." },
    ],
  }),
  component: Find,
});

function Find() {
  const { q } = Route.useSearch();
  const nav = useNavigate();
  const [input, setInput] = useState(q ?? "");
  const [req, setReq] = useState<Requirement | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!q) return;
    setInput(q);
    setLoading(true); setError(null); setReq(null);
    understandRequest({ data: { query: q } })
      .then((r) => (r.ok ? setReq(r.req) : setError(r.error)))
      .catch(() => setError("Something went wrong. Please try again."))
      .finally(() => setLoading(false));
  }, [q]);

  const result = req ? rankWorkers(req) : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">AI service matching</h1>
      <form onSubmit={(e) => { e.preventDefault(); if (input.trim().length > 2) nav({ to: "/find", search: { q: input } }); }} className="mt-4 flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Describe the job in your own words, in any language" className="flex-1 rounded-xl border bg-card px-4 py-3 outline-none focus:ring-2 focus:ring-ring" />
        <Button type="submit" size="lg" disabled={loading}>{loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />} Match</Button>
      </form>

      {loading && <p className="mt-8 flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Understanding your request and searching workers…</p>}
      {error && <p className="mt-8 rounded-xl bg-destructive/10 p-4 text-destructive">{error}</p>}

      {req && result && (
        <>
          <div className="mt-8 rounded-2xl border bg-secondary/50 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-sage"><Sparkles className="h-4 w-4" /> AI understood</div>
            <p className="mt-1 text-lg">{req.summary}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              <Chip label="Category" value={`${catById(req.categoryId)?.emoji} ${catById(req.categoryId)?.name}`} />
              <Chip label="Location" value={req.location ?? "Any"} />
              <Chip label="Day" value={req.day ?? "Any"} />
              <Chip label="Budget" value={req.budget ? `₹${req.budget}` : "Flexible"} />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">Ranked by skill match, location, availability, ratings and budget.</p>
          </div>

          <h2 className="mt-8 text-xl font-bold">Best matches</h2>
          {result.matches.length === 0 && <p className="mt-2 text-muted-foreground">No one is free for that slot — see alternatives below.</p>}
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {result.matches.map((m) => <WorkerCard key={m.worker.id} worker={m.worker} score={m.score} reasons={m.reasons} />)}
          </div>

          {result.alternatives.length > 0 && (
            <>
              <h2 className="mt-10 text-xl font-bold">Alternatives</h2>
              <p className="text-sm text-muted-foreground">These workers fit the skill but aren't free on your chosen day — you can request another slot.</p>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {result.alternatives.map((m) => <WorkerCard key={m.worker.id} worker={m.worker} score={m.score} reasons={m.reasons} />)}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

function Chip({ label, value }: { label: string; value: string }) {
  return <span className="rounded-full bg-card px-3 py-1"><span className="text-muted-foreground">{label}:</span> <b>{value}</b></span>;
}
