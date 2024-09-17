
import React, { useContext, useState,useEffect } from 'react';
import { QuizContext } from '../context/QuizContext';
import '../styles/ConnexionCard.css';
const ConnexionCard = ({ question,response, handleSubmitCard,handleInputChange }) => {
    const { selectedAnswers, handleAnswerSubmission } = useContext(QuizContext);
    const [showHint, setShowHint] = useState(false); // State variable for hint visibility

    const [userAnswer, setUserAnswer] = useState(selectedAnswers[question._id] || '');
    
    useEffect(() => {
 
      if (response && response.connexionAnswer) {
        setUserAnswer(response.connexionAnswer);
      }
    }, [response]);

    const handleChange = (e) => {
      const value = e.target.value;
      setUserAnswer(value);
      handleInputChange(question._id, value);
    };

  const handleHintClick = () => {
    setShowHint(!showHint); // Toggle hint visibility
  };

  const apiUrl = process.env.REACT_APP_API_URL;

  return (
    <div>
    <div className="quiz-card">
        <h3 className="question-text">{question.questionText}</h3>
      
      <div className="image-container">
            {question.images.map((image, index) => {
            const imageUrl = `${apiUrl}${image}`;
            return(
                    <img key={index} 
                        src={imageUrl }
                        alt={imageUrl} 
                        className="question-image" />
                );
            })}   
        </div>
         
    <div className="input-container">
  
        <input type="text" value={userAnswer}  onChange={handleChange}
            placeholder="Enter your answer"
            className="answer-input"
            
        />
      <button className="nav-save-button" onClick={() => handleSubmitCard(question._id, userAnswer)}>Save</button>
      
    </div>
    </div>
  </div>
  );
};


export default ConnexionCard;