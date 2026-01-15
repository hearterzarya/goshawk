'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Save, Loader2, Image as ImageIcon, Upload, X, Plus } from 'lucide-react'
import { FormField } from '@/components/forms/FormField'
import { TextareaField } from '@/components/forms/TextareaField'
import Image from 'next/image'

export default function EditHomeContentPage() {
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [showUpload, setShowUpload] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    headline: 'Logistics that moves your business forward',
    subtext: 'Premium freight brokerage and transportation solutions. From full truckload to cross-border shipping, we deliver reliability, transparency, and 24/7 support.',
    heroImage: '',
    ctaPrimary: 'Request a Quote',
    ctaSecondary: 'Talk to Dispatch',
  })

  useEffect(() => {
    loadImages()
    loadContent()
  }, [])

  const loadImages = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/admin/images/list')
      const data = await response.json()
      if (response.ok) {
        setImages(data.images || [])
      }
    } catch (error) {
      console.error('Failed to load images:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleFileUpload = async (file: File) => {
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
        await loadImages() // Reload images list
        // Auto-select the newly uploaded image
        if (data.url) {
          setFormData({ ...formData, heroImage: data.url })
        }
        setShowUpload(false)
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

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0])
    }
  }

  const loadContent = async () => {
    try {
      const response = await fetch('/api/admin/content/home')
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
      const response = await fetch('/api/admin/content/home', {
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
                Edit Home Page Content
              </h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
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
              rows={3}
            />

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-semibold text-navy-900">
                  Hero Background Image (optional)
                </label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowUpload(!showUpload)}
                >
                  {showUpload ? (
                    <>
                      <X size={14} className="mr-1" />
                      Cancel Upload
                    </>
                  ) : (
                    <>
                      <Plus size={14} className="mr-1" />
                      Upload New Image
                    </>
                  )}
                </Button>
              </div>

              {/* Upload Area */}
              {showUpload && (
                <div
                  className={`mb-4 border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                    dragActive
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-navy-300 bg-navy-50 hover:border-primary-400'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={(e) => {
                    // Only trigger if clicking on the container itself, not on child elements
                    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.upload-area-content')) {
                      fileInputRef.current?.click()
                    }
                  }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="hero-image-upload"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="upload-area-content pointer-events-none">
                    <Upload
                      size={32}
                      className={`mx-auto mb-2 ${
                        dragActive ? 'text-primary-600' : 'text-navy-400'
                      }`}
                    />
                    <p className="text-sm text-navy-600 mb-3">
                      Drag and drop an image here, or click to select
                    </p>
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
                        if (fileInputRef.current) {
                          fileInputRef.current.click()
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
                          Select Image
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {/* Image Grid */}
              {loading ? (
                <div className="text-center py-8 text-navy-600 text-sm">
                  Loading images...
                </div>
              ) : images.length === 0 ? (
                <div className="text-center py-8 text-navy-600 text-sm border border-navy-200 rounded-lg bg-navy-50">
                  No images uploaded yet. Click "Upload New Image" above to get started.
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    {images.map((url) => (
                      <div
                        key={url}
                        className={`relative aspect-video cursor-pointer border-2 rounded-lg overflow-hidden transition-all ${
                          formData.heroImage === url
                            ? 'border-primary-600 ring-2 ring-primary-200'
                            : 'border-navy-200 hover:border-primary-400'
                        }`}
                        onClick={() => setFormData({ ...formData, heroImage: url })}
                      >
                        <Image src={url} alt="Hero" fill className="object-cover" />
                        {formData.heroImage === url && (
                          <div className="absolute inset-0 bg-primary-600/20 flex items-center justify-center">
                            <div className="bg-primary-600 text-white rounded-full p-2">
                              <ImageIcon size={16} />
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-navy-500 mb-2">
                    Click an image above to select it, or enter a URL below
                  </div>
                </>
              )}

              <FormField
                label="Or enter image URL manually"
                value={formData.heroImage}
                onChange={(e) => setFormData({ ...formData, heroImage: e.target.value })}
                placeholder="Enter Vercel Blob URL or any image URL"
              />

              {/* Preview */}
              {formData.heroImage && (
                <div className="mt-4">
                  <label className="block text-sm font-semibold text-navy-900 mb-2">
                    Preview
                  </label>
                  <div className="relative w-full h-48 border border-navy-200 rounded-lg overflow-hidden bg-navy-50">
                    <Image
                      src={formData.heroImage}
                      alt="Hero preview"
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        const parent = target.parentElement
                        if (parent) {
                          parent.innerHTML = '<div class="flex items-center justify-center h-full text-navy-400 text-sm">Image not found</div>'
                        }
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                label="Primary CTA Text"
                value={formData.ctaPrimary}
                onChange={(e) => setFormData({ ...formData, ctaPrimary: e.target.value })}
                required
              />
              <FormField
                label="Secondary CTA Text"
                value={formData.ctaSecondary}
                onChange={(e) => setFormData({ ...formData, ctaSecondary: e.target.value })}
                required
              />
            </div>
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
