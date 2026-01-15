'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, FileText, Edit } from 'lucide-react'

const contentPages = [
  { title: 'Home Page', description: 'Edit hero section and homepage content', href: '/admin/content/home' },
  { title: 'About Page', description: 'Edit company information and mission', href: '/admin/content/about' },
  { title: 'Contact Page', description: 'Edit contact information and form', href: '/admin/content/contact' },
]

export default function AdminContentPage() {
  return (
    <div className="min-h-screen bg-navy-50">
      <header className="bg-white border-b border-navy-200">
        <div className="container-custom py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft size={16} className="mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-display font-bold text-navy-900">
                Content Management
              </h1>
              <p className="text-sm text-navy-600">Edit page content</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contentPages.map((page) => (
            <Link key={page.href} href={page.href}>
              <Card hover className="h-full">
                <div className="flex items-start gap-4">
                  <div className="bg-primary-100 text-primary-600 p-3 rounded-lg flex-shrink-0">
                    <FileText size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-navy-900 mb-1">
                      {page.title}
                    </h3>
                    <p className="text-sm text-navy-600 mb-4">
                      {page.description}
                    </p>
                    <Button variant="outline" size="sm">
                      <Edit size={14} className="mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
