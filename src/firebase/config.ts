import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEn_OqnTLRjkb3-c7KQl_3w6wexmpL1Xc",
  authDomain: "nebula-ee3da.firebaseapp.com",
  projectId: "nebula-ee3da",
  storageBucket: "nebula-ee3da.firebasestorage.app",
  messagingSenderId: "569116961522",
  appId: "1:569116961522:web:58d3ba661a70f8df823e6b",
  measurementId: "G-2ELR59TT1T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);

export default app;