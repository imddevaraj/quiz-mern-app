import React, { createContext, useState } from 'react';

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState({});
  const handleAnswerSubmission = (questionId, answers) => {
    setSelectedAnswers((prevSelected) => ({
      ...prevSelected,
      [questionId]: answers,
    }));
    setSubmittedAnswers((prevSubmitted) => ({
      ...prevSubmitted,
      [questionId]: answers,
    }));

  };
  const saveSelectedAnswers = (selectedAnswers) => {
    setSelectedAnswers(selectedAnswers);
  };
  return (
    <QuizContext.Provider value={{ selectedAnswers,submittedAnswers, handleAnswerSubmission,saveSelectedAnswers }}>
      {children}
    </QuizContext.Provider>
  );
};


export default QuizProvider;