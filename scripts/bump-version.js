#!/usr/bin/env node

/**
 * Version Bumping Script for WildCAT
 *
 * This script automatically increments the version in package.json
 * based on the type of bump requested (patch, minor, major).
 *
 * Usage:
 *   node scripts/bump-version.js [patch|minor|major]
 *
 * If no argument provided, defaults to 'patch'
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Get bump type from command line args (default to 'patch')
const bumpType = process.argv[2] || 'patch';

// Valid bump types
const validTypes = ['patch', 'minor', 'major'];

if (!validTypes.includes(bumpType)) {
  console.error(`Invalid bump type: ${bumpType}`);
  console.error(`Valid types: ${validTypes.join(', ')}`);
  process.exit(1);
}

// Read package.json
const packagePath = join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'));

// Parse current version
const currentVersion = packageJson.version;
const versionParts = currentVersion.split('.').map(Number);

if (versionParts.length !== 3 || versionParts.some(isNaN)) {
  console.error(`Invalid version format in package.json: ${currentVersion}`);
  process.exit(1);
}

let [major, minor, patch] = versionParts;

// Increment based on bump type
switch (bumpType) {
  case 'major':
    major++;
    minor = 0;
    patch = 0;
    break;
  case 'minor':
    minor++;
    patch = 0;
    break;
  case 'patch':
    patch++;
    break;
}

const newVersion = `${major}.${minor}.${patch}`;

// Update package.json
packageJson.version = newVersion;

// Write back to package.json with pretty formatting
writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n', 'utf8');

console.log(`Version bumped: ${currentVersion} → ${newVersion}`);
console.log(`Bump type: ${bumpType}`);

// Output for GitHub Actions
console.log(`::set-output name=version::${newVersion}`);
console.log(`::set-output name=old_version::${currentVersion}`);
