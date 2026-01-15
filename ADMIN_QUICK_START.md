# Admin Panel Quick Start

## Access
URL: `http://localhost:3000/admin/login`
- Username: `admin`
- Password: `admin123`

## What You Can Edit

### ✅ Services
- Go to: `/admin/services`
- Click "Edit" on any service
- Or click "Add Service" to create new
- Edit: title, description, features, benefits, icon

### ✅ Testimonials  
- Go to: `/admin/testimonials`
- Click "Add Testimonial" to create new
- Click "Edit" to modify existing
- Click trash icon to delete

### ✅ FAQs
- Go to: `/admin/faqs`
- Switch between Shippers, Carriers, General tabs
- Click "Add FAQ" to create new
- Click "Edit" to modify

### ✅ Images
- Go to: `/admin/images`
- Drag & drop or click to upload
- Images saved to `/public/uploads/`
- Copy image URL to use in content
- Click X to delete images

### ✅ Home Page Content
- Go to: `/admin/content` → Click "Home Page"
- Edit headline, subtext, CTA buttons
- Upload/select hero background image
- Changes appear on homepage immediately

## Image Usage

After uploading images:
1. Copy the image URL (e.g., `/uploads/image.jpg`)
2. Use in:
   - Hero background (Home content editor)
   - Service cards (coming soon)
   - Any content that needs images

## Troubleshooting

**404 Error?**
- Make sure you're logged in
- Check that the page exists (some edit pages need items to exist first)

**Can't see images?**
- Make sure `/public/uploads/` folder exists
- Check browser console for errors
- Verify image was uploaded successfully

**Changes not showing?**
- Refresh the page
- Clear browser cache
- Check that API routes are working
