const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Initialize Express app and server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from "public" directory
app.use(express.static('public'));

// Socket.io connection handler
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Handle whiteboard drawing events
  socket.on('drawing', (data) => {
    // Broadcast drawing data to all other connected clients
    socket.broadcast.emit('drawing', data);
  });

  // Handle incoming messages
  socket.on('message', (data) => {
    console.log(`Message from ${socket.id}: ${data}`);
    // Broadcast message to all connected clients
    io.emit('message', data);
  });

  // Handle user disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });

  // Handle mute audio event
  socket.on('mute-audio', (data) => {
    socket.broadcast.emit('user-muted-audio', data);
  });

  // Handle mute video event
  socket.on('mute-video', (data) => {
    socket.broadcast.emit('user-muted-video', data);
  });

  // Handle screen sharing event
  socket.on('screen-share', (data) => {
    socket.broadcast.emit('user-screen-shared', data);
  });

  // Handle chat messages
  socket.on('chat-message', (message) => {
    io.emit('chat-message', { userId: socket.id, message });
  });

  // Handle join room
  socket.on('join-room', (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room: ${room}`);
  });

  // Handle leave room
  socket.on('leave-room', (room) => {
    socket.leave(room);
    console.log(`User ${socket.id} left room: ${room}`);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
