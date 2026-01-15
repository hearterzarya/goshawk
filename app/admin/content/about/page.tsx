'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Save, Loader2, Plus, X, Upload, Image as ImageIcon } from 'lucide-react'
import { FormField } from '@/components/forms/FormField'
import { TextareaField } from '@/components/forms/TextareaField'
import Image from 'next/image'

interface Value {
  title: string
  description: string
}

export default function EditAboutContentPage() {
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [showUpload, setShowUpload] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const heroFileInputRef = useRef<HTMLInputElement>(null)
  const missionFileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    badge: 'About Goshawk',
    headline: 'Building Trust Through Excellence',
    subtext: 'Goshawk Logistics is a premium freight brokerage dedicated to delivering reliable, transparent, and efficient transportation solutions. We connect shippers with verified carriers across North America, ensuring your freight moves safely and on time.',
    heroImage: '',
    missionTitle: 'Our Mission',
    missionParagraph1: 'At Goshawk Logistics, our mission is simple: to make freight shipping seamless, reliable, and transparent. We believe that logistics shouldn\'t be complicated. By combining experienced professionals, verified carrier networks, and modern technology, we deliver solutions that move your business forward.',
    missionParagraph2: 'Whether you\'re shipping a single pallet or managing complex supply chains, we\'re here to provide the expertise, support, and reliability you need. Our commitment to excellence drives everything we do, from carrier selection to customer service.',
    missionImage: '',
    valuesTitle: 'Our Values',
    valuesSubtext: 'The principles that guide everything we do',
    ctaTitle: 'Let\'s Work Together',
    ctaText: 'Ready to experience the Goshawk difference? Get in touch with our team today.',
    values: [
      { title: 'Reliability', description: 'We build our reputation on consistent, on-time delivery and transparent communication.' },
      { title: 'Excellence', description: 'Every shipment matters. We maintain the highest standards in carrier selection and service quality.' },
      { title: 'Partnership', description: 'We view every relationship as a long-term partnership, not just a transaction.' },
      { title: 'Innovation', description: 'Leveraging technology and best practices to continuously improve our services.' },
    ] as Value[],
  })

  useEffect(() => {
    loadImages()
    loadContent()
  }, [])

  const loadImages = async () => {
    try {
      const response = await fetch('/api/admin/images/list')
      const data = await response.json()
      if (response.ok) {
        setImages(data.images || [])
      }
    } catch (error) {
      console.error('Failed to load images:', error)
    }
  }

  const handleFileUpload = async (file: File, imageType: 'heroImage' | 'missionImage') => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }

    setUploading(true)
    const formDataObj = new FormData()
    formDataObj.append('file', file)

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formDataObj,
      })

      const data = await response.json()
      if (response.ok) {
        setFormData({ ...formData, [imageType]: data.url })
        setShowUpload(null)
        alert('Image uploaded successfully!')
      } else {
        alert(data.error || 'Upload failed')
      }
    } catch (error) {
      alert('Upload failed. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent, imageType: 'heroImage' | 'missionImage') => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0], imageType)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, imageType: 'heroImage' | 'missionImage') => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0], imageType)
    }
  }

  const loadContent = async () => {
    try {
      const response = await fetch('/api/admin/content/about')
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
      const response = await fetch('/api/admin/content/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      // Check if response has content before parsing JSON
      const contentType = response.headers.get('content-type')
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text()
        throw new Error(`Invalid response: ${text || 'Empty response'}`)
      }

      const data = await response.json()

      if (response.ok) {
        alert('Content saved successfully!')
      } else {
        alert(`Failed to save content: ${data.error || 'Unknown error'}${data.details ? `\n\nDetails: ${data.details}` : ''}`)
      }
    } catch (error: any) {
      console.error('Save error:', error)
      if (error.message?.includes('JSON')) {
        alert(`Error saving content: Invalid response from server. Please check the console for details.`)
      } else {
        alert(`Error saving content: ${error?.message || 'Network error'}`)
      }
    } finally {
      setSaving(false)
    }
  }

  const updateValue = (index: number, field: keyof Value, value: string) => {
    const newValues = [...formData.values]
    newValues[index] = { ...newValues[index], [field]: value }
    setFormData({ ...formData, values: newValues })
  }

  const addValue = () => {
    setFormData({
      ...formData,
      values: [...formData.values, { title: '', description: '' }],
    })
  }

  const removeValue = (index: number) => {
    setFormData({
      ...formData,
      values: formData.values.filter((_, i) => i !== index),
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
                Edit About Page Content
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
              label="Badge Text"
              value={formData.badge}
              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
            />

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
              rows={3}
            />

            {/* Hero Image */}
            <div>
              <label className="block text-sm font-semibold text-navy-900 mb-2">
                Hero Background Image (optional)
              </label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={formData.heroImage}
                  onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                  className="flex-1 px-4 py-2 border border-navy-300 rounded-lg"
                  placeholder="Enter Vercel Blob URL or any image URL"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowUpload(showUpload === 'hero' ? null : 'hero')}
                >
                  {showUpload === 'hero' ? 'Hide' : 'Select'} Image
                </Button>
              </div>
              {showUpload === 'hero' && (
                <div
                  className={`mb-4 border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                    dragActive ? 'border-primary-500 bg-primary-50' : 'border-navy-300 bg-navy-50 hover:border-primary-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={(e) => handleDrop(e, 'heroImage')}
                  onClick={(e) => {
                    // Only trigger if clicking on the container itself, not on child elements
                    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.upload-area-content')) {
                      heroFileInputRef.current?.click()
                    }
                  }}
                >
                  <input
                    ref={heroFileInputRef}
                    type="file"
                    id="hero-image-upload"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'heroImage')}
                    className="hidden"
                  />
                  <div className="upload-area-content pointer-events-none mb-3">
                    <p className="text-sm text-navy-600">Drag and drop or select an image</p>
                  </div>
                  <div className="pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      disabled={uploading}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (heroFileInputRef.current) {
                          heroFileInputRef.current.click()
                        }
                      }}
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="mr-2 animate-spin" size={14} />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload size={14} className="mr-1" />
                          Upload Image
                        </>
                      )}
                    </Button>
                  </div>
                  {images.length > 0 && (
                    <div className="mt-4 grid grid-cols-4 gap-2 max-h-40 overflow-y-auto">
                      {images.map((url) => (
                        <button
                          key={url}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, heroImage: url })
                            setShowUpload(null)
                          }}
                          className={`relative h-16 rounded border-2 overflow-hidden ${
                            formData.heroImage === url
                              ? 'border-primary-600'
                              : 'border-navy-300 hover:border-primary-400'
                          }`}
                        >
                          <Image src={url} alt="Select" fill className="object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {formData.heroImage && (
                <div className="relative w-full h-48 border border-navy-200 rounded-lg overflow-hidden bg-navy-50">
                  <Image
                    src={formData.heroImage}
                    alt="Hero preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </Card>

          {/* Mission Section */}
          <Card>
            <h2 className="text-xl font-semibold text-navy-900 mb-4">Mission Section</h2>
            
            <FormField
              label="Mission Title"
              value={formData.missionTitle}
              onChange={(e) => setFormData({ ...formData, missionTitle: e.target.value })}
              required
            />

            <TextareaField
              label="Mission Paragraph 1"
              value={formData.missionParagraph1}
              onChange={(e) => setFormData({ ...formData, missionParagraph1: e.target.value })}
              required
              rows={3}
            />

            <TextareaField
              label="Mission Paragraph 2"
              value={formData.missionParagraph2}
              onChange={(e) => setFormData({ ...formData, missionParagraph2: e.target.value })}
              required
              rows={3}
            />

            {/* Mission Image */}
            <div>
              <label className="block text-sm font-semibold text-navy-900 mb-2">
                Mission Section Image (optional)
              </label>
              <div className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={formData.missionImage}
                  onChange={(e) => setFormData({ ...formData, missionImage: e.target.value })}
                  className="flex-1 px-4 py-2 border border-navy-300 rounded-lg"
                  placeholder="Enter Vercel Blob URL or any image URL"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowUpload(showUpload === 'mission' ? null : 'mission')}
                >
                  {showUpload === 'mission' ? 'Hide' : 'Select'} Image
                </Button>
              </div>
              {showUpload === 'mission' && (
                <div
                  className={`mb-4 border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                    dragActive ? 'border-primary-500 bg-primary-50' : 'border-navy-300 bg-navy-50 hover:border-primary-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={(e) => handleDrop(e, 'missionImage')}
                  onClick={(e) => {
                    // Only trigger if clicking on the container itself, not on child elements
                    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.upload-area-content')) {
                      missionFileInputRef.current?.click()
                    }
                  }}
                >
                  <input
                    ref={missionFileInputRef}
                    type="file"
                    id="mission-image-upload"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'missionImage')}
                    className="hidden"
                  />
                  <div className="upload-area-content pointer-events-none mb-3">
                    <p className="text-sm text-navy-600">Drag and drop or select an image</p>
                  </div>
                  <div className="pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      disabled={uploading}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (missionFileInputRef.current) {
                          missionFileInputRef.current.click()
                        }
                      }}
                    >
                      {uploading ? (
                        <>
                          <Loader2 className="mr-2 animate-spin" size={14} />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload size={14} className="mr-1" />
                          Upload Image
                        </>
                      )}
                    </Button>
                  </div>
                  {images.length > 0 && (
                    <div className="mt-4 grid grid-cols-4 gap-2 max-h-40 overflow-y-auto">
                      {images.map((url) => (
                        <button
                          key={url}
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, missionImage: url })
                            setShowUpload(null)
                          }}
                          className={`relative h-16 rounded border-2 overflow-hidden ${
                            formData.missionImage === url
                              ? 'border-primary-600'
                              : 'border-navy-300 hover:border-primary-400'
                          }`}
                        >
                          <Image src={url} alt="Select" fill className="object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {formData.missionImage && (
                <div className="relative w-full h-48 border border-navy-200 rounded-lg overflow-hidden bg-navy-50">
                  <Image
                    src={formData.missionImage}
                    alt="Mission preview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </Card>

          {/* Values Section */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-navy-900">Values Section</h2>
              <Button type="button" variant="outline" size="sm" onClick={addValue}>
                <Plus size={14} className="mr-1" />
                Add Value
              </Button>
            </div>

            <FormField
              label="Values Title"
              value={formData.valuesTitle}
              onChange={(e) => setFormData({ ...formData, valuesTitle: e.target.value })}
              className="mb-4"
            />

            <FormField
              label="Values Subtext"
              value={formData.valuesSubtext}
              onChange={(e) => setFormData({ ...formData, valuesSubtext: e.target.value })}
              className="mb-6"
            />

            <div className="space-y-4">
              {formData.values.map((value, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-semibold text-navy-900">Value {index + 1}</h3>
                    {formData.values.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeValue(index)}
                        className="text-red-600"
                      >
                        <X size={14} />
                      </Button>
                    )}
                  </div>
                  <FormField
                    label="Title"
                    value={value.title}
                    onChange={(e) => updateValue(index, 'title', e.target.value)}
                    className="mb-3"
                  />
                  <TextareaField
                    label="Description"
                    value={value.description}
                    onChange={(e) => updateValue(index, 'description', e.target.value)}
                    rows={2}
                  />
                </Card>
              ))}
            </div>
          </Card>

          {/* CTA Section */}
          <Card>
            <h2 className="text-xl font-semibold text-navy-900 mb-4">CTA Section</h2>
            
            <FormField
              label="CTA Title"
              value={formData.ctaTitle}
              onChange={(e) => setFormData({ ...formData, ctaTitle: e.target.value })}
            />

            <TextareaField
              label="CTA Text"
              value={formData.ctaText}
              onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
              rows={2}
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
