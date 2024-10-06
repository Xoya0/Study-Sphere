const setupSocket = (io) => {
    io.on('connection', (socket) => {
      console.log('User connected:', socket.id);
  
      // Handle joining a room
      socket.on('join-room', (roomId) => {
        socket.join(roomId);
        io.to(roomId).emit('participant-update', `User ${socket.id} joined room ${roomId}`);
      });
  
      // Handle leaving a room
      socket.on('leave-room', (roomId) => {
        socket.leave(roomId);
        io.to(roomId).emit('participant-update', `User ${socket.id} left room ${roomId}`);
      });
  
      // Handle disconnect event
      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });
  };
  
  module.exports = { setupSocket };
  