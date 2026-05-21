import Button from '@/components/ui/Button'

export default function RoboticsShowcase() {
  return (
    <section className="relative py-24 bg-nfx-navy/20 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-syne font-semibold uppercase tracking-[0.2em] text-nfx-blue mb-5">
              <span className="h-px w-6 bg-nfx-blue" />Robotics Division
            </span>
            <h2 className="font-syne font-extrabold text-4xl md:text-5xl text-nfx-white leading-tight mb-5">
              Smart Robotics for<br />a <span className="text-gradient-blue">Smarter Africa.</span>
            </h2>
            <p className="text-nfx-slate text-base font-dm leading-relaxed mb-6">
              Our robotics division is developing AI-powered robotic systems for education, agriculture, industrial automation, and research.
            </p>
            <ul className="space-y-3 mb-8">
              {['AI-integrated robotic systems','Educational robotics programs','Industrial automation solutions','Research & prototype development'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-nfx-slate-light text-sm font-dm">
                  <span className="h-1.5 w-1.5 rounded-full bg-nfx-blue flex-shrink-0" />{item}
                </li>
              ))}
            </ul>
            <Button href="/robotics" variant="primary">Explore Robotics</Button>
          </div>
          <div className="glass-card rounded-3xl p-8 relative overflow-hidden aspect-[4/3] flex items-center justify-center">
            <div className="absolute inset-0 dot-grid opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-br from-nfx-blue/8 to-transparent" />
            <div className="relative z-10 flex flex-col items-center gap-4 text-center">
              <div className="h-24 w-24 rounded-2xl bg-nfx-blue/15 border border-nfx-blue/25 flex items-center justify-center animate-float">
                <span className="text-6xl">🤖</span>
              </div>
              <div>
                <p className="font-syne font-bold text-nfx-white text-lg">NIRA Robotics</p>
                <p className="text-nfx-slate text-sm font-dm">Research & Development</p>
              </div>
              <div className="flex gap-2 flex-wrap justify-center">
                {['AI Vision','Automation','Research'].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-nfx-blue/10 border border-nfx-blue/20 text-nfx-blue text-xs font-syne">{tag}</span>
                ))}
              </div>
            </div>
            <div className="absolute top-4 left-4 h-8 w-8 border-t-2 border-l-2 border-nfx-blue/30 rounded-tl-lg" />
            <div className="absolute top-4 right-4 h-8 w-8 border-t-2 border-r-2 border-nfx-blue/30 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2 border-nfx-blue/30 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-nfx-blue/30 rounded-br-lg" />
          </div>
        </div>
      </div>
    </section>
  )
}
