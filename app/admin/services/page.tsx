'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Plus, Edit, Trash2 } from 'lucide-react'
import { services } from '@/data/services'
import type { Service } from '@/data/services'

export default function AdminServicesPage() {
  const router = useRouter()
  const [servicesList, setServicesList] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadServices()
  }, [])

  const loadServices = async () => {
    try {
      const response = await fetch('/api/admin/services')
      const data = await response.json()
      if (response.ok) {
        setServicesList(data)
      } else {
        // Fallback to default
        setServicesList(services)
      }
    } catch (error) {
      // Fallback to default
      setServicesList(services)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return

    try {
      const response = await fetch(`/api/admin/services?slug=${slug}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await loadServices()
      } else {
        alert('Failed to delete service')
      }
    } catch (error) {
      alert('Error deleting service')
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
                  Manage Services
                </h1>
                <p className="text-sm text-navy-600">Edit freight services</p>
              </div>
            </div>
            <Button href="/admin/services/new" variant="primary">
              <Plus size={16} className="mr-2" />
              Add Service
            </Button>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        {loading ? (
          <div className="text-center py-12 text-navy-600">Loading services...</div>
        ) : servicesList.length === 0 ? (
          <div className="text-center py-12 text-navy-600">
            No services found. Add your first service above.
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((service) => (
            <Card key={service.slug} className="relative overflow-hidden">
              {/* Service Image or Icon */}
              <div className="relative w-full h-40 bg-navy-50 rounded-t-lg mb-4 overflow-hidden">
                {service.image ? (
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-5xl">
                    {service.icon}
                  </div>
                )}
              </div>
              <div className="px-6 pb-6">
                <h3 className="text-xl font-semibold text-navy-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-navy-600 mb-4 line-clamp-2">
                  {service.shortDescription}
                </p>
                <div className="flex gap-2">
                  <Button
                    href={`/admin/services/${service.slug}`}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Edit size={14} className="mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600"
                    onClick={() => handleDelete(service.slug)}
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
