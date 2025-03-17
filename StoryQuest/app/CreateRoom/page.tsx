"use client";

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { BackButton } from "../HomePage/HomePageButtons";
import { db } from "../../firebaseControls/firebaseConfig"; // Import Firestore
import { collection, addDoc } from "firebase/firestore";
import "./CreateRoomButtonStyles.css";


export default function CreateRoomPage() {
    const [selectedStory, setSelectedStory] = useState<string | null>(null);
    const [numPlayers, setNumPlayers] = useState<number | null>(null);
    const [difficultyLevel, setDifficultyLevel] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    {/*Handles case where user does not choose all settings*/}
    const handleCreateRoom = async () => {
        if (!selectedStory || !numPlayers || !difficultyLevel) {
            alert("Please select a story, player count, and difficulty.");
            return;
        }

        try {
            // Add room data to Firestore
            const docRef = await addDoc(collection(db, "rooms"), {
                story: selectedStory,
                numPlayers: numPlayers,
                difficulty: difficultyLevel,
            });

            console.log("Room Created with ID:", docRef.id);
            alert(`Room Created! Room ID: ${docRef.id}`);
        } catch (error) {
            console.error("Error creating room:", error);
            alert("Failed to create room.");
        }

        setLoading(false);
    };

    const handleStoryClick = (story: string) => {
        console.log("Clicked:", story);
        setSelectedStory((prev) => (prev === story ? null : story)); 
    };

    return (
        <div className="page-container"
             style={{
                 backgroundImage: "url('/HomePage-Images/Background.jpg')",
                 backgroundSize: "cover",
             }}>
            <div className="content-container"> 
            <div className="title-container">
                <h1 className="title-text">Create a Room</h1>
            </div>

            {/* Story Selection */}
            <div className="selection-container">
                <h2>Select a Story</h2>
                <div className="button-container">
                    <button 
                        className={`button story-button ${selectedStory === "The Garden Adventure" ? "selected" : ""}`}
                        onClick={() => handleStoryClick("The Garden Adventure")}>
                        <span>The Garden Adventure</span>
                    </button>
                                    <button className={`button story-button ${selectedStory === "Walk in the Forest" ? "selected" : ""}`}
                            onClick={() => setSelectedStory("Walk in the Forest")}>
                        <span>Walk in the Forest</span>
                    </button>
                </div>
            </div>

            {/* Player Count Selection */}
            <div className="selection-container">
                <h2>Select Number of Players</h2>
                <div className="button-container">
                    {[2, 3, 4].map((num) => (
                        <button key={num} className={`button player-button ${numPlayers === num ? "selected" : ""}`}
                                onClick={() => setNumPlayers(num)}>
                            <span>{num} Players</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Difficulty Selection */}
            <div className="selection-container">
                <h2>Select Difficulty</h2>
                <div className="button-container">
                    {["Easy", "Medium", "Hard"].map((level) => (
                        <button key={level} className={`button difficulty-button ${difficultyLevel === level ? "selected" : ""}`}
                                onClick={() => setDifficultyLevel(level)}>
                            <span>{level}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Create Room Button */}
            <div className="button-container">
                <button className="button create-room-button" onClick={handleCreateRoom}>
                    <span>Create Room</span>
                </button>
            </div>

            {/* Back Button */}
            <div className="button-container">
                <div className="button-box">
                <Link href= "/">
                    <BackButton />
                </Link>
                </div>
            </div>
        </div>
    </div>
    );
};
