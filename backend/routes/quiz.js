// server/routes/quiz.js
const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');
const responseController = require('../controllers/responseController');

router.get('/:id', quizController.getQuiz);
router.post('/', quizController.createQuiz);
router.put('/:id', quizController.updateQuiz);
router.delete('/:id', quizController.deleteQuiz);
router.post('/save', responseController.saveResponse);


module.exports = router;