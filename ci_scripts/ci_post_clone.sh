#!/bin/sh
set -euo pipefail

echo "🟣 Post-clone: build web and copy into iOS (Capacitor)"

# Install node deps (prefer npm ci when lockfile exists)
if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi

# Build the web app (outputs to dist/public)
npm run build

# Copy web assets into the iOS project (Capacitor)
npx cap copy ios

# Install CocoaPods for the iOS workspace
cd ios/App
pod install --repo-update
