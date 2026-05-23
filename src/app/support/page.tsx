'use client'
import { useState } from 'react'
import PageWrapper from '@/components/layout/PageWrapper'
import Button from '@/components/ui/Button'
import { CONTRIBUTION_TIERS } from '@/lib/constants'
import toast from 'react-hot-toast'

export default function SupportPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [amount, setAmount] = useState<number|''>('')
  const [tier, setTier] = useState<string|null>(null)
  const [loading, setLoading] = useState(false)

  const effective = tier ? (CONTRIBUTION_TIERS.find(t=>t.id===tier)?.amount ?? Number(amount)) : Number(amount)

  const handleTier = (id:string) => { setTier(id); const t=CONTRIBUTION_TIERS.find(t=>t.id===id); if(t) setAmount(t.amount) }

  const handleSubmit = async () => {
    if (!name.trim()) { toast.error('Enter your name'); return }
    if (!email.includes('@')) { toast.error('Enter a valid email'); return }
    if (!effective || effective < 100) { toast.error('Minimum is ₦100'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/payment/initialize', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({name,email,amount:effective,tier}) })
      const data = await res.json()
      if (!res.ok || !data.authorization_url) throw new Error(data.error ?? 'Failed')
      window.location.href = data.authorization_url
    } catch(e) { toast.error(e instanceof Error ? e.message : 'Something went wrong') }
    finally { setLoading(false) }
  }

  const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-nfx-white text-sm placeholder:text-nfx-slate focus:outline-none focus:border-nfx-blue/50 transition-all"

  return (
    <PageWrapper>
      <section className="relative pt-36 pb-20 overflow-hidden bg-nfx-black">
        <div className="absolute inset-0 dot-grid opacity-30"/>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-syne font-extrabold text-5xl md:text-6xl text-nfx-white leading-tight mb-5">Help Us Build<br/><span className="text-gradient-blue">the Future.</span></h1>
          <p className="text-nfx-slate text-lg max-w-2xl mx-auto">Your contribution directly funds AI research, robotics development, and educational platforms shaping technology in Africa.</p>
        </div>
      </section>
      <div className="divider-blue"/>
      <section className="py-20 bg-nfx-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-syne font-bold text-2xl text-nfx-white mb-5">Contribution Tiers</h2>
              <div className="space-y-3">
                {CONTRIBUTION_TIERS.map(t => (
                  <button key={t.id} onClick={() => handleTier(t.id)} className={`w-full text-left glass-card rounded-xl p-4 transition-all duration-200 ${tier===t.id?'border-nfx-blue/50 bg-nfx-blue/10':'hover:border-nfx-blue/20'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-syne font-bold text-nfx-white">{t.label}</span>
                      <span className="font-syne font-bold text-nfx-blue">₦{t.amount.toLocaleString()}</span>
                    </div>
                    <p className="text-nfx-slate text-xs mb-2">{t.description}</p>
                    <div className="flex flex-wrap gap-2">{t.perks.map(p => <span key={p} className="text-xs text-nfx-slate-light flex items-center gap-1"><span className="text-nfx-blue">✓</span>{p}</span>)}</div>
                  </button>
  
))}

</div>
            </div>
            <div className="glass-card rounded-2xl p-7 sticky top-24">
              <h3 className="font-syne font-bold text-nfx-white text-xl mb-6">Make a Contribution</h3>
              <div className="space-y-4">
                <div><label className="block text-nfx-slate text-xs font-syne font-semibold uppercase tracking-wider mb-2">Full Name</label><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Your name" className={inputCls}/></div>
                <div><label className="block text-nfx-slate text-xs font-syne font-semibold uppercase tracking-wider mb-2">Email Address</label><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" className={inputCls}/></div>
                <div>
                  <label className="block text-nfx-slate text-xs font-syne font-semibold uppercase tracking-wider mb-2">Amount (₦) — min ₦100</label>
                  <div className="relative"><span className="absolute left-4 top-1/2 -translate-y-1/2 text-nfx-slate font-bold">₦</span>
                  <input type="number" value={amount} onChange={e=>{setTier(null);setAmount(e.target.value===''?'':Number(e.target.value))}} min={100} placeholder="Enter amount" className={`${inputCls} pl-8`}/></div>
                </div>
                {effective>=100 && <div className="bg-nfx-blue/10 border border-nfx-blue/20 rounded-xl p-4 flex justify-between items-center"><span className="text-nfx-slate text-sm">Total</span><span className="font-syne font-bold text-nfx-white text-lg">₦{effective.toLocaleString()}</span></div>}
                <Button variant="primary" className="w-full justify-center mt-2" loading={loading} onClick={handleSubmit}>Proceed to Payment</Button>
                <p className="text-center text-nfx-slate text-xs">Secured by Paystack · Card, Bank Transfer & USSD</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
