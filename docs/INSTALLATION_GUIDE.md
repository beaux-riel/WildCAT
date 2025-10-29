# WildCAT Installation Guide

Complete installation instructions for Windows and Mac users.

## 📦 Table of Contents

- [Windows Installation](#windows-installation)
- [Mac Installation](#mac-installation)
- [Verification](#verification)
- [Offline Usage](#offline-usage)
- [Troubleshooting](#troubleshooting)

---

## 🪟 Windows Installation

### Method 1: Install as App (Recommended) - Chrome/Edge

1. **Open Chrome or Microsoft Edge**
   - Launch your browser
   - Navigate to: `https://[your-app-url].com`

2. **Install the App**
   - Look for the **install icon** (⊕ or computer icon) in the address bar
   - Click it, or click the **three dots** (⋮) menu → **Install WildCAT**

   ![Install icon in Chrome address bar]

3. **Confirm Installation**
   - Click **"Install"** in the popup dialog
   - App will open in its own window (no browser tabs)

4. **Find Your App**
   - **Desktop shortcut** automatically created
   - **Start Menu**: Search for "WildCAT"
   - **Taskbar**: Pin it for quick access

5. **Works Offline**
   - After first visit, app works without internet
   - All features available offline
   - Data saved locally on your computer

### Method 2: Desktop Shortcut - Any Browser

1. **Visit the app** in any browser
2. **Resize window** to your preferred size
3. **Drag the lock icon** (or URL) from address bar to desktop
4. **Double-click** shortcut to open app

**Note**: This method opens in a browser tab, not a standalone window.

### Method 3: Bookmark - Quick Access

1. **Visit the app**
2. Press **Ctrl + D** to bookmark
3. Pin to bookmarks bar for easy access

---

## 🍎 Mac Installation

### Method 1: Install as App (Recommended) - Chrome

1. **Open Google Chrome**
   - Launch Chrome browser
   - Navigate to: `https://[your-app-url].com`

2. **Install the App**
   - Click the **install icon** (⊕) in the address bar
   - Or: **Three dots** (⋮) → **More Tools** → **Install WildCAT**

3. **Confirm Installation**
   - Click **"Install"** button
   - App opens in standalone window

4. **Access Your App**
   - Find in **Launchpad** (F4 or pinch gesture)
   - Search in **Spotlight** (Cmd + Space, type "WildCAT")
   - Appears in **/Applications** folder

5. **Add to Dock**
   - Right-click app icon in Dock
   - Select **Options** → **Keep in Dock**

### Method 2: Safari Installation

1. **Open Safari**
   - Navigate to: `https://[your-app-url].com`

2. **Add to Dock**
   - Click **Share** button (box with arrow)
   - Select **"Add to Dock"**
   - Or: **"Add to Home Screen"** on iOS

3. **Configure**
   - Enter a name: "WildCAT"
   - Click **"Add"**

4. **Launch**
   - Find icon in Dock or Launchpad
   - Opens in standalone Safari window

### Method 3: Drag to Applications (Chrome)

1. **Install via Chrome** (Method 1)
2. **Open Applications folder** (Cmd + Shift + A in Finder)
3. **Find "Chrome Apps"** folder
4. **Drag WildCAT icon** to main Applications folder
5. **Launch** like any Mac app

---

## ✅ Verification

### Check Installation Success

1. **Look for desktop icon/dock icon**
   - Should say "WildCAT"
   - Blue/purple gradient icon

2. **Test offline mode**:
   ```
   a. Open WildCAT app
   b. Disconnect internet (turn off Wi-Fi)
   c. Close and reopen WildCAT
   d. App should load instantly
   e. All features should work
   ```

3. **Verify PWA features**:
   - Standalone window (no address bar if installed via Method 1)
   - Fast loading (<1 second after first visit)
   - Works without browser open

### What You Should See

✅ **Desktop/Dock icon** - Quick access to app
✅ **Standalone window** - No browser UI
✅ **Instant loading** - Opens immediately
✅ **Offline capability** - Works without internet
✅ **localStorage** - Saved arrangements persist

---

## 🔌 Offline Usage

### First Time Setup (Requires Internet)

1. **Visit app URL** in browser
2. **Wait for full load** (~5 seconds)
3. **Service worker installs** automatically (background)
4. **Assets cached** (HTML, CSS, JS, icons)

### Using Offline

After first visit, app works completely offline:

- ✅ Upload CSV files
- ✅ Reorder columns
- ✅ Save arrangements
- ✅ Load saved arrangements
- ✅ Export reordered CSV files

**What Doesn't Work Offline**:
- ❌ App updates (checks on next online visit)
- ❌ External links (if any added later)

### Check Offline Status

1. **Open browser DevTools** (F12)
2. **Application tab** → **Service Workers**
3. Look for "Status: activated and running"

---

## 🐛 Troubleshooting

### Issue: Can't See Install Button

**Cause**: Browser doesn't support PWA or HTTPS required

**Solutions**:
1. **Use Chrome/Edge** (best PWA support)
   - Chrome 67+ (Windows/Mac)
   - Edge 79+ (Windows)
   - Safari 11.1+ (Mac, limited PWA support)

2. **Check URL uses HTTPS**
   - Must be `https://` (not `http://`)
   - Local development: `http://localhost` is allowed

3. **Clear browser cache**:
   - **Windows**: Ctrl + Shift + Delete
   - **Mac**: Cmd + Shift + Delete
   - Select "Cached images and files"
   - Revisit app URL

4. **Try incognito mode**:
   - **Windows**: Ctrl + Shift + N
   - **Mac**: Cmd + Shift + N
   - Install from incognito window

### Issue: App Won't Install on Mac (Safari)

**Cause**: Safari has stricter PWA requirements

**Solutions**:
1. **Use "Add to Dock" instead**
   - Works in Safari 14+
   - Provides similar experience

2. **Try Chrome on Mac**
   - Better PWA support
   - More consistent experience

3. **Update Safari**:
   - Go to **System Preferences** → **Software Update**
   - Install macOS updates
   - Safari 14+ required for PWA features

### Issue: App Opens in Browser Tab (Not Standalone)

**Cause**: Installed via bookmark/shortcut instead of PWA install

**Solution**:
1. **Uninstall** current bookmark/shortcut
2. **Reinstall** via Method 1 (install icon in address bar)
3. Look for **"display: standalone"** in manifest

### Issue: "Untrusted Developer" Warning (Mac)

**Cause**: macOS Gatekeeper blocking non-App Store apps

**Solution**:
1. **Right-click app icon**
2. Select **"Open"** (not double-click)
3. Click **"Open"** in dialog
4. Or: **System Preferences** → **Security & Privacy** → **"Open Anyway"**

### Issue: Slow Loading

**Cause**: Large CSV file or slow internet connection

**Solutions**:
1. **Wait for first load** (caches assets)
2. **Use smaller test CSV** for first run
3. **Check internet speed** (need 2+ Mbps)
4. **Close other browser tabs** (free up memory)

### Issue: CSV Won't Upload

**Cause**: File format or browser permissions

**Solutions**:
1. **Check file extension**: Must be `.csv`
2. **Verify CSV format**:
   - Comma-delimited (not semicolon/tab)
   - UTF-8 encoding
   - Valid CSV structure

3. **Check browser permissions**:
   - **Chrome**: Settings → Privacy → Site settings → File uploads
   - **Safari**: Safari → Preferences → Websites → Downloads

4. **Try different browser**

### Issue: Can't Save Arrangements

**Cause**: localStorage disabled or full

**Solutions**:
1. **Enable localStorage**:
   - **Chrome**: Settings → Privacy → Site settings → Cookies
   - **Safari**: Preferences → Privacy → Uncheck "Prevent cross-site tracking"

2. **Clear old arrangements**:
   - Delete unused arrangements in app
   - localStorage limit: ~10 MB (thousands of arrangements)

3. **Clear browser data**:
   - Keep "Cookies and site data" but clear cache

### Issue: Drag-and-Drop Not Working

**Cause**: Browser incompatibility or extension conflict

**Solutions**:
1. **Update browser** to latest version
2. **Disable extensions** (especially ad blockers)
3. **Try incognito mode** (extensions disabled)
4. **Use different browser** (Chrome recommended)
5. **Check mouse/trackpad** working correctly

### Issue: App Won't Work Offline

**Cause**: Service worker not installed or disabled

**Solutions**:
1. **Verify service worker**:
   - Open DevTools (F12)
   - Application tab → Service Workers
   - Should show "activated and running"

2. **Re-install PWA**:
   - Uninstall app
   - Clear browser cache
   - Visit URL (while online)
   - Wait 10 seconds
   - Install again

3. **Check browser settings**:
   - Ensure JavaScript enabled
   - Allow service workers in settings

### Issue: Exported CSV Looks Wrong

**Cause**: Excel opening CSV with wrong delimiter

**Solutions**:
1. **Open in text editor first** (Notepad/TextEdit)
   - Verify commas present
   - Check for proper quotes

2. **Import into Excel**:
   - Don't double-click CSV
   - Excel → Data → From Text/CSV
   - Select "Comma" as delimiter

3. **Use Google Sheets**:
   - Upload CSV to Google Drive
   - Open in Google Sheets
   - Better CSV handling

---

## 🔄 Uninstallation

### Windows (Chrome/Edge)

1. **Right-click app icon** on desktop or Start Menu
2. Select **"Uninstall"** or **"Remove"**
3. Or: **Chrome Settings** → **Apps** → **Manage apps** → Find WildCAT → **Uninstall**

### Mac (Chrome)

1. **Open Chrome**
2. Type: `chrome://apps` in address bar
3. **Right-click WildCAT** icon
4. Select **"Remove from Chrome"**
5. Or: Delete from **/Applications/Chrome Apps** folder

### Mac (Safari)

1. **Right-click icon** in Dock
2. Select **"Options"** → **"Remove from Dock"**
3. Delete from **/Applications** if added there

---

## 🆘 Still Need Help?

### Check System Requirements

**Minimum**:
- **Windows 10** or **macOS 10.13+**
- **Chrome 67+**, **Edge 79+**, or **Safari 11.1+**
- **2 GB RAM** (4 GB recommended)
- **100 MB free disk space**
- **Internet connection** (for first install only)

### Browser Compatibility

| Browser | Windows | Mac | PWA Support |
|---------|---------|-----|-------------|
| Chrome 90+ | ✅ | ✅ | Full |
| Edge 90+ | ✅ | ✅ | Full |
| Safari 14+ | ❌ | ✅ | Limited |
| Firefox 88+ | ⚠️ | ⚠️ | Partial |

**Legend**:
- ✅ Full support
- ⚠️ Limited support (may open in tab)
- ❌ Not available

### Get More Help

1. **Developer Tools Console**:
   - Press **F12** (Windows) or **Cmd + Option + I** (Mac)
   - Look for error messages in **Console** tab
   - Screenshot and report issues

2. **Check App Status**:
   - DevTools → **Application** tab
   - Check **Manifest**, **Service Workers**, **Storage**

3. **Network Status**:
   - DevTools → **Network** tab
   - Reload app
   - Check for failed requests (red entries)

---

## 📱 Bonus: Mobile Installation (iOS/Android)

### iOS (Safari)

1. Open Safari on iPhone/iPad
2. Navigate to app URL
3. Tap **Share** icon
4. Select **"Add to Home Screen"**
5. Tap **"Add"**
6. Icon appears on home screen

### Android (Chrome)

1. Open Chrome on Android
2. Navigate to app URL
3. Tap **three dots** (⋮)
4. Select **"Add to Home screen"**
5. Tap **"Add"**
6. Confirm installation

---

**Version**: 1.0.0
**Last Updated**: 2025-10-29
**Supported Platforms**: Windows 10+, macOS 10.13+, iOS 14+, Android 10+
