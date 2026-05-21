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
