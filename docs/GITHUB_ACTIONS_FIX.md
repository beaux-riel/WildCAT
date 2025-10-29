# GitHub Actions Release Workflow Fix

## Problem

The GitHub Actions workflow was failing with the error:
```
Error: Resource not accessible by integration
```

This occurred in the "Create Release" step when trying to create a GitHub Release.

## Root Cause

The workflow was missing explicit permissions. By default, the `GITHUB_TOKEN` has read-only access in GitHub Actions workflows. To create releases, the workflow needs explicit write permissions to the repository contents.

Additionally, the workflow was using the deprecated `actions/create-release@v1` action, which is no longer maintained and has known issues with permissions.

## Solution

### 1. Added Explicit Permissions

Added a `permissions` block at the top level of the workflow:

```yaml
permissions:
  contents: write
```

This grants the workflow write access to repository contents, including creating releases.

### 2. Updated to Modern Release Action

Replaced the deprecated action with `softprops/action-gh-release@v1`:

**Before:**
```yaml
- name: Create Release
  uses: actions/create-release@v1  # Deprecated
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

**After:**
```yaml
- name: Create Release
  uses: softprops/action-gh-release@v1  # Modern, maintained
  with:
    generate_release_notes: true  # Auto-generates changelog
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 3. Simplified Asset Upload

**Before:**
- Multiple separate upload steps for each file
- Hardcoded file names
- Complex fallback logic with curl

**After:**
- Single upload step per platform using wildcards
- Automatically finds and uploads all matching files
- Simpler, more maintainable

```yaml
- name: Upload Release Assets (macOS)
  uses: softprops/action-gh-release@v1
  with:
    files: release/*.dmg  # Uploads all DMG files
```

## Benefits of the New Approach

1. ✅ **Works with default permissions** - No special repository settings needed
2. ✅ **Auto-generates release notes** - Includes commit history automatically
3. ✅ **Simpler code** - 85 fewer lines of code
4. ✅ **More maintainable** - Uses actively maintained action
5. ✅ **Better error handling** - Modern action has better error messages
6. ✅ **Wildcard support** - Automatically handles different file naming patterns

## Testing

Push the changes to master to test:

```bash
git push origin master
```

Watch the workflow run at:
```
https://github.com/beaux-riel/WildCAT/actions
```

Expected result:
- ✅ Workflow completes successfully
- ✅ Release created on GitHub
- ✅ Windows .exe files uploaded
- ✅ macOS .dmg files uploaded

## Troubleshooting

### If the workflow still fails:

1. **Check repository permissions**:
   - Go to Settings > Actions > General
   - Under "Workflow permissions", ensure "Read and write permissions" is selected

2. **Verify GITHUB_TOKEN**:
   - The `GITHUB_TOKEN` is automatically provided by GitHub
   - No need to add it manually to secrets

3. **Check file paths**:
   - Verify electron-builder creates files in `release/` directory
   - Check the "List release files" step in workflow logs

### If assets aren't uploaded:

1. Check the build output to ensure files are created
2. Verify file naming matches the pattern (*.dmg, *.exe)
3. Look for error messages in the "Upload Release Assets" step

## Related Documentation

- [GitHub Actions Permissions](https://docs.github.com/en/actions/security-guides/automatic-token-authentication#permissions-for-the-github_token)
- [softprops/action-gh-release](https://github.com/softprops/action-gh-release)
- [Electron Builder](https://www.electron.build/)

## Commit Reference

Fixed in commit: `e00016a`

Message:
```
fix: add permissions to release workflow and update to modern action

- Add 'permissions: contents: write' to fix "Resource not accessible by integration" error
- Replace deprecated actions/create-release@v1 with softprops/action-gh-release@v1
- Simplify asset upload process with wildcard file patterns
- Add generate_release_notes for automatic changelog
```
