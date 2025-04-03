"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var app_1 = require("firebase/app");
var firestore_1 = require("firebase/firestore");
/**
 * Firebase configuration and initialization.
 * This file sets up the Firebase client SDK and exports the Firestore instance.
 */
/**
 * Firebase configuration object.
 * Uses environment variables for API keys and other sensitive information.
 * Environment variables should be stored in a `.env.local` file.
 * Keys must be prefixed with `NEXT_PUBLIC_` for client-side access in Next.js.
 */
var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: "storyquest-fcdc2",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
/**
 * Initialize Firebase app.
 */
var app = (0, app_1.initializeApp)(firebaseConfig);
/**
 * Get Firestore instance.
 */
var db = (0, firestore_1.getFirestore)(app);
exports.db = db;
