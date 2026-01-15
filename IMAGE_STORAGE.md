# Image Storage System

## Hybrid Storage - Works Both Locally and on Vercel

The website now uses a **hybrid image storage system** that automatically works in both environments:

### 🏠 Local Development (No Vercel Blob Token)
- Images are saved to `/public/uploads/` directory
- URLs are local paths like `/uploads/filename.jpg`
- Works without any cloud storage setup
- Perfect for development and testing

### ☁️ Production (With Vercel Blob Token)
- Images are saved to Vercel Blob Storage
- URLs are full HTTPS URLs like `https://*.public.blob.vercel-storage.com/...`
- Automatic fallback to local storage if Blob fails
- Persistent storage that survives deployments

## How It Works

The system automatically detects which storage to use:

1. **Checks for `BLOB_READ_WRITE_TOKEN`** in environment variables
2. **If token exists**: Uses Vercel Blob Storage
3. **If token missing**: Uses local file system
4. **If Blob fails**: Automatically falls back to local storage

## Setup

### Local Development
No setup needed! Just start developing:
```bash
npm run dev
```
Images will be saved to `/public/uploads/`

### Production (Vercel)
1. Go to Vercel Dashboard → Your Project → Settings → Storage
2. Create a Blob store
3. Copy the `BLOB_READ_WRITE_TOKEN`
4. Add it to Vercel environment variables
5. Deploy!

The system will automatically use Blob storage in production.

## Image URLs

Both types of URLs work seamlessly:

- **Local**: `/uploads/image.jpg` 
- **Vercel Blob**: `https://*.public.blob.vercel-storage.com/uploads/...`
- **External**: Any full HTTPS URL

The system handles all three types automatically!

## Features

✅ Automatic storage detection  
✅ Seamless fallback if Blob fails  
✅ Works in both development and production  
✅ No code changes needed when switching environments  
✅ Supports both local and cloud images simultaneously  

## Troubleshooting

### Images not uploading locally?
- Check that `/public/uploads/` directory exists
- Verify file permissions
- Check browser console for errors

### Images not uploading on Vercel?
- Verify `BLOB_READ_WRITE_TOKEN` is set in Vercel environment variables
- Check Vercel function logs
- System will automatically fallback to local storage if Blob fails

### Mixed storage types?
- You can use both local and Blob images at the same time
- The system handles both URL types automatically
- No migration needed - existing local images continue to work
