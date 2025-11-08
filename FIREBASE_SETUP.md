# 🔥 Firebase Setup Guide for TheFortuneLog

This guide will help you set up Firebase to enable cloud sync for your fortunes across all devices.

## Why Firebase?

- ✅ **Free tier** - Generous free quota (50K reads/day, 20K writes/day)
- ✅ **Real-time sync** - Changes appear instantly across devices
- ✅ **No backend needed** - Everything runs client-side
- ✅ **Anonymous auth** - No user accounts needed
- ✅ **Secure** - Google's infrastructure

## Step-by-Step Setup

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `the-fortune-log` (or any name you like)
4. Disable Google Analytics (optional, not needed)
5. Click **"Create project"**

### 2. Enable Authentication

1. In your Firebase project, click **"Authentication"** in the left menu
2. Click **"Get started"**
3. Go to the **"Sign-in method"** tab
4. Click on **"Anonymous"**
5. Toggle **"Enable"** and click **"Save"**

### 3. Create Firestore Database

1. Click **"Firestore Database"** in the left menu
2. Click **"Create database"**
3. Select **"Start in test mode"** (for now)
4. Choose a location (closest to you)
5. Click **"Enable"**

### 4. Get Your Firebase Config

1. Click the **gear icon** ⚙️ next to "Project Overview"
2. Select **"Project settings"**
3. Scroll down to **"Your apps"** section
4. Click the **Web icon** `</>`
5. Register your app with nickname: `TheFortuneLog`
6. Copy the `firebaseConfig` object

### 5. Update firebase-config.js

Open `firebase-config.js` and replace the placeholder values:

```javascript
const firebaseConfig = {
    apiKey: "AIza...",           // Your API key
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "1:123456789:web:abc123"
};
```

### 6. Set Firestore Security Rules

1. Go to **Firestore Database** → **Rules** tab
2. Replace the rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anonymous users to read/write their own fortunes
    match /users/{userId}/fortunes/{fortuneId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

3. Click **"Publish"**

## Testing

1. Open `index.html` in your browser
2. Check the browser console (F12) for "Firebase initialized successfully"
3. You should see "☁️ Synced" badge in the header
4. Add a fortune - it should sync to Firebase automatically!

## How It Works

- **Anonymous Authentication**: Each browser gets a unique anonymous ID
- **Real-time Sync**: Changes sync instantly across devices using the same browser
- **Offline Support**: Works offline, syncs when online
- **Local Backup**: Still saves to localStorage as backup

## Important Notes

⚠️ **Security**: The current setup uses anonymous auth. Each browser/device gets its own anonymous ID, so fortunes sync across tabs in the same browser but NOT across different browsers/devices automatically.

💡 **To sync across different devices**: You'd need to implement email/password auth or share the anonymous user ID (more advanced).

## Troubleshooting

- **"Firebase not configured"**: Check that you updated `firebase-config.js`
- **"Permission denied"**: Check Firestore security rules
- **"Sync Error"**: Check browser console for details
- **Still using local storage**: Firebase config might be incorrect

## Free Tier Limits

- **50,000 reads/day** - Plenty for personal use
- **20,000 writes/day** - More than enough
- **1 GB storage** - Can store millions of fortunes

You'll never hit these limits with normal usage!

---

Need help? Check the [Firebase Documentation](https://firebase.google.com/docs)

