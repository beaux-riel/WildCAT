# Release Process Documentation

This document describes how to create releases of the WildCAT desktop application.

## Automated Release System

The repository is configured with GitHub Actions to automatically build and release desktop applications for Windows and macOS whenever changes are pushed to the `master` branch.

## How It Works

### Automatic Releases

1. **Push to Master**: When code is pushed to the `master` branch, the GitHub Actions workflow automatically:
   - Creates a new GitHub Release
   - Builds the desktop app for Windows (x64 and ia32)
   - Builds the desktop app for macOS (x64, arm64, and universal)
   - Uploads all installers to the GitHub Release

2. **Version Naming**: Automatic releases are tagged with the version from `package.json` plus the git commit hash:
   - Format: `v{version}-{commit-hash}`
   - Example: `v1.0.0-a1b2c3d`

### Tagged Releases

For official versioned releases:

1. **Create Version Tag**: Use the version bump script or manually tag
2. **Push Tag**: Push the tag to GitHub
3. **Automatic Build**: GitHub Actions builds and creates the release

## Creating a Release

### Method 1: Automatic Version Bump (Recommended)

Use the provided script to bump version, commit, and tag:

```bash
# Bump patch version (1.0.0 -> 1.0.1)
./scripts/bump-version.sh patch

# Bump minor version (1.0.0 -> 1.1.0)
./scripts/bump-version.sh minor

# Bump major version (1.0.0 -> 2.0.0)
./scripts/bump-version.sh major
```

This script will:
1. ✅ Verify you're on the master branch
2. ✅ Ensure working directory is clean
3. ✅ Update `package.json` version
4. ✅ Update `package-lock.json`
5. ✅ Commit the changes
6. ✅ Create a git tag (e.g., `v1.0.1`)

Then push to trigger the release:

```bash
git push origin master --tags
```

### Method 2: Manual Tagging

If you want to create a release without changing the version number:

```bash
# Create a tag manually
./scripts/manual-release.sh v1.0.0

# Or use git directly
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push the tag
git push origin v1.0.0
```

### Method 3: GitHub UI Manual Trigger

You can also manually trigger the release workflow from GitHub:

1. Go to **Actions** tab
2. Select **Build and Release Desktop Apps**
3. Click **Run workflow**
4. Enter a version (e.g., `v1.0.0`) or leave blank for auto-version
5. Click **Run workflow**

## Release Workflow Details

### GitHub Actions Workflow

The workflow runs three parallel jobs:

#### 1. Create Release Job
- Determines version from tag or generates auto-version
- Creates GitHub Release with description
- Provides upload URL for artifacts

#### 2. Build macOS Job
- Runs on: `macos-latest`
- Builds for: x64, arm64, universal
- Outputs: `.dmg` installers
- Upload location: GitHub Release assets

#### 3. Build Windows Job
- Runs on: `windows-latest`
- Builds for: x64, ia32
- Outputs: `.exe` NSIS installers
- Upload location: GitHub Release assets

### Build Artifacts

Each release includes:

**macOS:**
- `WildCAT-{version}-mac-x64.dmg` (Intel Macs)
- `WildCAT-{version}-mac-arm64.dmg` (Apple Silicon)
- `WildCAT-{version}-mac-universal.dmg` (Universal)

**Windows:**
- `WildCAT-{version}-win-x64-setup.exe` (64-bit)
- `WildCAT-{version}-win-ia32-setup.exe` (32-bit)

## Testing Before Release

### Test Build on PR

The `build-test.yml` workflow automatically runs on pull requests to test builds on all platforms without creating releases.

### Local Testing

Test builds locally before pushing:

```bash
# Build web app
npm run build

# Test package (no installer)
npm run pack

# Full distribution build
npm run dist

# Platform-specific builds
npm run dist:mac
npm run dist:win
```

## Release Checklist

Before creating a release:

- [ ] All tests passing
- [ ] Code reviewed and merged to master
- [ ] `package.json` version updated (if using manual method)
- [ ] `CHANGELOG.md` updated (if applicable)
- [ ] No uncommitted changes
- [ ] On master branch

After creating a release:

- [ ] Verify release created on GitHub
- [ ] Check all build artifacts uploaded
- [ ] Test download and installation on each platform
- [ ] Update documentation if needed
- [ ] Announce release (if applicable)

## Troubleshooting

### Release Failed

Check the GitHub Actions logs:
1. Go to **Actions** tab
2. Click on the failed workflow run
3. Review job logs for errors

Common issues:
- **Build failures**: Check node version, dependencies
- **Upload failures**: Verify GITHUB_TOKEN permissions
- **File not found**: Check file naming in `electron-builder.json`

### Missing Artifacts

If artifacts are missing from the release:

1. Check the workflow logs for upload errors
2. Verify file names match between build output and workflow
3. Check electron-builder configuration in `electron-builder.json`
4. Ensure `continue-on-error: true` isn't hiding errors

### Version Conflicts

If tag already exists:

```bash
# Delete local tag
git tag -d v1.0.0

# Delete remote tag
git push origin :refs/tags/v1.0.0

# Recreate tag
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

## Code Signing (Optional)

For production releases, you may want to sign your applications:

### macOS Code Signing

1. Obtain Apple Developer certificate
2. Add secrets to GitHub repository:
   - `APPLE_CERT_DATA`: Base64-encoded certificate
   - `APPLE_CERT_PASSWORD`: Certificate password
   - `APPLE_ID`: Apple ID email
   - `APPLE_ID_PASSWORD`: App-specific password

3. Update workflow to use signing:
```yaml
- name: Build Electron app (macOS)
  run: npm run dist:mac
  env:
    CSC_LINK: ${{ secrets.APPLE_CERT_DATA }}
    CSC_KEY_PASSWORD: ${{ secrets.APPLE_CERT_PASSWORD }}
    APPLE_ID: ${{ secrets.APPLE_ID }}
    APPLE_ID_PASSWORD: ${{ secrets.APPLE_ID_PASSWORD }}
```

### Windows Code Signing

1. Obtain code signing certificate
2. Add secrets to GitHub repository:
   - `WIN_CERT_DATA`: Base64-encoded certificate
   - `WIN_CERT_PASSWORD`: Certificate password

3. Update workflow to use signing:
```yaml
- name: Build Electron app (Windows)
  run: npm run dist:win
  env:
    CSC_LINK: ${{ secrets.WIN_CERT_DATA }}
    CSC_KEY_PASSWORD: ${{ secrets.WIN_CERT_PASSWORD }}
```

## Continuous Deployment Strategy

### Development Builds
- Trigger: Every push to master
- Version: Auto-generated with commit hash
- Purpose: Testing and preview
- Location: GitHub Releases (marked as pre-release if desired)

### Stable Releases
- Trigger: Version tags (v1.0.0, v2.0.0, etc.)
- Version: Semantic versioning
- Purpose: Production downloads
- Location: GitHub Releases (marked as stable)

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Electron Builder Documentation](https://www.electron.build/)
- [Semantic Versioning](https://semver.org/)
- [GitHub Releases](https://docs.github.com/en/repositories/releasing-projects-on-github)

## Support

For issues with the release process:
1. Check GitHub Actions workflow logs
2. Review this documentation
3. Check electron-builder logs locally
4. Open an issue with workflow logs attached
