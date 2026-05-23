import type { Metadata } from 'next'
import PageWrapper from '@/components/layout/PageWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
export const metadata: Metadata = { title: 'Robotics' }
const AREAS = [
  { icon:'🎓', title:'Educational Robotics', description:'Interactive robotic kits for schools and universities across Nigeria — making STEM tangible.' },
  { icon:'🏭', title:'Industrial Automation', description:'Smart robotic systems automating industrial tasks and reducing costs for African manufacturers.' },
  { icon:'🌾', title:'Agricultural Robotics', description:'Precision agriculture robotics for crop monitoring and automated farming in Nigeria.' },
  { icon:'🔬', title:'Research Platforms', description:'Open robotics research platforms for universities and innovation hubs across Africa.' },
  { icon:'🧠', title:'AI Vision Systems', description:'Robotics with integrated computer vision enabling smart perception and autonomous action.' },
  { icon:'🔧', title:'Custom Robotics', description:'End-to-end custom robotic system design and prototyping for specific automation needs.' },
]
export default function RoboticsPage() {
  return (
    <PageWrapper>
      <section className="relative pt-36 pb-20 overflow-hidden bg-nfx-black">
        <div className="absolute inset-0 dot-grid opacity-30"/>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-nfx-blue/8 rounded-full blur-[120px]"/>
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <Badge label="Robotics Division" variant="blue" dot/>
          <h1 className="font-syne font-extrabold text-5xl md:text-7xl text-nfx-white leading-tight mt-5 mb-6">
            Smart Robotics for<br/><span className="text-gradient-blue">a Smarter Africa.</span>
          </h1>
          <p className="text-nfx-slate text-lg max-w-2xl mx-auto mb-8">AI-integrated robotic systems transforming education, industry, agriculture, and research across Nigeria and Africa.</p>
          <Badge label="Research & Development Phase" variant="yellow" dot/>
        </div>
      </section>
      <div className="divider-blue"/>
      <section className="py-20 bg-nfx-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Focus Areas" title="What We Are Building" subtitle="Six key areas where Nifelux robotics will create transformative impact."/>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {AREAS.map(a => (
              <div key={a.title} className="glass-card rounded-2xl p-6 group hover:border-nfx-blue/30 transition-all duration-300">
                <div className="h-12 w-12 rounded-xl bg-nfx-blue/10 border border-nfx-blue/15 flex items-center justify-center text-2xl mb-5">{a.icon}</div>
                <h3 className="font-syne font-bold text-nfx-white text-lg mb-3 group-hover:text-nfx-blue transition-colors">{a.title}</h3>
                <p className="text-nfx-slate text-sm leading-relaxed">{a.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-nfx-black text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-syne font-extrabold text-3xl md:text-4xl text-nfx-white mb-4">Partner With Our Robotics Division</h2>
          <p className="text-nfx-slate mb-8">Are you a school, business, or researcher interested in robotics collaboration?</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contact">Get in Touch</Button>
            <Button href="/support" variant="secondary">Support R&D</Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
