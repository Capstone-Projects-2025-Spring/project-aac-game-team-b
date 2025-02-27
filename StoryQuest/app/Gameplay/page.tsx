"use client";

import React, { useState, useEffect } from "react";
import stories, { Story } from "./stories";
import AACKeyboard from "../Components/AACKeyboard";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [phrase, setPhrase] = useState("");
  const [userInput, setUserInput] = useState("");
  const [images, setImages] = useState<{ src: string; alt: string; x: number; y: number }[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [completedPhrases, setCompletedPhrases] = useState<string[]>([]);
  const [completedImages, setCompletedImages] = useState<{ src: string; alt: string; x: number; y: number }[]>([]);
  const [currentImage, setCurrentImage] = useState<{ src: string; alt: string; x: number; y: number } | null>(null);

  useEffect(() => {
    setIsMounted(true);
    if (stories.length > 0) {
      setCurrentStory(stories[0]); // Set the first story as default
      setPhrase(stories[0].sections[0].phrase);
    }
  }, []); // Added dependency array to avoid infinite loops

  const handleStoryChange = (story: Story) => {
    setCurrentStory(story);
    setPhrase(story.sections[0].phrase);
    setCurrentSectionIndex(0);
    setImages([]);
    setCompletedPhrases([]);
    setCompletedImages([]);
    setCurrentImage(null);
  };

  const handleWordSelect = (word: string) => {
    if (!currentStory) return;

    const currentWords = currentStory.sections[currentSectionIndex].words;
    if (!currentWords[word]) {
      alert(`Word "${word}" not found in the current section!`);
      return;
    }

    const selectedWordData = currentWords[word];
    if (!selectedWordData) return;

    const newImage = {
      src: `/images/${selectedWordData.image || ""}`,
      alt: word,
      x: selectedWordData.x || 0,
      y: selectedWordData.y || 0,
    };

    const newPhrase = phrase.replace("___", word);

    setCompletedPhrases((prev) => [...prev, newPhrase]);
    setCompletedImages((prev) => [...prev, newImage]);

    if (currentSectionIndex < currentStory.sections.length - 1) {
      setCurrentSectionIndex((prev) => prev + 1);
      setPhrase(currentStory.sections[currentSectionIndex + 1].phrase);
    } else {
      setPhrase("The End!");
    }
  };

  if (!isMounted || !currentStory) return null;

  return (
    <div className="flex w-screen h-screen">
      {/* Left Panel: AAC Tablet */}
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

        {/* Story Selection */}
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

      {/* Right Panel: Game Scene */}
      <div
        className="w-2/3 relative bg-cover bg-center flex justify-center items-center"
        style={{
          backgroundImage: `url('/images/${currentStory?.backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Completed Phrases */}
        <div className="absolute top-0 left-0 w-full h-full">
          {completedPhrases.map((completedPhrase, index) => (
            <div key={index} className="absolute" style={{ top: `${index * 50}px`, left: "20px" }}>
              <p className="mb-2 text-black">{completedPhrase}</p>
            </div>
          ))}
        </div>

        {/* Completed Images with Animation */}
        <AnimatePresence>
          {completedImages.map((image, index) => (
            <motion.img
              key={index}
              src={image.src}
              alt={image.alt}
              className="absolute w-16 h-16"
              style={{ left: `${image.x}%`, top: `${image.y}%` }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
            />
            
          ))}
        </AnimatePresence>

        {/* Current Phrase */}
        <p className="mb-2 absolute text-black">{phrase}</p>

        {/* Current Image with Animation */}
        <AnimatePresence>
          {currentImage && (
            <motion.img
              key={currentImage.alt}
              src={currentImage.src}
              alt={currentImage.alt}
              className="absolute w-16 h-16"
              style={{ left: `${currentImage.x}%`, top: `${currentImage.y}%` }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
