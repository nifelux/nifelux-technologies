import type { Metadata } from 'next'
import PageWrapper from '@/components/layout/PageWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import { SITE } from '@/lib/constants'
export const metadata: Metadata = { title: 'About' }
const VALUES = [
  { title: 'Innovation', description: 'We push boundaries in every product we build.', icon: '💡' },
  { title: 'Excellence', description: 'Company-grade quality in everything we do.', icon: '⭐' },
  { title: 'Impact', description: 'Technology only matters if it creates real change.', icon: '🌍' },
  { title: 'Integrity', description: 'Transparent, honest, and ethical in all our dealings.', icon: '🤝' },
  { title: 'Persistence', description: 'Building the future is hard. We do not stop.', icon: '🔥' },
  { title: 'Open Learning', description: 'We learn continuously and grow together.', icon: '📚' },
]
export default function AboutPage() {
  return (
    <PageWrapper>
      <section className="relative pt-36 pb-20 overflow-hidden bg-nfx-black">
        <div className="absolute inset-0 dot-grid opacity-30"/>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-nfx-blue/10 rounded-full blur-[100px]"/>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-syne font-extrabold text-5xl md:text-7xl text-nfx-white leading-tight mb-6">About <span className="text-gradient-blue">Nifelux</span></h1>
          <p className="text-nfx-slate text-lg max-w-2xl mx-auto">A technology company born in Nigeria with a mission that extends far beyond it.</p>
        </div>
      </section>
      <div className="divider-blue"/>
      <section className="py-20 bg-nfx-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader eyebrow="Our Origin" title="The Nifelux Story" align="left"/>
              <div className="mt-6 space-y-4 text-nfx-slate leading-relaxed">
                <p>Nifelux Technologies was founded with a clear conviction: Africa does not just need to consume technology — it needs to create it.</p>
                <p>Starting with AI and educational technology, then expanding into robotics and automation, Nifelux is building the infrastructure of innovation that Nigeria and Africa deserve.</p>
                <p>Every product we build is designed to create real, measurable impact for students, developers, and businesses across Africa.</p>
              </div>
            </div>
            <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-nfx-blue/5 to-transparent"/>
              <div className="relative z-10">
                <div className="text-5xl mb-4">🇳🇬</div>
                <h3 className="font-syne font-bold text-nfx-white text-2xl mb-2">Made in Nigeria</h3>
                <p className="text-nfx-slate text-sm leading-relaxed">Proudly Nigerian. Globally competitive. World-class quality — from right here in Africa.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-nfx-navy/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader eyebrow="Leadership" title="Founder & CEO"/>
          <div className="mt-10 glass-card rounded-3xl p-8 md:p-12">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-nfx-blue-dark to-nfx-blue flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(59,130,246,0.3)]">
              <span className="font-syne font-extrabold text-3xl text-white">O</span>
            </div>
            <h3 className="font-syne font-bold text-nfx-white text-2xl mb-1">{SITE.founder}</h3>
            <p className="text-nfx-blue font-syne font-semibold text-sm mb-6 uppercase tracking-widest">{SITE.founderRole}</p>
            <p className="text-nfx-slate leading-relaxed max-w-xl mx-auto">A technology builder and innovator with a vision to position Nigeria at the forefront of global technological development.</p>
          </div>
        </div>
      </section>
      <section className="py-20 bg-nfx-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="What We Stand For" title="Our Core Values"/>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {VALUES.map(v => (
              <div key={v.title} className="glass-card rounded-2xl p-6 hover:border-nfx-blue/25 transition-all duration-300">
                <div className="text-3xl mb-4">{v.icon}</div>
                <h3 className="font-syne font-bold text-nfx-white text-lg mb-2">{v.title}</h3>
                <p className="text-nfx-slate text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-nfx-black text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-syne font-extrabold text-3xl md:text-4xl text-nfx-white mb-4">Ready to work with us?</h2>
          <p className="text-nfx-slate mb-8">Whether you want to partner, support our mission, or just learn more — we would love to hear from you.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contact">Get in Touch</Button>
            <Button href="/support" variant="secondary">Support Us</Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
