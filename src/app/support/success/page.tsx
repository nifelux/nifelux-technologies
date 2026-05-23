'use client'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import PageWrapper from '@/components/layout/PageWrapper'
import Button from '@/components/ui/Button'

function SuccessContent() {
  const params = useSearchParams()
  const ref = params.get('reference') ?? params.get('trxref')
  const [status, setStatus] = useState<'loading'|'success'|'failed'>('loading')
  const [amount, setAmount] = useState<number|null>(null)
  const [name, setName] = useState<string|null>(null)

  useEffect(() => {
    if (!ref) { setStatus('failed'); return }
    fetch(`/api/payment/verify?reference=${encodeURIComponent(ref)}`).then(r=>r.json()).then(d => {
      if (d.success) { setStatus('success'); setAmount(d.amount); setName(d.name) }
      else setStatus('failed')
    }).catch(() => setStatus('failed'))
  }, [ref])

  if (status==='loading') return <div className="flex flex-col items-center gap-4"><div className="h-12 w-12 animate-spin rounded-full border-2 border-nfx-blue/20 border-t-nfx-blue"/><p className="text-nfx-slate text-sm">Verifying payment...</p></div>

  if (status==='failed') return (
    <div className="text-center">
      <div className="h-16 w-16 rounded-full bg-nfx-red/10 border border-nfx-red/20 flex items-center justify-center mx-auto mb-6"><span className="text-nfx-red text-2xl">✕</span></div>
      <h2 className="font-syne font-bold text-nfx-white text-2xl mb-3">Verification Failed</h2>
      <p className="text-nfx-slate text-sm mb-8">Reference: <span className="font-mono text-nfx-white">{ref ?? 'N/A'}</span></p>
      <div className="flex flex-wrap justify-center gap-4"><Button href="/support">Try Again</Button><Button href="/contact" variant="secondary">Contact Us</Button></div>
    </div>
  )

  return (
    <div className="text-center">
      <div className="h-20 w-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
        <span className="text-emerald-400 text-3xl">✓</span>
      </div>
      <h2 className="font-syne font-extrabold text-3xl md:text-4xl text-nfx-white mb-3">Thank You{name?`, ${name.split(' ')[0]}`:''}!</h2>
      {amount && <div className="inline-block px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-5"><span className="font-syne font-bold text-emerald-400 text-lg">₦{amount.toLocaleString()} contributed</span></div>}
      <p className="text-nfx-slate leading-relaxed max-w-md mx-auto mb-8">Your contribution is helping build the future of technology in Africa. We are deeply grateful.</p>
      <div className="flex flex-wrap justify-center gap-4"><Button href="/">Back to Home</Button><Button href="/about" variant="secondary">Learn More</Button></div>
    </div>
  )
}

export default function SupportSuccessPage() {
  return (
    <PageWrapper>
      <section className="relative min-h-screen flex items-center justify-center py-32 bg-nfx-black overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-20"/>
        <div className="relative z-10 max-w-lg mx-auto px-4">
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <Suspense fallback={<div className="flex justify-center"><div className="h-10 w-10 animate-spin rounded-full border-2 border-nfx-blue/20 border-t-nfx-blue"/></div>}>
              <SuccessContent/>
            </Suspense>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
