/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/
require("dotenv").config();
const mathUtils = require("./mathUtils.js");
const mainGame = require("../MainGame.js");

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
    return Rule.find({_id: {$in : game.reactionRules}, reactants: {$all: selected, $size: selected.length}})
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

// router.get("/createMainGame", (req, res) => {
//   console.log("creating main game!!!!");
//   res.send({"msg": "creating main game"});
//     // const water = new Element({
//     //   name: "water",
//     // });
//     // water.save();
//     // const air = new Element({
//     //   name: "air",
//     // });
//     // air.save();
//     // const steam = new Element({
//     //   name: "steam",
//     // });
//     // // steam.save();
//
//
//     const makeSteam = new Rule({
//       reactants: ["water", "air"],
//       products: ["steam"],
//     })
//     makeSteam.save();
//
//
//     // Game.findOne({_id: "5e276c98a47e9303ac4d462c"}).then((games)=>{
//     //   console.log(games);
//     //   games.reactionRules = game.reactionRules.append("5e2778ef535ada1b94692a6c");
//     // });
//     //
//     // Game.update({_id: "5e276c98a47e9303ac4d462c"}, {$set: {reactionRules: ["5e2778ef535ada1b94692a6c"]}});
//
//     const makeWind = new Rule({
//       reactants: ["air", "air"],
//       products: ["wind"],
//     })
//     makeWind.save();
//     // Game.update({_id: process.env.mainGameId}, {$push: {reactionRules: makeWind._id}});
//     const makeStone = new Rule({
//       reactants: ["water", "fire"],
//       products: ["stone"],
//     })
//     makeStone.save();
//     // Game.update({_id: process.env.mainGameId}, {$push: {reactionRules: makeStone._id}});
//     const makeFire = new Rule({
//       reactants: ["stone", "stone"],
//       products: ["fire"],
//     })
//     makeFire.save();
//     // Game.update({_id: process.env.mainGameId}, {$push: {reactionRules: makeFire._id}});
//     const makePot = new Rule({
//       reactants: ["fire", "stone"],
//       products: ["pot"],
//     })
//     makePot.save();
//     // Game.update({_id: process.env.mainGameId}, {$push: {reactionRules: makePot._id}});
//     const makeFilled = new Rule({
//       reactants: ["water", "pot"],
//       products: ["filled pot"],
//     })
//     makeFilled.save();
//     // Game.update({_id: process.env.mainGameId}, {$push: {reactionRules: makeFilled._id}});
//     const makeBoiling = new Rule({
//       reactants: ["fire", "filled pot"],
//       products: ["boiling pot"],
//     })
//     makeBoiling.save();
//     // Game.update({_id: process.env.mainGameId}, {$push: {reactionRules: makeBoiling._id}});
//     const makeHurricane = new Rule({
//       reactants: ["steam", "wind"],
//       products: ["hurricane"],
//     })
//     makeHurricane.save();
//     // Game.update({_id: process.env.mainGameId}, {$push: {reactionRules: makeHurricane._id}});
//     const makeStorm = new Rule({
//       reactants: ["hurricane", "stone"],
//       products: ["stone storm"],
//     })
//     makeStorm.save();
//     // Game.update({_id: process.env.mainGameId}, {$push: {reactionRules: makeStorm._id}});
//     const makeMagic = new Rule({
//       reactants: ["stone storm", "boiling pot"],
//       products: ["magic"],
//     })
//     makeMagic.save()
//     //
//     // Game.update({_id: process.env.mainGameId}, {$push: {reactionRules: makeMagic._id}});
//
//
//
//     const basicGame = new Game({
//       owner: "mainGame",
//       reactionRules: [makeSteam._id, makeWind._id],
//       startingElements: ["water", "air"],
//     });
//     basicGame.save();
//
//
//     // res.send({"msg": "successfully initiated main game!"});
// });

router.get("/canPlay", (req, res) => {
  res.send({canPlay: true});
});

router.get("/found", (req, res) => {
  if(!req.user){
    Game.find({_id: req.query.gameId}).then((game) => {
      res.send({found: ["air", "water",]});
    });
  } else{
    console.log("logged in user wants to play");
    PlayGame.find({template: req.query.gameId, player: req.user._id}).then((playGame) => {
      console.log(playGame);
      if(playGame.length == 0){
        console.log("creating new game");
        Game.findOne({_id: req.query.gameId}).then((template) => {
          const newPlay = new PlayGame({
            template: req.query.gameId,
            player: req.user._id,
            createdElements : template.startingElements,
          });
          newPlay.save();
          res.send({found: newPlay.createdElements});
        });
      } else {
        console.log("Found Game");
        console.log(playGame[0].createdElements);
        res.send({found: playGame[0].createdElements});
      }
    }).catch((err) => {
      console.log(err);
    });
  }
});

router.post("/newElement", (req, res) => {
  if(req.user){
    PlayGame.update({template: req.body.gameId, player: req.user._id}, {$push: {createdElements: req.body.element}});
    res.send(PlayGame.findOne({template: req.body.gameId, player: req.user._id}));
  } else {
    console.log("user not logged in cannot save progress");
  }
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
