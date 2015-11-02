var express = require('express');
var fs = require("fs");
var path = require('path');

var router = express.Router();


var users = require('../controllers/users.server.controller');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  //  res.send(path.join(__dirname,'users.json'));
  //console.log(path.join(__dirname,'helloworld.txt'));

  fs.readFile(path.join(__dirname, 'users.json'), 'utf8', function(err, data) {
    console.log(data);
    res.send(data);
  });
});

// route middleware to validate :name
router.param('userId', function(req, res, next, userId) {
    // do validation on name here
    // blah blah validation
    // log something so we know its working
    console.log('doing userId validations on ' + userId);
    // once validation is done save the new item in the req
    req.userId = userId;
    // go to the next thing
    next();
});
// Set up the 'users' parameterized routes
router.get('/:userId', function(req, res) {
    res.send();
})

// // Set up the 'userId' parameter middleware
// app.param('userId', users.userByID);



router.post('/create', function(req, res, next) {
  console.log("post");
  //var data = JSON.parse(req);
  //console.log(req);
  //    res.send('POST request to homepage');
  res.send(userController.list);

  next();
  //res.send("userController.create");
})

router.get('/:id', function(req, res) {
  // First read existing userController.
  fs.readFile(path.join(__dirname, 'userController.json'), 'utf8', function(err, data) {
    data = JSON.parse(data);
    console.log(data);
    var user = data["user" + req.params.id]
    console.log(user);
    res.end(JSON.stringify(user, null, 2));
  });
})



router.post('/add', function(req, res, next) {
  // First read existing userController.
  fs.readFile(path.join(__dirname, 'userController.json'), 'utf8', function(err, data) {
    data = JSON.parse(data);
    data["user4"] = user["user4"];
    console.log(data);
    res.send(JSON.stringify(data, null, 2));
  });
})


router.get('/delete', function(req, res) {
  var id = 2;
  // First read existing userController.
  fs.readFile(path.join(__dirname, 'userController.json'), 'utf8', function(err, data) {
    data = JSON.parse(data);
    delete data["user" + id];

    console.log(data);
    res.send(JSON.stringify(data, null, 2));
  });
})

router.get('/:id', function(req, res) {
  // First read existing userController.
  fs.readFile(path.join(__dirname, 'userController.json'), 'utf8', function(err, data) {
    data = JSON.parse(data);
    console.log(data);
    var user = data["user" + req.params.id]
    console.log(user);
    res.end(JSON.stringify(user, null, 2));
  });
})



module.exports = router;
