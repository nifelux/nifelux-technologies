import type { Metadata } from 'next'
import PageWrapper from '@/components/layout/PageWrapper'
import Badge from '@/components/ui/Badge'
import { type Certification } from '@/types'

export const metadata: Metadata = { title: 'Certifications', description: 'Nifelux Technologies company certifications and legal registration status.' }

const CERTS: Certification[] = [
  { id: '1', title: 'CAC Business Registration', issuer: 'Corporate Affairs Commission, Nigeria', status: 'processing', description: 'Official business registration with the Corporate Affairs Commission of Nigeria.' },
  { id: '2', title: 'Technology Company Certification', issuer: 'Nigeria Information Technology Development Agency (NITDA)', status: 'pending', description: 'NITDA certification for technology companies operating in Nigeria.' },
  { id: '3', title: 'Business Operating License', issuer: 'Local Government Authority', status: 'processing', description: 'Business premises and operational license for Nifelux Technologies.' },
]

const statusConfig = {
  active: { badge: 'green' as const, label: 'Verified' },
  processing: { badge: 'yellow' as const, label: 'Processing' },
  pending: { badge: 'gray' as const, label: 'Pending' },
}

export default function CertificationsPage() {
  return (
    <PageWrapper>
      <section className="relative pt-36 pb-20 overflow-hidden bg-nfx-black">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-nfx-blue/8 rounded-full blur-[100px]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-syne font-extrabold text-5xl md:text-6xl text-nfx-white leading-tight mb-5">
            Certifications &<br /><span className="text-gradient-blue">Registrations</span>
          </h1>
          <p className="text-nfx-slate text-lg font-dm leading-relaxed max-w-2xl mx-auto mb-6">
            Nifelux Technologies is committed to full legal compliance and transparent operations in Nigeria.
          </p>
          <div className="inline-flex items-start gap-3 px-5 py-4 rounded-xl bg-amber-500/8 border border-amber-500/20 text-left max-w-lg mx-auto">
            <svg className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-amber-300 text-sm font-dm leading-relaxed">Company registration and additional certifications are currently under processing. All documents will be published here upon completion.</p>
          </div>
        </div>
      </section>
      <div className="divider-blue" />
      <section className="py-20 bg-nfx-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-5">
            {CERTS.map((cert) => {
              const config = statusConfig[cert.status]
              return (
                <div key={cert.id} className="glass-card rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-5">
                  <div className="h-14 w-14 rounded-xl bg-nfx-blue/8 border border-nfx-blue/15 flex items-center justify-center flex-shrink-0">
                    <svg className="h-6 w-6 text-nfx-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <h3 className="font-syne font-bold text-nfx-white text-lg">{cert.title}</h3>
                        <p className="text-nfx-blue text-xs font-syne font-semibold mt-0.5 uppercase tracking-wide">{cert.issuer}</p>
                      </div>
                      <Badge label={config.label} variant={config.badge} dot />
                    </div>
                    {cert.description && <p className="text-nfx-slate text-sm font-dm mt-3 leading-relaxed">{cert.description}</p>}
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/4 border border-white/8 text-nfx-slate text-sm font-syne">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Pending
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
