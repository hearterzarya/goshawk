import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'

export const metadata = {
  title: 'SMS Messaging Policy',
  description: 'Goshawk Logistics SMS messaging policy and opt-out instructions.',
}

export default function SMSMessagingPolicyPage() {
  return (
    <Section padding="xl" background="white" className="pt-32">
      <Container>
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-display font-bold text-navy-900 mb-8">
            SMS Messaging Policy
          </h1>
          <div className="prose prose-lg max-w-none">
            <p className="text-navy-600 mb-6">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <h2 className="text-2xl font-semibold text-navy-900 mt-8 mb-4">
              Consent to Receive SMS
            </h2>
            <p className="text-navy-600 mb-6">
              By providing your mobile phone number and opting in to receive SMS
              messages from Goshawk Logistics, you consent to receive text
              messages regarding shipment updates, dispatch notifications, and
              service-related communications.
            </p>

            <h2 className="text-2xl font-semibold text-navy-900 mt-8 mb-4">
              Message Frequency
            </h2>
            <p className="text-navy-600 mb-6">
              Message frequency varies based on your shipment activity and
              service preferences. You may receive messages for shipment
              confirmations, pickup/delivery updates, tracking information, and
              important service notifications.
            </p>

            <h2 className="text-2xl font-semibold text-navy-900 mt-8 mb-4">
              Opt-Out Instructions
            </h2>
            <p className="text-navy-600 mb-6">
              You can opt out of receiving SMS messages at any time by replying
              STOP to any message. You may also opt out by contacting us at{' '}
              <a
                href="mailto:info@goshawklogistics.com"
                className="text-primary-600 hover:text-primary-700"
              >
                info@goshawklogistics.com
              </a>{' '}
              or calling (800) 555-1234.
            </p>

            <h2 className="text-2xl font-semibold text-navy-900 mt-8 mb-4">
              Message and Data Rates
            </h2>
            <p className="text-navy-600 mb-6">
              Standard message and data rates may apply according to your mobile
              carrier's plan. Goshawk Logistics is not responsible for any
              charges incurred.
            </p>

            <h2 className="text-2xl font-semibold text-navy-900 mt-8 mb-4">
              Support
            </h2>
            <p className="text-navy-600 mb-6">
              For help with SMS messages, reply HELP to any message or contact
              us at{' '}
              <a
                href="mailto:info@goshawklogistics.com"
                className="text-primary-600 hover:text-primary-700"
              >
                info@goshawklogistics.com
              </a>
              .
            </p>

            <h2 className="text-2xl font-semibold text-navy-900 mt-8 mb-4">
              Contact Us
            </h2>
            <p className="text-navy-600">
              For questions about this SMS Messaging Policy, please contact us
              at{' '}
              <a
                href="mailto:info@goshawklogistics.com"
                className="text-primary-600 hover:text-primary-700"
              >
                info@goshawklogistics.com
              </a>{' '}
              or (800) 555-1234.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
