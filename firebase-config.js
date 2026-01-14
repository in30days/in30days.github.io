// Firebase Configuration
// Replace these placeholder values with your actual Firebase project config
// Get these values from: Firebase Console > Project Settings > Your Apps > Web App

const firebaseConfig = {
  apiKey: "PLACEHOLDER_API_KEY",
  authDomain: "PLACEHOLDER_PROJECT_ID.firebaseapp.com",
  projectId: "PLACEHOLDER_PROJECT_ID",
  storageBucket: "PLACEHOLDER_PROJECT_ID.appspot.com",
  messagingSenderId: "PLACEHOLDER_SENDER_ID",
  appId: "PLACEHOLDER_APP_ID"
};

// Instructions:
// 1. Go to https://console.firebase.google.com/
// 2. Create a new project or select existing one
// 3. Enable Authentication > Sign-in method > Anonymous
// 4. Enable Firestore Database (start in test mode for development)
// 5. Go to Project Settings > Your Apps > Add Web App
// 6. Copy the config values and replace the placeholders above

export default firebaseConfig;
