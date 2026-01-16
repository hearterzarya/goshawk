'use client'

import { useState, useEffect } from 'react'
import { notFound, useParams } from 'next/navigation'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Check } from 'lucide-react'
import { useGsapReveal } from '@/hooks/useGsapReveal'
import type { Service } from '@/data/services'

export default function ServicePage() {
  const params = useParams()
  const slug = params.slug as string
  const [service, setService] = useState<Service | null>(null)
  const [loading, setLoading] = useState(true)
  
  const heroRef = useGsapReveal({ y: 30 })
  const featuresRef = useGsapReveal({ stagger: 0.1, y: 30 })

  useEffect(() => {
    const loadService = async () => {
      setLoading(true)
      try {
        // Try to load from API first
        const response = await fetch('/api/admin/services')
        if (response.ok) {
          const services = await response.json()
          const found = Array.isArray(services) ? services.find((s: Service) => s.slug === slug) : null
          if (found) {
            setService(found)
            setLoading(false)
            return
          }
        }
        
        // Fallback to default
        const { getServiceBySlug } = await import('@/data/services')
        const defaultService = getServiceBySlug(slug)
        if (defaultService) {
          setService(defaultService)
        }
      } catch (error) {
        console.error('Failed to load service:', error)
        // Fallback to default
        import('@/data/services').then(module => {
          const defaultService = module.getServiceBySlug(slug)
          if (defaultService) {
            setService(defaultService)
          }
        })
      } finally {
        setLoading(false)
      }
    }
    
    loadService()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-navy-600">Loading...</div>
      </div>
    )
  }

  if (!service) {
    notFound()
  }

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
            className="max-w-4xl mx-auto relative z-10"
          >
            {/* Service Image or Icon */}
            {service.image ? (
              <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden shadow-xl">
                <OptimizedImage
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover"
                  objectFit="cover"
                />
              </div>
            ) : (
              <div className="text-8xl mb-8 text-center">{service.icon}</div>
            )}
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-navy-900 mb-6 leading-tight">
              {service.title}
            </h1>
            <p className="text-xl sm:text-2xl text-navy-600 leading-relaxed mb-8">
              {service.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button href="/get-quote" variant="primary" size="lg">
                Request a Quote
              </Button>
              <Button href="/contact" variant="outline" size="lg">
                Contact Us
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Features & Benefits Section */}
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
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
            <Card className="p-8">
              <h2 className="text-3xl font-display font-bold text-navy-900 mb-6">
                Features
              </h2>
              <ul className="space-y-4">
                {service.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3"
                    ref={idx === 0 ? (featuresRef as React.RefObject<HTMLLIElement>) : undefined}
                  >
                    <Check
                      className="text-primary-600 flex-shrink-0 mt-0.5"
                      size={24}
                    />
                    <span className="text-navy-600 text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-8">
              <h2 className="text-3xl font-display font-bold text-navy-900 mb-6">
                Benefits
              </h2>
              <ul className="space-y-4">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check
                      className="text-primary-600 flex-shrink-0 mt-0.5"
                      size={24}
                    />
                    <span className="text-navy-600 text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  )
}
