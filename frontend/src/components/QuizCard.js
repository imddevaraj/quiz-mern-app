// src/components/QuizCard.js
import React, { useContext, useState } from 'react';
import AnswerOption from './AnswerOption';
import '../styles/QuizCard.css';
import { QuizContext } from '../context/QuizContext';

const QuizCard = ({ question,selectedAnswers,toggleAnswer, handleNext, handlePrev,isFirstQuestion,isLastQuestion }) => {
  const currentAnswers = Array.isArray(selectedAnswers) ? selectedAnswers : [];
  return (
    
    <div className="quiz-card">
     
     <h3 className="question-text">{question.questionText}</h3>
     {question.options && question.options.length > 0 ? (
      question.options.map((option) => (

        <AnswerOption
          key={option.id}
          option={option}
          isSelected={currentAnswers.some((selected)=> selected.id==option.id)}
          toggleAnswer={()=>toggleAnswer(question.id,option)}
          hasMultipleAnswer={question.hasMultipleAnswer}
        />

      ))
      
     ) : ( <p>  </p>)}
  
   
    <div className="navigation-container-quizcard">
        <button className="nav-button-prev-next" onClick={handlePrev} disabled={isFirstQuestion}>
          Previous
        </button>
        <button className="nav-button-prev-next" onClick={handleNext} disabled={isLastQuestion}>
          Next
        </button>
      </div>
  </div>
    
  );
};

export default QuizCard;
