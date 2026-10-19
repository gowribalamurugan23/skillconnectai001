import { WORKERS, type Worker } from "./data";

export type Requirement = {
  categoryId: string;
  location: string | null;
  budget: number | null;
  day: string | null;
  summary: string;
};

export type Ranked = { worker: Worker; score: number; reasons: string[]; available: boolean };

/** Score = skill match + location + availability + rating + budget fit (0-100). */
export function rankWorkers(req: Requirement): { matches: Ranked[]; alternatives: Ranked[] } {
  const scored = WORKERS.filter((w) => w.categoryId === req.categoryId).map((w) => {
    const reasons: string[] = [];
    let score = 30;
    const available = req.day ? w.available.includes(req.day) : w.available.length > 0;
    if (req.location && w.location.toLowerCase() === req.location.toLowerCase()) {
      score += 25;
      reasons.push(`Based in ${w.location}`);
    }
    if (available) {
      score += 20;
      reasons.push(req.day ? `Free on ${req.day}` : "Has open slots this week");
    }
    score += Math.round((w.rating / 5) * 15);
    if (w.rating >= 4.5) reasons.push(`Top rated ${w.rating}★`);
    if (req.budget != null) {
      if (w.rate <= req.budget) {
        score += 10;
        reasons.push(`Within budget (₹${w.rate})`);
      } else reasons.push(`₹${w.rate - req.budget} over budget`);
    }
    if (w.verified) reasons.push("Verified");
    return { worker: w, score: Math.min(100, score), reasons, available };
  });
  scored.sort((a, b) => b.score - a.score);
  return { matches: scored.filter((s) => s.available), alternatives: scored.filter((s) => !s.available) };
}
