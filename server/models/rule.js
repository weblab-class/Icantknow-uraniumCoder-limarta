const mongoose = require("mongoose");

const RuleSchema = new mongoose.Schema({
  reactants: [String], // rules uses element names
  products: [String],
});

// compile model from schema
module.exports = mongoose.model("rule", RuleSchema);
