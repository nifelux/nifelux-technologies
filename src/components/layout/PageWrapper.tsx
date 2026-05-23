import Navbar from './Navbar'
import Footer from './Footer'
export default function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-nfx-black">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
