# 🎨 Quick Logo Setup for WildCAT

**Status**: Configuration files updated ✅
**What's left**: Save your logo image files

---

## 🚀 Quick Steps (5 Minutes)

### Step 1: Save Your Logo Image

Your wildcat logo image needs to be saved as:

```
/Users/beauxwalton/WildCAT/public/images/wildcat-logo.png
```

**How to save**:
1. Right-click the logo image from our conversation
2. Save As... → `wildcat-logo.png`
3. Move it to: `/Users/beauxwalton/WildCAT/public/images/`

### Step 2: Generate Icon Sizes

**Option A: Online (Easiest - 2 minutes)**

1. Go to: https://www.pwabuilder.com/imageGenerator
2. Upload your `wildcat-logo.png`
3. Click "Generate"
4. Download the ZIP file
5. Extract and copy these files to `/Users/beauxwalton/WildCAT/public/`:
   - `pwa-192x192.png`
   - `pwa-512x512.png`
   - `apple-touch-icon.png` (180x180)

6. For favicon, go to: https://realfavicongenerator.net/
   - Upload logo
   - Generate and download
   - Copy `favicon.ico` and `favicon.png` to `/public/`

**Option B: Using macOS Preview (Manual - 5 minutes)**

```bash
# Open Terminal and run these commands:

cd /Users/beauxwalton/WildCAT/public

# Place your original logo in public/ first as wildcat-original.png
# Then use Preview to resize:

# 1. Open wildcat-original.png in Preview
# 2. Tools → Adjust Size
# 3. Set to 192x192, export as pwa-192x192.png
# 4. Repeat for 512x512 → pwa-512x512.png
# 5. Repeat for 180x180 → apple-touch-icon.png
# 6. Repeat for 32x32 → favicon.png
```

### Step 3: Verify Files

Check that you have these files:

```bash
cd /Users/beauxwalton/WildCAT/public
ls -la *.png *.ico
```

**Expected output**:
```
pwa-192x192.png         (should be ~20-30 KB)
pwa-512x512.png         (should be ~40-60 KB)
apple-touch-icon.png    (should be ~15-25 KB)
favicon.png             (should be ~3-5 KB)
favicon.ico             (should be ~5-10 KB)
```

### Step 4: Rebuild and Test

```bash
cd /Users/beauxwalton/WildCAT

# Clean old build
rm -rf dist/

# Rebuild with new icons
npm run build

# Start preview server
npm run preview
```

**Opens at**: http://localhost:4173

**Check**:
- Browser tab shows wildcat icon (not Vite logo)
- Click install button → see wildcat icon in install dialog
- Install app → desktop icon should be wildcat

---

## ✅ What I've Already Done

### 1. Updated Configuration Files

- ✅ **index.html** - Updated favicon links and theme color
- ✅ **vite.config.js** - PWA manifest with your brand colors
- ✅ **tailwind.config.js** - Added WildCAT color palette (READY TO APPLY)
- ✅ **package.json** - Updated description

### 2. Set Brand Colors

Your logo colors are now available in Tailwind:

```jsx
// Orange from wildcat fur
className="bg-wildcat-orange"     // #D4823C

// Sage green from background
className="bg-wildcat-green"      // #9DB99A

// Cream from outer background
className="bg-wildcat-cream"      // #E8DCC8

// Brown from outlines
className="text-wildcat-brown"    // #3A2516

// Dark green from laptop
className="border-wildcat-dark-green"  // #5A7159
```

### 3. Updated PWA Manifest

Theme colors now match your logo:
- **Theme color**: `#9DB99A` (sage green)
- **Background**: `#E8DCC8` (cream)

### 4. Created Documentation

- ✅ **LOGO_INTEGRATION_GUIDE.md** - Complete step-by-step guide
- ✅ **BRANDING_ASSETS.md** - Full brand guidelines
- ✅ **This file** - Quick reference

---

## 🎨 Optional: Add Logo to App Header

Want the wildcat to appear in your app? Add this:

```jsx
// Edit: /Users/beauxwalton/WildCAT/src/components/CSVColumnReorderer.jsx
// Find line ~181 (the h1 tag) and replace with:

<h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
  <img
    src="/images/wildcat-logo.png"
    alt="WildCAT Logo"
    className="w-12 h-12 object-contain"
  />
  CSV Column Reorderer
</h1>
```

---

## 🐛 Troubleshooting

### "Icons not showing after build"

1. **Check files exist**:
   ```bash
   ls -la /Users/beauxwalton/WildCAT/public/*.png
   ```

2. **Verify names match exactly** (case-sensitive):
   - `pwa-192x192.png` (not PWA-192x192.PNG)
   - `pwa-512x512.png`
   - `apple-touch-icon.png`
   - `favicon.png`

3. **Rebuild**:
   ```bash
   rm -rf dist/
   npm run build
   ```

### "Browser still shows Vite logo"

1. **Hard refresh**: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
2. **Clear cache**: DevTools (F12) → Application → Clear Storage
3. **Unregister service worker**: Application → Service Workers → Unregister

### "Icons look blurry"

- Ensure your original logo is high resolution (1024x1024 minimum)
- Use PNG format (not JPEG)
- Don't scale up from a small image

---

## 📋 Final Checklist

- [ ] Save `wildcat-logo.png` to `/public/images/`
- [ ] Generate `pwa-192x192.png` → save to `/public/`
- [ ] Generate `pwa-512x512.png` → save to `/public/`
- [ ] Generate `apple-touch-icon.png` → save to `/public/`
- [ ] Generate `favicon.png` → save to `/public/`
- [ ] Generate `favicon.ico` → save to `/public/`
- [ ] Run `npm run build`
- [ ] Run `npm run preview`
- [ ] Check browser tab for wildcat icon
- [ ] Test PWA install (click install icon in address bar)
- [ ] Verify desktop icon shows wildcat
- [ ] (Optional) Add logo to app header

---

## 🚀 After Setup

Once icons are in place, you're ready to deploy!

**Deploy to Vercel**:
```bash
npm i -g vercel
vercel --prod
```

**Deploy to Netlify**:
```bash
npm run build
# Drag dist/ to netlify.com/drop
```

---

## 📞 Need Help?

1. **Detailed guide**: See `/docs/LOGO_INTEGRATION_GUIDE.md`
2. **Brand assets**: See `/docs/BRANDING_ASSETS.md`
3. **Can't generate icons?** Use https://www.pwabuilder.com/imageGenerator
4. **Still stuck?** Just ask!

---

**TL;DR**: Save your logo to `/public/images/`, generate PWA icons using https://www.pwabuilder.com/imageGenerator, save them to `/public/`, then run `npm run build`.

**Time needed**: 5-10 minutes ⏱️
