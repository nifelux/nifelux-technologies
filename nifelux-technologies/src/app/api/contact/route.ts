import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body
    if (!name?.trim()) return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    if (!email?.trim() || !email.includes('@')) return NextResponse.json({ error: 'Valid email is required' }, { status: 400 })
    if (!message?.trim()) return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    if (message.trim().length < 10) return NextResponse.json({ error: 'Message is too short' }, { status: 400 })

    const supabase = await createServiceClient()
    const { error } = await supabase.from('contact_messages').insert({ name: name.trim(), email: email.trim().toLowerCase(), subject: subject?.trim() ?? '', message: message.trim() })
    if (error) { console.error('[Contact form DB error]', error); return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 }) }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[Contact form error]', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
