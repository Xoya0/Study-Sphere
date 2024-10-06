const express = require('express');
const { getRooms, createRoom } = require('../controllers/roomController');

const router = express.Router();

// Route to get all active rooms
router.get('/live-rooms', getRooms);

// Route to create a new room
router.post('/live-rooms', createRoom);

module.exports = router;
