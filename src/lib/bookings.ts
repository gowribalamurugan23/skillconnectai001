import { useEffect, useState } from "react";

export type Booking = { id: string; workerId: string; day: string; time: string; note: string; status: "Requested" | "Confirmed" | "Cancelled"; createdAt: string };
const KEY = "skillconnect-bookings";

function read(): Booking[] {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}

export function addBooking(b: Omit<Booking, "id" | "status" | "createdAt">) {
  const all = read();
  all.unshift({ ...b, id: crypto.randomUUID(), status: "Requested", createdAt: new Date().toISOString() });
  localStorage.setItem(KEY, JSON.stringify(all));
  window.dispatchEvent(new Event(KEY));
}

export function setStatus(id: string, status: Booking["status"]) {
  localStorage.setItem(KEY, JSON.stringify(read().map((b) => (b.id === id ? { ...b, status } : b))));
  window.dispatchEvent(new Event(KEY));
}

export function useBookings() {
  const [list, setList] = useState<Booking[]>([]);
  useEffect(() => {
    const sync = () => setList(read());
    sync();
    window.addEventListener(KEY, sync);
    return () => window.removeEventListener(KEY, sync);
  }, []);
  return list;
}
