import { NextRequest, NextResponse } from 'next/server'
import { verifyPaystackTransaction } from '@/lib/paystack/paystack'
import { createServiceClient } from '@/lib/supabase/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const reference = searchParams.get('reference')
    if (!reference) return NextResponse.json({ error: 'Payment reference is required' }, { status: 400 })

    const verification = await verifyPaystackTransaction(reference)
    if (!verification.status) return NextResponse.json({ success: false, error: 'Verification request failed' }, { status: 502 })

    const { data } = verification
    const isSuccess = data.status === 'success'

    try {
      const supabase = await createServiceClient()
      await supabase.from('contributions').update({ status: isSuccess ? 'success' : 'failed', amount: Math.round(data.amount / 100), updated_at: new Date().toISOString() }).eq('reference', reference)
    } catch (dbError) { console.error('[DB error during verification]', dbError) }

    if (!isSuccess) return NextResponse.json({ success: false, error: `Payment status: ${data.status}` }, { status: 400 })

    return NextResponse.json({
      success: true, reference: data.reference, amount: Math.round(data.amount / 100),
      name: data.metadata?.name ?? data.customer?.first_name ?? null, email: data.customer?.email, paid_at: data.paid_at,
    })
  } catch (error) {
    console.error('[Payment verify error]', error)
    return NextResponse.json({ success: false, error: 'Verification failed. Please contact support.' }, { status: 500 })
  }
}
