'use client'
import { useState } from 'react'
import PageWrapper from '@/components/layout/PageWrapper'
import Button from '@/components/ui/Button'
import { SITE, SOCIAL_LINKS } from '@/lib/constants'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' })
  const [loading, setLoading] = useState(false)
  const set = (f:string,v:string) => setForm(p=>({...p,[f]:v}))
  const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-nfx-white text-sm placeholder:text-nfx-slate focus:outline-none focus:border-nfx-blue/50 transition-all"

  const handleSubmit = async () => {
    if (!form.name.trim()||!form.email.trim()||!form.message.trim()) { toast.error('Please fill in all required fields'); return }
    if (!form.email.includes('@')) { toast.error('Enter a valid email'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed')
      toast.success('Message sent! We will be in touch soon.')
      setForm({ name:'', email:'', subject:'', message:'' })
    } catch(e) { toast.error(e instanceof Error ? e.message : 'Something went wrong') }
    finally { setLoading(false) }
  }

  return (
    <PageWrapper>
      <section className="relative pt-36 pb-20 overflow-hidden bg-nfx-black">
        <div className="absolute inset-0 dot-grid opacity-30"/>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-syne font-extrabold text-5xl md:text-6xl text-nfx-white leading-tight mb-5">Get in <span className="text-gradient-blue">Touch</span></h1>
          <p className="text-nfx-slate text-lg max-w-xl mx-auto">Have a question, a project idea, or want to partner with us?</p>
        </div>
      </section>
      <div className="divider-blue"/>
      <section className="py-20 bg-nfx-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-syne font-bold text-nfx-white text-2xl mb-6">Contact Information</h2>
              <div className="space-y-3 mb-8">
                {[
                  {label:'Email',value:SITE.email,href:`mailto:${SITE.email}`},
                  {label:'Phone',value:SITE.phone,href:`tel:${SITE.phone.replace(/\s/g,'')}`},
                  {label:'WhatsApp',value:'Chat with us',href:SOCIAL_LINKS.whatsapp},
                  {label:'Telegram',value:'Join our channel',href:SOCIAL_LINKS.telegram},
                  {label:'Facebook',value:'Follow us',href:SOCIAL_LINKS.facebook},
                ].map(c => (
                  <a key={c.label} href={c.href} target={c.href.startsWith('http')?'_blank':undefined} rel={c.href.startsWith('http')?'noopener noreferrer':undefined}
                    className="flex items-center gap-4 p-4 glass-card rounded-xl hover:border-nfx-blue/30 transition-all group">
                    <div className="h-10 w-10 rounded-lg bg-nfx-blue/10 border border-nfx-blue/15 flex items-center justify-center text-nfx-blue font-bold text-xs flex-shrink-0">{c.label[0]}</div>
                    <div><p className="font-syne font-semibold text-nfx-white text-sm">{c.label}</p><p className="text-nfx-slate text-xs">{c.value}</p></div>
                  </a>
                ))}
              </div>
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-2"><span className="text-2xl">🇳🇬</span><h3 className="font-syne font-bold text-nfx-white">Nigeria</h3></div>
                <p className="text-nfx-slate text-sm">Nifelux Technologies is based in Nigeria, building technology for Africa and the world.</p>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-7">
              <h3 className="font-syne font-bold text-nfx-white text-xl mb-6">Send Us a Message</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><label className="block text-nfx-slate text-xs font-syne font-semibold uppercase tracking-wider mb-2">Full Name *</label><input type="text" value={form.name} onChange={e=>set('name',e.target.value)} placeholder="Your name" className={inputCls}/></div>
                  <div><label className="block text-nfx-slate text-xs font-syne font-semibold uppercase tracking-wider mb-2">Email *</label><input type="email" value={form.email} onChange={e=>set('email',e.target.value)} placeholder="your@email.com" className={inputCls}/></div>
                </div>
                <div><label className="block text-nfx-slate text-xs font-syne font-semibold uppercase tracking-wider mb-2">Subject</label><input type="text" value={form.subject} onChange={e=>set('subject',e.target.value)} placeholder="What is this about?" className={inputCls}/></div>
                <div><label className="block text-nfx-slate text-xs font-syne font-semibold uppercase tracking-wider mb-2">Message *</label><textarea value={form.message} onChange={e=>set('message',e.target.value)} placeholder="Tell us about your project..." rows={6} className={`${inputCls} resize-none`}/></div>
                <Button variant="primary" className="w-full justify-center" loading={loading} onClick={handleSubmit}>Send Message</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
