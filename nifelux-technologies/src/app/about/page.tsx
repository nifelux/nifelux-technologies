import type { Metadata } from 'next'
import PageWrapper from '@/components/layout/PageWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = { title: 'About', description: 'Learn about Nifelux Technologies — our story, mission, values, and vision.' }

const VALUES = [
  { title: 'Innovation', description: 'We push boundaries and question the status quo in every product we build.', icon: '💡' },
  { title: 'Excellence', description: 'Company-grade quality in everything — code, design, research, and communication.', icon: '⭐' },
  { title: 'Impact', description: 'Technology only matters if it creates real change in people\'s lives and communities.', icon: '🌍' },
  { title: 'Integrity', description: 'Transparent, honest, and ethical in all our business dealings and product decisions.', icon: '🤝' },
  { title: 'Persistence', description: 'Building the future is hard. We don\'t stop at the first obstacle — or the tenth.', icon: '🔥' },
  { title: 'Open Learning', description: 'We learn continuously, share knowledge, and grow as individuals and as a company.', icon: '📚' },
]

const TIMELINE = [
  { year: '2024', title: 'Nifelux Founded', description: 'Nifelux Technologies established with a vision to build AI and robotics systems for Africa.' },
  { year: '2024', title: 'NIRA AI Development Begins', description: 'Work begins on NIRA AI — a modular, intelligent learning and career platform.' },
  { year: '2025', title: 'Robotics Research Division', description: 'Nifelux launches internal research into smart robotic systems for education and automation.' },
  { year: '2025+', title: 'Expanding Across Africa', description: 'Goal: serve students, developers, and businesses across Nigeria and the rest of Africa.' },
]

export default function AboutPage() {
  return (
    <PageWrapper>
      <section className="relative pt-36 pb-20 overflow-hidden bg-nfx-black">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-nfx-blue/8 rounded-full blur-[100px]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-syne font-extrabold text-5xl md:text-6xl lg:text-7xl text-nfx-white leading-tight mb-6">
            About <span className="text-gradient-blue">Nifelux</span>
          </h1>
          <p className="text-nfx-slate text-lg font-dm leading-relaxed max-w-2xl mx-auto">
            A technology company born in Nigeria with a mission that extends far beyond it.
          </p>
        </div>
      </section>
      <div className="divider-blue" />

      <section className="py-20 bg-nfx-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader eyebrow="Our Origin" title="The Nifelux Story" align="left" />
              <div className="mt-6 space-y-4 text-nfx-slate font-dm leading-relaxed">
                <p>Nifelux Technologies was founded with a clear conviction: Africa does not just need to consume technology — it needs to create it.</p>
                <p>Starting with AI and educational technology, then expanding into robotics and automation systems, Nifelux is building the infrastructure of innovation that Nigeria and Africa deserve.</p>
                <p>Every product we build — from NIRA AI to our robotics research division — is designed to create real, measurable impact for students, developers, and businesses across Africa.</p>
              </div>
            </div>
            <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-nfx-blue/5 to-transparent" />
              <div className="relative z-10">
                <div className="text-5xl mb-4">🇳🇬</div>
                <h3 className="font-syne font-bold text-nfx-white text-2xl mb-2">Made in Nigeria</h3>
                <p className="text-nfx-slate text-sm font-dm leading-relaxed mb-6">Proudly Nigerian. Globally competitive. We build with world-class quality standards — from right here in Africa.</p>
                <div className="grid grid-cols-2 gap-3">
                  {[{ label: 'AI Systems', value: 'Active' },{ label: 'Robotics', value: 'R&D' },{ label: 'EdTech', value: 'Building' },{ label: 'Vision', value: 'Africa' }].map((item) => (
                    <div key={item.label} className="bg-white/5 rounded-xl p-3">
                      <div className="text-nfx-blue text-xs font-syne font-semibold">{item.value}</div>
                      <div className="text-nfx-slate text-xs font-dm mt-0.5">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-nfx-navy/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader eyebrow="Leadership" title="Founder & CEO" />
          <div className="mt-10 glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="relative z-10">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-nfx-blue-dark to-nfx-blue flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(59,130,246,0.3)]">
                <span className="font-syne font-extrabold text-3xl text-white">O</span>
              </div>
              <h3 className="font-syne font-bold text-nfx-white text-2xl mb-1">{SITE.founder}</h3>
              <p className="text-nfx-blue font-syne font-semibold text-sm mb-6 uppercase tracking-widest">{SITE.founderRole}</p>
              <p className="text-nfx-slate font-dm leading-relaxed max-w-xl mx-auto">A technology builder and innovator with a vision to position Nigeria at the forefront of global technological development.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-nfx-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="What We Stand For" title="Our Core Values" subtitle="These principles guide every decision we make." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {VALUES.map((value) => (
              <div key={value.title} className="glass-card rounded-2xl p-6 group hover:border-nfx-blue/25 transition-all duration-300">
                <div className="text-3xl mb-4">{value.icon}</div>
                <h3 className="font-syne font-bold text-nfx-white text-lg mb-2">{value.title}</h3>
                <p className="text-nfx-slate text-sm font-dm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-nfx-navy/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Our Journey" title="Company Milestones" />
          <div className="mt-12 space-y-6">
            {TIMELINE.map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="h-8 w-8 rounded-full bg-nfx-blue/15 border border-nfx-blue/30 flex items-center justify-center flex-shrink-0">
                    <span className="h-2 w-2 rounded-full bg-nfx-blue" />
                  </div>
                  {i < TIMELINE.length - 1 && <div className="flex-1 w-px bg-gradient-to-b from-nfx-blue/20 to-transparent mt-2" />}
                </div>
                <div className="pb-8">
                  <span className="text-nfx-blue text-xs font-syne font-bold uppercase tracking-widest">{item.year}</span>
                  <h4 className="font-syne font-bold text-nfx-white text-lg mt-1 mb-2">{item.title}</h4>
                  <p className="text-nfx-slate text-sm font-dm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-nfx-black text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-syne font-extrabold text-3xl md:text-4xl text-nfx-white mb-4">Ready to work with us?</h2>
          <p className="text-nfx-slate font-dm mb-8">Whether you want to partner, support our mission, or just learn more — we would love to hear from you.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="primary">Get in Touch</Button>
            <Button href="/support" variant="secondary">Support Us</Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
