const mongoose = require("mongoose");

const QuestionsSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  correctAnswer: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("Questions", QuestionsSchema);
