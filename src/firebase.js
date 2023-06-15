// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMyV-AtuiX59tDEdsiVQJVbzwq24Hnb3E",
  authDomain: "quasar-chat-3c992.firebaseapp.com",
  projectId: "quasar-chat-3c992",
  storageBucket: "quasar-chat-3c992.appspot.com",
  messagingSenderId: "203624262350",
  appId: "1:203624262350:web:aaa0f49ec9b592684abe9f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

