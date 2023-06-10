const mongoose = require("mongoose");

// const questionsSchema = new mongoose.Schema({
//   question: String,
//   choice_a: String,
//   choice_b: String,
//   choice_c: String,
//   choice_d: String,
//   answer: String,
// });

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
