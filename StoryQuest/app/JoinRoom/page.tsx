"use client";

import React, { useState } from "react";
import Link from 'next/link';
import { db } from "../../firebaseControls/firebaseConfig";
import { collection, getDoc, doc } from "firebase/firestore"; 
import "../CreateRoom/CreateRoomButtonStyles.css";
import { BackButton } from "../HomePage/HomePageButtons";

export default function JoinRoomPage() {
    const [roomId, setRoomId] = useState("");
    const [loading, setLoading] = useState(false);

    const handleJoinRoom = async () => {
        if (!roomId) {
            alert("Please enter a room ID.");
            return;
        }

        setLoading(true);

        try {
            const roomRef = doc(db, "rooms", roomId);
            const roomSnap = await getDoc(roomRef);

            if (roomSnap.exists()) {
                alert(`Room joined. Room ID: ${roomId}`);
            } else {
                alert("Room not found. Please enter a valid room ID.");
            }
        } catch (error) {
            console.error("Error joining room:", error);
            alert("Error joining room. Please try again.");
        } finally {
            setLoading(false);
        }
        
    };

    return (
        <div className="page-container"
             style={{
                 backgroundImage: "url('/HomePage-Images/Background.jpg')",
                 backgroundSize: "cover",
             }}>
            <div className="content-container"> 
            <div className="title-container">
                <h1 className="title-text">Enter a Room ID</h1>
            </div>

            {/* Room ID Input Field */}
            <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                placeholder="Enter Room ID"
                className="room-id-input"
            />

            {/* Join Room Button */}
            <div className="button-container">
                <button className="button create-room-button" onClick={handleJoinRoom} disabled={loading}>
                    {loading ? "Joining..." : "Join Room"}
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