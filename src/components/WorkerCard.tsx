import { Link } from "@tanstack/react-router";
import { BadgeCheck, MapPin, Star } from "lucide-react";
import { catById, type Worker } from "@/lib/data";

export function WorkerCard({ worker, score, reasons }: { worker: Worker; score?: number; reasons?: string[] }) {
  const cat = catById(worker.categoryId);
  return (
    <Link
      to="/workers/$id"
      params={{ id: worker.id }}
      className="group flex flex-col gap-3 rounded-2xl border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-warm"
    >
      <div className="flex items-start gap-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-muted text-2xl">{cat?.emoji}</div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 font-semibold">
            {worker.name}
            {worker.verified && <BadgeCheck className="h-4 w-4 text-sage" />}
          </div>
          <div className="text-sm text-muted-foreground">{cat?.name} · {worker.years} yrs</div>
        </div>
        {score != null && (
          <div className="rounded-full bg-secondary px-2.5 py-1 text-xs font-bold text-secondary-foreground">{score}% match</div>
        )}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{worker.location}</span>
        <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-accent text-primary" />{worker.rating} ({worker.reviews})</span>
        <span className="font-semibold text-primary">₹{worker.rate}</span>
      </div>
      {reasons && (
        <ul className="flex flex-wrap gap-1.5">
          {reasons.map((r) => (
            <li key={r} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">{r}</li>
          ))}
        </ul>
      )}
      <div className="text-xs text-muted-foreground">
        {worker.available.length ? `Available: ${worker.available.join(", ")}` : "Fully booked this week"}
      </div>
    </Link>
  );
}
