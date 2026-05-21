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
