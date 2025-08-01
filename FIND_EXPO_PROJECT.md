# How to Find Your Expo Project

Your project ID is: `04cb6672-3826-49e1-bbc2-d61897a118b6`

## Method 1: Direct URL Access
Go directly to your project using this URL:
```
https://expo.dev/accounts/[YOUR_USERNAME]/projects/04cb6672-3826-49e1-bbc2-d61897a118b6
```
Replace `[YOUR_USERNAME]` with your actual Expo username.

## Method 2: Search in Expo Dashboard
1. Go to [expo.dev](https://expo.dev)
2. Log into your account
3. Look for "Projects" in the sidebar
4. Search for project ID: `04cb6672-3826-49e1-bbc2-d61897a118b6`
5. Or look for project name: "HIIT Workout"

## Method 3: If Project Doesn't Exist Yet
If you can't find the project, it might need to be created first:

1. **Option A: Create via CLI locally**
   ```bash
   npx expo login
   npx eas init --id 04cb6672-3826-49e1-bbc2-d61897a118b6
   ```

2. **Option B: Create new project on expo.dev**
   - Go to expo.dev
   - Click "Create Project"
   - Use the existing project ID when prompted

## Method 4: Check Your Account
Make sure you're logged into the correct Expo account that owns project ID `04cb6672-3826-49e1-bbc2-d61897a118b6`.

## What to Look For
Your project should show:
- Name: "HIIT Workout"
- Bundle ID: com.hiitworkout.app
- Project ID: 04cb6672-3826-49e1-bbc2-d61897a118b6

## Next Steps Once Found
1. Connect your Git repository to the project
2. Configure build settings
3. Start building for iOS and Android

If you still can't find it, the project might need to be initialized first with the CLI commands above.