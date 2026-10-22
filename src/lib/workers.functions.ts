import { createServerFn } from '@tanstack/react-start';
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/integrations/supabase/types';
import type { Worker } from './data';
export const listWorkers = createServerFn({method:'GET'}).handler(async () => {
  const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
  const url = process.env['SUPABASE_URL'];
  if(!key || !url) throw new Error('Worker directory is not configured');
  const client = createClient<Database>(url,key,{auth:{persistSession:false,autoRefreshToken:false},global:{fetch:(input,init)=>{
    const headers = new Headers(init?.headers);
    if(key.startsWith('sb_') && headers.get('Authorization')===`Bearer ${key}`) headers.delete('Authorization');
    headers.set('apikey',key);return fetch(input,{...init,headers});
  }}});
  const {data,error} = await client.from('workers').select('*').order('name');
  if(error) throw new Error('The worker directory could not load');
  const rows: Worker[] = await Promise.all((data??[]).map(async w=>{
    const portfolio = await Promise.all(w.portfolio.map(async path=>{
      const r = await client.storage.from('worker-portfolio').createSignedUrl(path,3600);
      return r.data?.signedUrl ?? '';
    }));
    return {id:w.id,name:w.name,categoryId:w.category_id,location:w.city,rate:Number(w.rate),years:w.years,bio:w.bio,
      rating:Number(w.rating),reviews:w.reviews,verified:w.verified,languages:w.languages,skills:w.skills,available:w.available,
      timeSlots:w.time_slots,portfolio:portfolio.filter(Boolean),isSample:w.is_sample,area:w.area,unit:w.unit};
  }));
  return rows;
});