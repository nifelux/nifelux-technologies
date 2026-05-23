import PageWrapper from '@/components/layout/PageWrapper'
import Hero from '@/components/home/Hero'
import ServicesPreview from '@/components/home/ServicesPreview'
import WhyNifelux from '@/components/home/WhyNifelux'
import SupportCTA from '@/components/home/SupportCTA'

export default function HomePage() {
  return (
    <PageWrapper>
      <Hero />
      <ServicesPreview />
      <WhyNifelux />
      <SupportCTA />
    </PageWrapper>
  )
}
