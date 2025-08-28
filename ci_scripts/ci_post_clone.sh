#!/bin/sh
set -euo pipefail

echo "🔧 Post-clone: install deps, build web, copy into iOS, install pods"

# Node deps
if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi

# Build your web app into dist/public
npm run build

# Copy web into iOS and refresh native side
npx cap copy ios

# Install CocoaPods
cd ios/App
pod install --repo-update
