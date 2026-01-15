'use client'

import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { Phone, Mail, ArrowRight } from 'lucide-react'

export function CTAStrip() {
  return (
    <Section padding="lg" background="navy" className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }} 
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10" />

      <Container>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4 sm:mb-6 leading-tight px-4">
            Ready to Ship Smarter?
          </h2>
          
          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-navy-200 mb-8 sm:mb-10 max-w-2xl mx-auto px-4 leading-relaxed">
            Get a competitive quote in hours, not days. Our team is ready to
            help you find the perfect freight solution.
          </p>
          
          {/* CTA Button - Full width on mobile, centered */}
          <div className="mb-8 sm:mb-10 px-4">
            <Button 
              href="/get-quote" 
              variant="primary" 
              size="lg"
              className="w-full sm:w-auto min-w-[200px] shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
            >
              Request a Quote
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </div>

          {/* Contact Information - Simple on mobile, card style on larger screens */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 lg:gap-8 px-4">
            {/* Phone - Simple on mobile */}
            <a
              href="tel:+18005551234"
              className="flex items-center gap-2 sm:gap-4 text-white hover:text-primary-300 transition-all group sm:bg-white/5 sm:hover:bg-white/10 sm:rounded-lg sm:p-3 sm:border sm:border-white/10 sm:hover:border-primary-500/50"
            >
              <div className="flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                <Phone size={16} className="sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col sm:flex-col items-start text-left">
                <span className="hidden sm:block text-xs text-navy-300 uppercase tracking-wide mb-1">Call Us</span>
                <span className="font-semibold text-base sm:text-lg whitespace-nowrap">(800) 555-1234</span>
              </div>
            </a>

            {/* Divider - Hidden on mobile, visible on larger screens */}
            <div className="hidden sm:block w-px h-12 bg-navy-700" />

            {/* Email - Simple on mobile */}
            <a
              href="mailto:info@goshawklogistics.com"
              className="flex items-center gap-2 sm:gap-4 text-white hover:text-primary-300 transition-all group sm:bg-white/5 sm:hover:bg-white/10 sm:rounded-lg sm:p-3 sm:border sm:border-white/10 sm:hover:border-primary-500/50"
            >
              <div className="flex-shrink-0 w-8 h-8 sm:w-12 sm:h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                <Mail size={16} className="sm:w-5 sm:h-5" />
              </div>
              <div className="flex flex-col sm:flex-col items-start text-left min-w-0">
                <span className="hidden sm:block text-xs text-navy-300 uppercase tracking-wide mb-1">Email Us</span>
                <span className="font-semibold text-sm sm:text-base break-all sm:break-normal">
                  info@goshawklogistics.com
                </span>
              </div>
            </a>
          </div>
        </div>
      </Container>
    </Section>
  )
}
