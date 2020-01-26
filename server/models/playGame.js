const mongoose = require("mongoose");

const PlayGameSchema = new mongoose.Schema({
  template: String,
  player: String,
  createdElements: [String],
});

// compile model from schema
module.exports = mongoose.model("playGame", PlayGameSchema);
