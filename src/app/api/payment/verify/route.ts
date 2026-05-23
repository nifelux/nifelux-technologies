import { NextRequest, NextResponse } from 'next/server'
import { verifyPaystackTransaction } from '@/lib/paystack/paystack'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  try {
    const ref = new URL(req.url).searchParams.get('reference')
    if (!ref) return NextResponse.json({ error: 'Reference required' }, { status: 400 })
    const v = await verifyPaystackTransaction(ref)
    if (!v.status) return NextResponse.json({ success: false, error: 'Verification failed' }, { status: 502 })
    const ok = v.data.status === 'success'
    try { const sb = await createServiceClient(); await sb.from('contributions').update({ status: ok?'success':'failed', amount: Math.round(v.data.amount/100) }).eq('reference', ref) } catch(e) { console.error('[DB]',e) }
    if (!ok) return NextResponse.json({ success: false, error: `Status: ${v.data.status}` }, { status: 400 })
    return NextResponse.json({ success: true, reference: v.data.reference, amount: Math.round(v.data.amount/100), name: v.data.metadata?.name ?? null })
  } catch(e) { return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 }) }
}
