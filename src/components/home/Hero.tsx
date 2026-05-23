'use client'
import { useEffect, useRef } from 'react'
import Button from '@/components/ui/Button'
import { STATS } from '@/lib/constants'
export default function Hero() {
  const ref = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    el.style.opacity='0'; el.style.transform='translateY(32px)'
    requestAnimationFrame(()=>{ el.style.transition='opacity 0.9s ease-out,transform 0.9s ease-out'; el.style.opacity='1'; el.style.transform='translateY(0)' })
  }, [])
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-nfx-black pt-20">
      <div className="absolute inset-0 dot-grid-animated opacity-60"/>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-blue-900/20 blur-[120px] pointer-events-none"/>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-nfx-blue/25 bg-nfx-blue/10 mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-nfx-blue animate-pulse"/>
          <span className="text-nfx-blue text-xs font-syne font-semibold tracking-widest uppercase">Nigerian Technology Company</span>
        </div>
        <h1 ref={ref} className="font-syne font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-nfx-white leading-[1.05] tracking-tight mb-6">
          Building the<br/>Future of Tech<br/><span className="text-gradient-blue">in Africa.</span>
        </h1>
        <p className="text-nfx-slate text-lg md:text-xl max-w-2xl leading-relaxed mb-10">Nifelux Technologies creates AI systems, robotics solutions, educational platforms, and smart digital tools — built for Nigeria and the world.</p>
        <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
          <Button href="/services" size="lg">Explore Our Work →</Button>
          <Button href="/support" variant="secondary" size="lg">Support Nifelux</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/6 rounded-2xl overflow-hidden border border-white/8 w-full max-w-3xl">
          {STATS.map(s=>(
            <div key={s.label} className="bg-nfx-black/80 px-6 py-5 text-center">
              <div className="font-syne font-extrabold text-2xl md:text-3xl text-nfx-white mb-1">{s.value}</div>
              <div className="text-nfx-slate text-xs uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-nfx-black to-transparent pointer-events-none"/>
    </section>
  )
}
