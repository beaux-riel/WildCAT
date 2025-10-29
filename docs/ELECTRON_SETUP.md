# WildCAT Electron Desktop App

WildCAT is now available as a desktop application built with Electron! This guide covers development, building, and distribution of the desktop app.

## Features

- **Cross-Platform**: Build for macOS, Windows, and Linux
- **Native Menus**: Native application menus with keyboard shortcuts
- **File System Access**: Direct file system integration for CSV files
- **Offline First**: Works completely offline as a native app
- **Auto Updates**: Built-in support for automatic updates (can be configured)

## Development

### Prerequisites

- Node.js 18+ and npm
- All dependencies installed (`npm install`)

### Running in Development Mode

There are two ways to run the Electron app in development:

#### Option 1: Concurrently (Recommended)
```bash
npm run electron:dev
```

This command:
1. Starts the Vite dev server with Electron environment
2. Waits for the server to be ready
3. Launches Electron with hot reload

#### Option 2: Manual (Two terminals)

Terminal 1 - Start Vite dev server:
```bash
npm run dev:electron
```

Terminal 2 - Launch Electron:
```bash
npm run electron
```

### Development Features

- **Hot Reload**: Changes to React components reload automatically
- **DevTools**: Chrome DevTools are open by default in development
- **Source Maps**: Full source map support for debugging

## Building for Production

### Build for Current Platform

```bash
npm run dist
```

This will:
1. Build the Vite app for production
2. Package the Electron app for your current platform
3. Output to the `release/` directory

### Platform-Specific Builds

Build for specific platforms:

```bash
# macOS (DMG and ZIP)
npm run dist:mac

# Windows (NSIS installer and ZIP)
npm run dist:win

# Linux (AppImage, DEB, RPM)
npm run dist:linux
```

### Package Without Building Installer

To test the packaged app without creating installers:

```bash
npm run pack
```

This creates an unpacked directory in `release/` that you can run directly.

## Architecture

### File Structure

```
WildCAT/
├── electron/
│   ├── main.js          # Main process (Electron entry point)
│   └── preload.js       # Preload script (security bridge)
├── src/                 # React application
├── electron-builder.json # Build configuration
└── vite.config.js       # Vite config with Electron support
```

### Main Process (`electron/main.js`)

The main process handles:
- **Window Management**: Creating and managing the browser window
- **Application Menu**: Native menus with File, Edit, View, Window, Help
- **File Dialogs**: Native file open/save dialogs
- **IPC Communication**: Communication with the renderer process
- **Lifecycle Management**: App startup, activation, and quit events

Key features:
- Proper security configuration (contextIsolation, nodeIntegration disabled)
- Native file picker integration
- Cross-platform menu templates
- Error handling

### Preload Script (`electron/preload.js`)

The preload script:
- Provides a secure bridge between main and renderer processes
- Exposes safe APIs to the renderer via `contextBridge`
- Whitelists allowed IPC channels
- Provides system information (platform, versions)

### Renderer Process (React App)

Your existing React application runs in the renderer process with:
- Full React functionality
- Tailwind CSS styling
- Lucide icons
- localStorage access (persists between sessions)

## Configuration

### Electron Builder (`electron-builder.json`)

Build configuration includes:
- **App ID**: `com.wildcat.csvreorderer`
- **Product Name**: WildCAT
- **Output Directory**: `release/`

#### macOS Configuration
- Universal binaries (x64 + arm64)
- DMG and ZIP formats
- Notarization support (configure with credentials)

#### Windows Configuration
- NSIS installer with custom installation directory
- x64 and ia32 architectures
- Desktop and Start Menu shortcuts

#### Linux Configuration
- AppImage, DEB, and RPM packages
- x64 and arm64 architectures
- Desktop integration

### Vite Configuration

The `vite.config.js` detects Electron environment and:
- Sets `base` to `./` for Electron (instead of `/WildCAT/`)
- Disables PWA plugin for Electron builds
- Configures Electron-specific build options
- Sets up proper externals for Electron modules

## Distribution

### Code Signing

For production releases, configure code signing:

#### macOS
1. Obtain Apple Developer certificates
2. Create `build/entitlements.mac.plist`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>com.apple.security.cs.allow-jit</key>
  <true/>
  <key>com.apple.security.cs.allow-unsigned-executable-memory</key>
  <true/>
  <key>com.apple.security.cs.allow-dyld-environment-variables</key>
  <true/>
</dict>
</plist>
```
3. Add environment variables:
```bash
export CSC_LINK=/path/to/certificate.p12
export CSC_KEY_PASSWORD=your_password
```

#### Windows
1. Obtain code signing certificate
2. Set environment variables:
```bash
export CSC_LINK=/path/to/certificate.pfx
export CSC_KEY_PASSWORD=your_password
```

### Auto Updates

To enable auto updates:

1. Configure a release server
2. Add update check to `electron/main.js`:
```javascript
const { autoUpdater } = require('electron-updater')

app.whenReady().then(() => {
  autoUpdater.checkForUpdatesAndNotify()
})
```

3. Update `electron-builder.json`:
```json
{
  "publish": {
    "provider": "github",
    "owner": "beaux-riel",
    "repo": "WildCAT"
  }
}
```

## Troubleshooting

### Issue: Electron window is blank

**Solution**: Check the console for errors. Make sure:
- Vite dev server is running (port 3000)
- Build completed successfully for production
- Check `dist/` directory contains built files

### Issue: Can't find module 'electron'

**Solution**: Run `npm install` to ensure all dependencies are installed

### Issue: Build fails on macOS

**Solution**:
- Install Xcode Command Line Tools: `xcode-select --install`
- Make sure you're not running on ARM Mac without proper node version

### Issue: Permission denied on Linux

**Solution**: Make the AppImage executable:
```bash
chmod +x release/WildCAT-*.AppImage
```

### Issue: Hot reload not working

**Solution**:
- Stop both processes
- Clear node_modules/.vite cache
- Restart with `npm run electron:dev`

## Security Considerations

The app follows Electron security best practices:

1. **Context Isolation**: Enabled to separate main and renderer contexts
2. **Node Integration**: Disabled in renderer process
3. **Preload Script**: Used for controlled API exposure
4. **Web Security**: Enabled to prevent loading external resources
5. **IPC Whitelisting**: Only specific channels allowed

## Performance Tips

1. **Reduce App Size**: Remove unused dependencies
2. **Lazy Loading**: Use React.lazy() for large components
3. **Asset Optimization**: Optimize images and icons
4. **Memory Management**: Monitor memory usage in Task Manager

## Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [Electron Builder Documentation](https://www.electron.build/)
- [Vite Plugin Electron](https://github.com/electron-vite/vite-plugin-electron)
- [Security Best Practices](https://www.electronjs.org/docs/tutorial/security)

## Support

For issues specific to the desktop app:
1. Check this documentation
2. Review [electron/main.js](../electron/main.js) comments
3. Check Electron logs (Help > Toggle Developer Tools)
4. Report issues with:
   - Electron version: `npm list electron`
   - Platform and OS version
   - Console error messages
