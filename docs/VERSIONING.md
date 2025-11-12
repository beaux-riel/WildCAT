# WildCAT Versioning Strategy

## Overview

WildCAT uses **automatic semantic versioning** for releases. The version number is determined based on how the GitHub Actions workflow is triggered.

## How Versioning Works

### 1. Tag-Based Releases (Recommended)

When you push a git tag, the release uses that tag as the version:

```bash
# Create and push a tag for version 1.2.0
git tag v1.2.0
git push origin v1.2.0
```

This will create a release with version **v1.2.0** and all build artifacts will be versioned as `1.2.0`.

### 2. Manual Workflow Dispatch

You can manually trigger the workflow from GitHub Actions with a custom version:

1. Go to **Actions** → **Build and Release Desktop Apps**
2. Click **Run workflow**
3. Enter a version like `v1.3.0`
4. The release will use the specified version

### 3. Automatic Patch Increment (Push to Master)

When you push to the `master` branch without a tag:

- The workflow reads the current version from `package.json`
- Automatically increments the **patch** version
- Creates a release with the new version (e.g., `1.0.0` → `v1.0.1`)

## Version Bump Script

A helper script is available at `scripts/bump-version.js` for local version management:

```bash
# Increment patch version (1.0.0 → 1.0.1)
node scripts/bump-version.js patch

# Increment minor version (1.0.0 → 1.1.0)
node scripts/bump-version.js minor

# Increment major version (1.0.0 → 2.0.0)
node scripts/bump-version.js major
```

This script updates `package.json` with the new version. You can then commit and tag:

```bash
node scripts/bump-version.js minor
git add package.json
git commit -m "Bump version to $(node -p "require('./package.json').version")"
git tag v$(node -p "require('./package.json').version")
git push origin master --tags
```

## Semantic Versioning Guidelines

WildCAT follows [Semantic Versioning](https://semver.org/) (SemVer):

- **MAJOR** version (X.0.0): Incompatible API changes or major rewrites
- **MINOR** version (0.X.0): New features, backwards-compatible
- **PATCH** version (0.0.X): Bug fixes, backwards-compatible

### When to Increment

| Change Type | Version Bump | Example |
|-------------|--------------|---------|
| Bug fixes, small improvements | Patch | 1.0.0 → 1.0.1 |
| New features, functionality | Minor | 1.0.0 → 1.1.0 |
| Breaking changes, major refactor | Major | 1.0.0 → 2.0.0 |

## Build Artifacts

After the version is determined, electron-builder creates artifacts with the version in the filename:

### macOS
- `WildCAT-{version}-arm64.dmg` (Apple Silicon)
- `WildCAT-{version}-x64.dmg` (Intel)
- `WildCAT-{version}-arm64.zip`
- `WildCAT-{version}-x64.zip`

### Windows
- `WildCAT-{version}-x64-setup.exe`
- `WildCAT-{version}-ia32-setup.exe`
- `WildCAT-{version}-x64.zip`
- `WildCAT-{version}-ia32.zip`

## GitHub Actions Workflow

The release workflow (`.github/workflows/release.yml`) handles versioning automatically:

1. **Create Release Job**: Determines version and creates GitHub release
2. **Build Jobs**: Update `package.json` with the version before building
3. **Upload Assets**: Upload build artifacts to the release

### Key Fixes Applied

- ✅ **Dynamic versioning**: Version is now properly extracted and applied to builds
- ✅ **False failure prevention**: Added `fail_on_unmatched_files: false` to prevent 404 upload errors from failing the workflow
- ✅ **Artifact naming**: Filenames now include proper version numbers
- ✅ **Version propagation**: `package.json` is updated before building so electron-builder uses the correct version

## Troubleshooting

### All builds show version 1.0.0

**Fixed!** The workflow now updates `package.json` before building, ensuring electron-builder uses the correct version.

### GitHub Actions show "Failure" but files uploaded

**Fixed!** Added `fail_on_unmatched_files: false` to the upload step. The 404 errors were false positives from the upload action trying to match glob patterns that don't exist.

### How to create a new release

**Recommended workflow:**

```bash
# 1. Update package.json version
node scripts/bump-version.js minor

# 2. Commit the version change
git add package.json
git commit -m "Release v$(node -p "require('./package.json').version")"

# 3. Create and push tag
git tag v$(node -p "require('./package.json').version")
git push origin master --tags

# GitHub Actions will automatically build and release!
```

## Continuous Delivery

Every push to `master` automatically:
1. Auto-increments the patch version
2. Builds for macOS and Windows
3. Creates a GitHub release
4. Uploads all build artifacts

This enables rapid iteration and continuous delivery of desktop applications.
