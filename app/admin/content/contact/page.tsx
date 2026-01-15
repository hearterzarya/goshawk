'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Save, Loader2, Plus, X } from 'lucide-react'
import { FormField } from '@/components/forms/FormField'
import { TextareaField } from '@/components/forms/TextareaField'

interface ContactInfo {
  label: string
  value: string
  href: string | null
}

export default function EditContactContentPage() {
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    headline: 'Get In Touch',
    subtext: 'Have questions? Need a quote? Our team is here to help. Reach out anytime.',
    formTitle: 'Send Us a Message',
    contactInfo: [
      { label: 'Phone', value: '(800) 555-1234', href: 'tel:+18005551234' },
      { label: 'Email', value: 'info@goshawklogistics.com', href: 'mailto:info@goshawklogistics.com' },
      { label: 'Coverage', value: 'Nationwide (USA, Canada, Mexico)', href: null },
      { label: 'Support', value: '24/7 Dispatch & Tracking', href: null },
    ] as ContactInfo[],
  })

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      const response = await fetch('/api/admin/content/contact')
      if (response.ok) {
        const data = await response.json()
        if (data) {
          setFormData(data)
        }
      }
    } catch (error) {
      console.error('Failed to load content:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch('/api/admin/content/contact', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert('Content saved successfully!')
      } else {
        const data = await response.json()
        alert(`Failed to save content: ${data.error || 'Unknown error'}${data.details ? `\n\nDetails: ${data.details}` : ''}`)
      }
    } catch (error: any) {
      alert(`Error saving content: ${error?.message || 'Network error'}`)
    } finally {
      setSaving(false)
    }
  }

  const updateContactInfo = (index: number, field: keyof ContactInfo, value: string | null) => {
    const newInfo = [...formData.contactInfo]
    newInfo[index] = { ...newInfo[index], [field]: value }
    setFormData({ ...formData, contactInfo: newInfo })
  }

  const addContactInfo = () => {
    setFormData({
      ...formData,
      contactInfo: [...formData.contactInfo, { label: '', value: '', href: null }],
    })
  }

  const removeContactInfo = (index: number) => {
    setFormData({
      ...formData,
      contactInfo: formData.contactInfo.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="min-h-screen bg-navy-50">
      <header className="bg-white border-b border-navy-200">
        <div className="container-custom py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/content">
              <Button variant="ghost" size="sm">
                <ArrowLeft size={16} className="mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-display font-bold text-navy-900">
                Edit Contact Page Content
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hero Section */}
          <Card>
            <h2 className="text-xl font-semibold text-navy-900 mb-4">Hero Section</h2>
            
            <FormField
              label="Headline"
              value={formData.headline}
              onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              required
            />

            <TextareaField
              label="Subtext"
              value={formData.subtext}
              onChange={(e) => setFormData({ ...formData, subtext: e.target.value })}
              required
              rows={2}
            />
          </Card>

          {/* Contact Information */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-navy-900">Contact Information</h2>
              <Button type="button" variant="outline" size="sm" onClick={addContactInfo}>
                <Plus size={14} className="mr-1" />
                Add Contact Info
              </Button>
            </div>

            <div className="space-y-4">
              {formData.contactInfo.map((info, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-navy-900">Contact {index + 1}</h3>
                    {formData.contactInfo.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeContactInfo(index)}
                        className="text-red-600"
                      >
                        <X size={14} />
                      </Button>
                    )}
                  </div>
                  <FormField
                    label="Label"
                    value={info.label}
                    onChange={(e) => updateContactInfo(index, 'label', e.target.value)}
                    className="mb-3"
                    placeholder="e.g., Phone, Email, Address"
                  />
                  <FormField
                    label="Value"
                    value={info.value}
                    onChange={(e) => updateContactInfo(index, 'value', e.target.value)}
                    className="mb-3"
                    placeholder="e.g., (800) 555-1234"
                  />
                  <FormField
                    label="Link (optional - leave empty for non-clickable)"
                    value={info.href || ''}
                    onChange={(e) => updateContactInfo(index, 'href', e.target.value || null)}
                    placeholder="e.g., tel:+18005551234 or mailto:info@example.com"
                  />
                  <p className="text-xs text-navy-500 mt-1">
                    For phone: tel:+1234567890 | For email: mailto:email@example.com | Leave empty for text only
                  </p>
                </Card>
              ))}
            </div>
          </Card>

          {/* Form Section */}
          <Card>
            <h2 className="text-xl font-semibold text-navy-900 mb-4">Contact Form Section</h2>
            
            <FormField
              label="Form Title"
              value={formData.formTitle}
              onChange={(e) => setFormData({ ...formData, formTitle: e.target.value })}
              required
            />
          </Card>

          <div className="flex gap-4">
            <Button type="submit" variant="primary" size="lg" disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 animate-spin" size={20} />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={20} className="mr-2" />
                  Save Changes
                </>
              )}
            </Button>
            <Link href="/admin/content">
              <Button type="button" variant="outline" size="lg">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </main>
    </div>
  )
}
