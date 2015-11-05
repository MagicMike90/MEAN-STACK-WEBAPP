// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var config = require('./config'),
  express = require('express'),
  morgan = require('morgan'),
  compress = require('compression'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  session = require('express-session'),
  MongoStore = require('connect-mongo')(session),
  flash = require('connect-flash'),
  passport = require('passport');
var socketio = require('socket.io');
var http = require('http');


// Define the Express configuration method
module.exports = function(db) {
  // Create a new Express application instance
  var app = express();

  // Create a new HTTP server
  var server = http.createServer(app);

  // Create a new Socket.io server
  var io = socketio.listen(server);

  // io.on('connection', function (socket) {
  //   socket.emit('news', { hello: 'world' });
  //   socket.on('my other event', function (data) {
  //     console.log(data);
  //   });
  // });

  // Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
  }

  // Use the 'body-parser' and 'method-override' middleware functions
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  // Configure the 'session' middleware
  // console.log(conn);
  // var mongoStore = new MongoStore({
  //   mongooseConnection: conn
  // });
  var mongoStore = new MongoStore({
    db: db.connection.db
  });
  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret,
    store: mongoStore
  }));

  // Set the application view engine and 'views' folder
  app.set('views', './app/views');
  app.set('view engine', 'ejs');

  // Configure the flash messages middleware
  app.use(flash());

  // Configure the Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());

  // Load the routing files∫
  var routes = require('../app/routes/index.js');
  app.use('/', routes)

  var oauth = require('../app/routes/oauth.js');
  app.use('/oauth', oauth)

  var article = require('../app/routes/articles.js')
  app.use('/api', article)

  // Configure static file serving
  app.use(express.static('./public'));

  // Load the Socket.io configuration
  require('./socketio')(server, io, mongoStore);

  // Return the Express application instance
  return server;
};
