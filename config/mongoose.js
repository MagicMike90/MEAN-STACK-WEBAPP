// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var config = require('./config'),
  mongoose = require('mongoose');

// Define the Mongoose configuration method
module.exports = function() {

  // Use Mongoose to connect to MongoDB
  var db = mongoose.connect(config.db);
  
  var conn = db.connection;
	conn.once('open', function(ref) {
		console.log('Connected to mongo server.');
	});
	conn.on('error', function(err) {
		console.log('Could not connect to mongo server!');
		console.log(err);
	});

  // Load the 'User' model
  require('../app/models/user.server.model');
  require('../app/models/article.server.model');

  // Return the Mongoose connection instance
  return db;
};
