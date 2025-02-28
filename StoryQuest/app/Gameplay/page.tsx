"use client";

import React, { useState, useEffect } from "react";
import stories, { Story } from "./stories";
import AACKeyboard from "../Components/AACKeyboard";
import { motion, AnimatePresence } from "framer-motion";

// SparkleEffect: A visual effect that simulates a sparkle animation.
const SparkleEffect = ({ onComplete }: { onComplete: () => void }) => {
  return (
    <motion.div
      className="absolute w-20 h-20 bg-white rounded-full"
      style={{ filter: "blur(4px)", opacity: 0.7 }}
      initial={{ scale: 0, opacity: 1 }}
      animate={{ scale: [0, 1.5, 0], opacity: [1, 0.8, 0] }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      onAnimationComplete={onComplete} // Calls the provided function when the animation finishes.
    />
  );
};

// getImageAnimation: Returns a reusable animation configuration for images.
const getImageAnimation = () => ({
  initial: { opacity: 0, scale: 0.5 }, // Start with a small, transparent image.
  animate: { opacity: 1, scale: 1 },   // Animate to full size and opacity.
  exit: { opacity: 0, scale: 0.5 },      // Animate out by shrinking and fading.
  transition: { duration: 0.8, ease: "easeOut" }, // Smooth animation with a standard easing.
});

export default function Home() {
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [phrase, setPhrase] = useState("");
  const [completedImages, setCompletedImages] = useState<
    { src: string; alt: string; x: number; y: number }[]
  >([]);
  const [isMounted, setIsMounted] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [completedPhrases, setCompletedPhrases] = useState<string[]>([]);
  const [showSparkles, setShowSparkles] = useState<boolean[]>([]);

  useEffect(() => {
    setIsMounted(true);
    if (stories.length > 0) {
      setCurrentStory(stories[0]); // Set the first story as the default.
      setPhrase(stories[0].sections[0].phrase); // Initialize the phrase with the first section's text.
    }
  }, []);

  // handleStoryChange: Updates the current story and resets relevant state.
  const handleStoryChange = (story: Story) => {
    setCurrentStory(story);
    setPhrase(story.sections[0].phrase);
    setCurrentSectionIndex(0);
    setCompletedImages([]);
    setCompletedPhrases([]);
    setShowSparkles([]); // Reset sparkle effects when changing stories.
  };

  // handleWordSelect: Processes word selection and updates the game state.
  const handleWordSelect = (word: string) => {
    if (!currentStory) return;

    const currentWords = currentStory.sections[currentSectionIndex].words;
    if (!currentWords[word]) {
      alert(`Word "${word}" not found in the current section!`);
      return;
    }

    const selectedWordData = currentWords[word];

    const newImage = {
      src: `/images/${selectedWordData.image || ""}`,
      alt: word,
      x: selectedWordData.x || 0,
      y: selectedWordData.y || 0,
    };

    const newPhrase = phrase.replace("___", word);

    setCompletedPhrases((prev) => [...prev, newPhrase]);
    setCompletedImages((prev) => [...prev, newImage]);
    setShowSparkles((prev) => [...prev, true]); // Trigger sparkle effect for the new image.

    if (currentSectionIndex < currentStory.sections.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
      setPhrase(currentStory.sections[currentSectionIndex + 1].phrase);
    } else {
      setPhrase("The End!"); // Display end message when all sections are completed.
    }
  };

  if (!isMounted || !currentStory) return null;

  return (
    <div className="flex w-screen h-screen">
      {/* AAC Tablet Section: Contains the keyboard and story selection. */}
      <div className="w-1/3 bg-gray-200 p-4 flex flex-col justify-center items-center">
        <h2 className="text-xl font-bold mb-4 text-black">AAC Tablet</h2>
        <AACKeyboard
          onSelect={handleWordSelect}
          symbols={
            currentStory?.sections[currentSectionIndex]
              ? Object.entries(currentStory.sections[currentSectionIndex].words).map(([word, data]) => ({
                  word: word,
                  image: `/images/${data.image}`,
                  displayText: word,
                }))
              : []
          }
        />
        {/* Story Selection: Allows users to choose a story. */}
        <div className="mb-4">
          <label htmlFor="story-select" className="block mb-2 text-sm font-medium text-gray-900">
            Select Story:
          </label>
          <select
            id="story-select"
            value={currentStory?.title || ""}
            onChange={(e) => {
              const selectedStory = stories.find((s) => s.title === e.target.value);
              if (selectedStory) {
                handleStoryChange(selectedStory);
              }
            }}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            {stories.map((story) => (
              <option key={story.title} value={story.title}>
                {story.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Story Display Section: Shows the background, completed phrases, and animated images. */}
      <div
        className="w-2/3 relative bg-cover bg-center flex justify-center items-center"
        style={{
          backgroundImage: `url('/images/${currentStory?.backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Completed Phrases: Displays the phrases generated by the user. */}
        <div className="absolute top-0 left-0 w-full h-full">
          {completedPhrases.map((completedPhrase, index) => (
            <div key={index} className="absolute" style={{ top: `${index * 50}px`, left: "20px" }}>
              <p className="mb-2 text-black">{completedPhrase}</p>
            </div>
          ))}
        </div>

        {/* Animated Images with Sparkles: Shows selected images with a sparkle effect. */}
        <AnimatePresence>
          {completedImages.map((image, index) => (
            <div key={index} className="absolute" style={{ left: `${image.x}%`, top: `${image.y}%` }}>
              {showSparkles[index] ? (
                <SparkleEffect
                  onComplete={() =>
                    setShowSparkles((prev) => {
                      const newState = [...prev];
                      newState[index] = false;
                      return newState;
                    })
                  }
                />
              ) : (
                <motion.img src={image.src} alt={image.alt} className="w-32 h-32" {...getImageAnimation()} />
              )}
            </div>
          ))}
        </AnimatePresence>

        {/* Current Phrase: Displays the phrase for the current section. */}
        <p className="mb-2 absolute text-black">{phrase}</p>
      </div>
    </div>
  );
}