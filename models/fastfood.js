const mongoose = require("mongoose");

const fastfoodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  popular: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Fastfood", fastfoodSchema);
