const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  title: {
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
  isPublish: {
    type: Boolean,
    default: false,
  },
  questions: [
    {
      question: String,
      choice_a: String,
      choice_b: String,
      choice_c: String,
      choice_d: String,
      answer: String,
    },
  ],
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

module.exports = mongoose.model("Exams", examSchema);
