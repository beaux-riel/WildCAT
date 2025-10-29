# Release Workflow Fix - Code Signing Issue

## Problem Summary

The GitHub Actions release workflow was completing successfully but **only uploading source code files** (.zip and .tar.gz). No actual installer files (.dmg or .exe) were being created or uploaded.

### What You Saw
```
Assets (2)
- Source code (zip)
- Source code (tar.gz)
```

### What You Expected
```
Assets (4+)
- Source code (zip)
- Source code (tar.gz)
- WildCAT-v1.0.0-mac-x64.dmg
- WildCAT-v1.0.0-win-x64-setup.exe
```

## Root Cause Analysis

### Issue #1: Code Signing Failure

The electron-builder was attempting to code sign the application but failed because:

1. **Missing Entitlements File**: Referenced `build/entitlements.mac.plist` which didn't exist
2. **No Certificates in CI**: GitHub Actions runners don't have your Apple Developer certificates
3. **Build Stopped**: Code signing failure prevented DMG/EXE creation

**Error Log:**
```
⨯ Command failed: codesign --sign Apple Development: Beaux Walton (F842TWLKX3)
build/entitlements.mac.plist: cannot read entitlement data
```

### Issue #2: File Path Search Pattern

The workflow was looking for files with:
```yaml
files: release/*.dmg  # Only searches top-level directory
```

But electron-builder creates files in subdirectories:
```
release/
├── mac/
│   └── WildCAT.dmg
└── win/
    └── WildCAT Setup.exe
```

## Solution Implemented

### 1. Disable Code Signing in CI

**electron-builder.json changes:**
```json
{
  "mac": {
    "hardenedRuntime": false,  // Was: true
    // Removed: "entitlements": "build/entitlements.mac.plist"
    // Removed: "entitlementsInherit": "build/entitlements.mac.plist"
  }
}
```

**Workflow changes:**
```yaml
- name: Build Electron app (macOS)
  run: npm run dist:mac
  env:
    CSC_IDENTITY_AUTO_DISCOVERY: false  # Disable code signing
```

### 2. Fix File Upload Patterns

**Before:**
```yaml
files: release/*.dmg  # Only top-level
```

**After:**
```yaml
files: |
  release/*.dmg      # Top-level
  release/**/*.dmg   # Recursive search
```

### 3. Use Universal Icon Format

Changed from platform-specific formats to PNG:
```json
{
  "mac": {
    "icon": "public/icon.png"  // Was: "public/icon.icns"
  },
  "win": {
    "icon": "public/icon.png"  // Was: "public/icon.ico"
  }
}
```

## Testing the Fix

### Push Changes
```bash
git push origin master
```

### Monitor Workflow
1. Go to: https://github.com/beaux-riel/WildCAT/actions
2. Watch "Build and Release Desktop Apps" workflow
3. Wait ~5-10 minutes for completion

### Expected Result
The release should now include:

**macOS Builds:**
- WildCAT-v1.0.0-449c883-mac-x64.dmg
- WildCAT-v1.0.0-449c883-mac-arm64.dmg

**Windows Builds:**
- WildCAT-v1.0.0-449c883-win-x64-setup.exe
- WildCAT-v1.0.0-449c883-win-ia32-setup.exe

## Code Signing for Production (Optional)

If you want code-signed apps in the future:

### macOS Code Signing

1. **Export your certificate:**
   ```bash
   # Export from Keychain Access as .p12 file
   # Password protect it
   ```

2. **Add GitHub secrets:**
   - Go to repo Settings > Secrets and variables > Actions
   - Add `APPLE_CERT_DATA`: Base64 of your .p12 file
     ```bash
     base64 -i certificate.p12 | pbcopy
     ```
   - Add `APPLE_CERT_PASSWORD`: Certificate password

3. **Update workflow:**
   ```yaml
   - name: Build Electron app (macOS)
     run: npm run dist:mac
     env:
       CSC_LINK: ${{ secrets.APPLE_CERT_DATA }}
       CSC_KEY_PASSWORD: ${{ secrets.APPLE_CERT_PASSWORD }}
       # Remove CSC_IDENTITY_AUTO_DISCOVERY: false
   ```

4. **Re-enable in electron-builder.json:**
   ```json
   {
     "mac": {
       "hardenedRuntime": true
     }
   }
   ```

### Windows Code Signing

Similar process with Windows code signing certificate:
- Add `WIN_CERT_DATA` and `WIN_CERT_PASSWORD` secrets
- Configure in workflow

## Why Code Signing Matters

### Without Code Signing:
- ⚠️ macOS shows "unverified developer" warning
- ⚠️ Windows SmartScreen may block installation
- ✅ Users can still install by allowing exceptions
- ✅ Suitable for personal use, testing, small teams

### With Code Signing:
- ✅ No security warnings
- ✅ Professional appearance
- ✅ Required for Mac App Store
- ✅ Better user trust
- 💰 Requires Apple Developer Program ($99/year)
- 💰 Requires code signing certificate for Windows

## For Now

The app builds **successfully without code signing**. Users will see a warning but can still install. This is perfect for:
- Development and testing
- Internal distribution
- Personal use
- Open source projects

When ready for public distribution, add code signing using the instructions above.

## Files Changed

```
✅ electron-builder.json       - Removed code signing requirements
✅ .github/workflows/release.yml - Added CSC_IDENTITY_AUTO_DISCOVERY=false
✅ .github/workflows/release.yml - Fixed file upload patterns
```

## Commit Reference

Fixed in commit: `75550fb`

## Next Steps

1. **Push the fix**: `git push origin master`
2. **Watch the build**: Check GitHub Actions
3. **Download installers**: Check GitHub Releases
4. **Test installation**: Try the installers on your machines
5. **(Optional) Add code signing**: Follow instructions above when ready

---

**The release workflow should now work correctly and produce actual installer files!** 🎉
