/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/
const mathUtils = require("./mathUtils.js");

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");

const Game = require("./models/game");
const Rule = require("./models/rule");
const Element = require("./models/element");
const PlayGame = require("./models/playGame");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

// initialize socket
const socket = require("./server-socket");


// import game to get list of combinations
// const game = require(".game");


router.get("/test", (req, res) => {
  res.send({msg:"good test"});
});
router.post("/login", (req, res) => {
  console.log("Trying to log in");
  auth.login (req, res);
  console.log("Tried to log in");
});

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

  let selected = req.query.elements;
  Game.find({_id: req.query.gameId}).then((game) => {
    return game.reactionRules;
  }).then((ruleIds) => {
    return Rule.find({_id: {$in : ruleIds}, reactants: {$all: selected, $size: selected.length}})
  }).then((applicableRules) => {
    if(!applicableRules){
      res.send({});
    } else {
      allProducts = applicableRules.map((r) => {return r.products});
      res.send({products: mathUtils.union(allProducts)});
    }
  });

  // let comb1 = game.combinations[req.query[0]+"_"+req.query[1]];
  // let comb2 = game.combinations[req.query[1]+"_"+req.query[0]];
  //
  // if (comb1) {
  //   res.send({products: comb1};
  // } else if (comb2) {
  //   res.send({products: comb2};
  // } else {
  //   res.send({});
  // }

});

router.get("/canPlay", (req, res) => {
  res.send({canPlay: true});
});

router.get("/found", (req, res) => {
  PlayGame.find({template: req.query.gameId, player: req.user._id}).then((game) => {
    res.send({found: game.createdElements});
  });
});

router.post("/newElement", (req, res) => {
  
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
