# Admin Panel Documentation

## Overview

The admin panel allows you to manage website content, images, services, testimonials, and FAQs without editing code.

## Access

Navigate to: `http://localhost:3000/admin/login`

**Default Credentials:**
- Username: `admin`
- Password: `admin123`

⚠️ **IMPORTANT:** Change these credentials in production by setting environment variables:
- `ADMIN_USERNAME` - Your admin username
- `ADMIN_PASSWORD` - Your admin password

## Features

### 1. Dashboard
- Central hub for all admin functions
- Quick access to all content management sections

### 2. Services Management
- View all freight services
- Add new services
- Edit existing services
- Delete services

### 3. Testimonials Management
- Manage customer testimonials
- Add/edit/delete testimonials
- Control rating display

### 4. FAQs Management
- Organize FAQs by category (Shippers, Carriers, General)
- Add/edit/delete questions
- Categorize questions

### 5. Image Manager
- Upload images via drag-and-drop or file picker
- View all uploaded images
- Copy image URLs
- Delete images
- Images are stored in **Vercel Blob Storage** (cloud storage)

### 6. Content Management
- Edit page content (Home, About, Contact)
- Update text and descriptions

## Image Upload

1. Go to **Images** section
2. Drag and drop an image or click to select
3. Supported formats: JPG, PNG, GIF, WebP, AVIF
4. Max file size: 5MB
5. Images are uploaded to **Vercel Blob Storage**
6. Copy the full URL (e.g., `https://*.public.blob.vercel-storage.com/...`) to use in content
7. Images are automatically optimized and served via CDN

## Security Notes

- Current authentication uses simple session cookies
- For production, consider:
  - Using NextAuth.js for proper authentication
  - Implementing role-based access control
  - Adding rate limiting
  - Using secure, httpOnly cookies
  - Adding CSRF protection
  - Implementing proper password hashing

## File Structure

```
app/admin/
  ├── login/          # Login page
  ├── dashboard/      # Main dashboard
  ├── services/       # Services management
  ├── testimonials/   # Testimonials management
  ├── faqs/          # FAQs management
  ├── images/        # Image upload manager
  └── content/       # Page content editor

app/api/admin/
  ├── login/         # Login endpoint
  ├── logout/        # Logout endpoint
  ├── check-auth/    # Authentication check
  └── upload/        # Image upload endpoint
```

## Future Enhancements

- Database integration for persistent storage
- Rich text editor for content
- Bulk operations
- Image optimization
- Analytics dashboard
- User management
- Activity logs
