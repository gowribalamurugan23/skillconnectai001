import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable';
import { useAccount } from '@/lib/accounts';
import { Button } from '@/components/ui/button';
export const Route = createFileRoute('/auth')({head:()=>({meta:[{title:'Sign in — SkillConnect AI'},{name:'description',content:'Customer and worker accounts for SkillConnect AI.'},{property:'og:title',content:'Sign in — SkillConnect AI'},{property:'og:description',content:'Access your worker profile and bookings.'},{property:'og:type',content:'website'},{name:'twitter:card',content:'summary_large_image'}]}),component:Auth});
function Auth(){
  const {user,role,refresh}=useAccount(); const nav=useNavigate();
  const [mode,setMode]=useState<'login'|'signup'|'forgot'>('login');
  const [chosen,setChosen]=useState<'customer'|'worker'>('customer');
  const [email,setEmail]=useState('');const [password,setPassword]=useState('');const [name,setName]=useState('');
  const [notice,setNotice]=useState('');const [busy,setBusy]=useState(false);
  const submit=async(e:React.FormEvent)=>{e.preventDefault();setBusy(true);setNotice('');try{
    if(mode==='forgot'){const r=await supabase.auth.resetPasswordForEmail(email,{redirectTo:window.location.origin+'/reset-password'});if(r.error)throw r.error;setNotice('Check your email for the password reset link.');}
    else if(mode==='signup'){const r=await supabase.auth.signUp({email,password,options:{emailRedirectTo:window.location.origin+'/auth',data:{full_name:name,account_role:chosen}}});if(r.error)throw r.error;setNotice('Check your email to confirm your account, then sign in.');}
    else {const r=await supabase.auth.signInWithPassword({email,password});if(r.error)throw r.error;await refresh();await nav({to:'/auth'});}
  }catch(e){setNotice(e instanceof Error?e.message:'Unable to sign in');}finally{setBusy(false);}};
  if(user) return <section className="mx-auto max-w-lg px-4 py-12"><h1 className="text-3xl">Your account</h1>{!role?<><p className="my-4">Choose your account type</p><div className="flex gap-3">{(['customer','worker'] as const).map(r=><Button key={r} onClick={async()=>{const result=await supabase.rpc('choose_account_role',{chosen:r});if(result.error)setNotice(result.error.message);else await refresh();}}>{r}</Button>)}</div></>:<><p className="my-4">Signed in as a {role}.</p><Button asChild><Link to={role==='worker'?'/register-worker':'/find'}>{role==='worker'?'Worker dashboard':'Find a worker'}</Link></Button><Button variant="outline" className="ml-3" onClick={()=>supabase.auth.signOut()}>Sign out</Button></>}<p className="mt-4 text-destructive">{notice}</p></section>;
  return <section className="mx-auto max-w-md px-4 py-12"><h1 className="text-3xl">{mode==='signup'?'Create account':mode==='forgot'?'Reset password':'Welcome back'}</h1><form className="mt-6 space-y-4" onSubmit={submit}>
    {mode==='signup'&&<><label className="block">Full name<input required className="mt-1 w-full rounded-md border bg-card p-3" value={name} onChange={e=>setName(e.target.value)}/></label><label className="block">Account type<select className="mt-1 w-full rounded-md border bg-card p-3" value={chosen} onChange={e=>setChosen(e.target.value==='worker'?'worker':'customer')}><option value="customer">Customer</option><option value="worker">Worker</option></select></label></>}
    <label className="block">Email<input type="email" autoComplete="email" required className="mt-1 w-full rounded-md border bg-card p-3" value={email} onChange={e=>setEmail(e.target.value)}/></label>
    {mode!=='forgot'&&<label className="block">Password<input type="password" minLength={8} autoComplete={mode==='signup'?'new-password':'current-password'} required className="mt-1 w-full rounded-md border bg-card p-3" value={password} onChange={e=>setPassword(e.target.value)}/></label>}
    <Button className="w-full" disabled={busy}>{busy?'Please wait…':mode==='signup'?'Create account':mode==='forgot'?'Send reset link':'Sign in'}</Button>
  </form><p role="status" className="mt-4 text-sm">{notice}</p><div className="mt-4 flex flex-wrap gap-2"><Button variant="link" onClick={()=>setMode(mode==='signup'?'login':'signup')}>{mode==='signup'?'Sign in':'Create account'}</Button><Button variant="link" onClick={()=>setMode('forgot')}>Forgot password?</Button></div><div className="mt-4 space-y-2">{(['google','lovable'] as const).map(provider=><Button key={provider} variant="outline" className="w-full" onClick={async()=>{const r=await lovable.auth.signInWithOAuth(provider,{redirect_uri:window.location.origin+'/auth'});if(r.error)setNotice(r.error.message);}}>Continue with {provider==='google'?'Google':'Lovable'}</Button>)}</div></section>;
}