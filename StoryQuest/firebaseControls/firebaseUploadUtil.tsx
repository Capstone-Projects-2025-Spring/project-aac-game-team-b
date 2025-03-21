// firestoreUtils.ts

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { Story } from '../app/Gameplay/stories';

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

const stories: Story[] = [
    {
      title: "The Garden Adventure",
      backgroundImage: "garden-background.webp",
      colorTheme: {
        backgroundColor: "#b4fcdc", // Light green
        buttonColor: "#63d2cb", // Teal
      },
      sections: [
        {
          phrase: "Look in the garden, there is a ___",
          words: {
            mouse: { image: "mouse.svg", x: 40, y: 80, effect: 'flip' }, 
            ladybug: { image: "ladybug.svg", x: 60, y: 90, effect: 'spin' },
            bird: { image: "bird.svg", x: 60, y: 90, effect: 'spin' },
            squirrel: { image: "Squirrel.svg", x: 60, y: 90, effect: 'sideToSide' },
            boy: { image: "boy.svg", x: 60, y: 90, effect: 'sideToSide' },
            bear: { image: "bear.svg", x: 60, y: 90, effect: 'sideToSide' }
          },
        },
        {
          phrase: "And near the flowers, I see a ___",  // New sentence
          words: {
            bee: { image: "bee.svg", x: 70, y: 50, effect: 'pulse' },
            butterfly: { image: "butterfly.svg", x: 70, y: 50, effect: 'sideToSide' },
            basket: { image: "basket.svg", x: 70, y: 50, effect: 'sideToSide' },
            bear: { image: "bear.svg", x: 70, y: 50, effect: 'sideToSide' },
            bird: { image: "bird.svg", x: 70, y: 50, effect: 'sideToSide' },
            ladybug: { image: "ladybug.svg", x: 70, y: 50, effect: 'sideToSide' }
          },
        },
        {
          phrase: "The tree was full of ___.", // Another sentence
          words: {
            apples: { image: "apples.svg", x: 80, y: 20, effect: 'spin' },
            lanterns: { image: "lantern.svg", x: 80, y: 20, effect: 'scaleUp' },
            flowers: { image: "flower.svg", x: 80, y: 20, effect: 'sideToSide' },
            birds: { image: "bird.svg", x: 80, y: 20, effect: 'sideToSide' },
            oranges: { image: "orange.svg", x: 80, y: 20, effect: 'sideToSide' },
            cherries: { image: "cherry.svg", x: 80, y: 20, effect: 'sideToSide' }
          }
        }
  
        // ...  can add more sections to the story here
      ],
    },
  
    //NEW STORY
    {
      title: "Walk in the forest",
      backgroundImage: "Forest-background.png",
      colorTheme: {
        backgroundColor: "#ffcccb", // Light red
        buttonColor: "#ff6666", // Coral
      },
      sections: [
        {
          phrase: "In the forest, I look in the sky and see a ___",
          words: {
            bird: { image: "bird.svg", x: 50, y: 10, effect: 'fade' },
            airplane: { image: "airplane.svg", x: 50, y: 10, effect: 'spin' },
            helicopter: { image: "helicopter.svg", x: 50, y: 10, effect: 'spin' },
            hero: { image: "hero.svg", x: 50, y: 10, effect: 'spin' },
            cloud: { image: "cloud.svg", x: 50, y: 10, effect: 'spin' },
            sun: { image: "sun.svg", x: 50, y: 10, effect: 'spin' },
          },
        },
        {
          phrase: "In the path there is a ___",  // New sentence
          words: {
            bear: { image: "bear.svg", x: 40, y: 80, effect: 'pulse' },
            basket: { image: "basket.svg", x: 40, y: 80, effect: 'none' },
            monkey: { image: "monkey.svg", x: 40, y: 80, effect: 'none' },
            squirrel: { image: "Squirrel.svg", x: 40, y: 80, effect: 'none' },
            bird: { image: "bird.svg", x: 40, y: 80, effect: 'none' },
            ladybug: { image: "ladybug.svg", x: 40, y: 80, effect: 'none' }
          },
        },
        {
          phrase: "And the ___ was bouncing in the bush.", // Another sentence
          words: {
            boy: { image: "boy.svg", x: 80, y: 60, effect: 'scaleUp' },
            squirrel: { image: "Squirrel.svg", x: 65, y: 60, effect: 'upAndDown' },
            mouse: { image: "mouse.svg", x: 65, y: 60, effect: 'upAndDown' },
            monkey: { image: "monkey.svg", x: 65, y: 60, effect: 'upAndDown' },
            ladybug: { image: "ladybug.svg", x: 65, y: 60, effect: 'upAndDown' },
            bear: { image: "bear.svg", x: 65, y: 60, effect: 'upAndDown' }
          }
        }
        // ... more sections for more story parts
      ],
    },
  ];
 

// Trigger the upload
uploadStoriesToFirestore(stories);
