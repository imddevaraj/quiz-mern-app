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
        <h2>Fast Fingers Instructions</h2>
        <p>Please read the following instructions carefully before starting the quiz:</p>
        <ul>
          <li>Welcome to the Fast Fingers Game! You will have 20 Questions to answer in 20 min.  </li>
          <li>Your goal is to answer as much as questions in the time limit.</li>
          <li>The quiz automatically closes after the time expires and answers will get submitted.</li>
          <li>If you leave the quiz mid-way without save, your progress will be lost.</li>
          <li>Good luck!</li>
        </ul>
        <button onClick={startQuiz} className="btn start-btn">Start Quiz</button>
      </div>
    </div>
  );
}

export default QuizInstructions;
