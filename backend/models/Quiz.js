// server/models/Quiz.js
const mongoose = require('mongoose');

const optionSchema = new mongoose.Schema({
  text: String,
  isCorrect: Boolean,
});

const questionSchema = new mongoose.Schema({
  questionText: String,
  options: [optionSchema], // Options for MCQ type questions
  imageUrl: String,        // Image URL for MCQ type questions
  images: [String],        // Array of image URLs for Connextion type questions
  answer: String,          // Answer for Connextion type questions
  hasMultipleAnswer: Boolean,
  hint: String,
 

},{toJSON: { virtuals: true }, toObject: { virtuals: true }});

const quizSchema = new mongoose.Schema({
  title: String,
  description: String,
  quizType: { type: String, enum: ['q', 'c'], default: 'c' },
  questions: [questionSchema],
  startDate: { type: Date, required: true }, // Start date and time
  endDate: { type: Date, required: true },   // End date and time
  isActive: Boolean,
},{toJSON: { virtuals: true }, toObject: { virtuals: true }});

module.exports = mongoose.model('Quiz', quizSchema);