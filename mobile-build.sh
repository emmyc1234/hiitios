#!/bin/bash

# HIIT Workout Mobile App Build Script
echo "Building HIIT Workout App for Mobile..."

# Build the web app first
echo "Step 1: Building web app..."
npm run build

# Sync with Capacitor
echo "Step 2: Syncing with Capacitor..."
npx cap sync

echo "Mobile build complete!"
echo ""
echo "Next steps:"
echo "- For iOS: npx cap open ios"
echo "- For Android: npx cap open android"
echo ""
echo "In Xcode (iOS):"
echo "1. Select a development team in Signing & Capabilities"
echo "2. Choose a deployment target (iPhone/iPad)"
echo "3. Click the Play button to run on simulator or device"
echo ""
echo "In Android Studio:"
echo "1. Make sure you have an Android emulator running or device connected"
echo "2. Click the green Play button to build and run"