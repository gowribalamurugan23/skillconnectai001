import { z } from 'zod';
import { CATEGORIES, DAYS } from './data';
export const PHOTO_LIMIT = 6;
export const PHOTO_BYTES = 2 * 1024 * 1024;
export const MESSAGE_LIMIT = 20;
export const TOOL_ITERATIONS = 6;
export const registrationSchema = z.object({
  name: z.string().trim().min(1), phone: z.string().regex(/^\d{10}$/, 'Enter a 10-digit phone number'),
  city: z.string().trim().min(1), area: z.string().trim().min(1),
  categoryId: z.string().refine(v => CATEGORIES.some(c => c.id === v)),
  rate: z.coerce.number().min(0), years: z.coerce.number().int().min(0),
  bio: z.string().max(300), languages: z.string().min(1), skills: z.string().min(1),
  available: z.array(z.enum(DAYS as [string, ...string[]])).min(1),
  agreement: z.literal(true, { error: 'You must agree before registering' }),
});
export function validatePhotos(files: File[]) {
  if (files.length > PHOTO_LIMIT) throw new Error('Choose at most 6 photos');
  if (files.some(f => f.size > PHOTO_BYTES)) throw new Error('Each photo must be 2 MB or smaller');
  if (files.some(f => !['image/jpeg','image/png','image/webp'].includes(f.type))) throw new Error('Use JPG, PNG or WebP photos');
}
export function canChangeBooking(role: string, current: string, next: string) {
  if (role === 'customer') return ['Requested','Confirmed'].includes(current) && next === 'Cancelled';
  return role === 'worker' && current === 'Requested' && ['Confirmed','Declined'].includes(next);
}