# WildCAT Logo Integration Guide

## 🎨 Your Logo

The WildCAT logo features:
- **Character**: Friendly wildcat/lynx with spots
- **Prop**: Holding a laptop displaying a spreadsheet grid
- **Colors**:
  - Orange/brown cat (#D4823C approximate)
  - Sage green background circle (#9DB99A approximate)
  - Beige/cream outer background (#E8DCC8 approximate)
- **Style**: Retro cartoon illustration with bold outlines
- **Theme**: Perfect match for CSV/spreadsheet tool!

## 📁 Step 1: Save Your Logo Files

### Required Files

Save the logo image you provided in these locations:

1. **Original Logo** (for documentation and reference):
   ```
   /public/images/wildcat-logo.png
   ```
   - Save the full square image as-is
   - Recommended size: 1024x1024px or larger

2. **Favicon** (browser tab icon):
   ```
   /public/favicon.ico
   /public/favicon.png (32x32px)
   ```

3. **PWA Icons** (for app installation):
   ```
   /public/pwa-192x192.png (192x192px)
   /public/pwa-512x512.png (512x512px)
   /public/apple-touch-icon.png (180x180px)
   ```

## 🛠️ Step 2: Generate Icon Sizes

### Option A: Online Tool (Easiest)

**1. PWA Asset Generator**
- Visit: https://www.pwabuilder.com/imageGenerator
- Upload your logo image
- Download all generated sizes
- Copy to `/public/` folder

**2. Favicon Generator**
- Visit: https://realfavicongenerator.net/
- Upload your logo
- Generate all formats
- Download and extract to `/public/`

**3. Simple Image Resize**
- Visit: https://www.iloveimg.com/resize-image
- Upload logo
- Resize to each required dimension
- Save with correct filenames

### Option B: Using ImageMagick (Command Line)

If you have ImageMagick installed:

```bash
cd /Users/beauxwalton/WildCAT/public

# Convert your original logo to different sizes
# (assuming you saved it as wildcat-logo-original.png)

# PWA Icons
convert wildcat-logo-original.png -resize 192x192 pwa-192x192.png
convert wildcat-logo-original.png -resize 512x512 pwa-512x512.png
convert wildcat-logo-original.png -resize 180x180 apple-touch-icon.png

# Favicon
convert wildcat-logo-original.png -resize 32x32 favicon.png
convert wildcat-logo-original.png -resize 16x16 favicon-16x16.png
convert wildcat-logo-original.png -resize 32x32 -background none -flatten favicon.ico
```

### Option C: Manual Resize (Photoshop, GIMP, Preview on Mac)

**Using macOS Preview:**
1. Open logo in Preview
2. Tools → Adjust Size
3. Set width/height to desired size (maintain aspect ratio)
4. Export as PNG with correct filename
5. Repeat for each size

**Using Photoshop:**
1. Open logo
2. Image → Image Size
3. Set to 192x192px (check "Constrain Proportions")
4. File → Export → Export As → PNG
5. Save as `pwa-192x192.png`
6. Repeat for other sizes

## 📋 Required Sizes Checklist

- [ ] `pwa-192x192.png` - 192x192px - PWA small icon
- [ ] `pwa-512x512.png` - 512x512px - PWA large icon (maskable)
- [ ] `apple-touch-icon.png` - 180x180px - iOS home screen
- [ ] `favicon.png` - 32x32px - Browser tab
- [ ] `favicon.ico` - 16x16 + 32x32 multi-size - Legacy browsers
- [ ] `images/wildcat-logo.png` - Original size - Documentation

## 🎨 Logo Color Palette

Extract these colors for consistent branding:

```css
/* Tailwind config or CSS variables */
--wildcat-orange: #D4823C;    /* Cat fur */
--wildcat-brown: #3A2516;     /* Cat outlines */
--wildcat-green: #9DB99A;     /* Background circle */
--wildcat-cream: #E8DCC8;     /* Outer background */
--wildcat-dark-green: #5A7159; /* Laptop/accents */
```

## 🔧 Step 3: I've Already Updated These Files

The following files have been updated to reference your new logo:

- ✅ `index.html` - Favicon and Apple touch icon links
- ✅ `vite.config.js` - PWA manifest with icon references
- ✅ `README.md` - Logo display in documentation
- ✅ `src/components/CSVColumnReorderer.jsx` - (Optional) Add logo to header

## ✅ Step 4: Verification Checklist

After saving all logo files, verify:

### Build Check
```bash
cd /Users/beauxwalton/WildCAT
npm run build
```
- [ ] No errors about missing icon files
- [ ] Build completes successfully
- [ ] Check `dist/` folder contains all icon files

### Visual Check
```bash
npm run preview
# Opens at http://localhost:4173
```

- [ ] **Browser tab**: Shows wildcat favicon
- [ ] **PWA install**: Click install icon → Check icon in dialog
- [ ] **Desktop icon**: After install, check desktop/dock icon
- [ ] **Mobile**: Test on iOS/Android for home screen icon

### File Size Check

Recommended sizes (PNG format):
- pwa-192x192.png: ~15-30 KB
- pwa-512x512.png: ~30-60 KB
- apple-touch-icon.png: ~15-30 KB
- favicon.ico: ~5-10 KB

If files are too large (>100 KB each):
- Use PNG compression tools (TinyPNG.com)
- Ensure you're exporting as PNG (not TIFF/BMP)
- Check image mode is RGB (not CMYK)

## 🚀 Step 5: Rebuild and Deploy

After placing all logo files:

```bash
# Clean previous build
rm -rf dist/

# Rebuild with new icons
npm run build

# Test locally
npm run preview

# Deploy to production
vercel --prod  # or your deployment method
```

## 📱 Platform-Specific Notes

### iOS (Safari)
- Uses `apple-touch-icon.png` (180x180px)
- Automatically rounds corners
- Ensure logo looks good with rounded corners
- Test: Add to Home Screen from Safari

### Android (Chrome)
- Uses `pwa-512x512.png` from manifest
- Can be "maskable" (adaptive icon)
- For maskable: Ensure important content in center 80%
- Test: Install PWA from Chrome

### Windows (Edge/Chrome)
- Uses `pwa-192x192.png` for tiles
- May use `pwa-512x512.png` for larger displays
- Test: Install from Edge

### macOS (Safari/Chrome)
- Safari: Uses `apple-touch-icon.png`
- Chrome: Uses PWA manifest icons
- Test both browsers

## 🎨 Optional: Add Logo to App Header

You can display the logo in the app itself:

```jsx
// In src/components/CSVColumnReorderer.jsx
// Update the header section (around line 181):

<h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
  <img
    src="/images/wildcat-logo.png"
    alt="WildCAT"
    className="w-12 h-12 object-contain"
  />
  WildCAT CSV Column Reorderer
</h1>
```

## 🐛 Troubleshooting

### Icons Not Showing After Build

**Problem**: PWA icons don't appear
**Solution**:
1. Check files are in `/public/` (not `/src/`)
2. Verify filenames match exactly (case-sensitive)
3. Clear browser cache: Ctrl+Shift+Delete
4. Unregister old service worker (DevTools → Application → SW)

### Favicon Not Updating

**Problem**: Browser still shows old Vite logo
**Solution**:
1. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
2. Clear browser cache
3. Check favicon.ico is in `/public/` root
4. Verify `index.html` link: `<link rel="icon" href="/favicon.ico">`

### Icons Look Blurry

**Problem**: PWA icons appear low quality
**Solution**:
1. Ensure source image is high resolution (1024x1024+)
2. Use PNG format (not JPEG - causes compression artifacts)
3. Don't scale up from small image (scale down from large)
4. Check transparency is preserved (no white background)

### iOS Icon Has White Background

**Problem**: Logo on iOS shows white corners
**Solution**:
1. Ensure source PNG has transparent background
2. Or: Fill background with your cream color (#E8DCC8)
3. iOS automatically rounds corners - design accordingly

## 📊 Before and After

### Before (Placeholder Icons)
- Generic Vite logo (purple/blue)
- No brand identity
- ❌ Doesn't reflect CSV/spreadsheet purpose

### After (Your WildCAT Logo)
- ✅ Friendly wildcat mascot
- ✅ Spreadsheet visualization (laptop screen)
- ✅ Memorable brand identity
- ✅ Professional yet approachable
- ✅ Perfect color harmony with app

## 🎉 Benefits of Your Logo

1. **Instant Recognition**: Users know it's about spreadsheets
2. **Friendly UX**: Wildcat makes the tool approachable
3. **Cross-Platform**: Works as favicon, PWA icon, and in docs
4. **Scalable**: Clear at any size (16px to 512px)
5. **Unique**: No other CSV tool has a wildcat mascot!

## 📞 Need Help?

If you run into issues:
1. Check this guide step-by-step
2. Verify all files are in correct locations
3. Run `npm run build` and check for errors
4. Test in incognito mode (fresh cache)
5. Ask for help with specific error messages

---

**Next**: After saving all icon files, run:
```bash
npm run build && npm run preview
```

Check that your wildcat logo appears in the browser tab! 🐱
