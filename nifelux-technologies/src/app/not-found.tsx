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
