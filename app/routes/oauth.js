var express = require('express');
var router = express.Router();
var passport = require('passport');

// Set up the Facebook OAuth routes
router.get('/facebook', passport.authenticate('facebook', {
  failureRedirect: '/signin'
}));
router.get('/facebook/callback', passport.authenticate('facebook', {
  failureRedirect: '/signin',
  successRedirect: '/'
}));

// Set up the Twitter OAuth routes
router.get('/twitter', passport.authenticate('twitter', {
  failureRedirect: '/signin'
}));
router.get('/twitter/callback', passport.authenticate('twitter', {
  failureRedirect: '/signin',
  successRedirect: '/'
}));

// Set up the Google OAuth routes
router.get('/google', passport.authenticate('google', {
  scope: [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ],
  failureRedirect: '/signin'
}));
router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/signin',
  successRedirect: '/'
}));


module.exports = router;
