import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
type Role = 'customer' | 'worker';
type Account = { user: User | null; role: Role | null; loading: boolean; refresh: () => Promise<void> };
const AccountContext = createContext<Account>({user:null,role:null,loading:true,refresh:async()=>{}});
export function AccountProvider({children}:{children:ReactNode}) {
  const [user,setUser] = useState<User|null>(null);
  const [role,setRole] = useState<Role|null>(null);
  const [loading,setLoading] = useState(true);
  const refresh = async () => {
    const {data} = await supabase.auth.getUser();
    setUser(data.user);
    if(data.user) {
      const result = await supabase.from('user_roles').select('role').eq('user_id',data.user.id).maybeSingle();
      setRole(result.data?.role ?? null);
    } else setRole(null);
    setLoading(false);
  };
  useEffect(()=>{ void refresh(); const {data} = supabase.auth.onAuthStateChange(event=>{
    if(['SIGNED_IN','SIGNED_OUT','USER_UPDATED'].includes(event)) setTimeout(()=>void refresh(),0);
  });return ()=>data.subscription.unsubscribe();},[]);
  return <AccountContext.Provider value={{user,role,loading,refresh}}>{children}</AccountContext.Provider>;
}
export const useAccount = () => useContext(AccountContext);