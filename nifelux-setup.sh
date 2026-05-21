#!/bin/bash
# ============================================================
# Nifelux Technologies — One-Paste Setup Script
# Run this inside your nifelux-technologies folder in Codespaces
# ============================================================

set -e
echo ""
echo "🚀 Setting up Nifelux Technologies project..."
echo ""

# ── Create all directories ────────────────────────────────
mkdir -p src/app/{about,services,robotics,certifications,contact,api/{contact,payment/{initialize,verify}}}
mkdir -p src/app/support/success
mkdir -p src/components/{ui,layout,home}
mkdir -p src/lib/{supabase,paystack}
mkdir -p src/types
mkdir -p public/{images,icons}
echo "✓ Directories created"

# ── .env.local ────────────────────────────────────────────
cat > .env.local << 'EOF'
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_xxxx
PAYSTACK_SECRET_KEY=sk_test_xxxx
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF
echo "✓ .env.local created"

# ── next.config.ts ────────────────────────────────────────
cat > next.config.ts << 'EOF'
import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co', port: '', pathname: '/storage/v1/object/public/**' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
    ]
  },
}
export default nextConfig
EOF

# ── tailwind.config.ts ────────────────────────────────────
cat > tailwind.config.ts << 'EOF'
import type { Config } from 'tailwindcss'
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'nfx-black': '#020617',
        'nfx-navy': '#0f172a',
        'nfx-navy-light': '#1e293b',
        'nfx-blue': '#3b82f6',
        'nfx-blue-dark': '#2563eb',
        'nfx-blue-deeper': '#1d4ed8',
        'nfx-red': '#ef4444',
        'nfx-red-dark': '#dc2626',
        'nfx-white': '#f8fafc',
        'nfx-slate': '#94a3b8',
        'nfx-slate-light': '#cbd5e1',
      },
      fontFamily: {
        syne: ['var(--font-syne)', 'sans-serif'],
        dm: ['var(--font-dm-sans)', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
EOF

# ── tsconfig.json ─────────────────────────────────────────
cat > tsconfig.json << 'EOF'
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
EOF
echo "✓ Config files written"

# ── globals.css ───────────────────────────────────────────
cat > src/app/globals.css << 'EOF'
@import 'tailwindcss';

:root {
  --bg-primary: #020617;
  --bg-secondary: #0f172a;
  --accent-blue: #3b82f6;
  --accent-blue-dark: #2563eb;
  --accent-red: #ef4444;
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
}

html { scroll-behavior: smooth; }

body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: var(--font-dm-sans), sans-serif;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

.dot-grid {
  background-image: radial-gradient(circle, rgba(59,130,246,0.12) 1px, transparent 1px);
  background-size: 32px 32px;
}

.dot-grid-animated {
  background-image: radial-gradient(circle, rgba(59,130,246,0.10) 1px, transparent 1px);
  background-size: 32px 32px;
  animation: gridSlide 30s linear infinite;
}

@keyframes gridSlide {
  0% { background-position: 0 0; }
  100% { background-position: 32px 32px; }
}

.glass-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: border-color 0.2s ease, background 0.2s ease;
}

.glass-card:hover {
  border-color: rgba(59,130,246,0.3);
  background: rgba(255,255,255,0.06);
}

.text-gradient-blue {
  background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 50%, #2563eb 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.text-gradient-red {
  background: linear-gradient(135deg, #f87171 0%, #ef4444 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.divider-blue {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent);
}

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg-primary); }
::-webkit-scrollbar-thumb { background: rgba(59,130,246,0.4); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: rgba(59,130,246,0.7); }
::selection { background: rgba(59,130,246,0.3); color: #f8fafc; }
:focus-visible { outline: 2px solid rgba(59,130,246,0.6); outline-offset: 2px; }
EOF

# ── layout.tsx ────────────────────────────────────────────
cat > src/app/layout.tsx << 'EOF'
import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const syne = Syne({
  subsets: ['latin'],
  weight: ['400','500','600','700','800'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300','400','500','600'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Nifelux Technologies — Building the Future of Technology in Africa',
    template: '%s | Nifelux Technologies',
  },
  description: 'Nifelux Technologies is a future-focused Nigerian technology company building innovative solutions in Artificial Intelligence, Robotics, EdTech, Software Development, and Automation Systems.',
  keywords: ['Nifelux Technologies','AI company Nigeria','Robotics Nigeria','EdTech Africa','Technology company Nigeria'],
  authors: [{ name: 'Oluwanifemi Abdullahi Olude' }],
  creator: 'Nifelux Technologies',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    siteName: 'Nifelux Technologies',
    title: 'Nifelux Technologies — Building the Future of Technology in Africa',
    description: 'A future-focused Nigerian technology company building innovative AI, Robotics, and EdTech solutions.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="bg-nfx-black text-nfx-white font-dm antialiased">
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0f172a',
              color: '#f8fafc',
              border: '1px solid rgba(255,255,255,0.1)',
              fontFamily: 'var(--font-dm-sans)',
              fontSize: '14px',
            },
          }}
        />
      </body>
    </html>
  )
}
EOF

# ── types/index.ts ────────────────────────────────────────
cat > src/types/index.ts << 'EOF'
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
EOF

# ── lib/constants.ts ──────────────────────────────────────
cat > src/lib/constants.ts << 'EOF'
export const SITE = {
  name: 'Nifelux Technologies',
  tagline: 'Building the Future of Technology in Africa.',
  founder: 'Oluwanifemi Abdullahi Olude',
  founderRole: 'Founder & CEO',
  email: 'contact@nifelux.com',
  phone: '+234 000 000 0000',
  url: process.env.NEXT_PUBLIC_APP_URL ?? 'https://nifelux.com',
}

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Robotics', href: '/robotics' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Contact', href: '/contact' },
]

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/',
  telegram: 'https://t.me/',
  whatsapp: 'https://wa.me/',
  twitter: 'https://twitter.com/',
}

export const SERVICES = [
  { id: 'ai', title: 'Artificial Intelligence', description: 'Building intelligent systems that learn, adapt, and solve real-world problems across education, business, and society.', icon: '🧠', color: 'blue' },
  { id: 'robotics', title: 'Robotics', description: 'Designing and developing smart robotic systems for automation, research, and industrial applications in Africa.', icon: '🤖', color: 'blue' },
  { id: 'edtech', title: 'Educational Technology', description: 'AI-powered learning platforms that personalize education for students across Nigeria and Africa.', icon: '🎓', color: 'red' },
  { id: 'software', title: 'Software Development', description: 'End-to-end software solutions built with modern frameworks and company-grade engineering standards.', icon: '💻', color: 'blue' },
  { id: 'web', title: 'Web Development', description: 'Premium, performant web applications and platforms — from landing pages to full enterprise systems.', icon: '🌐', color: 'blue' },
  { id: 'mobile', title: 'Mobile App Development', description: 'Cross-platform mobile applications that deliver native-quality experiences on iOS and Android.', icon: '📱', color: 'red' },
  { id: 'automation', title: 'Automation Systems', description: 'Smart automation solutions that streamline operations, reduce costs, and eliminate repetitive work.', icon: '⚙️', color: 'blue' },
  { id: 'cloud', title: 'Cloud & Infrastructure', description: 'Scalable cloud architecture, DevOps pipelines, and infrastructure built for growth.', icon: '☁️', color: 'blue' },
  { id: 'research', title: 'Research & Innovation', description: 'Pushing the boundaries of technology through applied research in AI, robotics, and smart systems.', icon: '🔬', color: 'red' },
]

export const STATS = [
  { value: '2024', label: 'Founded' },
  { value: '9+', label: 'Service Areas' },
  { value: '∞', label: 'Innovation Drive' },
  { value: '🇳🇬', label: 'Made in Nigeria' },
]

export const CONTRIBUTION_TIERS = [
  {
    id: 'supporter',
    label: 'Supporter',
    amount: 500,
    description: 'Help us keep the lights on and push our research forward.',
    perks: ['Supporter badge', 'Name in our thank you list'],
  },
  {
    id: 'builder',
    label: 'Builder',
    amount: 2000,
    description: 'Fuel a week of development on NIRA AI or our robotics lab.',
    perks: ['Builder badge', 'Exclusive project update', 'Priority acknowledgement'],
  },
  {
    id: 'pioneer',
    label: 'Pioneer',
    amount: 10000,
    description: 'Be part of shaping the future of technology in Africa.',
    perks: ['Pioneer badge', 'Direct founder acknowledgement', 'Early access to platforms'],
  },
]
EOF

# ── lib/supabase/client.ts ────────────────────────────────
cat > src/lib/supabase/client.ts << 'EOF'
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
EOF

# ── lib/supabase/server.ts ────────────────────────────────
cat > src/lib/supabase/server.ts << 'EOF'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } catch {}
        },
      },
    }
  )
}

export async function createServiceClient() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(cookiesToSet) {
          try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } catch {}
        },
      },
    }
  )
}
EOF

# ── lib/paystack/paystack.ts ──────────────────────────────
cat > src/lib/paystack/paystack.ts << 'EOF'
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
EOF
echo "✓ Lib files written"

# ── components/ui/Button.tsx ──────────────────────────────
cat > src/components/ui/Button.tsx << 'EOF'
'use client'
import { type ButtonHTMLAttributes, forwardRef } from 'react'
import Link from 'next/link'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  href?: string
  loading?: boolean
  children: React.ReactNode
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-gradient-to-r from-nfx-blue-dark to-nfx-blue text-white hover:shadow-[0_8px_32px_rgba(59,130,246,0.4)] hover:-translate-y-0.5',
  secondary: 'bg-transparent text-nfx-white border border-white/15 hover:border-nfx-blue/50 hover:bg-nfx-blue/8 hover:-translate-y-0.5',
  danger: 'bg-gradient-to-r from-nfx-red-dark to-nfx-red text-white hover:shadow-[0_8px_32px_rgba(239,68,68,0.4)] hover:-translate-y-0.5',
  ghost: 'bg-transparent text-nfx-slate hover:text-nfx-white hover:bg-white/5',
}

const sizeStyles: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-7 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', href, loading = false, children, className = '', disabled, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center gap-2 rounded-xl font-syne font-semibold tracking-wide transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
    const classes = `${base} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`
    if (href) return <Link href={href} className={classes}>{children}</Link>
    return (
      <button ref={ref} className={classes} disabled={disabled || loading} {...props}>
        {loading ? (
          <><span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />Processing...</>
        ) : children}
      </button>
    )
  }
)
Button.displayName = 'Button'
export default Button
EOF

# ── components/ui/Badge.tsx ───────────────────────────────
cat > src/components/ui/Badge.tsx << 'EOF'
type BadgeVariant = 'blue' | 'red' | 'green' | 'yellow' | 'gray'
interface BadgeProps { label: string; variant?: BadgeVariant; dot?: boolean; className?: string }

const variantStyles: Record<BadgeVariant, string> = {
  blue: 'bg-nfx-blue/10 text-nfx-blue border-nfx-blue/20',
  red: 'bg-nfx-red/10 text-nfx-red border-nfx-red/20',
  green: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  yellow: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  gray: 'bg-white/5 text-nfx-slate border-white/10',
}

const dotStyles: Record<BadgeVariant, string> = {
  blue: 'bg-nfx-blue', red: 'bg-nfx-red', green: 'bg-emerald-400', yellow: 'bg-amber-400', gray: 'bg-nfx-slate',
}

export default function Badge({ label, variant = 'blue', dot = false, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-syne font-semibold border ${variantStyles[variant]} ${className}`}>
      {dot && <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${dotStyles[variant]}`} />}
      {label}
    </span>
  )
}
EOF

# ── components/ui/SectionHeader.tsx ──────────────────────
cat > src/components/ui/SectionHeader.tsx << 'EOF'
interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  titleClassName?: string
}

export default function SectionHeader({ eyebrow, title, subtitle, align = 'center', titleClassName = '' }: SectionHeaderProps) {
  const alignClass = align === 'center' ? 'text-center items-center' : 'text-left items-start'
  return (
    <div className={`flex flex-col gap-4 ${alignClass}`}>
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-xs font-syne font-semibold uppercase tracking-[0.2em] text-nfx-blue">
          <span className="h-px w-6 bg-nfx-blue" />{eyebrow}<span className="h-px w-6 bg-nfx-blue" />
        </span>
      )}
      <h2 className={`font-syne font-bold text-3xl md:text-4xl lg:text-5xl text-nfx-white leading-tight ${titleClassName}`}>{title}</h2>
      {subtitle && (
        <p className={`text-nfx-slate text-base md:text-lg leading-relaxed ${align === 'center' ? 'max-w-2xl mx-auto' : 'max-w-2xl'}`}>{subtitle}</p>
      )}
    </div>
  )
}
EOF
echo "✓ UI components written"

# ── components/layout/PageWrapper.tsx ────────────────────
cat > src/components/layout/PageWrapper.tsx << 'EOF'
import Navbar from './Navbar'
import Footer from './Footer'

interface PageWrapperProps { children: React.ReactNode; className?: string }

export default function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <div className="min-h-screen flex flex-col bg-nfx-black">
      <Navbar />
      <main className={`flex-1 ${className}`}>{children}</main>
      <Footer />
    </div>
  )
}
EOF

# ── components/layout/Navbar.tsx ──────────────────────────
cat > src/components/layout/Navbar.tsx << 'EOF'
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAV_LINKS } from '@/lib/constants'
import Button from '@/components/ui/Button'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-nfx-black/80 backdrop-blur-xl border-b border-white/6 shadow-[0_4px_32px_rgba(0,0,0,0.4)]' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-nfx-blue-dark to-nfx-blue flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-300">
                <span className="text-white font-syne font-bold text-sm">N</span>
              </div>
              <span className="font-syne font-bold text-lg text-nfx-white tracking-wide">Nifelux<span className="text-nfx-blue">.</span></span>
            </Link>
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href}
                  className={`px-4 py-2 rounded-lg font-dm text-sm transition-all duration-200 ${pathname === link.href ? 'text-nfx-blue bg-nfx-blue/10' : 'text-nfx-slate hover:text-nfx-white hover:bg-white/5'}`}>
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="hidden lg:flex items-center gap-3">
              <Button href="/support" variant="primary" size="sm">Support Us</Button>
            </div>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg text-nfx-slate hover:text-nfx-white hover:bg-white/5 transition-colors" aria-label="Toggle menu">
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
                <span className={`h-0.5 bg-current rounded-full transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} onClick={() => setMobileOpen(false)}>
        <div className="absolute inset-0 bg-nfx-black/60 backdrop-blur-sm" />
      </div>

      <div className={`fixed top-0 right-0 bottom-0 z-50 w-72 lg:hidden bg-nfx-navy border-l border-white/8 transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-8">
            <span className="font-syne font-bold text-nfx-white">Menu</span>
            <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg text-nfx-slate hover:text-nfx-white hover:bg-white/5">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <nav className="flex flex-col gap-1 flex-1">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href}
                className={`px-4 py-3 rounded-xl font-dm text-sm transition-all duration-200 ${pathname === link.href ? 'text-nfx-blue bg-nfx-blue/10 font-medium' : 'text-nfx-slate hover:text-nfx-white hover:bg-white/5'}`}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-6 border-t border-white/8">
            <Button href="/support" variant="primary" className="w-full justify-center">Support Nifelux</Button>
          </div>
        </div>
      </div>
    </>
  )
}
EOF

# ── components/layout/Footer.tsx ─────────────────────────
cat > src/components/layout/Footer.tsx << 'EOF'
import Link from 'next/link'
import { SITE, SOCIAL_LINKS } from '@/lib/constants'

const FOOTER_LINKS = {
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Robotics', href: '/robotics' },
    { label: 'Certifications', href: '/certifications' },
  ],
  Support: [
    { label: 'Support Nifelux', href: '/support' },
    { label: 'Contact Us', href: '/contact' },
  ],
}

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative border-t border-white/8 bg-nfx-navy/50">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-px w-1/2 bg-gradient-to-r from-transparent via-nfx-blue/40 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-5 group">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-nfx-blue-dark to-nfx-blue flex items-center justify-center">
                <span className="text-white font-syne font-bold">N</span>
              </div>
              <span className="font-syne font-bold text-xl text-nfx-white">Nifelux<span className="text-nfx-blue">.</span></span>
            </Link>
            <p className="text-nfx-slate text-sm leading-relaxed max-w-sm font-dm">
              A future-focused Nigerian technology company building innovative solutions in AI, Robotics, Educational Technology, and Smart Digital Platforms.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {[
                { href: SOCIAL_LINKS.facebook, label: 'Facebook' },
                { href: SOCIAL_LINKS.twitter, label: 'Twitter' },
                { href: SOCIAL_LINKS.whatsapp, label: 'WhatsApp' },
                { href: SOCIAL_LINKS.telegram, label: 'Telegram' },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="h-9 w-9 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-nfx-slate hover:text-nfx-blue hover:border-nfx-blue/30 transition-all duration-200">
                  <span className="text-xs font-syne font-bold">{s.label[0]}</span>
                </a>
              ))}
            </div>
          </div>
          {Object.entries(FOOTER_LINKS).map(([group, links]) => (
            <div key={group}>
              <h4 className="font-syne font-semibold text-nfx-white text-sm mb-4 uppercase tracking-widest">{group}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-nfx-slate text-sm font-dm hover:text-nfx-white transition-colors duration-200">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-nfx-slate text-xs font-dm">© {year} Nifelux Technologies. All rights reserved.</p>
          <p className="text-nfx-slate text-xs font-dm">Founded by <span className="text-nfx-slate-light">{SITE.founder}</span> · Made in 🇳🇬 Nigeria</p>
        </div>
      </div>
    </footer>
  )
}
EOF
echo "✓ Layout components written"

# ── components/home/Hero.tsx ──────────────────────────────
cat > src/components/home/Hero.tsx << 'EOF'
'use client'
import { useEffect, useRef } from 'react'
import Button from '@/components/ui/Button'
import { STATS } from '@/lib/constants'

export default function Hero() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    const el = headlineRef.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(32px)'
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.9s ease-out, transform 0.9s ease-out'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    })
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-nfx-black pt-20">
      <div className="absolute inset-0 dot-grid-animated opacity-60" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-nfx-blue-deeper/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-[400px] h-[300px] rounded-full bg-nfx-red/6 blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-nfx-blue/25 bg-nfx-blue/8 mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-nfx-blue animate-pulse" />
          <span className="text-nfx-blue text-xs font-syne font-semibold tracking-widest uppercase">Nigerian Technology Company</span>
        </div>

        <h1 ref={headlineRef} className="font-syne font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-nfx-white leading-[1.05] tracking-tight mb-6">
          Building the<br />Future of Tech<br /><span className="text-gradient-blue">in Africa.</span>
        </h1>

        <p className="text-nfx-slate text-lg md:text-xl max-w-2xl leading-relaxed font-dm mb-10">
          Nifelux Technologies creates AI systems, robotics solutions, educational platforms, and smart digital tools — built for Nigeria and the world.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
          <Button href="/services" variant="primary" size="lg">
            Explore Our Work
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Button>
          <Button href="/support" variant="secondary" size="lg">Support Nifelux</Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/6 rounded-2xl overflow-hidden border border-white/8 w-full max-w-3xl">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-nfx-black/80 px-6 py-5 text-center">
              <div className="font-syne font-extrabold text-2xl md:text-3xl text-nfx-white mb-1">{stat.value}</div>
              <div className="text-nfx-slate text-xs font-dm uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-nfx-black to-transparent pointer-events-none" />
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-nfx-slate animate-float">
        <span className="text-xs font-dm tracking-widest uppercase opacity-50">Scroll</span>
        <svg className="h-4 w-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
EOF

# ── components/home/ServicesPreview.tsx ───────────────────
cat > src/components/home/ServicesPreview.tsx << 'EOF'
import Link from 'next/link'
import SectionHeader from '@/components/ui/SectionHeader'
import { SERVICES } from '@/lib/constants'

export default function ServicesPreview() {
  const preview = SERVICES.slice(0, 6)
  return (
    <section className="relative py-24 bg-nfx-black overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-30" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="What We Build" title="Our Core Services" subtitle="From artificial intelligence to robotics — we design and build technology systems that create real-world impact." />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {preview.map((service) => (
            <div key={service.id} className="glass-card rounded-2xl p-6 group transition-all duration-300 hover:shadow-[0_8px_40px_rgba(59,130,246,0.12)]">
              <div className={`h-12 w-12 rounded-xl flex items-center justify-center text-2xl mb-5 ${service.color === 'red' ? 'bg-nfx-red/10 border border-nfx-red/15' : 'bg-nfx-blue/10 border border-nfx-blue/15'}`}>{service.icon}</div>
              <h3 className="font-syne font-bold text-nfx-white text-lg mb-2 group-hover:text-nfx-blue transition-colors duration-200">{service.title}</h3>
              <p className="text-nfx-slate text-sm font-dm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link href="/services" className="inline-flex items-center gap-2 text-nfx-blue text-sm font-syne font-semibold hover:gap-3 transition-all duration-200">
            View all services
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
EOF

# ── components/home/WhyNifelux.tsx ────────────────────────
cat > src/components/home/WhyNifelux.tsx << 'EOF'
import SectionHeader from '@/components/ui/SectionHeader'

const REASONS = [
  { title: 'Innovation First', description: 'We don\'t follow trends — we set them. Every product starts with a bold idea about how technology can improve lives in Africa.' },
  { title: 'Research Driven', description: 'Our work is grounded in applied research. We build systems designed for real-world complexity.' },
  { title: 'Africa-Focused', description: 'We build for the African context — understanding local challenges while maintaining global quality standards.' },
  { title: 'Engineering Excellence', description: 'Company-grade code. Clean architecture. Scalable systems built to grow with you.' },
  { title: 'Modular & Scalable', description: 'Every system we design is modular from the ground up. Add features and scale without rebuilding.' },
  { title: 'Built with Purpose', description: 'Every line of code serves a mission: improving education, opportunity, and quality of life in Africa.' },
]

export default function WhyNifelux() {
  return (
    <section className="relative py-24 bg-nfx-navy/30 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Why Us" title="Why Choose Nifelux" subtitle="We're not just another tech company. We're a movement — building the systems that will define the next chapter of African technology." />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-14">
          {REASONS.map((reason) => (
            <div key={reason.title} className="glass-card rounded-2xl p-6 group hover:border-nfx-blue/25 transition-all duration-300">
              <h3 className="font-syne font-bold text-nfx-white text-base mb-2">{reason.title}</h3>
              <p className="text-nfx-slate text-sm font-dm leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
EOF

# ── components/home/SupportCTA.tsx ────────────────────────
cat > src/components/home/SupportCTA.tsx << 'EOF'
import Button from '@/components/ui/Button'

export default function SupportCTA() {
  return (
    <section className="relative py-24 overflow-hidden bg-nfx-black">
      <div className="absolute inset-0 bg-gradient-to-br from-nfx-blue-deeper/8 via-transparent to-nfx-red/5" />
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-nfx-red/25 bg-nfx-red/8 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-nfx-red animate-pulse" />
          <span className="text-nfx-red text-xs font-syne font-semibold tracking-widest uppercase">Support Our Mission</span>
        </div>
        <h2 className="font-syne font-extrabold text-4xl md:text-5xl lg:text-6xl text-nfx-white leading-tight mb-6">
          Help Us Build the<br /><span className="text-gradient-blue">Future of Africa.</span>
        </h2>
        <p className="text-nfx-slate text-lg font-dm leading-relaxed mb-10 max-w-2xl mx-auto">
          Nifelux Technologies is building AI systems, robotics labs, and educational platforms that will shape the next generation of African innovation.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button href="/support" variant="primary" size="lg">Support Nifelux Today</Button>
          <Button href="/about" variant="secondary" size="lg">Learn About Us</Button>
        </div>
        <p className="text-nfx-slate text-xs font-dm mt-6 opacity-60">Payments secured by Paystack · Starting from ₦100</p>
      </div>
    </section>
  )
}
EOF

# ── components/home/RoboticsShowcase.tsx ──────────────────
cat > src/components/home/RoboticsShowcase.tsx << 'EOF'
import Button from '@/components/ui/Button'

export default function RoboticsShowcase() {
  return (
    <section className="relative py-24 bg-nfx-navy/20 overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-syne font-semibold uppercase tracking-[0.2em] text-nfx-blue mb-5">
              <span className="h-px w-6 bg-nfx-blue" />Robotics Division
            </span>
            <h2 className="font-syne font-extrabold text-4xl md:text-5xl text-nfx-white leading-tight mb-5">
              Smart Robotics for<br />a <span className="text-gradient-blue">Smarter Africa.</span>
            </h2>
            <p className="text-nfx-slate text-base font-dm leading-relaxed mb-6">
              Our robotics division is developing AI-powered robotic systems for education, agriculture, industrial automation, and research.
            </p>
            <ul className="space-y-3 mb-8">
              {['AI-integrated robotic systems','Educational robotics programs','Industrial automation solutions','Research & prototype development'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-nfx-slate-light text-sm font-dm">
                  <span className="h-1.5 w-1.5 rounded-full bg-nfx-blue flex-shrink-0" />{item}
                </li>
              ))}
            </ul>
            <Button href="/robotics" variant="primary">Explore Robotics</Button>
          </div>
          <div className="glass-card rounded-3xl p-8 relative overflow-hidden aspect-[4/3] flex items-center justify-center">
            <div className="absolute inset-0 dot-grid opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-br from-nfx-blue/8 to-transparent" />
            <div className="relative z-10 flex flex-col items-center gap-4 text-center">
              <div className="h-24 w-24 rounded-2xl bg-nfx-blue/15 border border-nfx-blue/25 flex items-center justify-center animate-float">
                <span className="text-6xl">🤖</span>
              </div>
              <div>
                <p className="font-syne font-bold text-nfx-white text-lg">NIRA Robotics</p>
                <p className="text-nfx-slate text-sm font-dm">Research & Development</p>
              </div>
              <div className="flex gap-2 flex-wrap justify-center">
                {['AI Vision','Automation','Research'].map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-nfx-blue/10 border border-nfx-blue/20 text-nfx-blue text-xs font-syne">{tag}</span>
                ))}
              </div>
            </div>
            <div className="absolute top-4 left-4 h-8 w-8 border-t-2 border-l-2 border-nfx-blue/30 rounded-tl-lg" />
            <div className="absolute top-4 right-4 h-8 w-8 border-t-2 border-r-2 border-nfx-blue/30 rounded-tr-lg" />
            <div className="absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2 border-nfx-blue/30 rounded-bl-lg" />
            <div className="absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-nfx-blue/30 rounded-br-lg" />
          </div>
        </div>
      </div>
    </section>
  )
}
EOF
echo "✓ Home components written"

# ── app/page.tsx ──────────────────────────────────────────
cat > src/app/page.tsx << 'EOF'
import PageWrapper from '@/components/layout/PageWrapper'
import Hero from '@/components/home/Hero'
import ServicesPreview from '@/components/home/ServicesPreview'
import RoboticsShowcase from '@/components/home/RoboticsShowcase'
import WhyNifelux from '@/components/home/WhyNifelux'
import SupportCTA from '@/components/home/SupportCTA'

export default function HomePage() {
  return (
    <PageWrapper>
      <Hero />
      <ServicesPreview />
      <RoboticsShowcase />
      <WhyNifelux />
      <SupportCTA />
    </PageWrapper>
  )
}
EOF

# ── app/not-found.tsx ─────────────────────────────────────
cat > src/app/not-found.tsx << 'EOF'
import PageWrapper from '@/components/layout/PageWrapper'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <PageWrapper>
      <section className="relative min-h-screen flex items-center justify-center bg-nfx-black overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-25" />
        <div className="relative z-10 text-center px-4 sm:px-6">
          <div className="font-syne font-extrabold text-[140px] md:text-[200px] leading-none text-gradient-blue opacity-20 select-none">404</div>
          <div className="-mt-8 md:-mt-12 mb-6">
            <h1 className="font-syne font-extrabold text-3xl md:text-4xl text-nfx-white">Page Not Found</h1>
          </div>
          <p className="text-nfx-slate font-dm text-base leading-relaxed max-w-md mx-auto mb-8">
            This page does not exist or may have been moved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button href="/" variant="primary">Back to Home</Button>
            <Button href="/contact" variant="secondary">Contact Us</Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
EOF

# ── app/sitemap.ts ────────────────────────────────────────
cat > src/app/sitemap.ts << 'EOF'
import { MetadataRoute } from 'next'
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://nifelux.com'
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/robotics`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/certifications`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/support`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
  ]
}
EOF

# ── app/robots.ts ─────────────────────────────────────────
cat > src/app/robots.ts << 'EOF'
import { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? 'https://nifelux.com'
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/support/success'] }],
    sitemap: `${base}/sitemap.xml`,
  }
}
EOF
echo "✓ App pages (root) written"

# ── app/about/page.tsx ────────────────────────────────────
cat > src/app/about/page.tsx << 'EOF'
import type { Metadata } from 'next'
import PageWrapper from '@/components/layout/PageWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = { title: 'About', description: 'Learn about Nifelux Technologies — our story, mission, values, and vision.' }

const VALUES = [
  { title: 'Innovation', description: 'We push boundaries and question the status quo in every product we build.', icon: '💡' },
  { title: 'Excellence', description: 'Company-grade quality in everything — code, design, research, and communication.', icon: '⭐' },
  { title: 'Impact', description: 'Technology only matters if it creates real change in people\'s lives and communities.', icon: '🌍' },
  { title: 'Integrity', description: 'Transparent, honest, and ethical in all our business dealings and product decisions.', icon: '🤝' },
  { title: 'Persistence', description: 'Building the future is hard. We don\'t stop at the first obstacle — or the tenth.', icon: '🔥' },
  { title: 'Open Learning', description: 'We learn continuously, share knowledge, and grow as individuals and as a company.', icon: '📚' },
]

const TIMELINE = [
  { year: '2024', title: 'Nifelux Founded', description: 'Nifelux Technologies established with a vision to build AI and robotics systems for Africa.' },
  { year: '2024', title: 'NIRA AI Development Begins', description: 'Work begins on NIRA AI — a modular, intelligent learning and career platform.' },
  { year: '2025', title: 'Robotics Research Division', description: 'Nifelux launches internal research into smart robotic systems for education and automation.' },
  { year: '2025+', title: 'Expanding Across Africa', description: 'Goal: serve students, developers, and businesses across Nigeria and the rest of Africa.' },
]

export default function AboutPage() {
  return (
    <PageWrapper>
      <section className="relative pt-36 pb-20 overflow-hidden bg-nfx-black">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-nfx-blue/8 rounded-full blur-[100px]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-syne font-extrabold text-5xl md:text-6xl lg:text-7xl text-nfx-white leading-tight mb-6">
            About <span className="text-gradient-blue">Nifelux</span>
          </h1>
          <p className="text-nfx-slate text-lg font-dm leading-relaxed max-w-2xl mx-auto">
            A technology company born in Nigeria with a mission that extends far beyond it.
          </p>
        </div>
      </section>
      <div className="divider-blue" />

      <section className="py-20 bg-nfx-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeader eyebrow="Our Origin" title="The Nifelux Story" align="left" />
              <div className="mt-6 space-y-4 text-nfx-slate font-dm leading-relaxed">
                <p>Nifelux Technologies was founded with a clear conviction: Africa does not just need to consume technology — it needs to create it.</p>
                <p>Starting with AI and educational technology, then expanding into robotics and automation systems, Nifelux is building the infrastructure of innovation that Nigeria and Africa deserve.</p>
                <p>Every product we build — from NIRA AI to our robotics research division — is designed to create real, measurable impact for students, developers, and businesses across Africa.</p>
              </div>
            </div>
            <div className="glass-card rounded-3xl p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-nfx-blue/5 to-transparent" />
              <div className="relative z-10">
                <div className="text-5xl mb-4">🇳🇬</div>
                <h3 className="font-syne font-bold text-nfx-white text-2xl mb-2">Made in Nigeria</h3>
                <p className="text-nfx-slate text-sm font-dm leading-relaxed mb-6">Proudly Nigerian. Globally competitive. We build with world-class quality standards — from right here in Africa.</p>
                <div className="grid grid-cols-2 gap-3">
                  {[{ label: 'AI Systems', value: 'Active' },{ label: 'Robotics', value: 'R&D' },{ label: 'EdTech', value: 'Building' },{ label: 'Vision', value: 'Africa' }].map((item) => (
                    <div key={item.label} className="bg-white/5 rounded-xl p-3">
                      <div className="text-nfx-blue text-xs font-syne font-semibold">{item.value}</div>
                      <div className="text-nfx-slate text-xs font-dm mt-0.5">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-nfx-navy/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeader eyebrow="Leadership" title="Founder & CEO" />
          <div className="mt-10 glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="relative z-10">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-nfx-blue-dark to-nfx-blue flex items-center justify-center mx-auto mb-6 shadow-[0_0_40px_rgba(59,130,246,0.3)]">
                <span className="font-syne font-extrabold text-3xl text-white">O</span>
              </div>
              <h3 className="font-syne font-bold text-nfx-white text-2xl mb-1">{SITE.founder}</h3>
              <p className="text-nfx-blue font-syne font-semibold text-sm mb-6 uppercase tracking-widest">{SITE.founderRole}</p>
              <p className="text-nfx-slate font-dm leading-relaxed max-w-xl mx-auto">A technology builder and innovator with a vision to position Nigeria at the forefront of global technological development.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-nfx-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="What We Stand For" title="Our Core Values" subtitle="These principles guide every decision we make." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
            {VALUES.map((value) => (
              <div key={value.title} className="glass-card rounded-2xl p-6 group hover:border-nfx-blue/25 transition-all duration-300">
                <div className="text-3xl mb-4">{value.icon}</div>
                <h3 className="font-syne font-bold text-nfx-white text-lg mb-2">{value.title}</h3>
                <p className="text-nfx-slate text-sm font-dm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-nfx-navy/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Our Journey" title="Company Milestones" />
          <div className="mt-12 space-y-6">
            {TIMELINE.map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="h-8 w-8 rounded-full bg-nfx-blue/15 border border-nfx-blue/30 flex items-center justify-center flex-shrink-0">
                    <span className="h-2 w-2 rounded-full bg-nfx-blue" />
                  </div>
                  {i < TIMELINE.length - 1 && <div className="flex-1 w-px bg-gradient-to-b from-nfx-blue/20 to-transparent mt-2" />}
                </div>
                <div className="pb-8">
                  <span className="text-nfx-blue text-xs font-syne font-bold uppercase tracking-widest">{item.year}</span>
                  <h4 className="font-syne font-bold text-nfx-white text-lg mt-1 mb-2">{item.title}</h4>
                  <p className="text-nfx-slate text-sm font-dm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-nfx-black text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-syne font-extrabold text-3xl md:text-4xl text-nfx-white mb-4">Ready to work with us?</h2>
          <p className="text-nfx-slate font-dm mb-8">Whether you want to partner, support our mission, or just learn more — we would love to hear from you.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="primary">Get in Touch</Button>
            <Button href="/support" variant="secondary">Support Us</Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
EOF

# ── app/services/page.tsx ─────────────────────────────────
cat > src/app/services/page.tsx << 'EOF'
import type { Metadata } from 'next'
import PageWrapper from '@/components/layout/PageWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import Button from '@/components/ui/Button'
import { SERVICES } from '@/lib/constants'

export const metadata: Metadata = { title: 'Services', description: 'All services offered by Nifelux Technologies.' }

export default function ServicesPage() {
  return (
    <PageWrapper>
      <section className="relative pt-36 pb-20 overflow-hidden bg-nfx-black">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-nfx-blue/8 rounded-full blur-[100px]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-syne font-extrabold text-5xl md:text-6xl lg:text-7xl text-nfx-white leading-tight mb-6">
            Our <span className="text-gradient-blue">Services</span>
          </h1>
          <p className="text-nfx-slate text-lg font-dm leading-relaxed max-w-2xl mx-auto">From intelligent AI systems to physical robotics — Nifelux builds the full spectrum of modern technology solutions.</p>
        </div>
      </section>
      <div className="divider-blue" />
      <section className="py-20 bg-nfx-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <div key={service.id} className="glass-card rounded-2xl p-7 group hover:shadow-[0_8px_40px_rgba(59,130,246,0.12)] transition-all duration-300 flex flex-col">
                <div className={`h-14 w-14 rounded-xl flex items-center justify-center text-3xl mb-6 ${service.color === 'red' ? 'bg-nfx-red/10 border border-nfx-red/15' : 'bg-nfx-blue/10 border border-nfx-blue/15'}`}>{service.icon}</div>
                <h3 className="font-syne font-bold text-nfx-white text-xl mb-3 group-hover:text-nfx-blue transition-colors duration-200">{service.title}</h3>
                <p className="text-nfx-slate text-sm font-dm leading-relaxed flex-1">{service.description}</p>
                <div className="mt-6 pt-5 border-t border-white/6">
                  <span className={`text-xs font-syne font-semibold uppercase tracking-widest ${service.color === 'red' ? 'text-nfx-red' : 'text-nfx-blue'}`}>
                    {service.color === 'red' ? '● Active Development' : '● Available Now'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-nfx-black text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-syne font-extrabold text-3xl md:text-4xl text-nfx-white mb-4">Ready to Build Something?</h2>
          <p className="text-nfx-slate font-dm mb-8">Talk to us about your project. We would love to help bring your vision to life.</p>
          <Button href="/contact" variant="primary" size="lg">Start a Conversation</Button>
        </div>
      </section>
    </PageWrapper>
  )
}
EOF

# ── app/robotics/page.tsx ─────────────────────────────────
cat > src/app/robotics/page.tsx << 'EOF'
import type { Metadata } from 'next'
import PageWrapper from '@/components/layout/PageWrapper'
import SectionHeader from '@/components/ui/SectionHeader'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'

export const metadata: Metadata = { title: 'Robotics', description: 'Nifelux Technologies Robotics Division — AI-powered smart robotic systems for Africa.' }

const AREAS = [
  { icon: '🎓', title: 'Educational Robotics', description: 'Interactive robotic kits for schools and universities across Nigeria — making STEM tangible.' },
  { icon: '🏭', title: 'Industrial Automation', description: 'Smart robotic systems that automate industrial tasks and reduce operational costs for African manufacturers.' },
  { icon: '🌾', title: 'Agricultural Robotics', description: 'Precision agriculture robotics — from crop monitoring to automated planting — designed for Nigeria.' },
  { icon: '🔬', title: 'Research Platforms', description: 'Open robotics research platforms for universities and innovation hubs across Nigeria and Africa.' },
  { icon: '🧠', title: 'AI Vision Systems', description: 'Robotic systems with integrated computer vision enabling smart perception and autonomous action.' },
  { icon: '🔧', title: 'Custom Robotics', description: 'End-to-end custom robotic system design and prototyping for specific automation needs.' },
]

export default function RoboticsPage() {
  return (
    <PageWrapper>
      <section className="relative pt-36 pb-20 overflow-hidden bg-nfx-black">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-nfx-blue/6 rounded-full blur-[120px]" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge label="Robotics Division" variant="blue" dot />
          <h1 className="font-syne font-extrabold text-5xl md:text-6xl lg:text-7xl text-nfx-white leading-tight mt-5 mb-6">
            Smart Robotics for<br /><span className="text-gradient-blue">a Smarter Africa.</span>
          </h1>
          <p className="text-nfx-slate text-lg font-dm leading-relaxed max-w-2xl mx-auto mb-10">Our robotics division is developing AI-integrated robotic systems that will transform education, industry, agriculture, and research across Nigeria and Africa.</p>
          <Badge label="Research & Development Phase" variant="yellow" dot />
        </div>
      </section>
      <div className="divider-blue" />
      <section className="py-20 bg-nfx-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Focus Areas" title="What We're Building" subtitle="Six key areas where Nifelux robotics will create transformative impact." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {AREAS.map((area) => (
              <div key={area.title} className="glass-card rounded-2xl p-6 group hover:border-nfx-blue/30 transition-all duration-300">
                <div className="h-12 w-12 rounded-xl bg-nfx-blue/10 border border-nfx-blue/15 flex items-center justify-center text-2xl mb-5">{area.icon}</div>
                <h3 className="font-syne font-bold text-nfx-white text-lg mb-3 group-hover:text-nfx-blue transition-colors">{area.title}</h3>
                <p className="text-nfx-slate text-sm font-dm leading-relaxed">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-nfx-black text-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-syne font-extrabold text-3xl md:text-4xl text-nfx-white mb-4">Partner With Our Robotics Division</h2>
          <p className="text-nfx-slate font-dm mb-8">Are you a school, business, or researcher interested in robotics collaboration? Let us talk.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button href="/contact" variant="primary">Get in Touch</Button>
            <Button href="/support" variant="secondary">Support R&D</Button>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
EOF

# ── app/certifications/page.tsx ───────────────────────────
cat > src/app/certifications/page.tsx << 'EOF'
import type { Metadata } from 'next'
import PageWrapper from '@/components/layout/PageWrapper'
import Badge from '@/components/ui/Badge'
import { type Certification } from '@/types'

export const metadata: Metadata = { title: 'Certifications', description: 'Nifelux Technologies company certifications and legal registration status.' }

const CERTS: Certification[] = [
  { id: '1', title: 'CAC Business Registration', issuer: 'Corporate Affairs Commission, Nigeria', status: 'processing', description: 'Official business registration with the Corporate Affairs Commission of Nigeria.' },
  { id: '2', title: 'Technology Company Certification', issuer: 'Nigeria Information Technology Development Agency (NITDA)', status: 'pending', description: 'NITDA certification for technology companies operating in Nigeria.' },
  { id: '3', title: 'Business Operating License', issuer: 'Local Government Authority', status: 'processing', description: 'Business premises and operational license for Nifelux Technologies.' },
]

const statusConfig = {
  active: { badge: 'green' as const, label: 'Verified' },
  processing: { badge: 'yellow' as const, label: 'Processing' },
  pending: { badge: 'gray' as const, label: 'Pending' },
}

export default function CertificationsPage() {
  return (
    <PageWrapper>
      <section className="relative pt-36 pb-20 overflow-hidden bg-nfx-black">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-nfx-blue/8 rounded-full blur-[100px]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-syne font-extrabold text-5xl md:text-6xl text-nfx-white leading-tight mb-5">
            Certifications &<br /><span className="text-gradient-blue">Registrations</span>
          </h1>
          <p className="text-nfx-slate text-lg font-dm leading-relaxed max-w-2xl mx-auto mb-6">
            Nifelux Technologies is committed to full legal compliance and transparent operations in Nigeria.
          </p>
          <div className="inline-flex items-start gap-3 px-5 py-4 rounded-xl bg-amber-500/8 border border-amber-500/20 text-left max-w-lg mx-auto">
            <svg className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-amber-300 text-sm font-dm leading-relaxed">Company registration and additional certifications are currently under processing. All documents will be published here upon completion.</p>
          </div>
        </div>
      </section>
      <div className="divider-blue" />
      <section className="py-20 bg-nfx-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-5">
            {CERTS.map((cert) => {
              const config = statusConfig[cert.status]
              return (
                <div key={cert.id} className="glass-card rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-5">
                  <div className="h-14 w-14 rounded-xl bg-nfx-blue/8 border border-nfx-blue/15 flex items-center justify-center flex-shrink-0">
                    <svg className="h-6 w-6 text-nfx-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <h3 className="font-syne font-bold text-nfx-white text-lg">{cert.title}</h3>
                        <p className="text-nfx-blue text-xs font-syne font-semibold mt-0.5 uppercase tracking-wide">{cert.issuer}</p>
                      </div>
                      <Badge label={config.label} variant={config.badge} dot />
                    </div>
                    {cert.description && <p className="text-nfx-slate text-sm font-dm mt-3 leading-relaxed">{cert.description}</p>}
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/4 border border-white/8 text-nfx-slate text-sm font-syne">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Pending
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
EOF
echo "✓ Inner pages written"

# ── app/support/page.tsx ──────────────────────────────────
cat > src/app/support/page.tsx << 'EOF'
'use client'
import { useState } from 'react'
import PageWrapper from '@/components/layout/PageWrapper'
import Button from '@/components/ui/Button'
import { CONTRIBUTION_TIERS } from '@/lib/constants'
import toast from 'react-hot-toast'

export default function SupportPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [amount, setAmount] = useState<number | ''>('')
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const effectiveAmount = selectedTier
    ? CONTRIBUTION_TIERS.find((t) => t.id === selectedTier)?.amount ?? Number(amount)
    : Number(amount)

  const handleSelectTier = (tierId: string) => {
    setSelectedTier(tierId)
    const tier = CONTRIBUTION_TIERS.find((t) => t.id === tierId)
    if (tier) setAmount(tier.amount)
  }

  const handleSubmit = async () => {
    if (!name.trim()) { toast.error('Please enter your name'); return }
    if (!email.trim() || !email.includes('@')) { toast.error('Please enter a valid email'); return }
    if (!effectiveAmount || effectiveAmount < 100) { toast.error('Minimum contribution is ₦100'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/payment/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), amount: effectiveAmount, tier: selectedTier }),
      })
      const data = await res.json()
      if (!res.ok || !data.authorization_url) throw new Error(data.error ?? 'Payment initialization failed')
      window.location.href = data.authorization_url
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageWrapper>
      <section className="relative pt-36 pb-20 overflow-hidden bg-nfx-black">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-nfx-red/6 rounded-full blur-[120px]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-syne font-extrabold text-5xl md:text-6xl text-nfx-white leading-tight mb-5">
            Help Us Build<br /><span className="text-gradient-blue">the Future.</span>
          </h1>
          <p className="text-nfx-slate text-lg font-dm leading-relaxed max-w-2xl mx-auto">Your contribution directly funds AI research, robotics development, and educational platforms that will shape technology in Africa.</p>
        </div>
      </section>
      <div className="divider-blue" />
      <section className="py-20 bg-nfx-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="font-syne font-bold text-2xl text-nfx-white mb-5">Contribution Tiers</h2>
              <div className="space-y-3">
                {CONTRIBUTION_TIERS.map((tier) => (
                  <button key={tier.id} onClick={() => handleSelectTier(tier.id)}
                    className={`w-full text-left glass-card rounded-xl p-4 transition-all duration-200 ${selectedTier === tier.id ? 'border-nfx-blue/50 bg-nfx-blue/8 shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'hover:border-nfx-blue/20'}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-syne font-bold text-nfx-white">{tier.label}</span>
                      <span className="font-syne font-bold text-nfx-blue">₦{tier.amount.toLocaleString()}</span>
                    </div>
                    <p className="text-nfx-slate text-xs font-dm mb-2">{tier.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {tier.perks.map((perk) => (
                        <span key={perk} className="text-xs text-nfx-slate-light font-dm flex items-center gap-1">
                          <span className="text-nfx-blue">✓</span> {perk}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
            <div className="glass-card rounded-2xl p-7 sticky top-24">
              <h3 className="font-syne font-bold text-nfx-white text-xl mb-6">Make a Contribution</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-nfx-slate text-xs font-syne font-semibold uppercase tracking-wider mb-2">Full Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-nfx-white text-sm font-dm placeholder:text-nfx-slate focus:outline-none focus:border-nfx-blue/50 transition-all duration-200" />
                </div>
                <div>
                  <label className="block text-nfx-slate text-xs font-syne font-semibold uppercase tracking-wider mb-2">Email Address</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-nfx-white text-sm font-dm placeholder:text-nfx-slate focus:outline-none focus:border-nfx-blue/50 transition-all duration-200" />
                </div>
                <div>
                  <label className="block text-nfx-slate text-xs font-syne font-semibold uppercase tracking-wider mb-2">Amount (₦) — minimum ₦100</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-nfx-slate font-syne font-bold">₦</span>
                    <input type="number" value={amount} onChange={(e) => { setSelectedTier(null); setAmount(e.target.value === '' ? '' : Number(e.target.value)) }} min={100} placeholder="Enter amount"
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-4 py-3 text-nfx-white text-sm font-dm placeholder:text-nfx-slate focus:outline-none focus:border-nfx-blue/50 transition-all duration-200" />
                  </div>
                </div>
                {effectiveAmount >= 100 && (
                  <div className="bg-nfx-blue/8 border border-nfx-blue/20 rounded-xl p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-nfx-slate text-sm font-dm">Total contribution</span>
                      <span className="font-syne font-bold text-nfx-white text-lg">₦{effectiveAmount.toLocaleString()}</span>
                    </div>
                  </div>
                )}
                <Button variant="primary" className="w-full justify-center mt-2" loading={loading} onClick={handleSubmit}>
                  Proceed to Payment
                </Button>
                <p className="text-center text-nfx-slate text-xs font-dm">Payments secured by Paystack · Card, Bank Transfer & USSD supported</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
EOF

# ── app/support/success/page.tsx ──────────────────────────
cat > src/app/support/success/page.tsx << 'EOF'
'use client'
import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import PageWrapper from '@/components/layout/PageWrapper'
import Button from '@/components/ui/Button'

function SuccessContent() {
  const searchParams = useSearchParams()
  const reference = searchParams.get('reference') ?? searchParams.get('trxref')
  const [status, setStatus] = useState<'loading' | 'success' | 'failed'>('loading')
  const [amount, setAmount] = useState<number | null>(null)
  const [name, setName] = useState<string | null>(null)

  useEffect(() => {
    if (!reference) { setStatus('failed'); return }
    const verify = async () => {
      try {
        const res = await fetch(`/api/payment/verify?reference=${encodeURIComponent(reference)}`)
        const data = await res.json()
        if (data.success) { setStatus('success'); setAmount(data.amount); setName(data.name) }
        else setStatus('failed')
      } catch { setStatus('failed') }
    }
    verify()
  }, [reference])

  if (status === 'loading') return (
    <div className="flex flex-col items-center gap-4">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-nfx-blue/20 border-t-nfx-blue" />
      <p className="text-nfx-slate font-dm text-sm">Verifying your payment...</p>
    </div>
  )

  if (status === 'failed') return (
    <div className="text-center">
      <div className="h-16 w-16 rounded-full bg-nfx-red/10 border border-nfx-red/20 flex items-center justify-center mx-auto mb-6">
        <svg className="h-8 w-8 text-nfx-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <h2 className="font-syne font-bold text-nfx-white text-2xl mb-3">Payment Verification Failed</h2>
      <p className="text-nfx-slate font-dm text-sm mb-8 max-w-sm mx-auto">We could not verify your payment. Reference: <span className="text-nfx-white font-mono">{reference ?? 'N/A'}</span></p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button href="/support" variant="primary">Try Again</Button>
        <Button href="/contact" variant="secondary">Contact Us</Button>
      </div>
    </div>
  )

  return (
    <div className="text-center">
      <div className="relative inline-flex mb-8">
        <div className="h-20 w-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.2)]">
          <svg className="h-10 w-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <span className="absolute -top-1 -right-1 text-xl animate-float">🎉</span>
      </div>
      <h2 className="font-syne font-extrabold text-3xl md:text-4xl text-nfx-white mb-3">
        Thank You{name ? `, ${name.split(' ')[0]}` : ''}!
      </h2>
      {amount && (
        <div className="inline-block px-5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-5">
          <span className="font-syne font-bold text-emerald-400 text-lg">₦{amount.toLocaleString()} contributed</span>
        </div>
      )}
      <p className="text-nfx-slate font-dm leading-relaxed max-w-md mx-auto mb-8">Your contribution means the world to us. You are now part of the story of how Nifelux Technologies is building the future of technology in Africa.</p>
      <div className="flex flex-wrap justify-center gap-4">
        <Button href="/" variant="primary">Back to Home</Button>
        <Button href="/about" variant="secondary">Learn More About Us</Button>
      </div>
    </div>
  )
}

export default function SupportSuccessPage() {
  return (
    <PageWrapper>
      <section className="relative min-h-screen flex items-center justify-center py-32 bg-nfx-black overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-20" />
        <div className="relative z-10 max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <Suspense fallback={<div className="flex justify-center"><div className="h-10 w-10 animate-spin rounded-full border-2 border-nfx-blue/20 border-t-nfx-blue" /></div>}>
              <SuccessContent />
            </Suspense>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
EOF

# ── app/contact/page.tsx ──────────────────────────────────
cat > src/app/contact/page.tsx << 'EOF'
'use client'
import { useState } from 'react'
import PageWrapper from '@/components/layout/PageWrapper'
import Button from '@/components/ui/Button'
import { SITE, SOCIAL_LINKS } from '@/lib/constants'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }))

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) { toast.error('Please fill in all required fields'); return }
    if (!form.email.includes('@')) { toast.error('Please enter a valid email address'); return }
    setLoading(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Failed to send message')
      toast.success('Message sent! We will be in touch soon.')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const CONTACTS = [
    { label: 'Email', value: SITE.email, href: `mailto:${SITE.email}` },
    { label: 'Phone', value: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, '')}` },
    { label: 'WhatsApp', value: 'Chat with us', href: SOCIAL_LINKS.whatsapp },
    { label: 'Telegram', value: 'Join our channel', href: SOCIAL_LINKS.telegram },
    { label: 'Facebook', value: 'Follow us', href: SOCIAL_LINKS.facebook },
  ]

  return (
    <PageWrapper>
      <section className="relative pt-36 pb-20 overflow-hidden bg-nfx-black">
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-nfx-blue/8 rounded-full blur-[100px]" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-syne font-extrabold text-5xl md:text-6xl text-nfx-white leading-tight mb-5">
            Get in <span className="text-gradient-blue">Touch</span>
          </h1>
          <p className="text-nfx-slate text-lg font-dm leading-relaxed max-w-xl mx-auto">Have a question, a project idea, or want to partner with us? We would love to hear from you.</p>
        </div>
      </section>
      <div className="divider-blue" />
      <section className="py-20 bg-nfx-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-syne font-bold text-nfx-white text-2xl mb-6">Contact Information</h2>
              <div className="space-y-3 mb-8">
                {CONTACTS.map((c) => (
                  <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="flex items-center gap-4 p-4 glass-card rounded-xl hover:border-nfx-blue/30 transition-all duration-200 group">
                    <div className="h-10 w-10 rounded-lg bg-nfx-blue/10 border border-nfx-blue/15 flex items-center justify-center text-nfx-blue group-hover:bg-nfx-blue/20 transition-colors flex-shrink-0">
                      <span className="font-syne font-bold text-xs">{c.label[0]}</span>
                    </div>
                    <div>
                      <p className="font-syne font-semibold text-nfx-white text-sm">{c.label}</p>
                      <p className="text-nfx-slate text-xs font-dm">{c.value}</p>
                    </div>
                  </a>
                ))}
              </div>
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3"><span className="text-2xl">🇳🇬</span><h3 className="font-syne font-bold text-nfx-white">Nigeria</h3></div>
                <p className="text-nfx-slate text-sm font-dm">Nifelux Technologies is based in Nigeria, building technology for Africa and the world.</p>
              </div>
            </div>
            <div className="glass-card rounded-2xl p-7">
              <h3 className="font-syne font-bold text-nfx-white text-xl mb-6">Send Us a Message</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-nfx-slate text-xs font-syne font-semibold uppercase tracking-wider mb-2">Full Name *</label>
                    <input type="text" value={form.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="Your name"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-nfx-white text-sm font-dm placeholder:text-nfx-slate focus:outline-none focus:border-nfx-blue/50 transition-all duration-200" />
                  </div>
                  <div>
                    <label className="block text-nfx-slate text-xs font-syne font-semibold uppercase tracking-wider mb-2">Email *</label>
                    <input type="email" value={form.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-nfx-white text-sm font-dm placeholder:text-nfx-slate focus:outline-none focus:border-nfx-blue/50 transition-all duration-200" />
                  </div>
                </div>
                <div>
                  <label className="block text-nfx-slate text-xs font-syne font-semibold uppercase tracking-wider mb-2">Subject</label>
                  <input type="text" value={form.subject} onChange={(e) => handleChange('subject', e.target.value)} placeholder="What is this about?"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-nfx-white text-sm font-dm placeholder:text-nfx-slate focus:outline-none focus:border-nfx-blue/50 transition-all duration-200" />
                </div>
                <div>
                  <label className="block text-nfx-slate text-xs font-syne font-semibold uppercase tracking-wider mb-2">Message *</label>
                  <textarea value={form.message} onChange={(e) => handleChange('message', e.target.value)} placeholder="Tell us about your project or question..." rows={6}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-nfx-white text-sm font-dm placeholder:text-nfx-slate focus:outline-none focus:border-nfx-blue/50 transition-all duration-200 resize-none" />
                </div>
                <Button variant="primary" className="w-full justify-center" loading={loading} onClick={handleSubmit}>Send Message</Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
EOF

# ── API routes ────────────────────────────────────────────
cat > src/app/api/payment/initialize/route.ts << 'EOF'
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
EOF

cat > src/app/api/payment/verify/route.ts << 'EOF'
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
EOF

cat > src/app/api/contact/route.ts << 'EOF'
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
EOF
echo "✓ API routes written"

# ── Supabase schema ───────────────────────────────────────
cat > nifelux_schema.sql << 'EOF'
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.contributions (
  id         UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  amount     INTEGER NOT NULL CHECK (amount >= 100),
  reference  TEXT NOT NULL UNIQUE,
  status     TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','success','failed')),
  tier       TEXT DEFAULT 'custom',
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_contributions_reference ON public.contributions(reference);
CREATE INDEX IF NOT EXISTS idx_contributions_email     ON public.contributions(email);

ALTER TABLE public.contributions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role full access" ON public.contributions FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id         UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  subject    TEXT DEFAULT '',
  message    TEXT NOT NULL,
  read       BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role full access" ON public.contact_messages FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');

CREATE TABLE IF NOT EXISTS public.certifications (
  id          UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title       TEXT NOT NULL,
  issuer      TEXT NOT NULL,
  description TEXT,
  status      TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('active','processing','pending')),
  file_url    TEXT,
  issued_at   TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view active certifications" ON public.certifications FOR SELECT USING (status = 'active');
CREATE POLICY "Service role full access" ON public.certifications FOR ALL USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW(); RETURN NEW; END; $$ LANGUAGE plpgsql;

CREATE TRIGGER trg_contributions_updated_at BEFORE UPDATE ON public.contributions FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER trg_certifications_updated_at BEFORE UPDATE ON public.certifications FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
EOF
echo "✓ Schema file written"

echo ""
echo "════════════════════════════════════════"
echo "✅  Nifelux Technologies setup complete!"
echo "════════════════════════════════════════"
echo ""
echo "Next steps:"
echo "  1. Fill in your .env.local with real keys"
echo "  2. Run: npm run dev"
echo "  3. Open: http://localhost:3000"
echo ""
