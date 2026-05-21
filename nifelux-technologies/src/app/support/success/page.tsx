'use client'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import PageWrapper from '@/components/layout/PageWrapper'
import Button from '@/components/ui/Button'

function SuccessContent() {
  const searchParams = useSearchParams()
  const reference = searchParams.get('reference') ?? searchParams.get('trxref')
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading')
  const [amount, setAmount] = useState<number | null>(null)
  const [name, setName] = useState<string | null>(null)

  useEffect(() => {
    if (!reference) { setStatus('failed'); return }
    const verify = async () => {
      try {
        const res = await fetch(`/api/payment/verify?reference=${encodeURIComponent(reference)}`)
        const data = await res.json()
        if (data.success) { setStatus('success'); setAmount(data.amount); setName(data.name) }
        else setStatus('failed')
      } catch { setStatus('failed') }
    }
    verify()
  }, [reference])

  if (status === 'loading') return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-nfx-blue/20 border-t-nfx-blue" />
      <p className="text-nfx-slate font-dm text-sm">Verifying your payment...</p>
    </div>
  )

  if (status === 'failed') return (
    <div className="text-center">
      <div className="h-16 w-16 rounded-full bg-nfx-red/10 border border-nfx-red/20 flex items-center justify-center mx-auto mb-6">
        <svg className="h-8 w-8 text-nfx-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h2 className="font-syne font-bold text-nfx-white text-2xl mb-3">Payment Verification Failed</h2>
      <p className="text-nfx-slate font-dm text-sm mb-8 max-w-sm mx-auto">We could not verify your payment. Reference: <span className="text-nfx-white font-mono">{reference ?? 'N/A'}</span></p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button href="/support" variant="primary">Try Again</Button>
        <Button href="/contact" variant="secondary">Contact Us</Button>
      </div>
    </div>
  )

  return (
    <div className="text-center">
      <div className="relative inline-flex mb-8">
        <div className="h-20 w-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.2)]">
          <svg className="h-10 w-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="absolute -top-1 -right-1 text-xl animate-float">🎉</span>
      </div>
      <h2 className="font-syne font-extrabold text-3xl md:text-4xl text-nfx-white mb-3">
        Thank You{name ? `, ${name.split(' ')[0]}` : ''}!
      </h2>
      {amount && (
        <div className="inline-block px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-5">
          <span className="font-syne font-bold text-emerald-400 text-lg">₦{amount.toLocaleString()} contributed</span>
        </div>
      )}
      <p className="text-nfx-slate font-dm leading-relaxed max-w-md mx-auto mb-8">Your contribution means the world to us. You are now part of the story of how Nifelux Technologies is building the future of technology in Africa.</p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button href="/" variant="primary">Back to Home</Button>
        <Button href="/about" variant="secondary">Learn More About Us</Button>
      </div>
    </div>
  )
}

export default function SupportSuccessPage() {
  return (
    <PageWrapper>
      <section className="relative min-h-screen flex items-center justify-center py-32 bg-nfx-black overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative z-10 max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <Suspense fallback={<div className="flex justify-center"><div className="h-10 w-10 animate-spin rounded-full border-2 border-nfx-blue/20 border-t-nfx-blue" /></div>}>
              <SuccessContent />
            </Suspense>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
