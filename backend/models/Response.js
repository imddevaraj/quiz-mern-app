// server/models/Response.js
const mongoose = require('mongoose');
const User = require('./User');

const responseSchema = new mongoose.Schema({
  user:{
    email: String,
  },
  quiz: {
    id: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' },
    title: String
  },
  responses: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
      selectedAnswers: [
        {
          id: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }
        }
      ],
      connexionAnswer: String,
      answerStatus: String,
      questionId:String,
      answer: String
  
    }
  ],
  score: Number,
  status: String,
});

module.exports = mongoose.model('Response', responseSchema);