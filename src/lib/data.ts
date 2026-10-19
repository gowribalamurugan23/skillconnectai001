export type Category = { id: string; name: string; emoji: string; artisan?: boolean };

export const CATEGORIES: Category[] = [
  { id: "driver", name: "Driver", emoji: "🚗" },
  { id: "plumber", name: "Plumber", emoji: "🔧" },
  { id: "carpenter", name: "Carpenter", emoji: "🪚" },
  { id: "loader", name: "Delivery Loader", emoji: "📦" },
  { id: "mehndi", name: "Beauty & Mehndi Artist", emoji: "🌿", artisan: true },
  { id: "repair", name: "Repair Technician", emoji: "🛠️" },
  { id: "photographer", name: "Photographer", emoji: "📷" },
  { id: "painter", name: "Painter", emoji: "🎨" },
  { id: "cleaner", name: "Cleaner", emoji: "🧹" },
  { id: "electrician", name: "Electrician", emoji: "💡" },
  { id: "tailor", name: "Tailor", emoji: "🧵", artisan: true },
  { id: "caregiver", name: "Caregiver", emoji: "🤝" },
  { id: "catering", name: "Catering Worker", emoji: "🍲" },
  { id: "construction", name: "Construction Worker", emoji: "🏗️" },
  { id: "goldsmith", name: "Goldsmith", emoji: "💍", artisan: true },
  { id: "handicraft", name: "Handicraft Artisan", emoji: "🏺", artisan: true },
  { id: "weaver", name: "Handloom Weaver", emoji: "🧶", artisan: true },
  { id: "gardener", name: "Gardener", emoji: "🌱" },
  { id: "beekeeper", name: "Beekeeper", emoji: "🐝", artisan: true },
  { id: "laundry", name: "Laundry Worker", emoji: "👕" },
  { id: "wedding", name: "Wedding Planner", emoji: "💐" },
  { id: "welder", name: "Welder", emoji: "⚙️" },
  { id: "pest", name: "Pest Control", emoji: "🪲" },
  { id: "event", name: "Event Services", emoji: "🎪" },
  { id: "dairy", name: "Dairy Worker", emoji: "🥛" },
  { id: "decorator", name: "Decorator", emoji: "🎀" },
  { id: "musician", name: "Musician", emoji: "🎶", artisan: true },
  { id: "sculptor", name: "Sculptor", emoji: "🗿", artisan: true },
  { id: "tutor", name: "Tutor", emoji: "📚" },
  { id: "entrepreneur", name: "Local Entrepreneur", emoji: "🏪" },
];

export const LOCATIONS = ["Chennai", "Coimbatore", "Madurai", "Bengaluru", "Hyderabad", "Kochi"];
export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export type Worker = {
  id: string;
  name: string;
  categoryId: string;
  location: string;
  rating: number;
  reviews: number;
  rate: number; // INR per job/visit
  years: number;
  available: string[];
  verified: boolean;
  languages: string[];
  skills: string[];
  bio: string;
};

const FIRST = ["Arun", "Priya", "Karthik", "Lakshmi", "Ravi", "Meena", "Suresh", "Anitha", "Vijay", "Kavya", "Murugan", "Divya", "Rahul", "Fatima", "Joseph", "Sneha", "Ganesh", "Revathi", "Imran", "Selvi"];
const LAST = ["Kumar", "Raj", "Devi", "Nair", "Reddy", "Iyer", "Pillai", "Khan", "Das", "Babu"];
const LANGS = [["Tamil", "English"], ["Tamil"], ["Hindi", "English"], ["Telugu", "English"], ["Malayalam", "Tamil"], ["Kannada", "English"]];

// Deterministic pseudo-random so SSR and browser agree.
function rng(seed: number) {
  let s = seed;
  return () => ((s = (s * 9301 + 49297) % 233280) / 233280);
}

export const WORKERS: Worker[] = CATEGORIES.flatMap((c, ci) =>
  [0, 1, 2].map((k) => {
    const r = rng(ci * 31 + k * 7 + 3);
    const name = `${FIRST[(ci * 3 + k) % FIRST.length]!} ${LAST[(ci + k * 3) % LAST.length]!}`;
    const available = DAYS.filter(() => r() > 0.4);
    return {
      id: `${c.id}-${k + 1}`,
      name,
      categoryId: c.id,
      location: LOCATIONS[(ci + k * 2) % LOCATIONS.length]!,
      rating: Math.round((3.6 + r() * 1.4) * 10) / 10,
      reviews: 8 + Math.floor(r() * 220),
      rate: Math.round((300 + r() * 1400) / 50) * 50,
      years: 2 + Math.floor(r() * 25),
      available: k === 2 ? [] : available.length ? available : ["Sat"],
      verified: r() > 0.3,
      languages: LANGS[(ci + k) % LANGS.length]!,
      skills: [`${c.name} services`, k === 0 ? "Emergency visits" : "Scheduled work", c.artisan ? "Custom orders" : "Home visits"],
      bio: c.artisan
        ? `Traditional ${c.name.toLowerCase()} carrying forward family craftsmanship, open to custom commissions.`
        : `Experienced ${c.name.toLowerCase()} serving households and businesses with reliable, honest work.`,
    };
  }),
);

export const catById = (id: string) => CATEGORIES.find((c) => c.id === id);
export const workerById = (id: string) => WORKERS.find((w) => w.id === id);
