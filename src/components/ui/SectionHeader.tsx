export default function SectionHeader({ eyebrow, title, subtitle, align='center' }: { eyebrow?:string; title:string; subtitle?:string; align?:'left'|'center' }) {
  const a = align==='center' ? 'text-center items-center' : 'text-left items-start'
  return (
    <div className={`flex flex-col gap-4 ${a}`}>
      {eyebrow && <span className="inline-flex items-center gap-2 text-xs font-syne font-semibold uppercase tracking-[0.2em] text-nfx-blue"><span className="h-px w-6 bg-nfx-blue"/>{eyebrow}<span className="h-px w-6 bg-nfx-blue"/></span>}
      <h2 className="font-syne font-bold text-3xl md:text-4xl lg:text-5xl text-nfx-white leading-tight">{title}</h2>
      {subtitle && <p className={`text-nfx-slate text-base md:text-lg leading-relaxed ${align==='center'?'max-w-2xl mx-auto':'max-w-2xl'}`}>{subtitle}</p>}
    </div>
  )
}
