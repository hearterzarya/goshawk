'use client'

import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { QuoteForm } from '@/components/forms/QuoteForm'
import { Card } from '@/components/ui/Card'
import { Clock, Shield, TrendingUp } from 'lucide-react'
import { useGsapReveal } from '@/hooks/useGsapReveal'

const benefits = [
  {
    icon: Clock,
    title: 'Fast Response',
    description: 'Quotes within 2-4 hours during business hours',
  },
  {
    icon: Shield,
    title: 'Verified Carriers',
    description: 'All carriers are licensed and insured',
  },
  {
    icon: TrendingUp,
    title: 'Competitive Rates',
    description: 'Transparent pricing with no hidden fees',
  },
]

export default function GetQuotePage() {
  const heroRef = useGsapReveal({ y: 30 })
  const benefitsRef = useGsapReveal({ stagger: 0.1, y: 40 })
  const formRef = useGsapReveal({ y: 30 })

  return (
    <>
      {/* Hero Section with Background */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-white pt-20">
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

        <Container>
          <div
            ref={heroRef as React.RefObject<HTMLDivElement>}
            className="max-w-4xl mx-auto text-center relative z-10"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-navy-900 mb-6 leading-tight">
              Request a Quote
            </h1>
            <p className="text-xl sm:text-2xl text-navy-600 leading-relaxed max-w-3xl mx-auto">
              Get competitive freight quotes quickly. Fill out the form below and
              our team will provide pricing within hours.
            </p>
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
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
            ref={benefitsRef as React.RefObject<HTMLDivElement>}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
          >
            {benefits.map((benefit) => {
              const Icon = benefit.icon
              return (
                <Card key={benefit.title} hover className="relative overflow-hidden group">
                  {/* Decorative Background */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-full -mr-16 -mt-16 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="text-primary-600" size={32} />
                    </div>
                    <h3 className="text-xl font-semibold text-navy-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-navy-600 text-sm">{benefit.description}</p>
                  </div>
                </Card>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* Quote Form Section */}
      <Section padding="lg" background="white" className="relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />

        <Container>
          <div
            ref={formRef as React.RefObject<HTMLDivElement>}
            className="max-w-3xl mx-auto"
          >
            <Card className="p-8 sm:p-12">
              <QuoteForm />
            </Card>
          </div>
        </Container>
      </Section>
    </>
  )
}
