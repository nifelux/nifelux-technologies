'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS } from '@/lib/constants'
import Button from '@/components/ui/Button'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-nfx-black/80 backdrop-blur-xl border-b border-white/6 shadow-[0_4px_32px_rgba(0,0,0,0.4)]' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-nfx-blue-dark to-nfx-blue flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-300">
                <span className="text-white font-syne font-bold text-sm">N</span>
              </div>
              <span className="font-syne font-bold text-lg text-nfx-white tracking-wide">Nifelux<span className="text-nfx-blue">.</span></span>
            </Link>
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href}
                  className={`px-4 py-2 rounded-lg font-dm text-sm transition-all duration-200 ${pathname === link.href ? 'text-nfx-blue bg-nfx-blue/10' : 'text-nfx-slate hover:text-nfx-white hover:bg-white/5'}`}>
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="hidden lg:flex items-center gap-3">
              <Button href="/support" variant="primary" size="sm">Support Us</Button>
            </div>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg text-nfx-slate hover:text-nfx-white hover:bg-white/5 transition-colors" aria-label="Toggle menu">
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setMobileOpen(false)}>
        <div className="absolute inset-0 bg-nfx-black/60 backdrop-blur-sm" />
      </div>

      <div className={`fixed top-0 right-0 bottom-0 z-50 w-72 lg:hidden bg-nfx-navy border-l border-white/8 transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-8">
            <span className="font-syne font-bold text-nfx-white">Menu</span>
            <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg text-nfx-slate hover:text-nfx-white hover:bg-white/5">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-1 flex-1">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}
                className={`px-4 py-3 rounded-xl font-dm text-sm transition-all duration-200 ${pathname === link.href ? 'text-nfx-blue bg-nfx-blue/10 font-medium' : 'text-nfx-slate hover:text-nfx-white hover:bg-white/5'}`}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-6 border-t border-white/8">
            <Button href="/support" variant="primary" className="w-full justify-center">Support Nifelux</Button>
          </div>
        </div>
      </div>
    </>
  )
}
