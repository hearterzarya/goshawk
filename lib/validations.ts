import { z } from 'zod'

export const quoteFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  company: z.string().min(2, 'Company name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  pickupLocation: z.string().min(5, 'Pickup location is required'),
  deliveryLocation: z.string().min(5, 'Delivery location is required'),
  equipmentType: z.string().min(1, 'Please select an equipment type'),
  commodity: z.string().min(2, 'Commodity description is required'),
  weight: z.string().optional(),
  notes: z.string().optional(),
})

export const carrierFormSchema = z.object({
  mcNumber: z.string().min(1, 'MC number is required'),
  dotNumber: z.string().min(1, 'DOT number is required'),
  companyName: z.string().min(2, 'Company name is required'),
  contactName: z.string().min(2, 'Contact name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  lanes: z.string().min(5, 'Please describe your primary lanes'),
  equipment: z.string().min(1, 'Please select equipment type'),
  insuranceFile: z.any().optional(), // File handling done separately
})

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

export type QuoteFormData = z.infer<typeof quoteFormSchema>
export type CarrierFormData = z.infer<typeof carrierFormSchema>
export type ContactFormData = z.infer<typeof contactFormSchema>
