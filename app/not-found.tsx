import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { Container } from '@/components/ui/Container'

export default function NotFound() {
  return (
    <Section padding="xl" background="white" className="pt-32 min-h-screen flex items-center">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-6xl sm:text-8xl font-display font-bold text-navy-900 mb-6">
            404
          </h1>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-navy-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-xl text-navy-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/" variant="primary" size="lg">
              Go Home
            </Button>
            <Button href="/contact" variant="outline" size="lg">
              Contact Us
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  )
}
