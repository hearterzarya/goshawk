// Initialize JSON data files from TypeScript sources
const fs = require('fs')
const path = require('path')

// Services
const servicesData = [
  {
    slug: 'full-truckload',
    title: 'Full Truckload',
    shortDescription: 'Dedicated truckload shipping for large shipments requiring exclusive use of a trailer.',
    description: 'Full Truckload (FTL) shipping provides dedicated transportation for large shipments that require the exclusive use of a trailer. Ideal for businesses shipping palletized goods, bulk commodities, or time-sensitive freight that needs direct routing without stops.',
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
    shortDescription: 'Temperature-controlled transportation for perishable goods and sensitive cargo.',
    description: 'Reefer transportation ensures your temperature-sensitive cargo maintains the required temperature throughout transit. Our network of certified refrigerated carriers handles everything from fresh produce to pharmaceuticals with precision temperature control.',
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
    shortDescription: 'Less-than-truckload shipping for smaller shipments that share trailer space.',
    description: 'Less-Than-Truckload (LTL) shipping is the cost-effective solution for shipments that don\'t require a full trailer. Your freight shares space with other shipments, making it ideal for small to medium-sized businesses looking to optimize shipping costs.',
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
    shortDescription: 'Open-deck transportation for oversized, heavy, or irregularly shaped cargo.',
    description: 'Flatbed shipping provides open-deck transportation for cargo that requires top or side loading. Perfect for construction materials, machinery, oversized equipment, and freight that doesn\'t fit in standard enclosed trailers.',
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
    shortDescription: 'Short-haul container transportation between ports, rail yards, and distribution centers.',
    description: 'Drayage services handle the critical first and last mile of intermodal shipping. We connect your containers from ports and rail yards to nearby distribution centers, warehouses, or manufacturing facilities with speed and precision.',
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
    shortDescription: 'Tractor-only service for customers who own or lease their own trailers.',
    description: 'Power Only service provides tractor units without trailers for customers who own or lease their own equipment. This flexible solution allows you to maximize your trailer utilization while leveraging our driver network and dispatch expertise.',
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
    shortDescription: 'Multi-modal transportation combining rail and truck for efficient long-distance shipping.',
    description: 'Intermodal shipping combines the efficiency of rail transportation with the flexibility of trucking. This cost-effective solution is ideal for long-distance shipments, reducing fuel costs and environmental impact while maintaining reliable service.',
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
    shortDescription: 'Seamless freight transportation between the United States, Canada, and Mexico.',
    description: 'Cross-border shipping requires specialized expertise in customs, documentation, and international regulations. Our experienced team handles all aspects of cross-border logistics, ensuring smooth transit and compliance with all international trade requirements.',
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

// Testimonials
const testimonialsData = [
  {
    id: '1',
    name: 'Sarah Martinez',
    role: 'Operations Manager',
    company: 'Fresh Produce Distributors',
    content: 'Goshawk has transformed our refrigerated shipping operations. Their attention to temperature control and real-time updates gives us complete confidence in our supply chain. The team is responsive, professional, and always goes above and beyond.',
    rating: 5,
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Logistics Director',
    company: 'Auto Parts Manufacturing',
    content: 'We\'ve been working with Goshawk for over two years, and they consistently deliver. Their flatbed expertise and ability to handle our oversized equipment shipments has been invaluable. On-time delivery rates have improved significantly.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Jennifer Williams',
    role: 'Supply Chain Coordinator',
    company: 'Retail Distribution Center',
    content: 'The LTL solutions from Goshawk have helped us optimize our shipping costs without sacrificing service quality. Their transparent pricing and reliable carriers make them our go-to partner for all freight needs.',
    rating: 5,
  },
  {
    id: '4',
    name: 'David Rodriguez',
    role: 'Fleet Manager',
    company: 'Independent Carrier Network',
    content: 'As a carrier partner, Goshawk provides consistent loads and fair rates. Their dispatch team is professional, and payments are always on time. They\'ve become one of our most trusted brokerage partners.',
    rating: 5,
  },
  {
    id: '5',
    name: 'Amanda Thompson',
    role: 'VP of Operations',
    company: 'Consumer Goods Manufacturer',
    content: 'Goshawk\'s intermodal services have reduced our shipping costs by over 20% on long-haul routes. The combination of rail and truck gives us the best of both worlds: cost efficiency and reliable delivery.',
    rating: 5,
  },
  {
    id: '6',
    name: 'Robert Kim',
    role: 'Import/Export Manager',
    company: 'International Trading Company',
    content: 'Cross-border shipping can be complex, but Goshawk makes it seamless. Their expertise in customs documentation and border procedures has eliminated delays and simplified our international operations.',
    rating: 5,
  },
]

// Write files
const dataDir = path.join(__dirname, '..', 'data')

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

// Only write if file doesn't exist
if (!fs.existsSync(path.join(dataDir, 'services.json'))) {
  fs.writeFileSync(
    path.join(dataDir, 'services.json'),
    JSON.stringify(servicesData, null, 2)
  )
  console.log('Created services.json')
}

if (!fs.existsSync(path.join(dataDir, 'testimonials.json'))) {
  fs.writeFileSync(
    path.join(dataDir, 'testimonials.json'),
    JSON.stringify(testimonialsData, null, 2)
  )
  console.log('Created testimonials.json')
}

console.log('Data files initialized!')
