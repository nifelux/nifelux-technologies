import Link from 'next/link'
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-nfx-black">
      <div className="text-center">
        <h1 className="font-syne font-extrabold text-8xl text-nfx-blue opacity-20">404</h1>
        <h2 className="font-syne font-bold text-3xl text-nfx-white mb-4">Page Not Found</h2>
        <Link href="/" className="text-nfx-blue hover:underline font-dm">Back to Home</Link>
      </div>
    </div>
  )
}
