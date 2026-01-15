'use client'

import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { useGsapReveal } from '@/hooks/useGsapReveal'
import { useCountUp } from '@/hooks/useCountUp'
import {
  Clock,
  Shield,
  Users,
  MapPin,
  Headphones,
  TrendingUp,
} from 'lucide-react'

const features = [
  {
    icon: Clock,
    title: 'On-Time Delivery',
    description:
      'We prioritize reliability and punctuality. Our network of verified carriers and proactive monitoring ensures your shipments arrive on schedule.',
  },
  {
    icon: Shield,
    title: 'Fully Licensed & Insured',
    description:
      'Licensed freight broker with comprehensive insurance coverage. All carriers are verified, licensed, and meet DOT safety requirements.',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description:
      'Experienced logistics professionals who understand your business. From dispatch to customer service, we\'re here to support you every step.',
  },
  {
    icon: MapPin,
    title: 'Nationwide Coverage',
    description:
      'Extensive network covering all 50 states, Canada, and Mexico. We connect you with the right carrier for any lane, any time.',
  },
  {
    icon: Headphones,
    title: '24/7 Support',
    description:
      'Round-the-clock dispatch and tracking support. Urgent issues? We\'re available 24/7 to ensure your shipments stay on track.',
  },
  {
    icon: TrendingUp,
    title: 'Transparent Pricing',
    description:
      'Clear, competitive pricing with no hidden fees. Get accurate quotes quickly and understand exactly what you\'re paying for.',
  },
]

const stats = [
  { label: 'On-Time Focus', value: 95, suffix: '%' },
  { label: 'Coverage Area', value: 50, suffix: ' States' },
  { label: 'Response Time', value: 2, suffix: ' Hours' },
]

function StatCard({
  label,
  value,
  suffix,
  trigger,
}: {
  label: string
  value: number
  suffix: string
  trigger?: Element
}) {
  const { ref, value: displayValue } = useCountUp({
    end: value,
    suffix,
    trigger,
  })

  return (
    <div className="text-center bg-white rounded-xl p-8 border border-navy-200">
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="text-5xl font-display font-bold text-primary-600 mb-2"
      >
        {displayValue}
      </div>
      <div className="text-navy-600 font-medium">{label}</div>
    </div>
  )
}

export function WhyChooseUs() {
  const featuresRef = useGsapReveal({ stagger: 0.1, y: 40 })
  const statsRef = useGsapReveal({ stagger: 0.15, y: 30 })

  return (
    <Section padding="lg" background="gray">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-navy-900 mb-4">
            Why Choose Goshawk
          </h2>
          <p className="text-xl text-navy-600 max-w-2xl mx-auto">
            Experience, reliability, and service excellence. That's what sets us
            apart in logistics.
          </p>
        </div>

        {/* Stats */}
        <div
          ref={statsRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              trigger={statsRef.current || undefined}
            />
          ))}
        </div>

        {/* Features Grid */}
        <div
          ref={featuresRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} hover>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Icon className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-navy-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-navy-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
