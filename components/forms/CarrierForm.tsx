'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { carrierFormSchema, type CarrierFormData } from '@/lib/validations'
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
  { value: 'step-deck', label: 'Step Deck' },
  { value: 'double-drop', label: 'Double Drop' },
  { value: 'power-only', label: 'Power Only' },
  { value: 'other', label: 'Other' },
]

export function CarrierForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CarrierFormData>({
    resolver: zodResolver(carrierFormSchema),
  })

  const onSubmit = async (data: CarrierFormData) => {
    setIsSubmitting(true)
    try {
      // Exclude file from JSON payload (file uploads would need FormData)
      const { insuranceFile, ...jsonData } = data
      const response = await fetch('/api/carrier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonData),
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
      alert('Failed to submit application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <Card className="text-center py-12">
        <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
        <h3 className="text-2xl font-semibold text-navy-900 mb-2">
          Application Submitted
        </h3>
        <p className="text-navy-600">
          We'll review your application and get back to you within 1-2 business
          days.
        </p>
      </Card>
    )
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="MC Number"
            placeholder="MC-123456"
            {...register('mcNumber')}
            error={errors.mcNumber?.message}
            required
          />
          <FormField
            label="DOT Number"
            placeholder="DOT-123456"
            {...register('dotNumber')}
            error={errors.dotNumber?.message}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Company Name"
            {...register('companyName')}
            error={errors.companyName?.message}
            required
          />
          <FormField
            label="Contact Name"
            {...register('contactName')}
            error={errors.contactName?.message}
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

        <SelectField
          label="Equipment Type"
          options={equipmentOptions}
          {...register('equipment')}
          error={errors.equipment?.message}
          required
        />

        <TextareaField
          label="Primary Lanes"
          placeholder="Describe your primary service lanes (e.g., CA to TX, Northeast corridor, etc.)"
          {...register('lanes')}
          error={errors.lanes?.message}
          required
        />

        <div>
          <label className="block text-sm font-semibold text-navy-900 mb-2">
            Insurance Certificate (Optional)
          </label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="w-full px-4 py-3 border border-navy-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            {...register('insuranceFile')}
          />
          <p className="text-sm text-navy-500 mt-2">
            You can upload your insurance certificate now or provide it later.
          </p>
        </div>

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
            'Submit Application'
          )}
        </Button>
      </form>
    </Card>
  )
}
