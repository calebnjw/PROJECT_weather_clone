const socketConfig = (io) => {
  io.on('connect', (socket) => {
    socket.on('join', (joinData) => {
      // sends out a connect message
      const { city: room, username: name } = joinData;
      socket.join(room);
      io.sockets.to(room).emit('connection message', { username: 'SYSTEM', content: `${name} has joined the room` });
    });

    // this is to receive chat message from emitter
    socket.on('from frontend message', (message) => {
      io.sockets.in(message.city).emit('from backend message', message);
    });
  });
};

module.exports = socketConfig;
