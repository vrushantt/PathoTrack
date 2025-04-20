// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth} from "firebase/auth" 
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCEZeeU0VhbAPFM6cnOpDUwV8eNiB3Iu18",
  authDomain: "pathotrack-9b9dc.firebaseapp.com",
  projectId: "pathotrack-9b9dc",
  storageBucket: "pathotrack-9b9dc.firebasestorage.app",
  messagingSenderId: "109712311024",
  appId: "1:109712311024:web:58b7b34ea11a88029d3835",
  measurementId: "G-RXRL5BWXYW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

