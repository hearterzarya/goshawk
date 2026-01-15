'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { SafeImage } from '@/components/ui/SafeImage'
import { Card } from '@/components/ui/Card'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { useGsapReveal } from '@/hooks/useGsapReveal'
import { ArrowRight } from 'lucide-react'
import type { Service } from '@/data/services'

export function ServicesOverview() {
  const ref = useGsapReveal({ stagger: 0.1, y: 40 })
  const [services, setServices] = useState<Service[]>([])

  useEffect(() => {
    // Load services from API (which includes images)
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
    <Section padding="lg" background="white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-navy-900 mb-4">
            Comprehensive Freight Solutions
          </h2>
          <p className="text-xl text-navy-600 max-w-2xl mx-auto">
            From full truckload to specialized intermodal, we provide the
            right equipment and expertise for every shipment.
          </p>
        </div>

        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service) => (
            <Card key={service.slug} hover className="flex flex-col overflow-hidden">
              {/* Service Image or Icon */}
              <div className="relative w-full h-48 bg-navy-50 rounded-t-lg mb-4 overflow-hidden">
                {service.image ? (
                  <SafeImage
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    fallback={
                      <div className="flex items-center justify-center h-full text-6xl">
                        {service.icon}
                      </div>
                    }
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-6xl">
                    {service.icon}
                  </div>
                )}
              </div>
              <div className="px-6 pb-6 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-navy-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-navy-600 mb-4 flex-grow text-sm">
                  {service.shortDescription}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex items-center text-primary-600 font-semibold text-sm hover:text-primary-700 transition-colors group"
                >
                  Learn more
                  <ArrowRight
                    size={16}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors"
          >
            View all services
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </Container>
    </Section>
  )
}
