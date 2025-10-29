# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WildCAT is a React-based CSV column reorderer tool that allows users to:
- Upload CSV files and parse them with proper quote/comma handling
- Reorder columns via drag-and-drop interface
- Save and load column arrangements to localStorage
- Preview data with reordered columns
- Export reordered CSV files with proper CSV formatting

## Architecture

### Single-File React Component

This is a standalone React component (`csv-column-reorderer.jsx`) with no build system or dependencies installed yet. The component uses:

- **React Hooks**: `useState`, `useEffect` for state management
- **Lucide React Icons**: `Upload`, `Save`, `Download`, `Trash2`, `GripVertical`, `FileText`, `Star`
- **Tailwind CSS**: Utility-first styling with gradient backgrounds and responsive grid layouts

### Key Technical Details

**CSV Parsing Logic** (lines 28-68):
- Handles quoted fields containing commas
- Manual quote-aware parsing in `handleFileUpload` to properly split CSV rows
- Preserves original column indices for reordering mapping

**State Management**:
- `columns`: Array of objects with `{id, name, originalIndex}` for tracking column positions
- `csvData`: 2D array of parsed CSV values
- `savedArrangements`: Persisted to localStorage with column order mappings
- Drag-and-drop state: `draggedItem` tracks the currently dragged column

**Drag-and-Drop Implementation** (lines 70-95):
- HTML5 Drag and Drop API
- Reorders columns array by removing dragged item and inserting at drop position
- Visual feedback with opacity changes during drag

**Export Functionality** (lines 142-170):
- Rebuilds CSV with reordered columns
- Properly escapes values containing commas, quotes, or newlines
- Uses Blob API for file download

## Development Setup

This project currently has no package.json or build configuration. To develop:

### Option 1: Add Build System (Recommended)

```bash
# Initialize with Vite (recommended for React)
npm create vite@latest . -- --template react
npm install lucide-react

# Development
npm run dev

# Build for production
npm run build
```

### Option 2: Use Directly in HTML

```html
<!DOCTYPE html>
<html>
<head>
  <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://unpkg.com/lucide-react/dist/umd/lucide-react.css" rel="stylesheet">
</head>
<body>
  <div id="root"></div>
  <script type="text/babel" src="csv-column-reorderer.jsx"></script>
  <script type="text/babel">
    ReactDOM.createRoot(document.getElementById('root')).render(<CSVColumnReorderer />);
  </script>
</body>
</html>
```

## File Organization

When adding new features or files:
- `/src` - React components and utilities
- `/tests` - Test files (none currently exist)
- `/docs` - Documentation
- `/public` - Static assets

**Do not save working files to the root directory.**

## Testing Considerations

No tests currently exist. When adding tests:
- Test CSV parsing edge cases (quotes, commas in values, newlines)
- Test drag-and-drop column reordering logic
- Test localStorage persistence and arrangement loading
- Test CSV export formatting and escaping

## Known Limitations

1. **Large Files**: No chunking or virtualization for large CSV files
2. **CSV Dialect**: Assumes comma-separated with double-quote escaping (no custom delimiter support)
3. **Memory**: All data loaded into memory (no streaming)
4. **Validation**: No validation of CSV structure consistency across rows
5. **Browser Compatibility**: HTML5 Drag and Drop API may have inconsistent behavior across browsers

## Common Modifications

### Adding Column Filtering
Modify the columns state to include a `visible` property and filter before rendering.

### Supporting Custom Delimiters
Update the parsing logic in `handleFileUpload` (lines 30-68) to accept delimiter parameter.

### Adding Column Transformations
Add transformation functions that operate on `csvData` using the current `columns` order.

### Exporting to Other Formats
Create additional export functions similar to `exportCSV` for JSON, Excel, etc.
