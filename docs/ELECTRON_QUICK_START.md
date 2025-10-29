# WildCAT Desktop App - Quick Start Guide

## Getting Started with the Desktop App

WildCAT can now run as a native desktop application on macOS, Windows, and Linux!

### Installation for Development

1. **Install Dependencies**
```bash
npm install
```

2. **Run in Development Mode**
```bash
npm run electron:dev
```

This will:
- Start the development server
- Launch the Electron desktop app
- Enable hot reload for instant updates

### Building the Desktop App

#### For Your Current Platform

```bash
npm run dist
```

The installer will be created in the `release/` directory.

#### For Specific Platforms

```bash
# macOS
npm run dist:mac

# Windows
npm run dist:win

# Linux
npm run dist:linux
```

### What You Get

✅ **Native Desktop App** - Runs independently without a browser
✅ **File Menu Integration** - Native file open dialogs (Cmd/Ctrl+O)
✅ **Offline Access** - Works completely offline
✅ **Cross-Platform** - Single codebase for all platforms
✅ **Auto Updates** - Can be configured for automatic updates
✅ **Better Performance** - Native performance without browser overhead

### Project Structure

```
WildCAT/
├── electron/
│   ├── main.js          # Electron main process
│   └── preload.js       # Security bridge
├── src/                 # Your React app (unchanged)
└── electron-builder.json # Build configuration
```

### Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Web app development server |
| `npm run electron:dev` | Desktop app development mode |
| `npm run build` | Build web app for production |
| `npm run dist` | Build desktop app for current platform |
| `npm run dist:mac` | Build for macOS (DMG + ZIP) |
| `npm run dist:win` | Build for Windows (NSIS installer + ZIP) |
| `npm run dist:linux` | Build for Linux (AppImage, DEB, RPM) |
| `npm run pack` | Package without creating installer (for testing) |

### Development Tips

1. **Two Development Modes:**
   - **Web**: Use `npm run dev` for web development (browser)
   - **Desktop**: Use `npm run electron:dev` for desktop development

2. **Hot Reload**: Changes to React components reload automatically in both modes

3. **DevTools**: Press `Cmd/Ctrl+Shift+I` to open Chrome DevTools

4. **File Management**: The desktop app stores data in localStorage, same as the web version

### Differences from Web Version

| Feature | Web App | Desktop App |
|---------|---------|-------------|
| Installation | None (browser-based) | One-time install |
| Updates | Automatic | Can be configured |
| File Access | Limited by browser | Full file system access |
| Native Menus | No | Yes |
| Keyboard Shortcuts | Limited | Full native shortcuts |
| Offline Support | PWA service worker | Built-in |
| Performance | Browser-dependent | Native performance |

### Keyboard Shortcuts (Desktop App)

| Shortcut | Action |
|----------|--------|
| `Cmd/Ctrl+O` | Open CSV file |
| `Cmd/Ctrl+Q` | Quit application |
| `Cmd/Ctrl+R` | Reload app |
| `Cmd/Ctrl+Shift+I` | Toggle DevTools |
| `Cmd/Ctrl+Plus` | Zoom in |
| `Cmd/Ctrl+Minus` | Zoom out |
| `Cmd/Ctrl+0` | Reset zoom |

### Troubleshooting

**Problem**: Blank window when launching
- **Solution**: Wait a few seconds, or check console for errors

**Problem**: Build fails
- **Solution**: Run `npm install` and try again

**Problem**: Can't find electron module
- **Solution**: Delete `node_modules` and run `npm install`

### Next Steps

- Read the full [Electron Setup Guide](./ELECTRON_SETUP.md) for advanced configuration
- Configure code signing for production releases
- Set up auto-updates for your users
- Customize the application icon

### Resources

- [Full Electron Documentation](./ELECTRON_SETUP.md)
- [Electron Official Docs](https://www.electronjs.org/)
- [Electron Builder Docs](https://www.electron.build/)

---

**Happy building!** 🚀
