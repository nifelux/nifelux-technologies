import { NextRequest, NextResponse } from 'next/server'
import { initializePaystackTransaction } from '@/lib/paystack/paystack'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, amount, tier } = await req.json()
    if (!name?.trim()) return NextResponse.json({ error: 'Name required' }, { status: 400 })
    if (!email?.includes('@')) return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    if (!amount || amount < 100) return NextResponse.json({ error: 'Minimum ₦100' }, { status: 400 })
    const res = await initializePaystackTransaction({ name, email: email.toLowerCase(), amount, callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/support/success`, metadata: { name, tier: tier ?? 'custom' } })
    if (!res.status || !res.data?.authorization_url) return NextResponse.json({ error: 'Payment init failed' }, { status: 502 })
    try { const sb = await createServiceClient(); await sb.from('contributions').insert({ name, email: email.toLowerCase(), amount, reference: res.data.reference, tier: tier ?? 'custom', status: 'pending' }) } catch(e) { console.error('[DB]',e) }
    return NextResponse.json({ authorization_url: res.data.authorization_url, reference: res.data.reference })
  } catch(e) { return NextResponse.json({ error: 'Server error' }, { status: 500 }) }
}
