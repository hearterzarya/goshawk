'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { ArrowRight } from 'lucide-react'
import { useGsapReveal } from '@/hooks/useGsapReveal'
import type { Service } from '@/data/services'

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const heroRef = useGsapReveal({ y: 30 })
  const servicesRef = useGsapReveal({ stagger: 0.1, y: 40 })

  useEffect(() => {
    // Load services from API
    fetch('/api/admin/services')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setServices(data)
        } else {
          // Fallback to default
          import('@/data/services').then(module => setServices(module.services))
        }
      })
      .catch(() => {
        // Fallback to default
        import('@/data/services').then(module => setServices(module.services))
      })
  }, [])

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
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

        <Container>
          <div
            ref={heroRef as React.RefObject<HTMLDivElement>}
            className="max-w-4xl mx-auto text-center relative z-10"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-navy-900 mb-6 leading-tight">
              Our Services
            </h1>
            <p className="text-xl sm:text-2xl text-navy-600 leading-relaxed max-w-3xl mx-auto">
              Comprehensive freight solutions tailored to your needs. From
              temperature-controlled shipping to oversized cargo, we have the
              expertise and network to handle it all.
            </p>
          </div>
        </Container>
      </section>

      {/* Services Grid */}
      <Section padding="lg" background="white" className="relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />

        <Container>
          <div
            ref={servicesRef as React.RefObject<HTMLDivElement>}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {services.map((service) => (
              <Card key={service.slug} hover className="flex flex-col overflow-hidden group">
                {/* Service Image or Icon */}
                <div className="relative w-full h-64 bg-navy-50 rounded-t-lg mb-4 overflow-hidden">
                  {service.image ? (
                    <OptimizedImage
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      objectFit="cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-7xl">
                      {service.icon}
                    </div>
                  )}
                </div>
                <div className="px-6 pb-6 flex flex-col flex-grow">
                  <h2 className="text-2xl font-semibold text-navy-900 mb-3">
                    {service.title}
                  </h2>
                  <p className="text-navy-600 mb-6 flex-grow leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-navy-900 mb-2">
                      Key Features:
                    </h3>
                    <ul className="space-y-1">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-navy-600 flex items-start gap-2"
                        >
                          <span className="text-primary-600 mt-1">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors group/link"
                  >
                    Learn more
                    <ArrowRight
                      size={18}
                      className="ml-2 group-hover/link:translate-x-1 transition-transform"
                    />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  )
}
