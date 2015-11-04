process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Load the module dependencies
var mongoose = require('./config/mongoose');
var express = require('./config/express');
var passport = require('./config/passport');

// Create a new Mongoose connection instance
var db = mongoose();


// Create a new Express application instance
var app = express(db);

// Configure the Passport middleware
var passport = passport();


module.exports = app;
