const mongoose = require("mongoose");

const ElementSchema = new mongoose.Schema({
  name: String,
});

// compile model from schema
module.exports = mongoose.model("element", ElementSchema);
