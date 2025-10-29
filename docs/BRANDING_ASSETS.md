# WildCAT Branding Assets

## 🎨 Brand Identity

### Logo Description
The WildCAT logo features a friendly, approachable wildcat character holding a laptop displaying a spreadsheet grid. This perfectly represents the app's purpose: making CSV column management fun and accessible.

### Character Design
- **Species**: Wildcat/Lynx (playful reference to "WildCAT")
- **Pose**: Holding laptop with spreadsheet
- **Expression**: Friendly, helpful, smiling
- **Style**: Retro cartoon illustration with bold black outlines
- **Details**: Spotted fur pattern, whiskers, expressive eyes

### Visual Elements
1. **Wildcat Character** - Friendly mascot
2. **Laptop** - Technology/digital tool
3. **Spreadsheet Grid** - CSV/data management
4. **Circular Background** - Sage green, provides focus
5. **Beige Canvas** - Warm, neutral outer background

## 🎨 Official Color Palette

### Primary Colors

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| **Wildcat Orange** | `#D4823C` | rgb(212, 130, 60) | Primary brand color, cat fur |
| **Wildcat Green** | `#9DB99A` | rgb(157, 185, 154) | Accent color, backgrounds, theme |
| **Wildcat Cream** | `#E8DCC8` | rgb(232, 220, 200) | Backgrounds, surfaces |

### Secondary Colors

| Color Name | Hex Code | RGB | Usage |
|------------|----------|-----|-------|
| **Wildcat Brown** | `#3A2516` | rgb(58, 37, 22) | Outlines, text, emphasis |
| **Wildcat Dark Green** | `#5A7159` | rgb(90, 113, 89) | Laptop, UI accents, shadows |

### Tailwind CSS Configuration

```javascript
// Already added to tailwind.config.js
colors: {
  'wildcat-orange': '#D4823C',
  'wildcat-brown': '#3A2516',
  'wildcat-green': '#9DB99A',
  'wildcat-cream': '#E8DCC8',
  'wildcat-dark-green': '#5A7159',
}
```

### Usage Examples

```jsx
// Buttons
<button className="bg-wildcat-orange hover:bg-wildcat-brown text-white">
  Export CSV
</button>

// Headers
<h1 className="text-wildcat-brown">WildCAT</h1>

// Backgrounds
<div className="bg-wildcat-cream">...</div>

// Accents
<div className="border-wildcat-green">...</div>
```

## 📐 Logo Specifications

### Sizes Required

| File | Dimensions | Purpose | Location |
|------|------------|---------|----------|
| `pwa-192x192.png` | 192×192px | PWA small icon | `/public/` |
| `pwa-512x512.png` | 512×512px | PWA large icon, maskable | `/public/` |
| `apple-touch-icon.png` | 180×180px | iOS home screen | `/public/` |
| `favicon.png` | 32×32px | Browser tab icon | `/public/` |
| `favicon.ico` | 16×16, 32×32 | Legacy browser icon | `/public/` |
| `wildcat-logo.png` | 1024×1024px | Original, documentation | `/public/images/` |

### Clear Space
- Minimum clear space around logo: 10% of logo height
- Don't place text or other elements too close
- Maintain breathing room for visual impact

### Minimum Sizes
- **Digital**: 16×16px (favicon)
- **Print**: 0.5 inches (13mm)
- **App Icon**: 192×192px minimum

## 🎭 Logo Usage Guidelines

### ✅ DO

- Use on white, cream, or light backgrounds
- Maintain aspect ratio (1:1 square)
- Use high-resolution version for print
- Keep colors consistent with brand palette
- Use PNG format with transparency
- Center the logo when displaying

### ❌ DON'T

- Stretch or distort the logo
- Change the colors (except approved variations)
- Add drop shadows or effects
- Rotate or tilt the logo
- Place on busy or clashing backgrounds
- Use low-resolution versions
- Add text inside the logo area

## 🖼️ Logo Variations

### Primary (Full Color)
- **Use**: App icons, website, documentation
- **Background**: Transparent or cream
- **File**: `wildcat-logo.png`

### Favicon (Simplified)
- **Use**: Browser tabs only
- **Size**: 32×32px or 16×16px
- **Details**: May be simplified at small sizes
- **File**: `favicon.png`, `favicon.ico`

### Future Variations (Not Yet Created)

If needed in future:
- Monochrome (single color)
- Inverted (for dark backgrounds)
- Icon only (no text)
- Horizontal lockup (logo + text side-by-side)

## 📱 Platform-Specific Adaptations

### iOS (Apple Touch Icon)
- **Size**: 180×180px
- **Format**: PNG
- **Background**: Filled (not transparent) - use cream color
- **Corners**: iOS automatically rounds - design accordingly
- **File**: `apple-touch-icon.png`

### Android (PWA Maskable Icon)
- **Size**: 512×512px
- **Safe zone**: Center 80% (avoid edges)
- **Format**: PNG with transparency
- **Padding**: Add 10% padding for adaptive icons
- **File**: `pwa-512x512.png` (with maskable purpose)

### Windows (App Tile)
- **Size**: 192×192px or 512×512px
- **Format**: PNG
- **Background**: Consider tile color
- **File**: `pwa-192x192.png`

### Web (Favicon)
- **Sizes**: 16×16, 32×32, 48×48
- **Format**: ICO or PNG
- **Simplified**: May need to simplify details at 16px
- **Files**: `favicon.ico`, `favicon.png`

## 🎨 Color Accessibility

### Contrast Ratios (WCAG AA)

