type V = 'blue'|'red'|'green'|'yellow'|'gray'
const vs: Record<V,string> = { blue:'bg-nfx-blue/10 text-nfx-blue border-nfx-blue/20', red:'bg-nfx-red/10 text-nfx-red border-nfx-red/20', green:'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', yellow:'bg-amber-500/10 text-amber-400 border-amber-500/20', gray:'bg-white/5 text-nfx-slate border-white/10' }
const ds: Record<V,string> = { blue:'bg-nfx-blue', red:'bg-nfx-red', green:'bg-emerald-400', yellow:'bg-amber-400', gray:'bg-nfx-slate' }
export default function Badge({ label, variant='blue', dot=false, className='' }: { label:string; variant?:V; dot?:boolean; className?:string }) {
  return <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-syne font-semibold border ${vs[variant]} ${className}`}>{dot&&<span className={`h-1.5 w-1.5 rounded-full animate-pulse ${ds[variant]}`}/>}{label}</span>
}
