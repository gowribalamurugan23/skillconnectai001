import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { useAccount } from '@/lib/accounts';

const links = [
  { to: "/find", label: "AI Match" },
  { to: "/categories", label: "Categories" },
  { to: "/artisans", label: "Artisans" },
  { to: "/bookings", label: "My Bookings" },
] as const;

export function SiteHeader() {
  const {user,role}=useAccount();
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-hero text-primary-foreground">
            <Sparkles className="h-4 w-4" />
          </span>
          SkillConnect<span className="text-primary">AI</span>
        </Link>
        <nav className="flex gap-1 overflow-x-auto text-sm font-medium">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="whitespace-nowrap rounded-full px-3 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
              activeProps={{ className: "bg-secondary text-secondary-foreground" }}
            >
              {l.label}
            </Link>
          ))}
          {role==='worker'&&<Link to="/register-worker" className="whitespace-nowrap px-3 py-1.5 text-primary">Worker dashboard</Link>}
          <Link to="/auth" className="whitespace-nowrap px-3 py-1.5 text-primary">{user?'Account':'Sign in'}</Link>
        </nav>
      </div>
    </header>
  );
}
