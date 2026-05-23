import type { Metadata } from 'next'
import PageWrapper from '@/components/layout/PageWrapper'
import Badge from '@/components/ui/Badge'
import { type Certification } from '@/types'
export const metadata: Metadata = { title: 'Certifications' }
const CERTS: Certification[] = [
  { id:'1', title:'CAC Business Registration', issuer:'Corporate Affairs Commission, Nigeria', status:'processing', description:'Official business registration with the CAC of Nigeria.' },
  { id:'2', title:'Technology Company Certification', issuer:'Nigeria Information Technology Development Agency (NITDA)', status:'pending', description:'NITDA certification for technology companies operating in Nigeria.' },
  { id:'3', title:'Business Operating License', issuer:'Local Government Authority', status:'processing', description:'Business premises and operational license for Nifelux Technologies.' },
]
const statusCfg = { active:{badge:'green' as const,label:'Verified'}, processing:{badge:'yellow' as const,label:'Processing'}, pending:{badge:'gray' as const,label:'Pending'} }
export default function CertificationsPage() {
  return (
    <PageWrapper>
      <section className="relative pt-36 pb-20 overflow-hidden bg-nfx-black">
        <div className="absolute inset-0 dot-grid opacity-30"/>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-syne font-extrabold text-5xl md:text-6xl text-nfx-white leading-tight mb-5">Certifications &<br/><span className="text-gradient-blue">Registrations</span></h1>
          <p className="text-nfx-slate text-lg max-w-2xl mx-auto mb-6">Nifelux Technologies is committed to full legal compliance and transparent operations.</p>
          <div className="inline-flex items-start gap-3 px-5 py-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-left max-w-lg mx-auto">
            <p className="text-amber-300 text-sm leading-relaxed">Company registration and additional certifications are currently under processing. All documents will be published here upon completion.</p>
          </div>
        </div>
      </section>
      <div className="divider-blue"/>
      <section className="py-20 bg-nfx-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          {CERTS.map(cert => {
            const cfg = statusCfg[cert.status]
            return (
              <div key={cert.id} className="glass-card rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="h-14 w-14 rounded-xl bg-nfx-blue/10 border border-nfx-blue/15 flex items-center justify-center flex-shrink-0">
                  <span className="text-nfx-blue text-xl">📄</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <h3 className="font-syne font-bold text-nfx-white text-lg">{cert.title}</h3>
                      <p className="text-nfx-blue text-xs font-syne font-semibold mt-0.5 uppercase tracking-wide">{cert.issuer}</p>
                    </div>
                    <Badge label={cfg.label} variant={cfg.badge} dot/>
                  </div>
                  {cert.description && <p className="text-nfx-slate text-sm mt-3 leading-relaxed">{cert.description}</p>}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </PageWrapper>
  )
}
