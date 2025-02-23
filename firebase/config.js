import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore  } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAT6BPaWav5zEBGtagtjUYX0vjxKyu8i5E",
  authDomain: "locationapp-92cf5.firebaseapp.com",
  projectId: "locationapp-92cf5",
  storageBucket: "locationapp-92cf5.firebasestorage.app",
  messagingSenderId: "756453410181",
  appId: "1:756453410181:web:e0fd1095e06801abbab0ec"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const TODOS_REF = 'todos';
export const USERS_REF = 'users';

export const auth = initializeAuth(app,{
  persistence: getReactNativePersistence(AsyncStorage)
});