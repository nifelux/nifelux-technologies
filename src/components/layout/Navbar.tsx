'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS } from '@/lib/constants'
import Button from '@/components/ui/Button'
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  useEffect(() => { const f = () => setScrolled(window.scrollY > 20); window.addEventListener('scroll',f); return () => window.removeEventListener('scroll',f) }, [])
  useEffect(() => setOpen(false), [pathname])
  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled?'bg-nfx-black/80 backdrop-blur-xl border-b border-white/6':''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-nfx-blue-dark to-nfx-blue flex items-center justify-center"><span className="text-white font-syne font-bold text-sm">N</span></div>
            <span className="font-syne font-bold text-lg text-nfx-white">Nifelux<span className="text-nfx-blue">.</span></span>
          </Link>
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(l=><Link key={l.href} href={l.href} className={`px-4 py-2 rounded-lg text-sm transition-all ${pathname===l.href?'text-nfx-blue bg-nfx-blue/10':'text-nfx-slate hover:text-nfx-white hover:bg-white/5'}`}>{l.label}</Link>)}
          </nav>
          <div className="hidden lg:block"><Button href="/support" size="sm">Support Us</Button></div>
          <button onClick={()=>setOpen(!open)} className="lg:hidden p-2 text-nfx-slate">
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={`h-0.5 bg-current rounded transition-all ${open?'rotate-45 translate-y-1.5':''}`}/>
              <span className={`h-0.5 bg-current rounded transition-all ${open?'opacity-0':''}`}/>
              <span className={`h-0.5 bg-current rounded transition-all ${open?'-rotate-45 -translate-y-2.5':''}`}/>
            </div>
          </button>
        </div>
      </header>
      {open&&<div className="fixed inset-0 z-40 bg-nfx-black/60 lg:hidden" onClick={()=>setOpen(false)}/>}
      <div className={`fixed top-0 right-0 bottom-0 z-50 w-72 lg:hidden bg-nfx-navy border-l border-white/8 transition-transform duration-300 ${open?'translate-x-0':'translate-x-full'}`}>
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <span className="font-syne font-bold text-nfx-white">Menu</span>
            <button onClick={()=>setOpen(false)} className="text-nfx-slate p-2 text-xl">✕</button>
          </div>
          <nav className="flex flex-col gap-1 flex-1">
            {NAV_LINKS.map(l=><Link key={l.href} href={l.href} className={`px-4 py-3 rounded-xl text-sm transition-all ${pathname===l.href?'text-nfx-blue bg-nfx-blue/10':'text-nfx-slate hover:text-nfx-white hover:bg-white/5'}`}>{l.label}</Link>)}
          </nav>
          <div className="pt-6 border-t border-white/8"><Button href="/support" className="w-full justify-center">Support Nifelux</Button></div>
        </div>
      </div>
    </>
  )
}
