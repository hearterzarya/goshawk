'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  FileText,
  Image as ImageIcon,
  Users,
  MessageSquare,
  Settings,
  LogOut,
  Package,
} from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    try {
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setLoading(false)
    }
  }

  const menuItems = [
    {
      title: 'Services',
      description: 'Manage freight services',
      icon: Package,
      href: '/admin/services',
      color: 'bg-primary-100 text-primary-600',
    },
    {
      title: 'Testimonials',
      description: 'Manage customer testimonials',
      icon: Users,
      href: '/admin/testimonials',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'FAQs',
      description: 'Manage frequently asked questions',
      icon: MessageSquare,
      href: '/admin/faqs',
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Images',
      description: 'Upload and manage images',
      icon: ImageIcon,
      href: '/admin/images',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Content',
      description: 'Edit page content',
      icon: FileText,
      href: '/admin/content',
      color: 'bg-orange-100 text-orange-600',
    },
  ]

  return (
    <div className="min-h-screen bg-navy-50">
      {/* Header */}
      <header className="bg-white border-b border-navy-200">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-display font-bold text-navy-900">
                Admin Dashboard
              </h1>
              <p className="text-sm text-navy-600">Goshawk Logistics</p>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-sm text-navy-600 hover:text-primary-600"
              >
                View Website
              </Link>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                disabled={loading}
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-custom py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-display font-bold text-navy-900 mb-2">
            Content Management
          </h2>
          <p className="text-navy-600">
            Manage your website content, images, and settings
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}>
                <Card hover className="h-full">
                  <div className="flex items-start gap-4">
                    <div
                      className={`${item.color} p-3 rounded-lg flex-shrink-0`}
                    >
                      <Icon size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-navy-900 mb-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-navy-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}
