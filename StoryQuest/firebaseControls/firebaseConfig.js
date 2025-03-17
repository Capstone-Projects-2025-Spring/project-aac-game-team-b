/**
 * Firebase configuration and initialization.
 * This file sets up the Firebase client SDK and exports the Firestore instance.
 */

import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

/**
 * Firebase configuration object.
 * Uses environment variables for API keys and other sensitive information.
 * Environment variables should be stored in a `.env.local` file.
 * Keys must be prefixed with `NEXT_PUBLIC_` for client-side access in Next.js.
 */
const firebaseConfig = {
    apiKey: "AIzaSyAsVIc_e8eRPEd8bzxQmhlwQsMeRS0QgJY",
    authDomain: "storyquest-fcdc2.firebaseapp.com",
    databaseURL: "https://storyquest-fcdc2-default-rtdb.firebaseio.com",
    projectId:"storyquest-fcdc2",
    storageBucket: "storyquest-fcdc2.firebasestorage.app",
    messagingSenderId: "964622344106",
    appId: "1:964622344106:web:5ba7c9e6494db93a62d5d3",
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

/**
 * Initialize Firebase app.
 */
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

/**
 * Get Firestore instance.
 */
const db = getFirestore(app);
const functions = getFunctions(app);

/**
 * Export the initialized Firestore instance.
 * This instance can be imported and used in other modules.
 */
export { app, db, functions };

