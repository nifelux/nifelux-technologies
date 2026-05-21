import Button from '@/components/ui/Button'

export default function SupportCTA() {
  return (
    <section className="relative py-24 overflow-hidden bg-nfx-black">
      <div className="absolute inset-0 bg-gradient-to-br from-nfx-blue-deeper/8 via-transparent to-nfx-red/5" />
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-nfx-red/25 bg-nfx-red/8 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-nfx-red animate-pulse" />
          <span className="text-nfx-red text-xs font-syne font-semibold tracking-widest uppercase">Support Our Mission</span>
        </div>
        <h2 className="font-syne font-extrabold text-4xl md:text-5xl lg:text-6xl text-nfx-white leading-tight mb-6">
          Help Us Build the<br /><span className="text-gradient-blue">Future of Africa.</span>
        </h2>
        <p className="text-nfx-slate text-lg font-dm leading-relaxed mb-10 max-w-2xl mx-auto">
          Nifelux Technologies is building AI systems, robotics labs, and educational platforms that will shape the next generation of African innovation.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button href="/support" variant="primary" size="lg">Support Nifelux Today</Button>
          <Button href="/about" variant="secondary" size="lg">Learn About Us</Button>
        </div>
        <p className="text-nfx-slate text-xs font-dm mt-6 opacity-60">Payments secured by Paystack · Starting from ₦100</p>
      </div>
    </section>
  )
}
