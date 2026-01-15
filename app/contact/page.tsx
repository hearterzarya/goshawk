'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Card } from '@/components/ui/Card'
import { ContactForm } from '@/components/forms/ContactForm'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { useGsapReveal } from '@/hooks/useGsapReveal'

interface ContactInfo {
  label: string
  value: string
  href: string | null
}

interface ContactContent {
  headline: string
  subtext: string
  formTitle: string
  contactInfo: ContactInfo[]
}

const defaultContent: ContactContent = {
  headline: 'Get In Touch',
  subtext: 'Have questions? Need a quote? Our team is here to help. Reach out anytime.',
  formTitle: 'Send Us a Message',
  contactInfo: [
    { label: 'Phone', value: '(800) 555-1234', href: 'tel:+18005551234' },
    { label: 'Email', value: 'info@goshawklogistics.com', href: 'mailto:info@goshawklogistics.com' },
    { label: 'Coverage', value: 'Nationwide (USA, Canada, Mexico)', href: null },
    { label: 'Support', value: '24/7 Dispatch & Tracking', href: null },
  ],
}

const contactIcons = [Phone, Mail, MapPin, Clock]

export default function ContactPage() {
  const [content, setContent] = useState<ContactContent>(defaultContent)
  const heroRef = useGsapReveal({ y: 30 })
  const contactInfoRef = useGsapReveal({ stagger: 0.1, y: 40 })
  const formRef = useGsapReveal({ y: 30 })

  useEffect(() => {
    // Load content from API
    fetch('/api/admin/content/contact')
      .then(res => res.json())
      .then(data => {
        if (data && data.headline) {
          setContent(data)
        }
      })
      .catch(() => {
        // Use default content if API fails
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

        <Container>
          <div
            ref={heroRef as React.RefObject<HTMLDivElement>}
            className="max-w-4xl mx-auto text-center relative z-10"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-navy-900 mb-6 leading-tight">
              {content.headline}
            </h1>
            <p className="text-xl sm:text-2xl text-navy-600 leading-relaxed max-w-2xl mx-auto">
              {content.subtext}
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Information Cards */}
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
            ref={contactInfoRef as React.RefObject<HTMLDivElement>}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
          >
            {content.contactInfo.map((info, index) => {
              const Icon = contactIcons[index % contactIcons.length]
              const contentElement = (
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                    <Icon className="text-primary-600 group-hover:text-white transition-colors" size={28} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-navy-500 mb-1">
                      {info.label}
                    </div>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-lg font-semibold text-navy-900 hover:text-primary-600 transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <div className="text-lg font-semibold text-navy-900">
                        {info.value}
                      </div>
                    )}
                  </div>
                </div>
              )

              return info.href ? (
                <a key={info.label} href={info.href} className="group">
                  <Card hover className="h-full">{contentElement}</Card>
                </a>
              ) : (
                <Card key={info.label} hover className="h-full group">{contentElement}</Card>
              )
            })}
          </div>
        </Container>
      </Section>

      {/* Contact Form Section */}
      <Section padding="lg" background="white" className="relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />

        <Container>
          <div
            ref={formRef as React.RefObject<HTMLDivElement>}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-4xl sm:text-5xl font-display font-bold text-navy-900 mb-8 text-center">
              {content.formTitle}
            </h2>
            <Card className="p-8 sm:p-12">
              <ContactForm />
            </Card>
          </div>
        </Container>
      </Section>
    </>
  )
}
