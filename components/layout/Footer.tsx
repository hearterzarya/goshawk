import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'

const footerLinks = {
  company: [
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ],
  services: [
    { href: '/services/full-truckload', label: 'Full Truckload' },
    { href: '/services/reefer', label: 'Reefer' },
    { href: '/services/ltl-freight', label: 'LTL Freight' },
    { href: '/services/flatbed', label: 'Flatbed' },
    { href: '/services/drayage', label: 'Drayage' },
    { href: '/services/power-only', label: 'Power Only' },
    { href: '/services/intermodal', label: 'Intermodal' },
    { href: '/services/cross-border', label: 'Cross Border' },
  ],
  resources: [
    { href: '/shippers', label: 'For Shippers' },
    { href: '/carriers', label: 'For Carriers' },
    { href: '/track', label: 'Track Shipment' },
    { href: '/get-quote', label: 'Get a Quote' },
  ],
  legal: [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/sms-messaging-policy', label: 'SMS Messaging Policy' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <Image
                src="/logo.png"
                alt="Goshawk Logistics"
                width={200}
                height={70}
                className="h-14 sm:h-16 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="text-navy-300 mb-6 max-w-md">
              Premium logistics brokerage delivering reliable freight solutions
              across North America. 24/7 support, real-time tracking, verified
              carrier network.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-navy-300">
                <Phone size={18} />
                <a
                  href="tel:+18005551234"
                  className="hover:text-white transition-colors"
                >
                  (800) 555-1234
                </a>
              </div>
              <div className="flex items-center space-x-3 text-navy-300">
                <Mail size={18} />
                <a
                  href="mailto:info@goshawklogistics.com"
                  className="hover:text-white transition-colors"
                >
                  info@goshawklogistics.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-navy-300">
                <MapPin size={18} />
                <span>Nationwide Coverage</span>
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-navy-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-navy-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources & Legal */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3 mb-6">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-navy-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-navy-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-navy-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-navy-400 text-sm">
              © {new Date().getFullYear()} Goshawk Logistics. All rights
              reserved.
            </p>
            <p className="text-navy-400 text-sm">
              Licensed freight broker. MC# 123456
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
