"use client";

import React, { useState } from "react";
import Link from 'next/link';
import { BackButton } from "../HomePage/HomePageButtons";
import "./CreateRoomButtonStyles.css";
import AutomaticTextToSpeech from "@/Components/AutomaticTextToSpeech";
import useSound from "use-sound";


export default function CreateRoomPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedStory, setSelectedStory] = useState<string | null>(null);
    const [numPlayers, setNumPlayers] = useState<number | null>(null);
    const [difficultyLevel, setDifficultyLevel] = useState<string | null>(null);

<<<<<<< HEAD
    const handleStoryClick = (story: string) => {
        setSelectedStory(story);
        setCurrentStep(2);
=======
    const selectClick = '/sounds/select-click.mp3';
    const [playButtonClick]= useSound(selectClick); // use sound hook, play sound, has to be inside component
    const createRoomClick = '/sounds/createroom-click.mp3';
    const [playCreateRoomClick]= useSound(createRoomClick); // use sound hook


    {/*Handles case where user does not choose all settings*/}
    const handleCreateRoom = () => {
        if (!selectedStory || !numPlayers || !difficultyLevel) {
            alert("Please select a story, player count, and difficulty.");
            return;
        }
        console.log("Room Created:", { selectedStory, numPlayers, difficultyLevel });
>>>>>>> main
    };

    const handlePlayerClick = (num: number) => {
        setNumPlayers(num);
        setCurrentStep(3);
    };

    const handleDifficultyClick = (level: string) => {
        setDifficultyLevel(level);
        setCurrentStep(4);
    };

    const handleCreateRoom = () => {
        console.log("Room Created:", { selectedStory, numPlayers, difficultyLevel });
        // Here you would add your room creation logic
    };

    const goBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <div className="page-container"
             style={{
                 backgroundImage: "url('/HomePage-Images/Background.jpg')",
                 backgroundSize: "cover",
             }}>

            {/*Create room page description text to speech*/}
            {<AutomaticTextToSpeech speechText="Please Select a story, Select number of players, Select difficulty, then click on create room" />}

            <div className="content-container"> 
<<<<<<< HEAD
                <div className="title-container">
                    <h1 className="title-text">Let's Create a Game!</h1>
=======
            <div className="title-container">
                <h1 className="title-text">Create a Room</h1>
            </div>

            {/* Story Selection */}
            <div className="selection-container">
                <h2>Select a Story</h2>
                <div className="button-container">
                    <button 
                        className={`button story-button ${selectedStory === "The Garden Adventure" ? "selected" : ""}`}
                        onClick={() => {
                            handleStoryClick("The Garden Adventure");
                            playButtonClick();
                        }}>
                        <span>The Garden Adventure</span>
                    </button>
                    <button className={`button story-button ${selectedStory === "Walk in the Forest" ? "selected" : ""}`}
                            onClick={() => {
                                setSelectedStory("Walk in the Forest");
                                playButtonClick();
                            }}>
                        <span>Walk in the Forest</span>
                    </button>
>>>>>>> main
                </div>

<<<<<<< HEAD
                {/* Progress Indicators - Visual cues for children */}
                <div className="progress-container">
                    {[1, 2, 3, 4].map((step) => (
                        <div 
                            key={step} 
                            className={`progress-bubble ${currentStep >= step ? "active" : ""}`}
                        >
                            {step}
                        </div>
=======
            {/* Player Count Selection */}
            <div className="selection-container">
                <h2>Select Number of Players</h2>
                <div className="button-container">
                    {[2, 3, 4].map((num) => (
                        <button key={num} className={`button player-button ${numPlayers === num ? "selected" : ""}`}
                                onClick={() => {
                                    setNumPlayers(num);
                                    playButtonClick();
                                }} >
                            <span>{num} Players</span>
                        </button>
>>>>>>> main
                    ))}
                </div>

<<<<<<< HEAD
                {/* Step 1: Story Selection */}
                {currentStep === 1 && (
                    <div className="step-container">
                        <h2>Choose Your Story</h2>
                        <div className="big-button-container">
                            <button 
                                className="big-button story-button"
                                onClick={() => handleStoryClick("The Garden Adventure")}
                            >
                                <img 
                                    src="/images/garden-background.webp" 
                                    alt="Garden" 
                                    className="button-icon"
                                />
                                <span>The Garden Adventure</span>
                            </button>
                            
                            <button 
                                className="big-button story-button"
                                onClick={() => handleStoryClick("Walk in the Forest")}
                            >
                                <img 
                                    src="/images/Forest-background.png" 
                                    alt="Forest" 
                                    className="button-icon"
                                />
                                <span>Walk in the Forest</span>
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Player Count Selection */}
                {currentStep === 2 && (
                    <div className="step-container">
                        <h2>How Many Friends Are Playing?</h2>
                        <div className="big-button-container">
                            {[2, 3, 4].map((num) => (
                                <button 
                                    key={num} 
                                    className="big-button player-button"
                                    onClick={() => handlePlayerClick(num)}
                                >
                                    <div className="player-icons">
                                        {[...Array(num)].map((_, index) => (
                                            <span key={index} className="player-icon">😊</span>
                                        ))}
                                    </div>
                                    <span>{num} Players</span>
                                </button>
                            ))}
                        </div>
                        <button className="back-step-button" onClick={goBack}>
                            Go Back
=======
            {/* Difficulty Selection */}
            <div className="selection-container">
                <h2>Select Difficulty</h2>
                <div className="button-container">
                    {["Easy", "Medium", "Hard"].map((level) => (
                        <button key={level} className={`button difficulty-button ${difficultyLevel === level ? "selected" : ""}`}
                                onClick={() => {
                                    setDifficultyLevel(level);
                                    playButtonClick();
                                }}>
                            <span>{level}</span>
>>>>>>> main
                        </button>
                    </div>
                )}

<<<<<<< HEAD
                {/* Step 3: Difficulty Selection */}
                {currentStep === 3 && (
                    <div className="step-container">
                        <h2>Pick How Challenging</h2>
                        <div className="big-button-container">
                            <button 
                                className="big-button difficulty-button easy"
                                onClick={() => handleDifficultyClick("Easy")}
                            >
                                <span>Easy</span>
                            </button>
                            
                            <button 
                                className="big-button difficulty-button medium"
                                onClick={() => handleDifficultyClick("Medium")}
                            >
                                <span>Medium</span>
                            </button>
                            
                            <button 
                                className="big-button difficulty-button hard"
                                onClick={() => handleDifficultyClick("Hard")}
                            >
                                <span>Hard</span>
                            </button>
                        </div>
                        <button className="back-step-button" onClick={goBack}>
                            Go Back
                        </button>
                    </div>
                )}
=======
            {/* Create Room Button */}
            <div className="button-container">
                <button className="button create-room-button"
                        onClick={() => {
                            handleCreateRoom();
                            playCreateRoomClick();
                        }}>
                    <span>Create Room</span>
                </button>
            </div>
>>>>>>> main

                {/* Step 4: Review and Create */}
                {currentStep === 4 && (
                    <div className="step-container">
                        <h2>Ready to Play!</h2>
                        <div className="summary-container">
                            <div className="summary-item">
                                <p>Story: {selectedStory}</p>
                            </div>
                            <div className="summary-item">
                                <p>Players: {numPlayers}</p>
                            </div>
                            <div className="summary-item">
                                <p>Level: {difficultyLevel}</p>
                            </div>
                        </div>
                        <div className="final-buttons">
                            <button className="big-button create-room-button" onClick={handleCreateRoom}>
                                <span className="create-emoji">🎮</span>
                                <span>Start Adventure!</span>
                            </button>
                            <button className="back-step-button" onClick={goBack}>
                                Change Something
                            </button>
                        </div>
                    </div>
                )}

                {/* Home Button - Always visible */}
                {(currentStep !== 1 && currentStep !== 4) ? null : (
                    <div className="home-button-container">
                        <Link href="/">
                            <BackButton />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}