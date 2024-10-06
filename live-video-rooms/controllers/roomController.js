const { db } = require('./firebase');  // Import Firestore

let rooms = [
  { id: 1, name: 'Math Study Group', participantCount: 5 },
  { id: 2, name: 'Physics Discussion', participantCount: 3 },
  { id: 3, name: 'Literature Club', participantCount: 7 },
];

const createRoom = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Room name is required' });
  }

  try {
    const roomRef = db.collection('rooms').doc(); // Auto-generate a unique ID
    const newRoom = {
      id: roomRef.id,  // Use Firestore-generated ID
      name,
      participantCount: 0,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    await roomRef.set(newRoom);  // Store in Firestore
    return res.status(201).json(newRoom);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating room', error });
  }
};


// Controller to get all live rooms (already existing)
const getRooms = async (req, res) => {
  try {
    const roomsSnapshot = await db.collection('rooms').get();
    const rooms = roomsSnapshot.docs.map(doc => doc.data());

    return res.json(rooms);
  } catch (error) {
    return res.status(500).json({ message: 'Error retrieving rooms', error });
  }
};


module.exports = { getRooms, createRoom };
