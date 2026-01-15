import type { Metadata } from 'next'
import { Inter, Sora } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Goshawk Logistics | Premium Freight Brokerage & Transportation',
    template: '%s | Goshawk Logistics',
  },
  description:
    'Premium logistics brokerage specializing in Full Truckload, Reefer, LTL, Flatbed, Drayage, Intermodal, and Cross-Border freight solutions. 24/7 support, real-time tracking, verified carrier network.',
  keywords: [
    'logistics',
    'freight brokerage',
    'trucking',
    'shipping',
    'transportation',
    'full truckload',
    'LTL',
    'reefer',
    'flatbed',
    'drayage',
    'intermodal',
  ],
  authors: [{ name: 'Goshawk Logistics' }],
  creator: 'Goshawk Logistics',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.goshawklogistics.com',
    siteName: 'Goshawk Logistics',
    title: 'Goshawk Logistics | Premium Freight Brokerage',
    description:
      'Premium logistics brokerage with 24/7 support, real-time tracking, and verified carrier network.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Goshawk Logistics | Premium Freight Brokerage',
    description:
      'Premium logistics brokerage with 24/7 support, real-time tracking, and verified carrier network.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
