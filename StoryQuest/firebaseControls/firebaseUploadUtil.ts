// firestoreUtils.ts

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, setDoc, doc } from "firebase/firestore";
import { Story } from '../app/Gameplay/stories'; // Import the Story interface
import stories from '../app/Gameplay/stories'; // Import your stories array

// Firebase config
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("Firestore instance:", db);

const testCollection = collection(db, "test");

console.log("Collection reference:", testCollection);

// Define allowed effects for safety
type Effect = "spin" | "pulse" | "flip" | "scaleUp" | "none" | "fade" | "sideToSide" | "upAndDown";

// Story validation function
const validateStory = (story: Story): boolean => {
    return (
        typeof story.title === "string" &&
        typeof story.backgroundImage === "string" &&
        Array.isArray(story.sections) &&
        story.sections.every(section =>
            typeof section.phrase === "string" &&
            typeof section.words === "object" &&
            Object.values(section.words).every(
                word =>
                    typeof word.image === "string" &&
                    typeof word.x === "number" &&
                    typeof word.y === "number" &&
                    (typeof word.effect === "string" && (word.effect as Effect))
            )
        )
    );
};

// Function to upload stories to Firestore
async function uploadStoriesToFirestore(stories: Story[]) {
    console.log("DB in function", db);
    try {
        const testCollection = collection(db, "testStories");
        console.log("Collection reference:", testCollection);
        console.log("Test collection created");
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error in test:', error.message);
        } else {
            console.error('An unknown error occurred:', error);
        }
    }
}

//

async function addStoriesToFirestoreWithSet(stories: Story[]) {
    try {
        const storiesCollection = collection(db, "stories");

        for (let i = 0; i < stories.length; i++) {
            const story = stories[i];
            const storyId = `story-${i + 1}`;
            const storyDocRef = doc(storiesCollection, storyId);

            console.log(`Uploading story with ID: ${storyId}`);
            console.log("Story data:", story);
            console.log("Stringified story:", JSON.stringify(story, null, 2));

            // Log the words object and image paths
            story.sections.forEach((section) => {
                console.log("Words object:", section.words);
                console.log("Stringified words object:", JSON.stringify(section.words, null, 2));
                for (const wordKey in section.words) {
                    if (section.words.hasOwnProperty(wordKey)) {
                        console.log(`Image path for ${wordKey}:`, section.words[wordKey].image);
                    }
                }
            });

            await setDoc(storyDocRef, story);
            console.log(`Story "${story.title}" added with ID: ${storyId}`);
        }

        console.log("All stories added to Firestore.");
    } catch (error: any) {
        console.error("Error adding stories to Firestore:", error);
        console.error("Error Details:", error.details);
        console.error("Error Code:", error.code);
    }
}

addStoriesToFirestoreWithSet(stories); // Call the function with the stories array.