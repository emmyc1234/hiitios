# How to Connect Your HIIT Workout App to Expo

Your project is already configured for Expo with project ID `04cb6672-3826-49e1-bbc2-d61897a118b6`. Here's how to connect it:

## Option 1: Connect via Git Repository (Recommended)

### Step 1: Create a Git Repository
1. Go to GitHub, GitLab, or Bitbucket
2. Create a new repository (e.g., "hiit-workout-app")
3. Follow their instructions to push your code

### Step 2: Connect Expo to Your Repository
1. Go to [expo.dev](https://expo.dev)
2. Log into your Expo account
3. Navigate to your project: `04cb6672-3826-49e1-bbc2-d61897a118b6`
4. Connect it to your Git repository
5. Expo will automatically detect your `app.json` configuration

### Step 3: Build from Expo Dashboard
Once connected, you can trigger builds directly from the Expo web dashboard without needing local setup.

## Option 2: Download and Setup Locally

### Step 1: Download Your Project
1. Download all files from this Replit project
2. Extract to a local folder

### Step 2: Install Dependencies
```bash
cd your-project-folder
npm install
```

### Step 3: Login to Expo
```bash
npx expo login
```

### Step 4: Initialize with Your Project ID
```bash
npx eas init --id 04cb6672-3826-49e1-bbc2-d61897a118b6
```

### Step 5: Build and Submit
```bash
npx eas build --platform all --auto-submit
```

## Your Project Configuration

Already set up in your project:
- ✅ `app.json` with your Expo project ID
- ✅ `eas.json` with build configurations
- ✅ Bundle ID: `com.hiitworkout.app`
- ✅ App name: "HIIT Workout"

## What Expo Will Build

Your complete HIIT workout app with:
- Goal-specific workouts (fat loss, strength, endurance)
- Exercise variety and smart repetition control
- Voice announcements and countdown timers
- All exercise demonstration images
- Mobile-optimized interface

## Next Steps

Choose Option 1 (Git repository) for the easiest workflow, or Option 2 if you prefer local development. Either way, your app is ready to build and deploy to both App Store and Google Play Store!