"use client";

import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { db } from "../../firebaseControls/firebaseConfig";
import { doc, setDoc } from "firebase/firestore"; 
import { collection, addDoc } from "firebase/firestore"; 
import { getFunctions, httpsCallable } from "firebase/functions";
import { functions } from "../../firebaseControls/firebaseConfig";
import { BackButton } from "../HomePage/HomePageButtons";
import "./CreateRoomButtonStyles.css";



export default function CreateRoomPage() {
    const [selectedStory, setSelectedStory] = useState<string | null>(null);
    const [numPlayers, setNumPlayers] = useState<number | null>(null);
    const [difficultyLevel, setDifficultyLevel] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    //const functions = getFunctions();
    const createRoomFunction = httpsCallable(functions, "createRoom"); // No input type required

    const router = useRouter();

    /*const testFirestore = async () => {
        try {
          const docRef = await addDoc(collection(db, "test"), { test: "success" });
          console.log("Test Doc ID:", docRef.id);
        } catch (error) {
          console.error("Firestore error:", error);
        }
      };
      useEffect(() => { testFirestore(); }, []);*/

    {/*Handles case where user does not choose all settings*/}
    const handleCreateRoom = async () => {
        try {
            const response = await fetch("https://us-central1-storyquest-fcdc2.cloudfunctions.net/createRoom", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({}),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Room Created:", data.roomId);
            alert(`Room created. Room ID: ${data.roomId}`);
        } catch (error) {
            console.error("Could not create room:", error);
            alert("Error creating room. Please try again.");
        }
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
                <button className="button create-room-button" onClick={handleCreateRoom} disabled={loading}>
                    {loading ? "Creating..." : "Create Room"}
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
