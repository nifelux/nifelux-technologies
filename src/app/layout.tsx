import type { Metadata } from 'next'
import { Syne, DM_Sans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const syne = Syne({ subsets: ['latin'], weight: ['400','500','600','700','800'], variable: '--font-syne', display: 'swap' })
const dmSans = DM_Sans({ subsets: ['latin'], weight: ['300','400','500','600'], variable: '--font-dm-sans', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'Nifelux Technologies — Building the Future of Technology in Africa', template: '%s | Nifelux Technologies' },
  description: 'A future-focused Nigerian technology company building innovative solutions in AI, Robotics, EdTech, and Software Development.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <body className="bg-nfx-black text-nfx-white antialiased">
        {children}
        <Toaster position="top-right" toastOptions={{ style: { background: '#0f172a', color: '#f8fafc', border: '1px solid rgba(255,255,255,0.1)' } }} />
      </body>
    </html>
  )
}
