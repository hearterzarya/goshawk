'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Plus, Edit, Trash2, Star } from 'lucide-react'
import type { Testimonial } from '@/data/testimonials'

export default function AdminTestimonialsPage() {
  const router = useRouter()
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadTestimonials()
  }, [])

  const loadTestimonials = async () => {
    try {
      const response = await fetch('/api/admin/testimonials')
      const data = await response.json()
      if (response.ok) {
        setTestimonialsList(data)
      }
    } catch (error) {
      console.error('Failed to load testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return

    try {
      const response = await fetch(`/api/admin/testimonials?id=${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await loadTestimonials()
      } else {
        alert('Failed to delete testimonial')
      }
    } catch (error) {
      alert('Error deleting testimonial')
    }
  }

  return (
    <div className="min-h-screen bg-navy-50">
      <header className="bg-white border-b border-navy-200">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft size={16} className="mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-display font-bold text-navy-900">
                  Manage Testimonials
                </h1>
                <p className="text-sm text-navy-600">Edit customer testimonials</p>
              </div>
            </div>
            <Button href="/admin/testimonials/new" variant="primary">
              <Plus size={16} className="mr-2" />
              Add Testimonial
            </Button>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        {loading ? (
          <div className="text-center py-12 text-navy-600">Loading...</div>
        ) : testimonialsList.length === 0 ? (
          <div className="text-center py-12 text-navy-600">
            No testimonials yet. Add your first one above.
          </div>
        ) : (
        <div className="space-y-4">
          {testimonialsList.map((testimonial) => (
            <Card key={testimonial.id}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-navy-700 mb-3 line-clamp-2">
                    "{testimonial.content}"
                  </p>
                  <div className="text-sm">
                    <span className="font-semibold text-navy-900">
                      {testimonial.name}
                    </span>
                    <span className="text-navy-600">
                      {' '}— {testimonial.role}, {testimonial.company}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    href={`/admin/testimonials/${testimonial.id}`}
                    variant="outline"
                    size="sm"
                  >
                    <Edit size={14} className="mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600"
                    onClick={() => handleDelete(testimonial.id)}
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
        )}
      </main>
    </div>
  )
}
