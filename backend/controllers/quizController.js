// server/controllers/quizController.js
const Quiz = require('../models/Quiz');

//TODO: Implement the quiz controller functions
exports.getQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ isActive: true });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    console.log("Date:",quiz.startDate, Date.now());
    if(quiz.startDate > Date.now()) {
      res.status(404).json({ message: 'Quiz not started yet' });
    }
      // Iterate over each question and set hasMultipleAnswer
      if(quiz.quizType === 'q') {
      quiz.questions.forEach(question => {
        const correctOptions = question.options.filter(option => option.isCorrect);
        question.hasMultipleAnswer = correctOptions.length > 1;
        question.answer='';
        question.answerId='';
      });
    }
    quiz.maxTimeLimit = 1200;
    console.log(quiz)
    res.status(200).json(quiz);
  } catch (error) {
    console.error('Error loading quiz:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getActiveQuiz = async (req, res) => {
  const quiz = await Quiz.findOne({ isActive: true });
  if (!quiz) {
    console.error('Quiz not Active.');
  }
  console.log('getActiveQuiz:', quiz);
  return quiz
}


exports.createQuiz = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.status(201).json(quiz);
  } catch (error) {
    console.error('Error creating quiz:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json({ message: 'Quiz deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


