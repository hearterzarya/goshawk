export interface FAQ {
  question: string
  answer: string
  category?: string
}

export const shipperFAQs: FAQ[] = [
  {
    question: 'How quickly can I get a quote?',
    answer:
      'We typically provide quotes within 2-4 hours during business hours, and same-day quotes are available for urgent shipments. Submit your request through our online form or contact our dispatch team directly.',
  },
  {
    question: 'What information do I need to provide for a quote?',
    answer:
      'To provide an accurate quote, we need pickup and delivery locations, shipment weight and dimensions, equipment type required, commodity description, and preferred pickup/delivery dates. Additional details help us provide the most competitive pricing.',
  },
  {
    question: 'Do you offer real-time tracking?',
    answer:
      'Yes, all shipments include real-time tracking updates. You\'ll receive automated notifications at key milestones, and you can check status anytime through our tracking portal or by contacting dispatch.',
  },
  {
    question: 'What happens if my shipment is delayed?',
    answer:
      'We proactively monitor all shipments and communicate any potential delays immediately. Our team works with carriers to resolve issues quickly and keeps you informed throughout the process. We prioritize finding solutions to minimize impact.',
  },
  {
    question: 'Are you licensed and insured?',
    answer:
      'Yes, we are a licensed freight broker with active MC# and maintain comprehensive insurance coverage. All carriers in our network are verified, licensed, and insured according to DOT requirements.',
  },
  {
    question: 'Can you handle time-sensitive shipments?',
    answer:
      'Absolutely. We specialize in expedited and time-sensitive freight. Our network includes carriers equipped for hotshot and expedited services, and we prioritize urgent shipments with dedicated dispatch support.',
  },
]

export const carrierFAQs: FAQ[] = [
  {
    question: 'How do I become a carrier partner?',
    answer:
      'Complete our carrier setup form with your MC#, DOT#, insurance information, and equipment details. Our team reviews applications within 1-2 business days. Once approved, you\'ll receive access to our load board and dispatch communications.',
  },
  {
    question: 'What are your payment terms?',
    answer:
      'We offer competitive payment terms with quick pay options available. Standard payment is within 30 days, with expedited payment options for qualified carriers. All payments are processed reliably and on schedule.',
  },
  {
    question: 'What types of loads do you typically have?',
    answer:
      'We handle a diverse range of freight including Full Truckload, Reefer, LTL, Flatbed, Drayage, Intermodal, and Cross-Border shipments. Load types vary by region and season, with consistent opportunities across our service areas.',
  },
  {
    question: 'How do I access available loads?',
    answer:
      'Once approved as a carrier partner, you\'ll receive load opportunities via email, text, or through our carrier portal. Our dispatch team also proactively contacts carriers for specific lanes and equipment needs.',
  },
  {
    question: 'Do you require specific insurance coverage?',
    answer:
      'Yes, we require carriers to maintain current insurance coverage meeting DOT minimums. Specific requirements vary by load type and value. Our team will review your insurance during the application process.',
  },
  {
    question: 'Can I work with you if I\'m a new carrier?',
    answer:
      'We work with carriers of all sizes, including new operations. We review each application individually and consider factors beyond just experience. New carriers may start with smaller loads as we build our working relationship.',
  },
]

export const generalFAQs: FAQ[] = [
  {
    question: 'What geographic areas do you serve?',
    answer:
      'We provide coverage throughout the United States, Canada, and Mexico. Our network includes major metropolitan areas, ports, rail yards, and distribution hubs. Contact us to confirm coverage for your specific lanes.',
  },
  {
    question: 'What industries do you serve?',
    answer:
      'We serve a wide range of industries including produce and food distribution, manufacturing, automotive, retail, construction, pharmaceuticals, and more. Our diverse service offerings accommodate various cargo types and requirements.',
  },
  {
    question: 'Do you offer 24/7 support?',
    answer:
      'Yes, our dispatch team is available 24/7 for urgent matters and shipment tracking. For non-urgent inquiries, our business hours are Monday-Friday 8 AM - 6 PM EST, with extended support for active shipments.',
  },
  {
    question: 'How do you ensure carrier quality?',
    answer:
      'All carriers undergo a thorough vetting process including license verification, insurance validation, safety record review, and equipment inspection. We maintain ongoing relationships and monitor performance to ensure service quality.',
  },
]
