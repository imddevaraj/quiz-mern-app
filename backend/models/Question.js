
// server/models/Question.js
const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: String,
  isCorrect: Boolean,
});

const questionSchema = new mongoose.Schema({
  questionText: String,
  options: [optionSchema],
  imageUrl: String,
  hasMultipleAnswer: Boolean,
  hint: String
});

module.exports = mongoose.model('Question', questionSchema);