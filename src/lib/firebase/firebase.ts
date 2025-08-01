// src/lib/firebase.ts
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAuth, Auth } from "firebase/auth";

// Variables de entorno (asegurate de tenerlas en `.env.local`)
const firebaseConfig = {
  apiKey: "AIzaSyCZbexNjoeJuwazLLQeRvJ1vFkYqqCLgD4",
  authDomain: "sistemainnovale-5c646.firebaseapp.com",
  projectId: "sistemainnovale-5c646",
  storageBucket: "sistemainnovale-5c646.firebasestorage.app",
  messagingSenderId: "639394773269",
  appId: "1:639394773269:web:68ae4c4901eda7286d511c",
  measurementId: "G-1LCGSFRTQE",
};

// Inicializa la app de Firebase (singleton pattern)
const app: FirebaseApp = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

// Exporta Firestore y Auth
const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);

export { app, db, auth };
