#!/bin/bash

# Manual release script without version bump
# Usage: ./scripts/manual-release.sh [version]
# Example: ./scripts/manual-release.sh v1.0.0

set -e

VERSION=${1:-"v$(node -p "require('./package.json').version")"}

echo "🚀 Creating manual release for version: $VERSION"

# Ensure working directory is clean
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  Warning: Working directory has uncommitted changes"
    git status --short
    echo ""
    read -p "Continue anyway? (y/N) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Create or update tag
if git rev-parse "$VERSION" >/dev/null 2>&1; then
    echo "⚠️  Tag $VERSION already exists"
    read -p "Force update tag? (y/N) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git tag -fa "$VERSION" -m "Release version $VERSION"
    else
        exit 1
    fi
else
    echo "🏷️  Creating git tag $VERSION..."
    git tag -a "$VERSION" -m "Release version $VERSION"
fi

echo ""
echo "✅ Tag $VERSION created/updated"
echo ""
echo "Next steps:"
echo "  Push tag to trigger release: git push origin $VERSION --force"
echo ""
echo "Or to undo:"
echo "  git tag -d $VERSION"
