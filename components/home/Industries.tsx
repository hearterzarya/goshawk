'use client'

import { useState } from 'react'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { useGsapReveal } from '@/hooks/useGsapReveal'

const industries = [
  {
    id: 'produce',
    name: 'Produce & Agriculture',
    description:
      'Temperature-controlled shipping for fresh fruits, vegetables, and agricultural products. We understand the critical timing and temperature requirements of perishable goods.',
  },
  {
    id: 'wholesale',
    name: 'Wholesale Distribution',
    description:
      'Efficient LTL and FTL solutions for wholesale distributors. Flexible scheduling and reliable carriers to keep your inventory moving.',
  },
  {
    id: 'automotive',
    name: 'Automotive Parts',
    description:
      'Specialized handling for automotive components, from small parts to oversized equipment. Flatbed and enclosed options for all cargo types.',
  },
  {
    id: 'manufacturing',
    name: 'Manufacturing',
    description:
      'Comprehensive logistics support for manufacturing operations. Raw materials inbound, finished goods outbound, and everything in between.',
  },
  {
    id: 'retail',
    name: 'Retail & E-commerce',
    description:
      'Fast, reliable shipping solutions for retail distribution centers and e-commerce fulfillment. Meet tight delivery windows with confidence.',
  },
  {
    id: 'construction',
    name: 'Construction',
    description:
      'Heavy-duty flatbed and specialized equipment transportation for construction materials, machinery, and building supplies.',
  },
]

export function Industries() {
  const [selectedIndustry, setSelectedIndustry] = useState(industries[0].id)
  const ref = useGsapReveal({ y: 40 })

  const selected = industries.find((ind) => ind.id === selectedIndustry)

  return (
    <Section padding="lg" background="white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-navy-900 mb-4">
            Industries We Serve
          </h2>
          <p className="text-xl text-navy-600 max-w-2xl mx-auto">
            Specialized logistics solutions tailored to your industry's unique
            requirements.
          </p>
        </div>

        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="max-w-4xl mx-auto"
        >
          {/* Industry Pills */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            {industries.map((industry) => (
              <button
                key={industry.id}
                onClick={() => setSelectedIndustry(industry.id)}
                className={`px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 ${
                  selectedIndustry === industry.id
                    ? 'bg-primary-600 text-white shadow-lg scale-105'
                    : 'bg-navy-100 text-navy-700 hover:bg-navy-200'
                }`}
              >
                {industry.name}
              </button>
            ))}
          </div>

          {/* Selected Industry Content */}
          {selected && (
            <div className="bg-navy-50 rounded-xl p-8 md:p-12 border border-navy-200">
              <h3 className="text-3xl font-display font-bold text-navy-900 mb-4">
                {selected.name}
              </h3>
              <p className="text-lg text-navy-600 leading-relaxed">
                {selected.description}
              </p>
            </div>
          )}
        </div>
      </Container>
    </Section>
  )
}
