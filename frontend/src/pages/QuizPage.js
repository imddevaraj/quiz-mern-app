// src/pages/QuizPage.js
import React, { useState, useEffect, useContext } from 'react';
import QuizCard from '../components/QuizCard';
import ConnexionCard from '../components/ConnexionCard';
import quizService from '../services/QuizService';
import { AuthContext } from '../context/AuthContext';
import { useAuth } from '../context/AuthContext';
import QuizProvider, {QuizContext } from '../context/QuizContext';
import '../styles/QuizPage.css';
import { useLocation,useNavigate } from 'react-router-dom';
const QuizPage = ({}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizData, setQuizData] = useState([]);
  
  const {user} = useContext(AuthContext);
  const [timer, setTimer] = useState(0);
  const {selectedAnswers, submittedAnswers,handleAnswerSubmission,saveSelectedAnswers} = useContext(QuizContext);
  const {setAllQuestionsAnswered}= useState(false);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false); // State for submission confirmation
  const [answers, setAnswers] = useState({}); // State to store all answers
  const [answerStatus, setAnswerStatus] = useState({}); // State to track answer correctness
  const {userResponses} = useState({});
  useEffect(() => {
    if (location.state && location.state.responses) {
      setResponses(location.state.responses);
      location.state.responses.forEach((response) => {
        answerStatus[response.questionId] = response.answerStatus;
        if(response.connexionAnswer.trim() === response.answer.trim()){
          answerStatus[response.questionId] = 'correct';
        }
        const userResponse = location.state.user;
        submittedAnswers[response.questionId] = response.connexionAnswer;
     });
    }
    fetchQuizQuestions().then((quizData) => {
      setQuizData(quizData);
    });
    
  }, [location.state]);



  useEffect(() => {

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = 'You have unsaved changes, do you really want to leave?';
      handleSubmitQuiz();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
     
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  const fetchQuizQuestions = async () => {
    try {
      const { data: quizData, status }  = await quizService.fetchQuiz();

      return quizData;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
   
    
  };
 
  const handleQuestionToggle = (index) => {
      setCurrentQuestionIndex(index);
  };
  const handleInputChange = (questionId, userAnswer) => {
    setResponses((prevResponses) => {
      const updatedResponses = prevResponses.map((response) =>
        response.questionId === questionId
          ? { ...response, connexionAnswer: userAnswer }
          : response
      );
      return updatedResponses;
    });
    const correctAnswer = quizData.questions.find((question) => question._id === questionId).answer;
    const isCorrect = userAnswer.trim() === correctAnswer.trim();
    setAnswerStatus((prevStatus) => ({
      ...prevStatus,
      [questionId]: isCorrect?'correct':'incorrect',
    }));
    handleAnswerSubmission(questionId, userAnswer);
  };
  const handleSubmitCard = async (questionId, userAnswer) => {
    const correctAnswer = quizData.questions.find((question) => question._id === questionId).answer;
  
    const isCorrect = userAnswer.trim() === correctAnswer.trim();
    const isAnswered = userAnswer.trim() !== '';
   
    setAnswerStatus((prevStatus) => ({
      ...prevStatus,
      [questionId]: isCorrect?'correct':'incorrect',
    }));
    saveAnswer("progress");
  };

  const saveAnswer = async (status) => {
    const userMail = user.emailId?user.emailId:userResponses.emailId;
    const payload = {
      user: {
        email: user?.emailId, 
      },
      quiz: {
        id: quizData._id,
      },
      status: status,
      responses: quizData.questions.map((question) => {
        const typedAnswer = submittedAnswers[question.id] || '';
        return {
        question: {
          id: question.id,
        },
        connexionAnswer: typedAnswer, // Use the answer from the answers state or an empty string if not answered
        answerStatus: answerStatus[question.id], // Assuming answerStatus is available
        questionId: question.id,
        answer: question.answer,
        correctAnswer: typedAnswer.trim() === question.answer.trim()?'correct':'incorrect',
      };
      }),
  
    };
     try {
      const {result,httpStatus} = await quizService.saveResponse(payload);
      
      if(httpStatus===200){
            if (status === "final") {
                alert('Thank you for attending the quiz!');
                navigate('/'); // Redirect to login page
            } else {
                console.log("Moving to next question");
                moveToNextQuestion(); // Call the function to move to the next question
            }
        }
      
    } catch (error) {
      console.error('Failed to submit quiz:', error);
      alert("Failed to submit quiz");
    }

  };
  const moveToNextQuestion = () => {
    
    setCurrentQuestionIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
 
      if (nextIndex < quizData.questions.length) {
        return nextIndex;
      }else{
        return prevIndex;
      }
    });
};

  const handleSubmitQuiz = async () => {
    if(quizData.quizType === 'q'){
        const transformedAnswers = Object.entries(submittedAnswers).map(([questionId, answers]) => {
        return {
            question:{
              id: questionId,
            },
            selectedAnswers: answers.map((answer) => ({ id: answer._id, }))

            };
        });
      
        const payload = {
    
          user:{
            emailId: user.emailId, // Replace with actual user ID
          },
          quiz:{
            id: quizData._id,
          
          },
            responses :transformedAnswers
        };
        try {
          const result = await quizService.submitQuiz(payload);
        } catch (error) {
          console.error('Failed to submit quiz:', error);
        }
  }else{
        if (!allQuestionsAnswered) {
          setShowConfirmation(true); // Show confirmation dialog if not all questions are answered
        } else {
          saveAnswer("final");
        };
        }
  };


 
  if (!quizData || !quizData.questions) {
    return <div>Loading...</div>;
  }
  const allQuestionsAnswered = quizData.questions.every(
    (question) => submittedAnswers[question._id]
  );
  
  const getResponseForQuestion = (questionId) => {
    const response = responses.find((response) => response.questionId === questionId);
    return response ? response.connexionAnswer : '';
  };
  const getAnswerStatus = (questionId) => {
    const response = responses.find((response) => response.questionId === questionId);
    answerStatus = response.answerStatus;
    return response ? response.answerStatus : '';
  };


  const currentQuestion = quizData.questions[currentQuestionIndex];
 
  return (
    <div className="quiz-page">
      <h2>{quizData.title}</h2>
 
  
      { quizData.quizType === 'q' ?(
        <QuizCard
          key={currentQuestion.id}
          question={currentQuestion}
          selectedAnswers={selectedAnswers[currentQuestion.id]}
         
        />
         ):(
          
        <ConnexionCard
        key={currentQuestion.id}
        question={currentQuestion}
        response={{ connexionAnswer: getResponseForQuestion(currentQuestion.id) }}
        selectedAnswers={selectedAnswers[currentQuestion.id]}
        handleSubmitCard={handleSubmitCard}
        handleInputChange={handleInputChange}
      />
      
         )}
       <div className="navigation-container">
        
       {quizData.questions.map((question, index) => (
      
          <button
          className={`nav-button ${answerStatus[question._id] === 'correct' ? 'correct' : ''} ${currentQuestionIndex === index ? 'active' : ''}`} 
            key={question._id}
            onClick={() => handleQuestionToggle(index)}
          >
            {index + 1}
          </button>
        ))}
        
       
    
        </div>
        {allQuestionsAnswered && (
        <button className="submit-button" 
              onClick={handleSubmitQuiz}> Submit Quiz</button>
      
        )}
      </div>
   
  );
};

export default QuizPage;
