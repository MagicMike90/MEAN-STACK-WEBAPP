// Invoke 'strict' JavaScript mode
'use strict';

var express = require('express');
var router = express.Router();
// Load the module dependencies
var users = require('../../app/controllers/users.server.controller');
var articles = require('../../app/controllers/articles.server.controller');



// Set up the 'articles' base routes
router.route('/articles')
  .get(articles.list)
  .post(users.requiresLogin, articles.create);

// Set up the 'articles' parameterized routes
router.route('/articles/:articleId')
  .get(articles.read)
  .put(users.requiresLogin, articles.hasAuthorization, articles.update)
  .delete(users.requiresLogin, articles.hasAuthorization, articles.delete);

// Set up the 'articleId' parameter middleware
router.param('articleId', articles.articleByID);


module.exports = router;
