import Link from 'next/link'
import { SITE, SOCIAL_LINKS } from '@/lib/constants'
export default function Footer() {
  return (
    <footer className="border-t border-white/8 bg-nfx-navy/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-5">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-nfx-blue-dark to-nfx-blue flex items-center justify-center"><span className="text-white font-syne font-bold">N</span></div>
              <span className="font-syne font-bold text-xl text-nfx-white">Nifelux<span className="text-nfx-blue">.</span></span>
            </Link>
            <p className="text-nfx-slate text-sm leading-relaxed max-w-sm">A future-focused Nigerian technology company building innovative AI, Robotics, and EdTech solutions.</p>
            <div className="flex gap-3 mt-6">
              {Object.entries(SOCIAL_LINKS).map(([k,v])=>(
                <a key={k} href={v} target="_blank" rel="noopener noreferrer" className="h-9 w-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-nfx-slate hover:text-nfx-blue transition-all text-xs font-syne font-bold">{k[0].toUpperCase()}</a>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-syne font-semibold text-nfx-white text-sm mb-4 uppercase tracking-widest">Pages</h4>
            <ul className="space-y-3">
              {[['About','/about'],['Services','/services'],['Robotics','/robotics'],['Certifications','/certifications'],['Support','/support'],['Contact','/contact']].map(([l,h])=>(
                <li key={h}><Link href={h} className="text-nfx-slate text-sm hover:text-nfx-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/6 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-nfx-slate text-xs">© {new Date().getFullYear()} Nifelux Technologies. All rights reserved.</p>
          <p className="text-nfx-slate text-xs">Founded by <span className="text-nfx-slate-light">{SITE.founder}</span> · 🇳🇬 Nigeria</p>
        </div>
      </div>
    </footer>
  )
}
