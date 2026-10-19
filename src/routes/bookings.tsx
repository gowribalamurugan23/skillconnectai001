import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { catById, workerById } from "@/lib/data";
import { setStatus, useBookings } from "@/lib/bookings";

export const Route = createFileRoute("/bookings")({
  head: () => ({
    meta: [
      { title: "My bookings — SkillConnect AI" },
      { name: "description", content: "Track and manage your service bookings." },
      { property: "og:title", content: "My bookings — SkillConnect AI" },
      { property: "og:description", content: "Track and manage your service bookings." },
    ],
  }),
  component: Bookings,
});

function Bookings() {
  const list = useBookings();
  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold">My bookings</h1>
      {list.length === 0 && <p className="mt-6 text-muted-foreground">No bookings yet. <Link to="/find" className="text-primary">Find a worker →</Link></p>}
      <div className="mt-6 space-y-3">
        {list.map((b) => {
          const w = workerById(b.workerId);
          if (!w) return null;
          return (
            <div key={b.id} className="flex flex-wrap items-center gap-4 rounded-2xl border bg-card p-5">
              <div className="text-3xl">{catById(w.categoryId)?.emoji}</div>
              <div className="flex-1">
                <Link to="/workers/$id" params={{ id: w.id }} className="font-semibold hover:text-primary">{w.name}</Link>
                <div className="text-sm text-muted-foreground">{catById(w.categoryId)?.name} · {b.day} at {b.time} · ₹{w.rate}</div>
                {b.note && <div className="mt-1 text-sm">“{b.note}”</div>}
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${b.status === "Confirmed" ? "bg-secondary text-secondary-foreground" : b.status === "Cancelled" ? "bg-destructive/10 text-destructive" : "bg-accent text-accent-foreground"}`}>{b.status}</span>
              {b.status === "Requested" && (
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => setStatus(b.id, "Confirmed")}>Mark confirmed</Button>
                  <Button size="sm" variant="outline" onClick={() => setStatus(b.id, "Cancelled")}>Cancel</Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
