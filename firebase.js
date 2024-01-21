import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyD7iTPdt0glmvDvBC5wBmiYH-MmLHLAZAI",
  authDomain: "f2024-web-for-chinese-music.firebaseapp.com",
  projectId: "f2024-web-for-chinese-music",
  storageBucket: "f2024-web-for-chinese-music.appspot.com",
  messagingSenderId: "112735956041",
  appId: "1:112735956041:web:b328104ad84c6c5119a398",
  measurementId: "G-B12NYD8WGV",
};

// Initialize Firebase
export const Firebase_app = initializeApp(firebaseConfig);
export const Firebase_auth = getAuth(Firebase_app);
