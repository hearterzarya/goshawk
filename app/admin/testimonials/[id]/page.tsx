'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Save, Loader2, Star } from 'lucide-react'
import { FormField } from '@/components/forms/FormField'
import { TextareaField } from '@/components/forms/TextareaField'
import type { Testimonial } from '@/data/testimonials'

export default function EditTestimonialPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<Testimonial>({
    id: '',
    name: '',
    role: '',
    company: '',
    content: '',
    rating: 5,
  })

  useEffect(() => {
    loadTestimonial()
  }, [id])

  const loadTestimonial = async () => {
    try {
      const response = await fetch('/api/admin/testimonials')
      const data = await response.json()
      if (response.ok) {
        const testimonial = data.find((t: Testimonial) => t.id === id)
        if (testimonial) {
          setFormData(testimonial)
        }
      }
    } catch (error) {
      console.error('Failed to load testimonial:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch('/api/admin/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/testimonials')
      } else {
        alert('Failed to save testimonial')
      }
    } catch (error) {
      alert('Error saving testimonial')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-navy-50 flex items-center justify-center">
        <div className="text-navy-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-navy-50">
      <header className="bg-white border-b border-navy-200">
        <div className="container-custom py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/testimonials">
              <Button variant="ghost" size="sm">
                <ArrowLeft size={16} className="mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-display font-bold text-navy-900">
                Edit Testimonial
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FormField
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />

            <FormField
              label="Role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
            />

            <FormField
              label="Company"
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              required
            />

            <TextareaField
              label="Testimonial Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
              rows={5}
            />

            <div>
              <label className="block text-sm font-semibold text-navy-900 mb-2">
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating })}
                    className={`p-2 rounded ${
                      formData.rating >= rating
                        ? 'text-yellow-400'
                        : 'text-navy-300'
                    }`}
                  >
                    <Star
                      size={24}
                      className={formData.rating >= rating ? 'fill-current' : ''}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" variant="primary" size="lg" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={20} />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save size={20} className="mr-2" />
                    Save Testimonial
                  </>
                )}
              </Button>
              <Link href="/admin/testimonials">
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
