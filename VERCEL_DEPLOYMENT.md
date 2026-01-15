# Vercel Deployment Notes

## Image Storage Issue

**Important**: Images uploaded to `/public/uploads/` will NOT persist on Vercel because it's a serverless environment. Each deployment creates a fresh file system.

### Solutions:

1. **Use External Image Storage (Recommended)**
   - Upload images to services like:
     - Cloudinary
     - AWS S3
     - Cloudflare Images
     - Imgur
     - Or any CDN
   - Update image URLs in admin panel to use external URLs

2. **Use Vercel Blob Storage**
   - Install `@vercel/blob`
   - Update upload API to use Vercel Blob
   - Images will persist across deployments

3. **Commit Images to Git (Not Recommended)**
   - Add images to `/public/uploads/` and commit to git
   - This increases repository size
   - Images will be included in deployments

## Current Configuration

- Images from `/uploads/` are served as static files
- Next.js Image component is configured with `unoptimized` for local uploads
- SafeImage component handles errors gracefully

## Recommended: Use Cloudinary

1. Sign up at https://cloudinary.com
2. Get your upload preset and cloud name
3. Update `/app/api/admin/upload/route.ts` to upload to Cloudinary
4. Store Cloudinary URLs in your content JSON files

## Testing Locally

Images should work fine locally. The issue only occurs on Vercel deployments where the file system is ephemeral.
