'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { OptimizedImage } from '@/components/ui/OptimizedImage'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import { FormField } from '@/components/forms/FormField'
import { TextareaField } from '@/components/forms/TextareaField'
import { getServiceBySlug, services } from '@/data/services'
import type { Service } from '@/data/services'

export default function EditServicePage() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string
  const isNew = slug === 'new'
  
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<Service>({
    slug: '',
    title: '',
    shortDescription: '',
    description: '',
    icon: '🚚',
    image: '',
    features: [''],
    benefits: [''],
  })
  const [availableImages, setAvailableImages] = useState<string[]>([])
  const [showImageSelector, setShowImageSelector] = useState(false)

  useEffect(() => {
    // Load available images
    fetch('/api/admin/images/list')
      .then(res => res.json())
      .then(data => {
        if (data.images) {
          setAvailableImages(data.images)
        }
      })
      .catch(console.error)

    // Load service data
    if (!isNew) {
      fetch(`/api/admin/services`)
        .then(res => res.json())
        .then(data => {
          const service = Array.isArray(data) ? data.find((s: Service) => s.slug === slug) : null
          if (service) {
            setFormData(service)
          } else {
            // Fallback to default
            const defaultService = getServiceBySlug(slug)
            if (defaultService) {
              setFormData(defaultService)
            }
          }
        })
        .catch(() => {
          // Fallback to default
          const service = getServiceBySlug(slug)
          if (service) {
            setFormData(service)
          }
        })
    }
  }, [slug, isNew])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/admin/services', {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/services')
      } else {
        alert('Failed to save service')
      }
    } catch (error) {
      alert('Error saving service')
    } finally {
      setLoading(false)
    }
  }

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, ''],
    })
  }

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData({ ...formData, features: newFeatures })
  }

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    })
  }

  const addBenefit = () => {
    setFormData({
      ...formData,
      benefits: [...formData.benefits, ''],
    })
  }

  const updateBenefit = (index: number, value: string) => {
    const newBenefits = [...formData.benefits]
    newBenefits[index] = value
    setFormData({ ...formData, benefits: newBenefits })
  }

  const removeBenefit = (index: number) => {
    setFormData({
      ...formData,
      benefits: formData.benefits.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="min-h-screen bg-navy-50">
      <header className="bg-white border-b border-navy-200">
        <div className="container-custom py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/services">
              <Button variant="ghost" size="sm">
                <ArrowLeft size={16} className="mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-display font-bold text-navy-900">
                {isNew ? 'Add New Service' : 'Edit Service'}
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              label="Slug (URL-friendly name)"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              required
              placeholder="full-truckload"
            />

            <FormField
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <FormField
              label="Icon (emoji)"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              placeholder="🚚"
            />

            <div>
              <label className="block text-sm font-semibold text-navy-900 mb-2">
                Service Image (optional)
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={formData.image || ''}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="flex-1 px-4 py-2 border border-navy-300 rounded-lg"
                  placeholder="Enter Vercel Blob URL or leave empty to use icon"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowImageSelector(!showImageSelector)}
                >
                  {showImageSelector ? 'Hide' : 'Select'} Image
                </Button>
              </div>
              {formData.image && (
                <div className="mt-2 relative w-full h-48 bg-navy-50 rounded-lg overflow-hidden">
                  <OptimizedImage
                    src={formData.image}
                    alt="Preview"
                    fill
                    className="object-cover"
                    objectFit="cover"
                  />
                </div>
              )}
              {showImageSelector && (
                <div className="mt-4 p-4 border border-navy-200 rounded-lg bg-navy-50 max-h-64 overflow-y-auto">
                  <p className="text-sm text-navy-600 mb-3">Select an uploaded image:</p>
                  <div className="grid grid-cols-3 gap-2">
                    {availableImages.map((imgUrl) => (
                      <button
                        key={imgUrl}
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, image: imgUrl })
                          setShowImageSelector(false)
                        }}
                        className={`relative h-20 rounded border-2 overflow-hidden ${
                          formData.image === imgUrl
                            ? 'border-primary-600'
                            : 'border-navy-300 hover:border-primary-400'
                        }`}
                      >
                        <OptimizedImage
                          src={imgUrl}
                          alt="Select"
                          fill
                          className="object-cover"
                          objectFit="cover"
                        />
                      </button>
                    ))}
                  </div>
                  {availableImages.length === 0 && (
                    <p className="text-sm text-navy-500 text-center py-4">
                      No images uploaded yet.{' '}
                      <Link href="/admin/images" className="text-primary-600 hover:underline">
                        Upload images
                      </Link>
                    </p>
                  )}
                </div>
              )}
            </div>

            <TextareaField
              label="Short Description"
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              required
              rows={2}
            />

            <TextareaField
              label="Full Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
            />

            <div>
              <label className="block text-sm font-semibold text-navy-900 mb-2">
                Features
              </label>
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-navy-300 rounded-lg"
                    placeholder="Feature description"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeFeature(index)}
                    className="text-red-600"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                + Add Feature
              </Button>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy-900 mb-2">
                Benefits
              </label>
              {formData.benefits.map((benefit, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={benefit}
                    onChange={(e) => updateBenefit(index, e.target.value)}
                    className="flex-1 px-4 py-2 border border-navy-300 rounded-lg"
                    placeholder="Benefit description"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeBenefit(index)}
                    className="text-red-600"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={addBenefit}>
                + Add Benefit
              </Button>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" variant="primary" size="lg" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={20} />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={20} className="mr-2" />
                    Save Service
                  </>
                )}
              </Button>
              <Link href="/admin/services">
                <Button type="button" variant="outline" size="lg">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </Card>
      </main>
    </div>
  )
}
