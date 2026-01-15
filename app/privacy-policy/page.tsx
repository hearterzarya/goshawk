import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'

export const metadata = {
  title: 'Privacy Policy',
  description: 'Goshawk Logistics privacy policy and data protection practices.',
}

export default function PrivacyPolicyPage() {
  return (
    <Section padding="xl" background="white" className="pt-32">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-navy-900 mb-8">
            Privacy Policy
          </h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-navy-600 mb-6">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <h2 className="text-2xl font-semibold text-navy-900 mt-8 mb-4">
              Information We Collect
            </h2>
            <p className="text-navy-600 mb-6">
              We collect information that you provide directly to us, including
              when you request a quote, submit a carrier application, contact
              us, or use our services. This may include your name, company name,
              email address, phone number, shipping details, and other relevant
              business information.
            </p>

            <h2 className="text-2xl font-semibold text-navy-900 mt-8 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-navy-600 mb-6">
              We use the information we collect to provide, maintain, and improve
              our services, process transactions, communicate with you, and
              comply with legal obligations. We do not sell your personal
              information to third parties.
            </p>

            <h2 className="text-2xl font-semibold text-navy-900 mt-8 mb-4">
              Data Security
            </h2>
            <p className="text-navy-600 mb-6">
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction.
            </p>

            <h2 className="text-2xl font-semibold text-navy-900 mt-8 mb-4">
              Your Rights
            </h2>
            <p className="text-navy-600 mb-6">
              You have the right to access, update, or delete your personal
              information. To exercise these rights, please contact us at{' '}
              <a
                href="mailto:privacy@goshawklogistics.com"
                className="text-primary-600 hover:text-primary-700"
              >
                privacy@goshawklogistics.com
              </a>
              .
            </p>

            <h2 className="text-2xl font-semibold text-navy-900 mt-8 mb-4">
              Contact Us
            </h2>
            <p className="text-navy-600">
              If you have questions about this Privacy Policy, please contact us
              at{' '}
              <a
                href="mailto:privacy@goshawklogistics.com"
                className="text-primary-600 hover:text-primary-700"
              >
                privacy@goshawklogistics.com
              </a>
              .
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
