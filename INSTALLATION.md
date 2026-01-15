# Installation & Setup Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Verify GSAP installation:**
   ```bash
   npm list gsap
   ```
   Should show: `gsap@3.14.2` or similar

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Open browser:**
   Navigate to `http://localhost:3000`

## Troubleshooting Animations

If animations are not working:

1. **Check browser console** for any errors
2. **Verify GSAP is installed:**
   ```bash
   npm list gsap
   ```
3. **Reinstall dependencies if needed:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```
4. **Check that you're viewing in a browser** (not SSR preview)
5. **Disable browser extensions** that might block scripts
6. **Check browser console** for "GSAP is not loaded" errors

## Required Packages

- `gsap@^3.14.2` - Animation library
- `next@^14.2.0` - React framework
- `react@^18.3.0` - React library
- `react-dom@^18.3.0` - React DOM
- `tailwindcss@^3.4.0` - CSS framework
- `typescript@^5.3.0` - TypeScript

All packages should be installed automatically with `npm install`.
