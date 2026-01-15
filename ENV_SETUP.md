# Environment Variables Setup

## Required Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```env
# Admin Panel Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Vercel Blob Storage Token (REQUIRED for image uploads)
# Get this from: Vercel Dashboard → Your Project → Settings → Storage → Blob
BLOB_READ_WRITE_TOKEN=your_blob_token_here

# Base URL (Optional - for local development)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## How to Get BLOB_READ_WRITE_TOKEN

### For Local Development:
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Create a new project or select existing project
3. Go to **Settings** → **Storage** → **Blob**
4. Click **"Create Database"** (if not already created)
5. Copy the `BLOB_READ_WRITE_TOKEN` from the environment variables section
6. Add it to your `.env.local` file

### For Production (Vercel):
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add `BLOB_READ_WRITE_TOKEN` (it may be auto-added when you enable Blob Storage)
4. The token will be automatically available to your deployed app

## Quick Setup Steps

1. **Create `.env.local` file** in the project root:
   ```bash
   touch .env.local
   ```

2. **Add the variables** (copy the template above)

3. **Get your Blob token** from Vercel (see instructions above)

4. **Restart your dev server**:
   ```bash
   npm run dev
   ```

## Troubleshooting

### Images Not Showing

1. **Check if BLOB_READ_WRITE_TOKEN is set**:
   - Make sure `.env.local` exists
   - Verify the token is correct
   - Restart the dev server after adding variables

2. **Check browser console** for errors:
   - Open DevTools (F12)
   - Check Console tab for image loading errors
   - Check Network tab to see if image requests are failing

3. **Verify Vercel Blob is enabled**:
   - Go to Vercel Dashboard
   - Check if Blob Storage is created
   - Ensure the token has read/write permissions

4. **Check image URLs**:
   - Images from Vercel Blob should have URLs like: `https://*.public.blob.vercel-storage.com/...`
   - Make sure `next.config.js` has the blob domain configured (already done)

### Common Issues

- **"Unauthorized" errors**: Check if `BLOB_READ_WRITE_TOKEN` is set correctly
- **Images upload but don't display**: Check browser console for CORS or domain issues
- **"Upload failed"**: Verify the token has write permissions

## Security Notes

⚠️ **Never commit `.env.local` to Git!** It's already in `.gitignore`

- Keep your `ADMIN_PASSWORD` secure
- Don't share your `BLOB_READ_WRITE_TOKEN` publicly
- Use different credentials for production
