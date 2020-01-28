const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  name: String,
  owner: String,
  reactionRules: [String],
  startingElements: [String],
});

// compile model from schema
module.exports = mongoose.model("game", GameSchema);
