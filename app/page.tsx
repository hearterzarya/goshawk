import { Hero } from '@/components/home/Hero'
import { ServicesOverview } from '@/components/home/ServicesOverview'
import { Process } from '@/components/home/Process'
import { Industries } from '@/components/home/Industries'
import { WhyChooseUs } from '@/components/home/WhyChooseUs'
import { Testimonials } from '@/components/home/Testimonials'
import { CTAStrip } from '@/components/home/CTAStrip'

export const metadata = {
  title: 'Home',
  description:
    'Premium logistics brokerage delivering reliable freight solutions across North America. Full Truckload, Reefer, LTL, Flatbed, Drayage, Intermodal, and Cross-Border services.',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <Process />
      <Industries />
      <WhyChooseUs />
      <Testimonials />
      <CTAStrip />
    </>
  )
}
