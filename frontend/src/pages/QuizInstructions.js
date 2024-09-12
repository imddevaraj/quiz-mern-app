import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import '../styles/QuizInstructions.css';

function QuizInstructions() {
  const location = useLocation();
  const navigate = useNavigate();
 
  const startQuiz = () => {
    navigate('/quiz'); // Navigate to the quiz page when the button is clicked
  };

  return (
    <div className="quiz-instructions">
   
      <div className="instructions-content">
        <h2>Quiz Instructions</h2>
        <p>Please read the following instructions carefully before starting the quiz:</p>
        <ul>
          <li>Welcome to the Connection Game! You will see a sequence of images that represent words or phrases.  </li>
          <li>Your goal is to figure out the word or phrase by analyzing the images.</li>
          <li>Type your answer in the provided text box.</li>
          <li>Make sure you save your progress, If in case you need break</li>
          <li>If you leave the quiz mid-way without save, your progress will be lost.</li>
        </ul>
        <button onClick={startQuiz} className="btn start-btn">Start Quiz</button>
      </div>
    </div>
  );
}

export default QuizInstructions;
