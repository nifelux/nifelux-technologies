const PAYSTACK_BASE_URL = 'https://api.paystack.co'
const paystackHeaders = {
  Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
  'Content-Type': 'application/json',
}

export interface PaystackInitPayload {
  email: string
  amount: number
  name?: string
  reference?: string
  callback_url?: string
  metadata?: Record<string, unknown>
}

export async function initializePaystackTransaction(payload: PaystackInitPayload) {
  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/initialize`, {
    method: 'POST',
    headers: paystackHeaders,
    body: JSON.stringify({
      email: payload.email,
      amount: payload.amount * 100,
      name: payload.name,
      reference: payload.reference,
      callback_url: payload.callback_url ?? `${process.env.NEXT_PUBLIC_APP_URL}/support/success`,
      metadata: payload.metadata,
    }),
  })
  if (!response.ok) throw new Error(`Paystack init failed: ${response.statusText}`)
  return response.json()
}

export async function verifyPaystackTransaction(reference: string) {
  const response = await fetch(`${PAYSTACK_BASE_URL}/transaction/verify/${encodeURIComponent(reference)}`, {
    method: 'GET',
    headers: paystackHeaders,
  })
  if (!response.ok) throw new Error(`Paystack verify failed: ${response.statusText}`)
  return response.json()
}
