'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');


var index = require('../controllers/index.server.controller');
var users = require('../../app/controllers/users.server.controller');

/* GET home page. */
router.get('/', index.render);

router.route('/signup')
  .get(users.renderSignup)
  .post(users.signup);

// Set up the 'signin' routes
router.route('/signin')
  .get(users.renderSignin)
  .post(passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true
  }));

// Set up the 'signout' route
router.get('/signout', users.signout);


module.exports = router;
