export interface Contribution {
  id: string
  name: string
  email: string
  amount: number
  reference: string
  status: 'pending' | 'success' | 'failed'
  tier?: string
  created_at: string
}

export interface ContributionFormData {
  name: string
  email: string
  amount: number
  tier?: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface Certification {
  id: string
  title: string
  issuer: string
  status: 'active' | 'processing' | 'pending'
  file_url?: string
  issued_at?: string
  description?: string
}
