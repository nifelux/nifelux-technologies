import type { Metadata } from 'next'
import PageWrapper from '@/components/layout/PageWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import { SERVICES } from '@/lib/constants'

export const metadata: Metadata = { title: 'Services', description: 'All services offered by Nifelux Technologies.' }

export default function ServicesPage() {
  return (
    <PageWrapper>
      <section className="relative pt-36 pb-20 overflow-hidden bg-nfx-black">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-nfx-blue/8 rounded-full blur-[100px]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-syne font-extrabold text-5xl md:text-6xl lg:text-7xl text-nfx-white leading-tight mb-6">
            Our <span className="text-gradient-blue">Services</span>
          </h1>
          <p className="text-nfx-slate text-lg font-dm leading-relaxed max-w-2xl mx-auto">From intelligent AI systems to physical robotics — Nifelux builds the full spectrum of modern technology solutions.</p>
        </div>
      </section>
      <div className="divider-blue" />
      <section className="py-20 bg-nfx-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <div key={service.id} className="glass-card rounded-2xl p-7 group hover:shadow-[0_8px_40px_rgba(59,130,246,0.12)] transition-all duration-300 flex flex-col">
                <div className={`h-14 w-14 rounded-xl flex items-center justify-center text-3xl mb-6 ${service.color === 'red' ? 'bg-nfx-red/10 border border-nfx-red/15' : 'bg-nfx-blue/10 border border-nfx-blue/15'}`}>{service.icon}</div>
                <h3 className="font-syne font-bold text-nfx-white text-xl mb-3 group-hover:text-nfx-blue transition-colors duration-200">{service.title}</h3>
                <p className="text-nfx-slate text-sm font-dm leading-relaxed flex-1">{service.description}</p>
                <div className="mt-6 pt-5 border-t border-white/6">
                  <span className={`text-xs font-syne font-semibold uppercase tracking-widest ${service.color === 'red' ? 'text-nfx-red' : 'text-nfx-blue'}`}>
                    {service.color === 'red' ? '● Active Development' : '● Available Now'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-nfx-black text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-syne font-extrabold text-3xl md:text-4xl text-nfx-white mb-4">Ready to Build Something?</h2>
          <p className="text-nfx-slate font-dm mb-8">Talk to us about your project. We would love to help bring your vision to life.</p>
          <Button href="/contact" variant="primary" size="lg">Start a Conversation</Button>
        </div>
      </section>
    </PageWrapper>
  )
}
