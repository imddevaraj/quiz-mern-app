// src/components/QuizCard.js
import React, { useContext, useState } from 'react';
import AnswerOption from './AnswerOption';
import '../styles/QuizCard.css';
import { QuizContext } from '../context/QuizContext';

const QuizCard = ({ question }) => {
  const { selectedAnswers, handleAnswerSubmission } = useContext(QuizContext);

  const toggleAnswer = (option) => {
    const currentAnswers = selectedAnswers[question._id] || [];
    let updatedSelected;
    if (question.hasMultipleAnswer) {
      if (currentAnswers.some((selected) => selected._id === option._id)) {
        updatedSelected = currentAnswers.filter((selected) => selected._id !== option._id);
      } else {
        updatedSelected = [...currentAnswers, option];
      }
    } else {
      updatedSelected = [option];
    }
    handleAnswerSubmission(question._id, updatedSelected);
  };

const currentAnswers = Array.isArray(selectedAnswers[question._id]) ? selectedAnswers[question._id] : [];


 

  return (
    <div className="quiz-card">
     <h3 className="question-text">{question.questionText}</h3>
     {question.options && question.options.length > 0 ? (
      question.options.map((option) => (

        <AnswerOption
          key={option._id}
          option={option}
          isSelected={currentAnswers.some((selected)=> selected._id==option._id)}
          toggleAnswer={()=>toggleAnswer(option)}
          hasMultipleAnswer={question.hasMultipleAnswer}
        />
      ))
     ) : ( <p>  </p>)};
  
    </div>
  );
};

export default QuizCard;
