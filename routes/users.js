var express = require('express');
var fs = require("fs");
var path = require('path');

var router = express.Router();

var user = {
  "user4": {
    "name": "mohit",
    "password": "password4",
    "profession": "teacher",
    "id": 4
  }
}
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

router.post('/create', function(req, res, next) {
  console.log("post");
  //var data = JSON.parse(req);
  //console.log(req);
    res.send('POST request to homepage');
  //res.send("users.create");
})


router.post('/add', function(req, res, next) {
  // First read existing users.
  fs.readFile(path.join(__dirname, 'users.json'), 'utf8', function(err, data) {
    data = JSON.parse(data);
    data["user4"] = user["user4"];
    console.log(data);
    res.send(JSON.stringify(data, null, 2));
  });
})


router.get('/delete', function(req, res) {
  var id = 2;
  // First read existing users.
  fs.readFile(path.join(__dirname, 'users.json'), 'utf8', function(err, data) {
    data = JSON.parse(data);
    delete data["user" + id];

    console.log(data);
    res.send(JSON.stringify(data, null, 2));
  });
})

router.get('/:id', function(req, res) {
  // First read existing users.
  fs.readFile(path.join(__dirname, 'users.json'), 'utf8', function(err, data) {
    data = JSON.parse(data);
    console.log(data);
    var user = data["user" + req.params.id]
    console.log(user);
    res.end(JSON.stringify(user, null, 2));
  });
})

module.exports = router;
