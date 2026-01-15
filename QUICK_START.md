# Quick Start - Fix Images Not Showing

## Step 1: Create Environment File

A `.env.local` file has been created for you. Open it and add your Vercel Blob token.

## Step 2: Get Your Vercel Blob Token

### Option A: If you already have a Vercel project:
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project (or create one)
3. Go to **Settings** → **Storage** → **Blob**
4. Click **"Create Database"** if needed
5. Copy the `BLOB_READ_WRITE_TOKEN` from the environment variables

### Option B: Create a new Blob store:
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Create a new project or go to existing project
3. Navigate to **Storage** tab
4. Click **"Create"** → **"Blob"**
5. Give it a name (e.g., "goshawk-images")
6. Copy the generated token

## Step 3: Add Token to .env.local

Open `.env.local` and add your token:

```env
BLOB_READ_WRITE_TOKEN=vercel_blob_xxxxxxxxxxxxx
```

## Step 4: Restart Dev Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 5: Test Image Upload

1. Go to `/admin/login`
2. Login with your admin credentials
3. Go to `/admin/images` or `/admin/content/home`
4. Try uploading an image
5. Images should now display correctly!

## Troubleshooting

### Still not working?

1. **Check if token is set:**
   - Open `.env.local`
   - Make sure `BLOB_READ_WRITE_TOKEN` has a value (not empty)

2. **Check browser console:**
   - Press F12 → Console tab
   - Look for any error messages

3. **Check server logs:**
   - Look at your terminal where `npm run dev` is running
   - Check for any error messages about the blob token

4. **Verify token format:**
   - Token should start with `vercel_blob_`
   - Should be a long string

5. **For local development without Vercel:**
   - You can temporarily use the file system by modifying the upload route
   - Or create a free Vercel account to get a blob token

## Need Help?

See `ENV_SETUP.md` for detailed instructions.
