"use client";
import { useEffect, useState } from "react";
import { db } from "../../firebaseControls/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function TestFirebase() {
    const [rooms, setRooms] = useState<{ id: string; story?: string; numPlayers?: number; difficulty?: string }[]>([]);
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "rooms"));
                const roomsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setRooms(roomsData);
                console.log("Firestore Data:", roomsData);
            } catch (error) {
                console.error("Error fetching rooms:", error);
            }
        };

        fetchRooms();
    }, []);

    return (
        <div>
            <h1>Test Firebase</h1>
            <ul>
                {rooms.map(room => (
                    <li key={room.id}>
                        {room.story} - {room.numPlayers} Players - {room.difficulty}
                    </li>
                ))}
            </ul>
        </div>
    );
}