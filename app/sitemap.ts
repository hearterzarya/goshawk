import { MetadataRoute } from 'next'
import { services } from '@/data/services'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.goshawklogistics.com'

  const staticPages = [
    '',
    '/about',
    '/services',
    '/shippers',
    '/carriers',
    '/contact',
    '/get-quote',
    '/track',
    '/privacy-policy',
    '/terms',
    '/sms-messaging-policy',
  ]

  const servicePages = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...staticPages.map((page) => ({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: page === '' ? 1 : 0.8,
    })),
    ...servicePages,
  ]
}
