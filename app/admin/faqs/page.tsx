'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Plus, Edit, Trash2 } from 'lucide-react'
import { shipperFAQs, carrierFAQs, generalFAQs } from '@/data/faqs'
import type { FAQ } from '@/data/faqs'

export default function AdminFAQsPage() {
  const [activeTab, setActiveTab] = useState<'shippers' | 'carriers' | 'general'>('shippers')
  
  const faqsByCategory = {
    shippers: shipperFAQs,
    carriers: carrierFAQs,
    general: generalFAQs,
  }

  const currentFAQs = faqsByCategory[activeTab]

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
                  Manage FAQs
                </h1>
                <p className="text-sm text-navy-600">Edit frequently asked questions</p>
              </div>
            </div>
            <Button href="/admin/faqs/new" variant="primary">
              <Plus size={16} className="mr-2" />
              Add FAQ
            </Button>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['shippers', 'carriers', 'general'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg font-semibold capitalize transition-colors ${
                activeTab === tab
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-navy-700 hover:bg-navy-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* FAQs List */}
        <div className="space-y-4">
          {currentFAQs.map((faq, index) => (
            <Card key={index}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-navy-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-navy-600 text-sm">{faq.answer}</p>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button variant="outline" size="sm">
                    <Edit size={14} className="mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600">
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
