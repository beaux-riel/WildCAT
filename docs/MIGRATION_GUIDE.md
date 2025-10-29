# CSV Component Migration Guide

## Overview

This guide explains how to integrate the existing `csv-column-reorderer.jsx` component into the new Vite + React build system.

## Current State

- **Original file**: `/Users/beauxwalton/WildCAT/csv-column-reorderer.jsx`
- **Status**: Standalone React component, not yet integrated
- **Build system**: ✅ Ready (Vite + React + Tailwind + Lucide)

## Migration Options

### Option 1: Direct Replacement (Recommended for Single-Purpose App)

**Use the CSV component as your main App component:**

```bash
# Backup current App.jsx
mv src/App.jsx src/App.jsx.backup

# Copy CSV component to src/
cp csv-column-reorderer.jsx src/App.jsx
```

**Update the component (if needed):**
1. Ensure proper default export at the end:
   ```jsx
   export default CSVColumnReorderer;
   ```

2. Verify imports at the top:
   ```jsx
   import { useState, useEffect } from 'react';
   import { Upload, Save, Download, Trash2, GripVertical, FileText, Star } from 'lucide-react';
   ```

3. Test: `npm run dev`

### Option 2: Component Integration (For Multi-Component Apps)

**Keep the CSV component as a separate module:**

```bash
# Create components directory
mkdir -p src/components

# Move component
cp csv-column-reorderer.jsx src/components/CSVColumnReorderer.jsx
```

**Update `src/App.jsx`:**
```jsx
import CSVColumnReorderer from './components/CSVColumnReorderer'

function App() {
  return (
    <div className="min-h-screen">
      <CSVColumnReorderer />
    </div>
  )
}

export default App
```

**Update `src/components/CSVColumnReorderer.jsx`:**
```jsx
// Change function name if needed (remove any global declarations)
function CSVColumnReorderer() {
  // ... existing code ...
}

export default CSVColumnReorderer;
```

### Option 3: Modular Architecture (For Large Apps)

**Break down the component into smaller pieces:**

```bash
mkdir -p src/components/csv
```

**Suggested structure:**
```
src/
├── components/
│   └── csv/
│       ├── CSVUploader.jsx       # File upload logic
│       ├── ColumnList.jsx        # Drag-and-drop column list
│       ├── SavedArrangements.jsx # Saved layouts sidebar
│       ├── DataPreview.jsx       # CSV data preview
│       └── index.jsx             # Main orchestrator
├── hooks/
│   ├── useCSVParser.js           # CSV parsing logic
│   ├── useDragAndDrop.js         # D&D state management
│   └── useLocalStorage.js        # Persistence logic
└── utils/
    ├── csvParser.js              # CSV parsing functions
    └── csvExporter.js            # CSV export functions
```

## Required Code Changes

### 1. Export Statement

**Before:**
```jsx
function CSVColumnReorderer() {
  // component code
}
// No export
```

**After:**
```jsx
function CSVColumnReorderer() {
  // component code
}

export default CSVColumnReorderer;
```

### 2. React Imports

**Check that imports use modern syntax:**
```jsx
// ✅ Correct
import { useState, useEffect } from 'react';

// ❌ Wrong (old syntax)
import React, { useState, useEffect } from 'react';
// (Only if you're using React.createElement)
```

### 3. Icon Imports

**Verify Lucide imports match installed version:**
```jsx
import {
  Upload,
  Save,
  Download,
  Trash2,
  GripVertical,
  FileText,
  Star
} from 'lucide-react';
```

## Testing Checklist

After migration, test these features:

- [ ] **File Upload**: Upload a CSV file
- [ ] **CSV Parsing**: Verify correct parsing (especially quoted fields with commas)
- [ ] **Column Display**: All columns shown correctly
- [ ] **Drag and Drop**: Reorder columns by dragging
- [ ] **Data Preview**: Reordered data displays correctly
- [ ] **Save Arrangement**: Save column order to localStorage
- [ ] **Load Arrangement**: Load previously saved arrangements
- [ ] **Delete Arrangement**: Remove saved arrangements
- [ ] **Export CSV**: Download reordered CSV with proper formatting
- [ ] **Edge Cases**:
  - [ ] Quoted fields with commas
  - [ ] Quoted fields with newlines
  - [ ] Empty cells
  - [ ] Large files (1000+ rows)

## Quick Migration (5 Minutes)

**If you just want to get it running:**

```bash
# 1. Move component
cp csv-column-reorderer.jsx src/App.jsx

# 2. Add export (if needed)
echo "\nexport default CSVColumnReorderer;" >> src/App.jsx

# 3. Start dev server
npm run dev
```

**That's it!** Your app should now be running at http://localhost:3000

## Troubleshooting

### Issue: "Cannot find module 'react'"
**Solution**: Ensure dependencies are installed
```bash
npm install
```

### Issue: Icons not displaying
**Solution**: Check lucide-react is installed
```bash
npm install lucide-react
# Verify
npm list lucide-react
```

### Issue: Tailwind classes not working
**Solution**: Ensure Tailwind directives are in `src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Issue: Hot reload not working
**Solution**: Restart dev server
```bash
# Kill server (Ctrl+C)
# Restart
npm run dev
```

### Issue: Build fails
**Solution**: Check ESLint errors
```bash
npm run lint
```

## Advanced: Adding Features

### Add TypeScript Support

```bash
# Install TypeScript
npm install -D typescript @types/react @types/react-dom

# Rename files
mv src/App.jsx src/App.tsx
mv src/main.jsx src/main.tsx

# Create tsconfig.json
npx tsc --init
```

### Add Testing

```bash
# Install Vitest + React Testing Library
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom

# Create test file
touch src/App.test.jsx
```

### Add State Management (if needed)

```bash
# Option 1: Zustand (lightweight)
npm install zustand

# Option 2: Redux Toolkit
npm install @reduxjs/toolkit react-redux
```

## Performance Optimization

### 1. Virtualize Large Lists

```bash
npm install react-virtual
```

### 2. Memoize Expensive Computations

```jsx
import { useMemo } from 'react';

const reorderedData = useMemo(() => {
  // expensive reordering logic
}, [columns, csvData]);
```

### 3. Code Splitting

```jsx
import { lazy, Suspense } from 'react';

const CSVExporter = lazy(() => import('./CSVExporter'));
```

## Next Steps After Migration

1. ✅ Test all features thoroughly
2. ✅ Add unit tests (optional)
3. ✅ Optimize performance for large files
4. ✅ Add error boundaries
5. ✅ Implement analytics (optional)
6. ✅ Add keyboard shortcuts (optional)
7. ✅ Deploy to production

## Deployment Options

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### GitHub Pages
```bash
# Add to vite.config.js
base: '/WildCAT/'

npm run build
# Deploy dist/ to gh-pages branch
```

---

**Need help?** Check `/Users/beauxwalton/WildCAT/docs/SETUP.md` for complete setup documentation.