| Foreground | Background | Ratio | Pass |
|------------|------------|-------|------|
| Wildcat Brown | Wildcat Cream | 9.2:1 | ✅ AAA |
| Wildcat Orange | White | 3.5:1 | ✅ AA |
| Wildcat Green | White | 2.8:1 | ⚠️ Large text only |
| Wildcat Brown | White | 12.6:1 | ✅ AAA |

### Recommendations
- **Body text**: Use `wildcat-brown` on `wildcat-cream` or white
- **Headings**: Use `wildcat-brown` or `wildcat-orange`
- **Buttons**: `wildcat-orange` background with white text
- **Links**: `wildcat-dark-green` with underline

## 📄 Typography Pairing

### Recommended Fonts

**Primary (Headings)**:
- Inter (currently used)
- Poppins (alternative)
- Montserrat (alternative)

**Secondary (Body)**:
- Inter (currently used)
- Open Sans (alternative)
- Roboto (alternative)

### Font Hierarchy

```css
/* Headings */
.heading-1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--wildcat-brown);
}

.heading-2 {
  font-size: 2rem;
  font-weight: 600;
  color: var(--wildcat-brown);
}

/* Body */
.body-text {
  font-size: 1rem;
  font-weight: 400;
  color: var(--wildcat-brown);
}

/* Accents */
.accent-text {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--wildcat-orange);
}
```

## 🎬 Animation Guidelines

### Logo Animation (Optional Future Enhancement)

**Entrance**:
- Fade in with slight scale (0.9 → 1.0)
- Duration: 0.3s
- Easing: ease-out

**Hover** (interactive contexts):
- Subtle scale: 1.0 → 1.05
- Duration: 0.2s
- Easing: ease-in-out

**Loading** (if used as loading indicator):
- Gentle pulse: opacity 1.0 ↔ 0.7
- Duration: 1.5s
- Repeat: infinite

```css
/* Example animations */
.logo-entrance {
  animation: logoFadeIn 0.3s ease-out;
}

@keyframes logoFadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.logo-hover {
  transition: transform 0.2s ease-in-out;
}

.logo-hover:hover {
  transform: scale(1.05);
}
```

## 📐 Grid System

The logo design uses these proportions:
- **Outer canvas**: Square (1:1 ratio)
- **Green circle**: ~75% of canvas width
- **Character**: ~65% of canvas height
- **Laptop**: ~30% of character height

These proportions ensure the logo remains balanced at any size.

## 🖨️ Print Specifications

### For Print Materials

**Format**: Vector (SVG) or high-res PNG (300 DPI minimum)
**Color Mode**: CMYK (convert from RGB)
**Minimum Size**: 0.5 inches (13mm)
**Paper**: Works on white, cream, or light colored stock

**CMYK Conversions** (approximate):
- Wildcat Orange: C=0 M=50 Y=80 K=15
- Wildcat Green: C=30 M=0 Y=30 K=20
- Wildcat Cream: C=5 M=5 Y=15 K=0
- Wildcat Brown: C=50 M=70 Y=85 K=70

## 📦 Asset Delivery Checklist

When providing logo to others:

- [ ] PNG with transparency (1024×1024px minimum)
- [ ] SVG vector version (if available)
- [ ] Favicon (16×16, 32×32)
- [ ] PWA icons (192×192, 512×512)
- [ ] Apple touch icon (180×180)
- [ ] Brand guidelines (this document)
- [ ] Color palette (hex codes)
- [ ] Usage examples

## 🔗 Brand Resources

### Internal Files
- Logo source: `/public/images/wildcat-logo.png`
- PWA icons: `/public/pwa-*.png`
- Favicon: `/public/favicon.*`
- Integration guide: `/docs/LOGO_INTEGRATION_GUIDE.md`

### External Tools Used
- PWA Asset Generator: https://www.pwabuilder.com/imageGenerator
- Favicon Generator: https://realfavicongenerator.net/
- Color Contrast Checker: https://webaim.org/resources/contrastchecker/

## 💼 Brand Voice

**Personality**: Friendly, Helpful, Professional, Approachable

**Tone**:
- Casual but competent
- Helpful without being condescending
- Technical when needed, simple when possible

**Example Messaging**:
- ✅ "Reorder your CSV columns in seconds!"
- ✅ "WildCAT makes data management fun"
- ❌ "Enterprise-grade CSV manipulation tool" (too formal)
- ❌ "The best CSV tool ever made" (too boastful)

## 📊 Brand Application Examples

### Website Header
```jsx
<header className="bg-wildcat-cream border-b border-wildcat-green">
  <div className="flex items-center gap-3 p-4">
    <img src="/images/wildcat-logo.png" alt="WildCAT" className="w-10 h-10" />
    <h1 className="text-2xl font-bold text-wildcat-brown">WildCAT</h1>
  </div>
</header>
```

### Loading State
```jsx
<div className="flex flex-col items-center justify-center p-8">
  <img
    src="/images/wildcat-logo.png"
    alt="Loading..."
    className="w-16 h-16 animate-pulse"
  />
  <p className="mt-4 text-wildcat-brown">Loading your CSV...</p>
</div>
```

### Error State
```jsx
<div className="bg-wildcat-cream border-2 border-wildcat-orange rounded-lg p-6">
  <img src="/images/wildcat-logo.png" alt="Error" className="w-12 h-12 opacity-50" />
  <p className="text-wildcat-brown mt-2">Oops! Couldn't parse that CSV.</p>
</div>
```

---

**Version**: 1.0
**Last Updated**: 2025-10-29
**Maintained By**: WildCAT Project Team
