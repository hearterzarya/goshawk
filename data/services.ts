export interface Service {
  slug: string
  title: string
  shortDescription: string
  description: string
  icon: string
  image?: string // Optional image URL
  features: string[]
  benefits: string[]
}

export const services: Service[] = [
  {
    slug: 'full-truckload',
    title: 'Full Truckload',
    shortDescription:
      'Dedicated truckload shipping for large shipments requiring exclusive use of a trailer.',
    description:
      'Full Truckload (FTL) shipping provides dedicated transportation for large shipments that require the exclusive use of a trailer. Ideal for businesses shipping palletized goods, bulk commodities, or time-sensitive freight that needs direct routing without stops.',
    icon: '🚚',
    features: [
      'Direct point-to-point delivery',
      'No freight consolidation delays',
      'Faster transit times',
      'Reduced handling and damage risk',
      'Flexible scheduling options',
    ],
    benefits: [
      'Expedited delivery for time-sensitive shipments',
      'Lower per-unit shipping costs for large volumes',
      'Enhanced security with dedicated equipment',
      'Real-time tracking and updates',
    ],
  },
  {
    slug: 'reefer',
    title: 'Reefer (Refrigerated)',
    shortDescription:
      'Temperature-controlled transportation for perishable goods and sensitive cargo.',
    description:
      'Reefer transportation ensures your temperature-sensitive cargo maintains the required temperature throughout transit. Our network of certified refrigerated carriers handles everything from fresh produce to pharmaceuticals with precision temperature control.',
    icon: '❄️',
    features: [
      'Temperature-controlled trailers',
      'Real-time temperature monitoring',
      'Expert handling of perishables',
      'Compliance with food safety regulations',
      'Flexible temperature ranges',
    ],
    benefits: [
      'Protection of product integrity',
      'Extended shelf life for perishables',
      'Compliance with FDA and USDA regulations',
      'Reduced spoilage and waste',
    ],
  },
  {
    slug: 'ltl-freight',
    title: 'LTL Freight',
    shortDescription:
      'Less-than-truckload shipping for smaller shipments that share trailer space.',
    description:
      'Less-Than-Truckload (LTL) shipping is the cost-effective solution for shipments that don\'t require a full trailer. Your freight shares space with other shipments, making it ideal for small to medium-sized businesses looking to optimize shipping costs.',
    icon: '📦',
    features: [
      'Cost-effective for smaller shipments',
      'Flexible pickup and delivery options',
      'Access to extensive carrier network',
      'Transparent pricing and quotes',
      'Multiple service levels available',
    ],
    benefits: [
      'Lower shipping costs for partial loads',
      'Flexible scheduling',
      'Access to nationwide coverage',
      'Professional handling and tracking',
    ],
  },
  {
    slug: 'flatbed',
    title: 'Flatbed',
    shortDescription:
      'Open-deck transportation for oversized, heavy, or irregularly shaped cargo.',
    description:
      'Flatbed shipping provides open-deck transportation for cargo that requires top or side loading. Perfect for construction materials, machinery, oversized equipment, and freight that doesn\'t fit in standard enclosed trailers.',
    icon: '🚛',
    features: [
      'Open-deck design for easy loading',
      'Heavy-duty capacity for oversized loads',
      'Flexible securing options',
      'Expert handling of specialized cargo',
      'Wide range of trailer sizes',
    ],
    benefits: [
      'Accommodates oversized and heavy freight',
      'Easy loading and unloading access',
      'Versatile for various cargo types',
      'Specialized equipment and expertise',
    ],
  },
  {
    slug: 'drayage',
    title: 'Drayage',
    shortDescription:
      'Short-haul container transportation between ports, rail yards, and distribution centers.',
    description:
      'Drayage services handle the critical first and last mile of intermodal shipping. We connect your containers from ports and rail yards to nearby distribution centers, warehouses, or manufacturing facilities with speed and precision.',
    icon: '🚢',
    features: [
      'Port and rail yard expertise',
      'Fast turnaround times',
      'Container handling and positioning',
      'Customs documentation support',
      '24/7 availability at major ports',
    ],
    benefits: [
      'Reduced port congestion delays',
      'Seamless intermodal connections',
      'Expert port operations knowledge',
      'Faster container movement',
    ],
  },
  {
    slug: 'power-only',
    title: 'Power Only',
    shortDescription:
      'Tractor-only service for customers who own or lease their own trailers.',
    description:
      'Power Only service provides tractor units without trailers for customers who own or lease their own equipment. This flexible solution allows you to maximize your trailer utilization while leveraging our driver network and dispatch expertise.',
    icon: '🔌',
    features: [
      'Tractor-only service',
      'Flexible scheduling',
      'Experienced drivers',
      'Dispatch and logistics support',
      'Cost-effective for trailer owners',
    ],
    benefits: [
      'Maximize trailer utilization',
      'Reduce equipment downtime',
      'Access to professional drivers',
      'Flexible operational model',
    ],
  },
  {
    slug: 'intermodal',
    title: 'Intermodal',
    shortDescription:
      'Multi-modal transportation combining rail and truck for efficient long-distance shipping.',
    description:
      'Intermodal shipping combines the efficiency of rail transportation with the flexibility of trucking. This cost-effective solution is ideal for long-distance shipments, reducing fuel costs and environmental impact while maintaining reliable service.',
    icon: '🚂',
    features: [
      'Rail and truck combination',
      'Cost-effective long-distance shipping',
      'Reduced carbon footprint',
      'Reliable transit times',
      'Container and trailer options',
    ],
    benefits: [
      'Lower shipping costs for long hauls',
      'Environmental sustainability',
      'Reliable service schedules',
      'Access to major rail networks',
    ],
  },
  {
    slug: 'cross-border',
    title: 'Cross Border',
    shortDescription:
      'Seamless freight transportation between the United States, Canada, and Mexico.',
    description:
      'Cross-border shipping requires specialized expertise in customs, documentation, and international regulations. Our experienced team handles all aspects of cross-border logistics, ensuring smooth transit and compliance with all international trade requirements.',
    icon: '🌎',
    features: [
      'US, Canada, and Mexico coverage',
      'Customs documentation expertise',
      'Compliance with trade regulations',
      'Bilingual support team',
      'Dedicated cross-border specialists',
    ],
    benefits: [
      'Seamless international shipping',
      'Reduced border delays',
      'Expert customs handling',
      'Comprehensive documentation support',
    ],
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug)
}
