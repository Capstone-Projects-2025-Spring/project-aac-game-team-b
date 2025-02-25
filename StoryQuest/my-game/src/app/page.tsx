import Image from "next/image";
import AnimatedTitle from '@/app/HomePage/AnimatedTitle';
import {CreateButton, JoinButton, TemporaryTestingGameButton} from "@/app/HomePage/HomePageButtons";
import Link from 'next/link';
import "@/app/HomePage/HomePageStyles.css";

//TO DO:
//MAKE THE WORD SELECTED IN THE SENTENCE IN BOLD
//ADDING THE VOICE READING THE SENCENCE

"use client";

import { useState, useEffect } from "react";
import stories, { Story, StorySection } from "./stories";//import the stories interface
import AACKeyboard from "./AACKeyboard";

export default function Home() {
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [phrase, setPhrase] = useState("");
  const [userInput, setUserInput] = useState("");
  const [addedImage, setAddedImage] = useState<string | null>(null);
  const [images, setImages] = useState<{ src: string; alt: string; x: number; y: number }[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [completedPhrases, setCompletedPhrases] = useState<string[]>([]);
  const [completedImages, setCompletedImages] = useState<{ src: string; alt: string; x: number; y: number }[]>([]);
  const [currentImage, setCurrentImage] = useState<{ src: string; alt: string; x: number; y: number } | null>(null);

  useEffect(() => {
    setIsMounted(true);
    if (stories.length > 0) {
      setCurrentStory(stories[0]);
      setPhrase(stories[0].sections[0].phrase);
    }
  }, []);

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
    //setUserInput(word);
    if (!currentStory) return;

  const currentWords = currentStory.sections[currentSectionIndex].words;
  
  if (!currentWords[word]) {
    alert(`Word "${word}" not found in current section!`);
    return;
  }
    const selectedWordData = currentStory?.sections[currentSectionIndex]?.words[word];
    /*setCurrentImage({
      src: `/images/${selectedWordData?.image || null}`, //making the path based on the word button cliked (they are inside my-game/public/images )
      alt: word,
      x: selectedWordData?.x || 0,
      y: selectedWordData?.y || 0,
    });*/

    if (!selectedWordData) return;

    const newImage= {
      src: `/images/${selectedWordData?.image || null}`,
      alt: word,
      x: selectedWordData.x || 0,
      y: selectedWordData.y || 0,
    }

    const newPhrase = phrase.replace("___", word);

    setCompletedPhrases([...completedPhrases, newPhrase]); //store completed sentence
    setCompletedImages([...completedImages, newImage]); //store completed image

    if (currentSectionIndex < currentStory.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setPhrase(currentStory.sections[currentSectionIndex + 1].phrase);
    } else {
      setPhrase("The End!");
    }
  };

  const handleAddImage = () => {
    if (userInput.trim() !== "" && currentImage && currentStory) {
      const newPhrase = phrase.replace("___", userInput);

      setCompletedPhrases([...completedPhrases, newPhrase]);
      setCompletedImages([...completedImages, currentImage]);

      if (currentSectionIndex < currentStory.sections.length - 1) {
        setCurrentSectionIndex(currentSectionIndex + 1);
        setPhrase(currentStory.sections[currentSectionIndex + 1].phrase);
        setUserInput("");
        setAddedImage(null);
        setImages([]);
        setCurrentImage(null);
      } else {
        setPhrase("The End!");
        setUserInput("");
        setAddedImage(null);
        setImages([]);
        setCurrentImage(null);
      }
    } else {
      alert("Please select a word from the AAC tablet."); //at the end of the story still asks to select word. need to change that
    }
  };

  if (!isMounted || !currentStory) return null;

  const handleAACSelect = (word: string) => {
  console.log("AAC Button Clicked:", word);
  handleWordSelect(word);
  };

  return (
    <div className="flex w-screen h-screen">
      {/* Left Panel: AAC Tablet */}
      <div className="w-1/3 bg-gray-200 p-4 flex flex-col justify-center items-center">
        <h2 style={{ color: "black" }} className="text-xl font-bold mb-4">
          <AACKeyboard 
          onSelect={handleAACSelect} 
          symbols={currentStory?.sections[currentSectionIndex] 
          ? Object.entries(currentStory.sections[currentSectionIndex].words).map(
          ([word, data]) => ({
          word: word,
          image: `/images/${data.image}`,
          displayText: word
        }))
        : []
      }
        />
        </h2>

        {/* Story Selection */}
        <div className="mb-4">
          <label htmlFor="story-select" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {stories.map((story) => (
              <option key={story.title} value={story.title}>
                {story.title}
              </option>
            ))}
          </select>
        </div>

        {/* Next Section Button */}
        {currentStory?.sections.length > 1 && currentSectionIndex < currentStory.sections.length - 1 && (
          <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded" onClick={handleAddImage}>
            Next Sentence
          </button>
        )}
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
        {/* Completed Phrases (positioned with the text) */}
        <div className="absolute top-0 left-0 w-full h-full">
          {completedPhrases.map((completedPhrase, index) => (
            <div key={index} className="absolute" style={{ top: `${index * 50}px`, left: '20px' }}>
              <p className="mb-2" style={{ color: "black" }}>
                {completedPhrase}
              </p>
            </div>
          ))}
        </div>
        </div>
    </div>
  );
};


/*export default function Home() {
    return (
        <div className="page-container"
             style={{
                 backgroundImage: "url('HomePage-Images/Background.jpg')",
                 backgroundSize: "cover",
             }}>
            <div className="title-container">
                <AnimatedTitle/>
            </div>

            <div className="button-container">

                <div className="button-padding">
                    <div className="button-box">
                        <CreateButton/>
                    </div>
                </div>
                <div className="button-padding">
                    <div className="button-box">
                        <JoinButton/>
                    </div>
                </div>
                <div className="button-padding">
                    <div className="button-box">
                        <Link href="/Gameplay">
                        <TemporaryTestingGameButton/>
                        </Link>
                    </div>
                </div>
            </div>
            <footer>
                <h1 className="copyright-text">Copyright © 2025 StoryQuest</h1>
            </footer>
        </div>
    );
}*/