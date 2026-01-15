'use client'

import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { FormField } from '@/components/forms/FormField'
import { Button } from '@/components/ui/Button'
import { PackageSearch } from 'lucide-react'
import { useGsapReveal } from '@/hooks/useGsapReveal'

export default function TrackPage() {
  const heroRef = useGsapReveal({ y: 30 })
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
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <PackageSearch className="text-primary-600" size={40} />
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-navy-900 mb-6 leading-tight">
              Track Your Shipment
            </h1>
            <p className="text-xl sm:text-2xl text-navy-600 leading-relaxed max-w-2xl mx-auto">
              Enter your tracking number or pro number to get real-time updates
              on your shipment status.
            </p>
          </div>
        </Container>
      </section>

      {/* Tracking Form Section */}
      <Section padding="lg" background="white" className="relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />

        <Container>
          <div
            ref={formRef as React.RefObject<HTMLDivElement>}
            className="max-w-xl mx-auto"
          >
            <Card className="p-8 sm:p-12">
              <form className="space-y-6">
                <FormField
                  label="Tracking Number / Pro Number"
                  placeholder="Enter your tracking number"
                  required
                />
                <Button type="submit" variant="primary" size="lg" fullWidth>
                  Track Shipment
                </Button>
              </form>

              <div className="mt-8 pt-8 border-t border-navy-200">
                <p className="text-sm text-navy-600 text-center">
                  Don't have a tracking number?{' '}
                  <a
                    href="/contact"
                    className="text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    Contact us
                  </a>{' '}
                  for assistance.
                </p>
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  )
}
