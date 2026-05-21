'use client'
import { useState } from 'react'
import PageWrapper from '@/components/layout/PageWrapper'
import Button from '@/components/ui/Button'
import { CONTRIBUTION_TIERS } from '@/lib/constants'
import toast from 'react-hot-toast'

export default function SupportPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [amount, setAmount] = useState<number | ''>('')
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const effectiveAmount = selectedTier
    ? CONTRIBUTION_TIERS.find((t) => t.id === selectedTier)?.amount ?? Number(amount)
    : Number(amount)

  const handleSelectTier = (tierId: string) => {
    setSelectedTier(tierId)
    const tier = CONTRIBUTION_TIERS.find((t) => t.id === tierId)
    if (tier) setAmount(tier.amount)
  }

  const handleSubmit = async () => {
    if (!name.trim()) { toast.error('Please enter your name'); return }
    if (!email.trim() || !email.includes('@')) { toast.error('Please enter a valid email'); return }
    if (!effectiveAmount || effectiveAmount < 100) { toast.error('Minimum contribution is ₦100'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/payment/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), amount: effectiveAmount, tier: selectedTier }),
      })
      const data = await res.json()
      if (!res.ok || !data.authorization_url) throw new Error(data.error ?? 'Payment initialization failed')
      window.location.href = data.authorization_url
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageWrapper>
      <section className="relative pt-36 pb-20 overflow-hidden bg-nfx-black">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-nfx-red/6 rounded-full blur-[120px]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-syne font-extrabold text-5xl md:text-6xl text-nfx-white leading-tight mb-5">
            Help Us Build<br /><span className="text-gradient-blue">the Future.</span>
          </h1>
          <p className="text-nfx-slate text-lg font-dm leading-relaxed max-w-2xl mx-auto">Your contribution directly funds AI research, robotics development, and educational platforms that will shape technology in Africa.</p>
        </div>
      </section>
      <div className="divider-blue" />
      <section className="py-20 bg-nfx-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-syne font-bold text-2xl text-nfx-white mb-5">Contribution Tiers</h2>
              <div className="space-y-3">
                {CONTRIBUTION_TIERS.map((tier) => (
                  <button key={tier.id} onClick={() => handleSelectTier(tier.id)}
                    className={`w-full text-left glass-card rounded-xl p-4 transition-all duration-200 ${selectedTier === tier.id ? 'border-nfx-blue/50 bg-nfx-blue/8 shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'hover:border-nfx-blue/20'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-syne font-bold text-nfx-white">{tier.label}</span>
                      <span className="font-syne font-bold text-nfx-blue">₦{tier.amount.toLocaleString()}</span>
                    </div>
                    <p className="text-nfx-slate text-xs font-dm mb-2">{tier.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {tier.perks.map((perk) => (
                        <span key={perk} className="text-xs text-nfx-slate-light font-dm flex items-center gap-1">
                          <span className="text-nfx-blue">✓</span> {perk}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="glass-card rounded-2xl p-7 sticky top-24">
              <h3 className="font-syne font-bold text-nfx-white text-xl mb-6">Make a Contribution</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-nfx-slate text-xs font-syne font-semibold uppercase tracking-wider mb-2">Full Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-nfx-white text-sm font-dm placeholder:text-nfx-slate focus:outline-none focus:border-nfx-blue/50 transition-all duration-200" />
                </div>
                <div>
                  <label className="block text-nfx-slate text-xs font-syne font-semibold uppercase tracking-wider mb-2">Email Address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-nfx-white text-sm font-dm placeholder:text-nfx-slate focus:outline-none focus:border-nfx-blue/50 transition-all duration-200" />
                </div>
                <div>
                  <label className="block text-nfx-slate text-xs font-syne font-semibold uppercase tracking-wider mb-2">Amount (₦) — minimum ₦100</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-nfx-slate font-syne font-bold">₦</span>
                    <input type="number" value={amount} onChange={(e) => { setSelectedTier(null); setAmount(e.target.value === '' ? '' : Number(e.target.value)) }} min={100} placeholder="Enter amount"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-nfx-white text-sm font-dm placeholder:text-nfx-slate focus:outline-none focus:border-nfx-blue/50 transition-all duration-200" />
                  </div>
                </div>
                {effectiveAmount >= 100 && (
                  <div className="bg-nfx-blue/8 border border-nfx-blue/20 rounded-xl p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-nfx-slate text-sm font-dm">Total contribution</span>
                      <span className="font-syne font-bold text-nfx-white text-lg">₦{effectiveAmount.toLocaleString()}</span>
                    </div>
                  </div>
                )}
                <Button variant="primary" className="w-full justify-center mt-2" loading={loading} onClick={handleSubmit}>
                  Proceed to Payment
                </Button>
                <p className="text-center text-nfx-slate text-xs font-dm">Payments secured by Paystack · Card, Bank Transfer & USSD supported</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
