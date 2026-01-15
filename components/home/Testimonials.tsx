'use client'

import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { testimonials } from '@/data/testimonials'
import { useGsapReveal } from '@/hooks/useGsapReveal'
import { Star, Quote } from 'lucide-react'

export function Testimonials() {
  const ref = useGsapReveal({ stagger: 0.1, y: 40 })

  return (
    <Section padding="lg" background="white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-navy-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-xl text-navy-600 max-w-2xl mx-auto">
            Trusted by shippers and carriers across North America.
          </p>
        </div>

        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.slice(0, 6).map((testimonial) => (
            <Card key={testimonial.id} hover>
              <div className="flex items-start gap-2 mb-4">
                <Quote className="text-primary-300 flex-shrink-0" size={24} />
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
              </div>
              <p className="text-navy-600 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              <div>
                <div className="font-semibold text-navy-900">
                  {testimonial.name}
                </div>
                <div className="text-sm text-navy-500">
                  {testimonial.role}, {testimonial.company}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  )
}
