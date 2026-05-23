const BASE = 'https://api.paystack.co'
const headers = { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, 'Content-Type': 'application/json' }
export async function initializePaystackTransaction(p: { email:string; amount:number; name?:string; metadata?:Record<string,unknown>; callback_url?:string }) {
  const res = await fetch(`${BASE}/transaction/initialize`, { method:'POST', headers, body: JSON.stringify({ ...p, amount: p.amount * 100 }) })
  if (!res.ok) throw new Error('Paystack init failed')
  return res.json()
}
export async function verifyPaystackTransaction(reference: string) {
  const res = await fetch(`${BASE}/transaction/verify/${encodeURIComponent(reference)}`, { method:'GET', headers })
  if (!res.ok) throw new Error('Paystack verify failed')
  return res.json()
}
