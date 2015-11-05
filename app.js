process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port = normalizePort(process.env.PORT || '3000');

// Load the module dependencies
var mongoose = require('./config/mongoose');
var express = require('./config/express');
var passport = require('./config/passport');
var debug = require('debug')('myapp:server');
var http = require('http');



// Create a new Mongoose connection instance
var conn = mongoose();

// Create a new Express application instance
var server = express(conn);

// Configure the Passport middleware
var passport = passport();


server.listen(port);
// Log the server status to the console
console.log('Server running at http://localhost:'+ port+'/');

server.on('error', onError);
server.on('listening', onListening);



function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


module.exports = server;
