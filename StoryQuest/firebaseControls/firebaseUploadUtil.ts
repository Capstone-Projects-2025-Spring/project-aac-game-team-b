// firebaseUploadUtil.ts
import * as admin from 'firebase-admin';
import { Story } from '@/Gameplay/stories';
import stories from '@/Gameplay/stories';

const serviceAccount = require("./storyquest-fcdc2-firebase-adminsdk-fbsvc-8e34fd215e.json"); // Replace with your key path

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function addStoriesToFirestoreWithSet(stories: Story[]) {
    try {
        const storiesCollection = db.collection("stories");

        for (let i = 0; i < stories.length; i++) {
            const story = stories[i];
            const storyId = `story-${i + 1}`;
            const storyDocRef = storiesCollection.doc(storyId);

            console.log(`Uploading story with ID: ${storyId}`);
            console.log("Story data:", story);

            // Log individual fields for debugging
            console.log("Story Title:", story.title);
            console.log("Background Image:", story.backgroundImage);
            console.log("Color Theme:", story.colorTheme);
            console.log("Sections:", story.sections);

            await storyDocRef.set(story);
            console.log(`Story "${story.title}" added with ID: ${storyId}`);
        }
        console.log("All stories added to Firestore.");
    } catch (error: any) {
        console.error("Error adding stories to Firestore:", error);
    }
}

// Simplified Test
async function simplifiedTest() {
    try {
        const testDocRef = db.collection("test").doc("testDoc");
        await testDocRef.set({ test: "testValue" });
        console.log("Simplified test successful.");
    } catch (error: any) {
        console.error("Simplified test failed:", error);
    }
}

// Run the simplified test first
simplifiedTest().then(() => {
    // If the simplified test passes, run the main function
    addStoriesToFirestoreWithSet(stories);
});