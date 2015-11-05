// Invoke 'strict' JavaScript mode
'use strict';

// Create the chat configuration
module.exports = function(io, socket) {
  // Emit the status event when a new socket client is connected
  console.log(socket.request);
  io.emit('chatMessage', {
    type: 'status',
    text: 'connected',
    created: Date.now(),
    username: socket.request.user.firstName
  });

  // Send a chat messages to all connected sockets when a message is received
  socket.on('chatMessage', function(message) {
    console.log("recieved");
    message.type = 'message';
    message.created = Date.now();
    message.username = socket.request.user.firstName;

    // Emit the 'chatMessage' event
    io.emit('chatMessage', message);
  });

  // Emit the status event when a socket client is disconnected
  socket.on('disconnect', function() {
    io.emit('chatMessage', {
      type: 'status',
      text: 'disconnected',
      created: Date.now(),
      username: socket.request.user.username
    });
  });
};
