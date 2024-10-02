const mongoose = require('mongoose');
const User = require('./User');

const mcqResponseSchema = new mongoose.Schema({
  user:{
    email: String,
  },
  quiz: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    title: String
  },
  mcqresponses: [
    {
      qid: {
        type: String, // Change to String
        required: true
      },
      selectedAnswer: [{
        type: String, // Change to String
        required: true
      }],
      answerId: {
        type: String, // Change to String
        required: true
      }
  
    }
  ],
  score: Number,
  status: String,
  timeLeft: Number,
});

module.exports = mongoose.model('McqResponse', mcqResponseSchema);