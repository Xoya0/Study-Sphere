const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const roomRoutes = require('./routes/roomRoutes');
const { setupSocket } = require('./services/socketService');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use('/api', roomRoutes);

// Setup socket for real-time communication
setupSocket(io);

// Server setup
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
