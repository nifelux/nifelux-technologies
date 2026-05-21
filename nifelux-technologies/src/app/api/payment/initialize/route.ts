import { NextRequest, NextResponse } from 'next/server'
import { initializePaystackTransaction } from '@/lib/paystack/paystack'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, amount, tier } = body
    if (!name?.trim()) return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    if (!email?.trim() || !email.includes('@')) return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    if (!amount || typeof amount !== 'number' || amount < 100) return NextResponse.json({ error: 'Minimum contribution is ₦100' }, { status: 400 })

    const paystackResponse = await initializePaystackTransaction({
      name: name.trim(), email: email.trim().toLowerCase(), amount,
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/support/success`,
      metadata: { name: name.trim(), tier: tier ?? 'custom', source: 'nifelux_website' },
    })

    if (!paystackResponse.status || !paystackResponse.data?.authorization_url) {
      return NextResponse.json({ error: 'Failed to initialize payment. Please try again.' }, { status: 502 })
    }

    const { authorization_url, reference } = paystackResponse.data
    try {
      const supabase = await createServiceClient()
      await supabase.from('contributions').insert({ name: name.trim(), email: email.trim().toLowerCase(), amount, reference, tier: tier ?? 'custom', status: 'pending' })
    } catch (dbError) { console.error('[Contribution DB insert error]', dbError) }

    return NextResponse.json({ authorization_url, reference })
  } catch (error) {
    console.error('[Payment initialize error]', error)
    return NextResponse.json({ error: 'Internal server error. Please try again.' }, { status: 500 })
  }
}
