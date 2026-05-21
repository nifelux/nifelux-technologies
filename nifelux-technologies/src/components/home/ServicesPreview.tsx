import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import { SERVICES } from '@/lib/constants'

export default function ServicesPreview() {
  const preview = SERVICES.slice(0, 6)
  return (
    <section className="relative py-24 bg-nfx-black overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="What We Build" title="Our Core Services" subtitle="From artificial intelligence to robotics — we design and build technology systems that create real-world impact." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {preview.map((service) => (
            <div key={service.id} className="glass-card rounded-2xl p-6 group transition-all duration-300 hover:shadow-[0_8px_40px_rgba(59,130,246,0.12)]">
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-2xl mb-5 ${service.color === 'red' ? 'bg-nfx-red/10 border border-nfx-red/15' : 'bg-nfx-blue/10 border border-nfx-blue/15'}`}>{service.icon}</div>
              <h3 className="font-syne font-bold text-nfx-white text-lg mb-2 group-hover:text-nfx-blue transition-colors duration-200">{service.title}</h3>
              <p className="text-nfx-slate text-sm font-dm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/services" className="inline-flex items-center gap-2 text-nfx-blue text-sm font-syne font-semibold hover:gap-3 transition-all duration-200">
            View all services
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
