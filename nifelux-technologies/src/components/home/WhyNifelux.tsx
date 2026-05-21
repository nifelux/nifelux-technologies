import SectionHeader from '@/components/ui/SectionHeader'

const REASONS = [
  { title: 'Innovation First', description: 'We don\'t follow trends — we set them. Every product starts with a bold idea about how technology can improve lives in Africa.' },
  { title: 'Research Driven', description: 'Our work is grounded in applied research. We build systems designed for real-world complexity.' },
  { title: 'Africa-Focused', description: 'We build for the African context — understanding local challenges while maintaining global quality standards.' },
  { title: 'Engineering Excellence', description: 'Company-grade code. Clean architecture. Scalable systems built to grow with you.' },
  { title: 'Modular & Scalable', description: 'Every system we design is modular from the ground up. Add features and scale without rebuilding.' },
  { title: 'Built with Purpose', description: 'Every line of code serves a mission: improving education, opportunity, and quality of life in Africa.' },
]

export default function WhyNifelux() {
  return (
    <section className="relative py-24 bg-nfx-navy/30 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Why Us" title="Why Choose Nifelux" subtitle="We're not just another tech company. We're a movement — building the systems that will define the next chapter of African technology." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {REASONS.map((reason) => (
            <div key={reason.title} className="glass-card rounded-2xl p-6 group hover:border-nfx-blue/25 transition-all duration-300">
              <h3 className="font-syne font-bold text-nfx-white text-base mb-2">{reason.title}</h3>
              <p className="text-nfx-slate text-sm font-dm leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
