const mongoose = require("mongoose");

const PhotoSchema = new mongoose.Schema({
  name: String,
  googleid: String,
});

// compile model from schema
module.exports = mongoose.model("Photo", PhotoSchema);
