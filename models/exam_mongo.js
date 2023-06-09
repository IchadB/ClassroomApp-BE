const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  examLength: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Products", examSchema);
