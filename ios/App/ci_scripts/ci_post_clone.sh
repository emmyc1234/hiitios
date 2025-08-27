#!/bin/sh
set -euo pipefail

echo "🟣 Post-clone: build web and copy into iOS (Capacitor)"
# Ensure Node deps are present; Xcode Cloud runners have Node and npm preinstalled.
if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi
npm run build
npx cap copy ios
cd ios/App
pod install --repo-update
