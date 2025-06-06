import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDi5-5d1jkellma4ajusOt3GvfEcBsQtTA",
  authDomain: "global-shootingleague.firebaseapp.com",
  projectId: "global-shootingleague",
  storageBucket: "global-shootingleague.firebasestorage.app",
  messagingSenderId: "889901571140",
  appId: "1:889901571140:web:1d72cec994fe66f6797011",
  measurementId: "G-MJDDEJBWYT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

export default app;