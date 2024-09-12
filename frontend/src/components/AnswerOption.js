// src/components/AnswerOption.js
import React from 'react';
import '../styles/AnswerOption.css';

const AnswerOption = ({ option, isSelected, toggleAnswer,hasMultipleAnswer }) => {
  return (
    <div className="answer-option">
      <label>
        <input
         type= {hasMultipleAnswer ? "checkbox" : "radio"}
         checked={isSelected}
         onChange={toggleAnswer}
        />
        {option.text}
      </label>
    </div>
  );
};

export default AnswerOption;
