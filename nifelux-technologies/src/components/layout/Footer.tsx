import Link from 'next/link'
import { SITE, SOCIAL_LINKS } from '@/lib/constants'

const FOOTER_LINKS = {
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Robotics', href: '/robotics' },
    { label: 'Certifications', href: '/certifications' },
  ],
  Support: [
    { label: 'Support Nifelux', href: '/support' },
    { label: 'Contact Us', href: '/contact' },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative border-t border-white/8 bg-nfx-navy/50">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-nfx-blue/40 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-nfx-blue-dark to-nfx-blue flex items-center justify-center">
                <span className="text-white font-syne font-bold">N</span>
              </div>
              <span className="font-syne font-bold text-xl text-nfx-white">Nifelux<span className="text-nfx-blue">.</span></span>
            </Link>
            <p className="text-nfx-slate text-sm leading-relaxed max-w-sm font-dm">
              A future-focused Nigerian technology company building innovative solutions in AI, Robotics, Educational Technology, and Smart Digital Platforms.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[
                { href: SOCIAL_LINKS.facebook, label: 'Facebook' },
                { href: SOCIAL_LINKS.twitter, label: 'Twitter' },
                { href: SOCIAL_LINKS.whatsapp, label: 'WhatsApp' },
                { href: SOCIAL_LINKS.telegram, label: 'Telegram' },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="h-9 w-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-nfx-slate hover:text-nfx-blue hover:border-nfx-blue/30 transition-all duration-200">
                  <span className="text-xs font-syne font-bold">{s.label[0]}</span>
                </a>
              ))}
            </div>
          </div>
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h4 className="font-syne font-semibold text-nfx-white text-sm mb-4 uppercase tracking-widest">{group}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-nfx-slate text-sm font-dm hover:text-nfx-white transition-colors duration-200">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-nfx-slate text-xs font-dm">© {year} Nifelux Technologies. All rights reserved.</p>
          <p className="text-nfx-slate text-xs font-dm">Founded by <span className="text-nfx-slate-light">{SITE.founder}</span> · Made in 🇳🇬 Nigeria</p>
        </div>
      </div>
    </footer>
  )
}
