/**
 * Firebase Cloud Function: createRoom
 * 
 * This function creates a new game room in Firestore. It generates a unique room ID, 
 * initializes the room with default values, and assigns the authenticated user as the host. 
 * If no authenticated user is present, the host is set as "anonymous".
 * 
 * **Trigger Type:** Callable Cloud Function (`functions.https.onCall`)
 * **Database Used:** Firestore
 * **Collection:** "rooms"
 * **Expected Input:** None
 * **Response:** `{ roomId: string }` on success, or an error message
 */


const functions = require("firebase-functions"); // Firebase Functions SDK
const admin = require("firebase-admin"); // Firebase Admin SDK for Firestore access
const cors = require("cors")({ origin: true });

// Initialize Firebase Admin SDK (required for Firestore access)
admin.initializeApp();
const db = admin.firestore();

exports.createRoom = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => { 
        if (req.method !== "POST") {
            return res.status(405).json({ error: "Method Not Allowed" });
        }

        try {
            const newRoomRef = db.collection("rooms").doc();
            const roomId = newRoomRef.id;

            await newRoomRef.set({
                gameState: "waiting",
                players: {},
                host: "anonymous",
                storyProgress: {},
            });

            res.status(200).json({ roomId }); 
        } catch (error) {
            console.error("Error creating room:", error);
            res.status(500).json({ error: "Internal Server Error" }); 
        }
    });
});
