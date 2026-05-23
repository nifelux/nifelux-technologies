import { NextRequest, NextResponse } from 'next/server'
import { createServiceClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json()
    if (!name?.trim()) return NextResponse.json({ error: 'Name required' }, { status: 400 })
    if (!email?.includes('@')) return NextResponse.json({ error: 'Valid email required' }, { status: 400 })
    if (!message?.trim() || message.trim().length < 10) return NextResponse.json({ error: 'Message too short' }, { status: 400 })
    const sb = await createServiceClient()
    const { error } = await sb.from('contact_messages').insert({ name: name.trim(), email: email.toLowerCase(), subject: subject?.trim()??'', message: message.trim() })
    if (error) return NextResponse.json({ error: 'Failed to save' }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch(e) { return NextResponse.json({ error: 'Server error' }, { status: 500 }) }
}
