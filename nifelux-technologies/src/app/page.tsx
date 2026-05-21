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
