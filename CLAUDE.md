# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WildCAT is a React-based CSV column reorderer tool available as both a web app and desktop application that allows users to:
- Upload CSV files and parse them with proper quote/comma handling
- Reorder columns via drag-and-drop interface
- Save and load column arrangements to localStorage
- Preview data with reordered columns
- Export reordered CSV files with proper CSV formatting
- **NEW**: Run as a native desktop app on macOS, Windows, and Linux using Electron

## Architecture

### React Application with Vite + Electron

This is a React application built with Vite, featuring:

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

### Prerequisites

- Node.js 18+ and npm
- All dependencies: `npm install`

### Web Application Development

```bash
# Start development server (web app)
npm run dev

# Build for web production
npm run build

# Preview web build
npm run preview
```

### Desktop Application Development

```bash
# Start desktop app in development mode (recommended)
npm run electron:dev

# Or manually (two terminals):
# Terminal 1: Start dev server
npm run dev:electron
# Terminal 2: Launch Electron
npm run electron
```

### Building Desktop Application

```bash
# Build for current platform
npm run dist

# Build for specific platforms
npm run dist:mac      # macOS (DMG + ZIP)
npm run dist:win      # Windows (NSIS installer + ZIP)
npm run dist:linux    # Linux (AppImage, DEB, RPM)

# Package without installer (for testing)
npm run pack
```

See [Electron Quick Start Guide](./docs/ELECTRON_QUICK_START.md) for more details.

## File Organization

```
WildCAT/
├── electron/                    # Electron main process files
│   ├── main.js                 # Main process entry point
│   └── preload.js              # Security bridge (context isolation)
├── src/                        # React application
│   ├── components/             # React components
│   │   └── CSVColumnReorderer.jsx
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles
├── docs/                       # Documentation
│   ├── ELECTRON_SETUP.md       # Detailed Electron guide
│   └── ELECTRON_QUICK_START.md # Quick start guide
├── public/                     # Static assets (icons, images)
├── dist/                       # Web build output (gitignored)
├── release/                    # Desktop app builds (gitignored)
├── electron-builder.json       # Electron build configuration
├── vite.config.js              # Vite + Electron configuration
└── package.json                # Dependencies and scripts

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

## Electron Integration

### Architecture

The desktop app uses Electron with the following architecture:

1. **Main Process** (`electron/main.js`):
   - Window management and lifecycle
   - Native menu integration
   - File system access
   - IPC communication

2. **Preload Script** (`electron/preload.js`):
   - Secure bridge between main and renderer
   - Context isolation with `contextBridge`
   - Whitelisted IPC channels

3. **Renderer Process** (React app):
   - Same React application as web version
   - Enhanced with Electron APIs via preload
   - localStorage persists between sessions

### Security

- **Context Isolation**: Enabled
- **Node Integration**: Disabled in renderer
- **Web Security**: Enabled
- **IPC Whitelisting**: Only specific channels allowed

### Distribution

The desktop app can be distributed as:
- **macOS**: DMG installer, ZIP archive (universal: x64 + arm64)
- **Windows**: NSIS installer, ZIP archive (x64, ia32)
- **Linux**: AppImage, DEB, RPM packages (x64, arm64)

### Resources

- [Electron Quick Start](./docs/ELECTRON_QUICK_START.md) - Get started quickly
- [Electron Setup Guide](./docs/ELECTRON_SETUP.md) - Complete documentation
- [Electron Official Docs](https://www.electronjs.org/) - Electron documentation
