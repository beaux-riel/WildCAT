# WildCAT - CSV Column Reorderer

A Progressive Web App for reordering CSV columns with an intuitive drag-and-drop interface. Save your favorite column arrangements for repeated use and export reordered files instantly.

## ✨ Features

- 📤 **CSV File Upload** - Parse CSV files with proper quote and comma handling
- 🎯 **Drag-and-Drop Interface** - Intuitive column reordering
- 💾 **Save Arrangements** - Store favorite column orders in localStorage
- 📊 **Live Preview** - See your data with reordered columns in real-time
- 📥 **Export CSV** - Download reordered files with proper CSV formatting
- 🔌 **Offline Support** - Works offline after initial installation (PWA)
- 🌐 **Cross-Platform** - Works on Windows, Mac, Linux, and mobile devices

## 🚀 Quick Start

### For Users

#### Installation (Windows & Mac)

1. **Visit the app** in your browser:
   - Chrome/Edge: Go to the deployed URL
   - Safari: Go to the deployed URL

2. **Install as Desktop App**:
   - **Chrome/Edge**: Click the install icon (⊕) in the address bar → "Install"
   - **Safari**: Click Share → "Add to Dock"

3. **Launch**: Click the WildCAT icon on your desktop/dock

4. **Works Offline**: After first visit, app works without internet connection

### For Developers

#### Prerequisites
- Node.js 18+ and npm
- Modern browser (Chrome 90+, Safari 14+, Firefox 88+)

#### Setup

```bash
# Clone/download the project
cd WildCAT

# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📋 Usage Guide

### 1. Upload CSV File
- Click the upload area or drag a CSV file
- File is parsed with quote-aware comma detection
- Headers are automatically detected

### 2. Reorder Columns
- Drag column chips to reorder them
- Visual feedback shows dragged column
- Position numbers update automatically
- Click "Reset Order" to restore original sequence

### 3. Save Arrangement
- Enter a name for your arrangement (e.g., "Sales Report Layout")
- Click "Save" button
- Arrangement stored in localStorage (persists across sessions)

### 4. Load Saved Arrangement
- Click "Load" on any saved arrangement
- Columns reorder to match saved layout
- Works with any CSV that has matching column names

### 5. Export Reordered CSV
- Click "Export Reordered CSV" button
- File downloads with columns in new order
- Proper CSV escaping (quotes, commas, newlines)
- Filename: `reordered_[original_filename].csv`

## 🏗️ Project Structure

```
WildCAT/
├── src/
│   ├── components/
│   │   └── CSVColumnReorderer.jsx  # Main component
│   ├── App.jsx                      # Root component
│   ├── main.jsx                     # Entry point with PWA registration
│   └── index.css                    # Tailwind CSS
├── public/
│   ├── pwa-192x192.png             # PWA icon (small)
│   ├── pwa-512x512.png             # PWA icon (large)
│   └── vite.svg                     # Favicon
├── dist/                            # Production build output
├── docs/                            # Documentation
├── vite.config.js                   # Vite + PWA configuration
├── tailwind.config.js               # Tailwind CSS config
└── package.json                     # Dependencies and scripts
```

## 🔧 Technical Stack

- **Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.10
- **Styling**: Tailwind CSS 3.4.14
- **Icons**: Lucide React 0.461.0
- **PWA**: vite-plugin-pwa 1.1.0
- **Service Worker**: Workbox (automatic via plugin)

## 📦 Build Output

Production build creates:
- **Size**: ~166 KB total (gzipped: ~53 KB)
- **React vendor chunk**: 140 KB
- **App logic**: 8 KB
- **Lucide icons**: 4 KB
- **CSS**: 12 KB
- **Service Worker**: Auto-generated for offline support

## 🌐 Deployment

### Option 1: GitHub Pages (Free)

```bash
# Install gh-pages
npm install -D gh-pages

# Add to package.json scripts:
# "deploy": "npm run build && gh-pages -d dist"

# Deploy
npm run deploy
```

**URL**: `https://yourusername.github.io/wildcat`

### Option 2: Vercel (Free, Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

**URL**: `https://wildcat-[hash].vercel.app` (custom domain available)

### Option 3: Netlify (Free, Drag-and-Drop)

1. Build: `npm run build`
2. Visit [netlify.com](https://netlify.com)
3. Drag `dist/` folder to Netlify
4. Get instant URL: `https://wildcat-[hash].netlify.app`

### Option 4: Static File Server (Any Platform)

```bash
# Build
npm run build

# Upload dist/ contents to any web server
# - Apache: Copy to /var/www/html/
# - Nginx: Copy to /usr/share/nginx/html/
# - IIS: Copy to C:\inetpub\wwwroot\
```

## 🔒 Security & Privacy

- ✅ **All processing client-side** - No data sent to servers
- ✅ **localStorage only** - Data never leaves your device
- ✅ **No tracking/analytics** - Fully private operation
- ✅ **HTTPS required** - PWA enforces secure connections
- ✅ **CSP headers** - Content Security Policy for XSS protection

## 🎨 Customization

### Modify Theme Colors

Edit `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',  // Change main color
        secondary: '#8b5cf6' // Change accent color
      }
    }
  }
}
```

### Add Custom Features

The CSV component is in `src/components/CSVColumnReorderer.jsx`:
- State management uses React hooks
- Drag-and-drop via HTML5 API
- localStorage for persistence

## 🐛 Troubleshooting

### Issue: PWA Not Installing

**Solution**:
- Ensure using HTTPS (not http://)
- Use Chrome/Edge/Safari (Firefox has limited PWA support)
- Clear browser cache and try again

### Issue: CSV Parsing Errors

**Solution**:
- Ensure CSV uses comma delimiters (not semicolons)
- Check for unmatched quotes in data
- Verify file encoding is UTF-8

### Issue: localStorage Full

**Solution**:
- Delete old arrangements from UI
- Clear browser data for this site
- localStorage limit is ~10MB (thousands of arrangements)

### Issue: Drag-and-Drop Not Working

**Solution**:
- Use a modern browser (Chrome 90+, Safari 14+)
- Disable browser extensions that may interfere
- Try in incognito/private mode

## 📊 Performance

- **First Load**: ~166 KB (53 KB gzipped) - loads in <1s on 4G
- **Subsequent Loads**: ~0 KB - instant (cached by service worker)
- **CSV Processing**: Client-side, handles files up to ~100MB
- **Memory Usage**: ~50-100 MB depending on CSV size

## 🔄 Updates

PWA automatically updates in background:
1. User visits app
2. Service worker checks for updates
3. New version downloads silently
4. On next visit, new version activates
5. No user action required

## 📝 License

This project is open source. Feel free to use, modify, and distribute.

## 🤝 Contributing

Contributions welcome! Areas for improvement:
- Add support for custom delimiters (semicolon, tab)
- Implement virtual scrolling for large files
- Add column filtering/hiding
- Support Excel file import/export
- Add data transformation functions
- Multi-file batch processing

## 📞 Support

For issues or questions:
1. Check this README
2. Review `/docs/INSTALLATION_GUIDE.md` for installation help
3. Check browser console for error messages
4. Ensure using a modern browser with JavaScript enabled

## 🎯 Roadmap

- [ ] TypeScript migration
- [ ] Unit tests with Vitest
- [ ] Column search/filter
- [ ] Excel file support
- [ ] Dark mode theme
- [ ] Keyboard shortcuts
- [ ] Undo/redo functionality
- [ ] Column data type detection
- [ ] Data validation rules

---

**Version**: 1.0.0
**Last Updated**: 2025-10-29
**Build Status**: ✅ Production Ready
