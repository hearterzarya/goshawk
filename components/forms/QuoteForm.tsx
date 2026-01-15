'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { quoteFormSchema, type QuoteFormData } from '@/lib/validations'
import { FormField } from './FormField'
import { SelectField } from './SelectField'
import { TextareaField } from './TextareaField'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { CheckCircle, Loader2 } from 'lucide-react'

const equipmentOptions = [
  { value: 'dry-van', label: 'Dry Van' },
  { value: 'reefer', label: 'Reefer (Refrigerated)' },
  { value: 'flatbed', label: 'Flatbed' },
  { value: 'ltl', label: 'LTL' },
  { value: 'step-deck', label: 'Step Deck' },
  { value: 'double-drop', label: 'Double Drop' },
  { value: 'power-only', label: 'Power Only' },
  { value: 'other', label: 'Other' },
]

export function QuoteForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
  })

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setIsSuccess(true)
        reset()
        setTimeout(() => setIsSuccess(false), 5000)
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <Card className="text-center py-12">
        <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
        <h3 className="text-2xl font-semibold text-navy-900 mb-2">
          Quote Request Submitted
        </h3>
        <p className="text-navy-600">
          We'll get back to you within 2-4 hours with a competitive quote.
        </p>
      </Card>
    )
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Full Name"
            {...register('name')}
            error={errors.name?.message}
            required
          />
          <FormField
            label="Company"
            {...register('company')}
            error={errors.company?.message}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Email"
            type="email"
            {...register('email')}
            error={errors.email?.message}
            required
          />
          <FormField
            label="Phone"
            type="tel"
            {...register('phone')}
            error={errors.phone?.message}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Pickup Location"
            placeholder="City, State or Full Address"
            {...register('pickupLocation')}
            error={errors.pickupLocation?.message}
            required
          />
          <FormField
            label="Delivery Location"
            placeholder="City, State or Full Address"
            {...register('deliveryLocation')}
            error={errors.deliveryLocation?.message}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectField
            label="Equipment Type"
            options={equipmentOptions}
            {...register('equipmentType')}
            error={errors.equipmentType?.message}
            required
          />
          <FormField
            label="Weight (lbs)"
            type="number"
            placeholder="Optional"
            {...register('weight')}
            error={errors.weight?.message}
          />
        </div>

        <FormField
          label="Commodity"
          placeholder="Describe what you're shipping"
          {...register('commodity')}
          error={errors.commodity?.message}
          required
        />

        <TextareaField
          label="Additional Notes"
          placeholder="Any special requirements, delivery instructions, etc."
          {...register('notes')}
          error={errors.notes?.message}
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 animate-spin" size={20} />
              Submitting...
            </>
          ) : (
            'Request Quote'
          )}
        </Button>
      </form>
    </Card>
  )
}
