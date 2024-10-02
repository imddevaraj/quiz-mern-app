// server/controllers/responseController.js
const mongoose = require('mongoose');
const Response = require('../models/Response');
const McqResponse = require('../models/McqResponse');
const Quiz = require('../models/Quiz');
const Question = require('../models/Question');
const Answer = require('../models/Answer');
const { ContractMissingDeployDataError } = require('web3');
const ObjectId = mongoose.Types.ObjectId;

const submitResponseForQuiz = async (req, res) => {
  const { user, quiz, mcqresponses} = req.body;
  console.log('Request body for Response:', req.body);
  try{
    let score = 0;
    if (!user || !user.email) {
      return res.status(400).json({ message: 'User email is invalid' });
    }
    // Fetch the quiz with all its questions
    const quizData = await Quiz.findById(quiz.id).populate('questions');
    if (!quizData) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    // Ensure questions are populated
    const questions = quizData.questions;
    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: 'No questions found in quiz' });
    }  
   
    // Prepare answers array
    const answers = [];

    // Iterate through each response to check if the answer is correct
    for (const response of mcqresponses) {
      const question = questions.find(q => q.id.toString() === response.question.id.toString());
      if (!question) {
        console.log(`Question with ID ${response.question.id} not found in quiz`);
        continue;
      }
      const correctAnswerId = question.answerId.toString();
      if (correctAnswerId && response.selectedAnswers.map(id => id.toString()).includes(correctAnswerId)) {
        score += 1;
        answers.push({
          id: question.id,
          answer: question.answer,
          answerId: question.answerId,
        })
      }
     
   // Add to answers array
     
    }
     
    const newResponse = new McqResponse({
      user,
      quiz,
      mcqresponses:answers,
      score, // Save the score
      status: 'C'
    });

    await newResponse.save();
    console.log("Response saved successfully");
    res.status(200).json({ statusCode:200, message: 'Response saved successfully' });
  }catch(error){
    console.error('Error saving response:', error);
    res.status(500).json({ message: 'Error saving response', error });
  }
}

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

const getAllUserResponses = async (req, res) => {
  console.log('Fetching leaderboard');
  try {
    let allResponses = await Response.find().sort({ score: -1 }); // Sort by score in descending order
    if (allResponses.length > 0) {
      console.log("All Responses in server:", allResponses);
      allResponses.forEach(response => {
      
        console.log(`${response.user.email}  ${response.score}  ${response.status} `);

    

      });
      res.status(200).json(allResponses);
    } else {
      res.status(404).json({ message: 'No responses found' });
    }
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Error fetching leaderboard', error });
  }
};

const getMcqResponses = async (req, res) => {
  const { email } = req.query;


  console.log('Fetching mcqresponses for:', { email });
  try {
    let mcqresponses = await McqResponse.findOne({ 'user.email': email });
    if (mcqresponses) {
      console.log("User Responses in server:",userResponses);
      res.status(200).json(mcqresponses);
    } else {
      res.status(404).json({ message: 'No responses found for the given user and quiz' });
    }
  } catch (error) {
    console.error('Error fetching user responses:', error);
    res.status(500).json({ message: 'Error fetching user responses', error });
  }
}

module.exports = { submitResponse,saveResponse,getUserResponses,getAllUserResponses,submitResponseForQuiz,getMcqResponses };