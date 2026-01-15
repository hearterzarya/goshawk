import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'

export const metadata = {
  title: 'Terms of Service',
  description: 'Goshawk Logistics terms of service and user agreement.',
}

export default function TermsPage() {
  return (
    <Section padding="xl" background="white" className="pt-32">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-navy-900 mb-8">
            Terms of Service
          </h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-navy-600 mb-6">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <h2 className="text-2xl font-semibold text-navy-900 mt-8 mb-4">
              Agreement to Terms
            </h2>
            <p className="text-navy-600 mb-6">
              By accessing or using Goshawk Logistics services, you agree to be
              bound by these Terms of Service. If you disagree with any part of
              these terms, you may not access our services.
            </p>

            <h2 className="text-2xl font-semibold text-navy-900 mt-8 mb-4">
              Services
            </h2>
            <p className="text-navy-600 mb-6">
              Goshawk Logistics operates as a licensed freight broker,
              connecting shippers with carriers. We facilitate transportation
              services but are not a carrier. All transportation is performed by
              independent, licensed carriers.
            </p>

            <h2 className="text-2xl font-semibold text-navy-900 mt-8 mb-4">
              Quotes and Pricing
            </h2>
            <p className="text-navy-600 mb-6">
              Quotes provided are estimates and subject to change based on
              actual shipment details, market conditions, and carrier
              availability. Final pricing will be confirmed upon booking.
            </p>

            <h2 className="text-2xl font-semibold text-navy-900 mt-8 mb-4">
              Liability
            </h2>
            <p className="text-navy-600 mb-6">
              As a freight broker, our liability is limited. Carriers are
              responsible for cargo loss, damage, or delay during transit. All
              carriers in our network maintain appropriate insurance coverage.
            </p>

            <h2 className="text-2xl font-semibold text-navy-900 mt-8 mb-4">
              Payment Terms
            </h2>
            <p className="text-navy-600 mb-6">
              Payment terms will be specified in individual service agreements.
              Standard terms are net 30 days unless otherwise agreed. Late
              payments may incur fees.
            </p>

            <h2 className="text-2xl font-semibold text-navy-900 mt-8 mb-4">
              Contact Us
            </h2>
            <p className="text-navy-600">
              For questions about these Terms of Service, please contact us at{' '}
              <a
                href="mailto:legal@goshawklogistics.com"
                className="text-primary-600 hover:text-primary-700"
              >
                legal@goshawklogistics.com
              </a>
              .
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
