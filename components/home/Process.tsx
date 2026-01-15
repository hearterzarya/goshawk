'use client'

import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { useGsapReveal } from '@/hooks/useGsapReveal'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const steps = [
  {
    number: '01',
    title: 'Plan',
    description:
      'Share your shipment details and requirements. Our team analyzes your needs and provides competitive quotes with transparent pricing.',
  },
  {
    number: '02',
    title: 'Book',
    description:
      'Confirm your booking and we match you with a verified carrier from our network. Receive immediate confirmation and carrier details.',
  },
  {
    number: '03',
    title: 'Deliver',
    description:
      'Track your shipment in real-time with 24/7 updates. Our team monitors every step to ensure on-time delivery and handles any issues proactively.',
  },
]

export function Process() {
  const sectionRef = useRef<HTMLElement>(null)
  const stepsRef = useGsapReveal({ stagger: 0.2, y: 50 })

  useEffect(() => {
    if (!sectionRef.current) return

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion) return

    const stepCards = sectionRef.current.querySelectorAll('.process-step')

    stepCards.forEach((card, index) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top 80%',
        onEnter: () => {
          gsap.to(card, {
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out',
          })
          gsap.to(card.querySelector('.step-number'), {
            color: '#ea580c',
            duration: 0.3,
          })
        },
        onLeaveBack: () => {
          gsap.to(card, {
            scale: 1,
            duration: 0.3,
          })
          gsap.to(card.querySelector('.step-number'), {
            color: '#64748b',
            duration: 0.3,
          })
        },
      })
    })
  }, [])

  return (
    <Section ref={sectionRef} padding="lg" background="gray">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-bold text-navy-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-navy-600 max-w-2xl mx-auto">
            Simple, transparent, and reliable. Three steps to get your freight
            moving.
          </p>
        </div>

        <div
          ref={stepsRef as React.RefObject<HTMLDivElement>}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-navy-200 -z-10" />

          {steps.map((step, index) => (
            <div
              key={step.number}
              className="process-step bg-white rounded-xl p-8 border border-navy-200 relative"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="step-number text-5xl font-display font-bold text-navy-400">
                  {step.number}
                </span>
                <div className="w-12 h-0.5 bg-primary-200" />
              </div>
              <h3 className="text-2xl font-semibold text-navy-900 mb-3">
                {step.title}
              </h3>
              <p className="text-navy-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
