/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");
const multer = require("multer")

// import models so we can interact with the database
const User = require("./models/user");
const Photo = require("./models/photos");

// import authentication library
const auth = require("./auth");
const upload = multer({dest: 'uploads/'})
// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

// initialize socket
const socket = require("./server-socket");

// import game to get list of combinations
const game = require("./game");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socket.addUser(req.user, socket.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

router.get("/querycombine", (req, res) => {
  let comb1 = game.combinations[req.query[0]+"_"+req.query[1]];
  let comb2 = game.combinations[req.query[1]+"_"+req.query[0]];

  if (comb1) {
    return comb1;
  } else if (comb2) {
    return comb2;
  } else {
    return false;
  }

});

// app.post("/api/photo",function(req,res){
//  var newItem = new Photo();
//  newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
//  newItem.img.contentType = ‘image/png’;
//  newItem.save();
// });
// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
