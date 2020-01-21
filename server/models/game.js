const mongoose = require("mongoose");

const GameSchema = new mongoose.Schema({
  _id: String,
  owner: String,
  reactionRules: [String],
});

// compile model from schema
module.exports = mongoose.model("game", GameSchema);
