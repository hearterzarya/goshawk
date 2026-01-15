'use client'

import { useState, useEffect } from 'react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Accordion } from '@/components/ui/Accordion'
import { CarrierForm } from '@/components/forms/CarrierForm'
import { carrierFAQs } from '@/data/faqs'
import { DollarSign, Clock, Users, TrendingUp } from 'lucide-react'
import { useGsapReveal } from '@/hooks/useGsapReveal'

const benefits = [
  {
    icon: DollarSign,
    title: 'Competitive Rates',
    description: 'Fair, competitive rates with quick payment options.',
  },
  {
    icon: Clock,
    title: 'Quick Payments',
    description: 'Reliable payment processing with expedited options.',
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    description: 'Professional dispatch team ready to assist you.',
  },
  {
    icon: TrendingUp,
    title: 'Consistent Loads',
    description: 'Access to a steady stream of quality freight opportunities.',
  },
]

export default function CarriersPage() {
  const heroRef = useGsapReveal({ y: 30 })
  const benefitsRef = useGsapReveal({ stagger: 0.1, y: 40 })
  const formRef = useGsapReveal({ y: 30 })
  const faqRef = useGsapReveal({ y: 30 })

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
              Carrier Partnership Program
            </h1>
            <p className="text-xl sm:text-2xl text-navy-600 leading-relaxed max-w-3xl mx-auto">
              Join our network of verified carriers. Access consistent loads,
              competitive rates, and reliable payments from a trusted freight
              brokerage partner.
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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

      {/* Carrier Form Section */}
      <Section padding="lg" background="white" className="relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />

        <Container>
          <div
            ref={formRef as React.RefObject<HTMLDivElement>}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-navy-900 mb-8 text-center">
              Carrier Setup
            </h2>
            <Card className="p-8 sm:p-12">
              <CarrierForm />
            </Card>
          </div>
        </Container>
      </Section>

      {/* FAQs Section */}
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
            ref={faqRef as React.RefObject<HTMLDivElement>}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-navy-900 mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <Card className="p-6 sm:p-8">
              <Accordion items={carrierFAQs} />
            </Card>
          </div>
        </Container>
      </Section>
    </>
  )
}
