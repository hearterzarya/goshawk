'use client'

import { useState, useEffect } from 'react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Target, Award, Users, Globe, ArrowRight, Check } from 'lucide-react'
import { useGsapReveal } from '@/hooks/useGsapReveal'

interface Value {
  title: string
  description: string
}

interface AboutContent {
  badge: string
  headline: string
  subtext: string
  missionTitle: string
  missionParagraph1: string
  missionParagraph2: string
  valuesTitle: string
  valuesSubtext: string
  ctaTitle: string
  ctaText: string
  values: Value[]
}

const defaultValues: Value[] = [
  {
    title: 'Reliability',
    description:
      'We build our reputation on consistent, on-time delivery and transparent communication.',
  },
  {
    title: 'Excellence',
    description:
      'Every shipment matters. We maintain the highest standards in carrier selection and service quality.',
  },
  {
    title: 'Partnership',
    description:
      'We view every relationship as a long-term partnership, not just a transaction.',
  },
  {
    title: 'Innovation',
    description:
      'Leveraging technology and best practices to continuously improve our services.',
  },
]

const defaultContent: AboutContent = {
  badge: 'About Goshawk',
  headline: 'Building Trust Through Excellence',
  subtext: 'Goshawk Logistics is a premium freight brokerage dedicated to delivering reliable, transparent, and efficient transportation solutions. We connect shippers with verified carriers across North America, ensuring your freight moves safely and on time.',
  missionTitle: 'Our Mission',
  missionParagraph1: 'At Goshawk Logistics, our mission is simple: to make freight shipping seamless, reliable, and transparent. We believe that logistics shouldn\'t be complicated. By combining experienced professionals, verified carrier networks, and modern technology, we deliver solutions that move your business forward.',
  missionParagraph2: 'Whether you\'re shipping a single pallet or managing complex supply chains, we\'re here to provide the expertise, support, and reliability you need. Our commitment to excellence drives everything we do, from carrier selection to customer service.',
  valuesTitle: 'Our Values',
  valuesSubtext: 'The principles that guide everything we do',
  ctaTitle: 'Let\'s Work Together',
  ctaText: 'Ready to experience the Goshawk difference? Get in touch with our team today.',
  values: defaultValues,
}

const valueIcons = [Target, Award, Users, Globe]

export default function AboutPage() {
  const [content, setContent] = useState<AboutContent>(defaultContent)
  const heroRef = useGsapReveal({ y: 30 })
  const missionRef = useGsapReveal({ y: 40 })
  const valuesRef = useGsapReveal({ stagger: 0.1, y: 40 })
  const ctaRef = useGsapReveal({ y: 30 })

  useEffect(() => {
    // Load content from API
    fetch('/api/admin/content/about')
      .then(res => res.json())
      .then(data => {
        if (data && data.headline) {
          setContent(data)
        }
      })
      .catch(() => {
        // Use default content if API fails
      })
  }, [])

  return (
    <>
      {/* Hero Section with Background */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-white pt-20">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-amber-50" />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }} 
          />
        </div>

        {/* Decorative Shapes */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 left-10 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

        <Container>
          <div
            ref={heroRef as React.RefObject<HTMLDivElement>}
            className="max-w-4xl mx-auto text-center relative z-10"
          >
            <Badge className="mb-6">{content.badge}</Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-navy-900 mb-6 leading-tight">
              {content.headline}
            </h1>
            <p className="text-xl sm:text-2xl text-navy-600 leading-relaxed max-w-3xl mx-auto">
              {content.subtext}
            </p>
          </div>
        </Container>
      </section>

      {/* Mission Section with Image */}
      <Section padding="lg" background="gray" className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }} 
          />
        </div>

        <Container>
          <div
            ref={missionRef as React.RefObject<HTMLDivElement>}
            className="max-w-6xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Mission Image Placeholder */}
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-primary-400 to-orange-500 flex items-center justify-center">
                  <div className="text-white text-center p-8">
                    <Users size={64} className="mx-auto mb-4 opacity-80" />
                    <p className="text-xl font-semibold">Our Mission</p>
                  </div>
                </div>
              </div>

              {/* Mission Content */}
              <div>
                <h2 className="text-4xl sm:text-5xl font-display font-bold text-navy-900 mb-6">
                  {content.missionTitle}
                </h2>
                <div className="space-y-6">
                  <p className="text-lg sm:text-xl text-navy-600 leading-relaxed">
                    {content.missionParagraph1}
                  </p>
                  <p className="text-lg sm:text-xl text-navy-600 leading-relaxed">
                    {content.missionParagraph2}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Values Section */}
      <Section padding="lg" background="white" className="relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />

        <Container>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-navy-900 mb-4">
              {content.valuesTitle}
            </h2>
            <p className="text-xl text-navy-600 max-w-2xl mx-auto">
              {content.valuesSubtext}
            </p>
          </div>

          <div
            ref={valuesRef as React.RefObject<HTMLDivElement>}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {content.values.map((value, index) => {
              const Icon = valueIcons[index % valueIcons.length]
              return (
                <Card key={index} hover className="relative overflow-hidden group">
                  {/* Decorative Background */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="text-primary-600" size={32} />
                    </div>
                    <h3 className="text-2xl font-semibold text-navy-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-navy-600 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </Card>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* Stats Section */}
      <Section padding="lg" background="gray" className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }} 
          />
        </div>

        <Container>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center p-8 bg-white/80 backdrop-blur-sm">
              <div className="text-5xl font-display font-bold text-primary-600 mb-3">50+</div>
              <div className="text-navy-600 font-semibold text-lg">States Covered</div>
            </Card>
            <Card className="text-center p-8 bg-white/80 backdrop-blur-sm">
              <div className="text-5xl font-display font-bold text-primary-600 mb-3">24/7</div>
              <div className="text-navy-600 font-semibold text-lg">Support Available</div>
            </Card>
            <Card className="text-center p-8 bg-white/80 backdrop-blur-sm">
              <div className="text-5xl font-display font-bold text-primary-600 mb-3">100%</div>
              <div className="text-navy-600 font-semibold text-lg">Verified Carriers</div>
            </Card>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section padding="lg" background="navy" className="relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="absolute inset-0" 
            style={{
              backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }} 
          />
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />

        <Container>
          <div
            ref={ctaRef as React.RefObject<HTMLDivElement>}
            className="max-w-3xl mx-auto text-center relative z-10"
          >
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-6">
              {content.ctaTitle}
            </h2>
            <p className="text-xl text-navy-200 mb-8">
              {content.ctaText}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button href="/get-quote" variant="primary" size="lg" className="shadow-xl">
                Request a Quote
                <ArrowRight size={20} className="ml-2" />
              </Button>
              <Button href="/contact" variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
