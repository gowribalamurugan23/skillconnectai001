import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { BadgeCheck, MapPin, Star, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { catById, workerById, WORKERS } from "@/lib/data";
import { addBooking } from "@/lib/bookings";
import { WorkerCard } from "@/components/WorkerCard";

export const Route = createFileRoute("/workers/$id")({
  loader: ({ params }) => {
    const worker = workerById(params.id);
    if (!worker) throw notFound();
    return { worker };
  },
  head: ({ loaderData }) => {
    const t = loaderData ? `${loaderData.worker.name} — ${catById(loaderData.worker.categoryId)?.name} | SkillConnect AI` : "Worker | SkillConnect AI";
    return { meta: [{ title: t }, { name: "description", content: loaderData?.worker.bio ?? "Worker profile" }, { property: "og:title", content: t }, { property: "og:description", content: loaderData?.worker.bio ?? "Worker profile" }] };
  },
  notFoundComponent: () => <div className="p-10 text-center">Worker not found. <Link to="/" className="text-primary">Go home</Link></div>,
  component: Profile,
});

const TIMES = ["9:00 AM", "11:00 AM", "2:00 PM", "5:00 PM"];

function Profile() {
  const { worker } = Route.useLoaderData();
  const cat = catById(worker.categoryId)!;
  const [day, setDay] = useState(worker.available[0] ?? "");
  const [time, setTime] = useState<string>(TIMES[0] ?? "9:00 AM");
  const [note, setNote] = useState("");
  const alts = WORKERS.filter((w) => w.categoryId === worker.categoryId && w.id !== worker.id && w.available.length);

  const book = () => {
    addBooking({ workerId: worker.id, day, time, note });
    toast.success(`Booking request sent to ${worker.name} for ${day} at ${time}`);
    setNote("");
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-8 md:grid-cols-[1fr_360px]">
        <div>
          <div className="flex items-center gap-4">
            <div className="grid h-20 w-20 place-items-center rounded-2xl bg-muted text-4xl">{cat.emoji}</div>
            <div>
              <h1 className="flex items-center gap-2 text-3xl font-bold">{worker.name}{worker.verified && <BadgeCheck className="h-6 w-6 text-sage" />}</h1>
              <p className="text-muted-foreground">{cat.name} · {worker.years} years experience</p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-4 text-sm">
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{worker.location}</span>
            <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-accent text-primary" />{worker.rating} · {worker.reviews} reviews</span>
            <span className="flex items-center gap-1"><Languages className="h-4 w-4" />{worker.languages.join(", ")}</span>
          </div>
          <p className="mt-6 text-lg">{worker.bio}</p>
          <h2 className="mt-8 text-xl font-bold">Skills</h2>
          <div className="mt-2 flex flex-wrap gap-2">{worker.skills.map((s) => <span key={s} className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground">{s}</span>)}</div>
          <h2 className="mt-8 text-xl font-bold">Portfolio</h2>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {[1, 2, 3].map((i) => <div key={i} className="grid aspect-square place-items-center rounded-xl bg-hero text-5xl opacity-90">{cat.emoji}</div>)}
          </div>
        </div>

        <aside className="h-fit rounded-2xl border bg-card p-6 shadow-warm md:sticky md:top-20">
          <div className="text-2xl font-bold text-primary">₹{worker.rate}<span className="text-sm font-normal text-muted-foreground"> / visit</span></div>
          {worker.available.length ? (
            <>
              <p className="mt-4 text-sm font-medium">Choose a day</p>
              <div className="mt-2 flex flex-wrap gap-2">{worker.available.map((d) => <button key={d} onClick={() => setDay(d)} className={`rounded-lg border px-3 py-1.5 text-sm ${day === d ? "border-primary bg-primary text-primary-foreground" : ""}`}>{d}</button>)}</div>
              <p className="mt-4 text-sm font-medium">Time</p>
              <div className="mt-2 grid grid-cols-2 gap-2">{TIMES.map((t) => <button key={t} onClick={() => setTime(t)} className={`rounded-lg border px-3 py-1.5 text-sm ${time === t ? "border-primary bg-primary text-primary-foreground" : ""}`}>{t}</button>)}</div>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Describe the job (optional)" className="mt-4 w-full rounded-lg border bg-background p-3 text-sm" rows={3} />
              <Button className="mt-4 w-full" size="lg" onClick={book}>Request booking</Button>
            </>
          ) : (
            <p className="mt-4 rounded-lg bg-muted p-3 text-sm">Fully booked this week. Try one of the alternatives below.</p>
          )}
        </aside>
      </div>

      {alts.length > 0 && (
        <section className="mt-14">
          <h2 className="text-xl font-bold">Similar {cat.name.toLowerCase()}s available</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">{alts.map((w) => <WorkerCard key={w.id} worker={w} />)}</div>
        </section>
      )}
    </div>
  );
}
