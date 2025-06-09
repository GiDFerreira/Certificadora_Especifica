import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBR-stJOpZrI9iINxc5jjSiNO1lc5MfdNI",
  authDomain: "bem-estar-app-eea83.firebaseapp.com",
  projectId: "bem-estar-app-eea83",
  storageBucket: "bem-estar-app-eea83.firebasestorage.app",
  messagingSenderId: "371941531795",
  appId: "1:371941531795:web:715db2121f9175706c6d66",
  measurementId: "G-DNWZ607JH6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();