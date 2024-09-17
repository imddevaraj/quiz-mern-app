// server/controllers/responseController.js
const Response = require('../models/Response');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const { ContractMissingDeployDataError } = require('web3');

const submitResponse = async (req, res) => {
  const { user, quiz, responses } = req.body;
  console.log('Request body for Response:', req.body);
  try {
    let score = 0;
    if (!user || !user.email) {
      return res.status(400).json({ message: 'User email is invalid' });
    }
    // Iterate through each response to check if the answer is correct

    for (const response of responses) {
        const question = await Question.findById(response.question.id);
        const correctAnswer = await Answer.findOne({ question: question._id, isCorrect: true });
  
        if (correctAnswer && response.selectedAnswers.includes(correctAnswer._id.toString())) {
          score += 1;
        }
      }
    const newResponse = new Response({
      user,
      quiz,
      responses,
      score // Save the score
    });

    await newResponse.save();
    res.status(201).json({ message: 'Response saved successfully' });
  } catch (error) {
    console.error('Error saving response:', error);
    res.status(500).json({ message: 'Error saving response', error });
  }
};


const saveResponse = async (req, res) => {
  const { user, quiz, responses,status } = req.body;
  console.log('Request body for Response:', req.body);
  try {
    if (!user || !user.email) {
      return res.status(400).json({ message: 'User email is invalid' });
    }
    let score = responses.reduce((acc, response) => {
      return acc + (response.answerStatus === 'correct' ? 1 : 0);
    }, 0);

    let existingResponse = await Response.findOne({ 'user.email': user.email, 'quiz.id': quiz.id });


    if (existingResponse) {

      // Update the existing response
      existingResponse.responses = responses;
      existingResponse.score = score;
      await existingResponse.save();
      res.status(200).json({ statusCode:200 ,message: 'Response updated successfully' });
    } else {
      // Create a new response
      const newResponse = new Response({
        user,
        quiz,
        responses,
        score, // Save the score
        status,
      });
    console.log("Saving response:",newResponse);
    await newResponse.save();
    res.status(200).json({ statusCode:200, message: 'Response saved successfully' });
    }
  } catch (error) {
    console.error('Error saving response:', error);
    res.status(500).json({ message: 'Error saving response', error });
  }
};
const getUserResponses = async (req, res) => {
  const { email } = req.query;

  

  console.log('Fetching responses for:', { email });
  try {
    let userResponses = await Response.findOne({ 'user.email': email });
    if (userResponses) {
      console.log("User Responses in server:",userResponses);
      res.status(200).json(userResponses);
    } else {
      res.status(404).json({ message: 'No responses found for the given user and quiz' });
    }
  } catch (error) {
    console.error('Error fetching user responses:', error);
    res.status(500).json({ message: 'Error fetching user responses', error });
  }
};

module.exports = { submitResponse,saveResponse,getUserResponses };