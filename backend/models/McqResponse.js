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
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
      selectedAnswers: [
        {
          answer: String
        }
      ],
      questionId:String,
  
    }
  ],
  score: Number,
  status: String,
  timeleft: Number,
});

module.exports = mongoose.model('McqResponse', mcqResponseSchema);