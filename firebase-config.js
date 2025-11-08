// Firebase Configuration
// Your Firebase project credentials

const firebaseConfig = {
    apiKey: "AIzaSyB1sHLkJlDqcmNqZqvh95ImGOtoQuFzfx8",
    authDomain: "thefortunelog.firebaseapp.com",
    projectId: "thefortunelog",
    storageBucket: "thefortunelog.firebasestorage.app",
    messagingSenderId: "322591122851",
    appId: "1:322591122851:web:4afc82f4dbfed95d9be616"
};

// Initialize Firebase (only if config is valid)
let db = null;
let auth = null;
let isFirebaseReady = false;

if (firebaseConfig.apiKey && firebaseConfig.apiKey !== "YOUR_API_KEY") {
    try {
        firebase.initializeApp(firebaseConfig);
        db = firebase.firestore();
        auth = firebase.auth();
        isFirebaseReady = true;
        console.log('Firebase initialized successfully');
    } catch (error) {
        console.error('Firebase initialization error:', error);
    }
} else {
    console.warn('Firebase not configured. Please update firebase-config.js with your Firebase credentials.');
}

