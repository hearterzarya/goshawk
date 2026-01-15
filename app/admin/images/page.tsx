'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ArrowLeft, Upload, X } from 'lucide-react'
import Image from 'next/image'

export default function AdminImagesPage() {
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadImages()
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
    } finally {
      setLoading(false)
    }
  }

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file')
      return
    }

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (response.ok) {
        await loadImages() // Reload images list
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
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

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
                Image Manager
              </h1>
              <p className="text-sm text-navy-600">Upload and manage images</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container-custom py-8">
        {/* Upload Area */}
        <Card className="mb-8">
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
              dragActive
                ? 'border-primary-500 bg-primary-50'
                : 'border-navy-300 bg-navy-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload
              size={48}
              className={`mx-auto mb-4 ${
                dragActive ? 'text-primary-600' : 'text-navy-400'
              }`}
            />
            <h3 className="text-lg font-semibold text-navy-900 mb-2">
              Upload Images
            </h3>
            <p className="text-navy-600 mb-4">
              Drag and drop an image here, or click to select
            </p>
            <input
              type="file"
              id="file-upload"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Button
                variant="primary"
                disabled={uploading}
                onClick={(e) => e.preventDefault()}
              >
                {uploading ? 'Uploading...' : 'Select Image'}
              </Button>
            </label>
          </div>
        </Card>

        {/* Image Gallery */}
        <div>
          <h2 className="text-xl font-semibold text-navy-900 mb-4">
            Uploaded Images ({images.length})
          </h2>
          {loading ? (
            <div className="text-center py-12 text-navy-600">Loading images...</div>
          ) : images.length === 0 ? (
            <div className="text-center py-12 text-navy-600">
              No images uploaded yet. Upload your first image above.
            </div>
          ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {images.map((url, index) => (
              <Card key={index} className="relative group">
                <div className="aspect-square relative">
                  <Image
                    src={url}
                    alt={`Uploaded ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <button
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={async () => {
                    try {
                      const response = await fetch(`/api/admin/images/delete?url=${encodeURIComponent(url)}`, {
                        method: 'DELETE',
                      })
                      if (response.ok) {
                        await loadImages()
                      } else {
                        alert('Failed to delete image')
                      }
                    } catch (error) {
                      alert('Error deleting image')
                    }
                  }}
                >
                  <X size={16} />
                </button>
                <div className="mt-2">
                  <input
                    type="text"
                    value={url}
                    readOnly
                    className="w-full text-xs text-navy-600 bg-navy-50 px-2 py-1 rounded"
                    onClick={(e) => (e.target as HTMLInputElement).select()}
                  />
                </div>
              </Card>
            ))}
          </div>
          )}
        </div>
      </main>
    </div>
  )
}
