// firebaseUploadUtil.ts
import { db } from "./firebaseConfig"; // Import Firestore
import { collection, addDoc } from 'firebase/firestore';
import {stories} from '../app/Gameplay/stories';

const uploadStoriesToFirestore = async (): Promise<void> => {
    try {
        for (const story of stories) {
            const docRef = await addDoc(collection(db, "stories"), story);
            console.log(`Story "${story.title}" added with ID: ${docRef.id}`);
        }
        console.log("All stories added to Firestore successfully.");
    } catch (error) {
        console.error("Error adding stories to Firestore:", error);
    }
};

uploadStoriesToFirestore();