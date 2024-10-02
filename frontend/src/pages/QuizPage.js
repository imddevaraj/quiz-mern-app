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

  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizData, setQuizData] = useState([]);
  
  const {user} = useContext(AuthContext);
  const [timeLeft, setTimeLeft] = useState(0);
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
    const fetchQuizQuestions = async () => {
      try {
        const { data:quizData, status }  = await quizService.fetchQuiz();
        console.log("Quiz Data:",quizData);
        if (status === 200 && quizData) {
          setQuizData(quizData);
          console.log("Time Limit:",quizData.maxTimeLimit);
          setTimeLeft(quizData.maxTimeLimit);
        } else {
          setError('Failed to fetch quiz data');
        }
      } catch (error) {
        setError('An error occurred while fetching quiz data');
      } finally {
        setLoading(false);
      }
    };
    fetchQuizQuestions();
  }, []);

  useEffect(() => {
    if(quizData && quizData.maxTimeLimit){
    if (timeLeft === 0) {
      saveMcqAnswer(  );
      // Handle timeout (e.g., submit the quiz or show a timeout message)
      alert('Time is up!');
      return;
    }
  }
    const timerId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  

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
 
 
  const handleQuestionToggle = (index) => {
      setCurrentQuestionIndex(index);
  };
 
  const saveMcqAnswer = async () => {
    const userMail = user.emailId?user.emailId:userResponses.emailId;
    console.log("Saving Quiz Answer",user.emailId);
    const payload = {
      user: {
        email: user.emailId, 
      },
      quiz: {
        id: quizData._id,
      },
     
      mcqresponses: quizData.questions.map((question) => {
        const typedAnswer = submittedAnswers[question.id] || '';
        return {
        question: {
          id: question.id,
        },
        selectedAnswers: Array.isArray(typedAnswer) ? typedAnswer.map((answer) => ({ id: answer.id })) : [],
      };
      }),
      timeLeft: timeLeft,
  
    };
      try {
        console.log('Submitting quiz:', payload);
        const {result,httpStatus} = await quizService.submitMcqQuiz(payload);
        
        if(httpStatus===200){
          
          alert('Thank you for attending the quiz!');
          navigate('/'); // Redirect to login page
        }
        
      } catch (error) {
        console.error('Failed to submit quiz:', error);
        alert("Failed to submit");
  }
}

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

        correctAnswer: typedAnswer.trim() === question.answer.trim()?'correct':'incorrect',
      };
      }),
  
    };
     try {
      console.log('Submitting quiz:', payload);
      const {result,httpStatus} = await quizService.saveResponse(payload);
      
      if(httpStatus===200){
        quizData.questions.map((question) => {
          answerStatus[question.id]= result.responses.find((response) => response.questionId === question.id).answerStatus;
        });
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
 
if (!quizData || !quizData.questions) {
  return <div>No Active Quiz</div>;
}
const currentQuestion = quizData.questions[currentQuestionIndex];
const handleNext = () => {
  if (currentQuestionIndex < quizData.questions.length - 1) {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }
};

const handlePrev = () => {
  if (currentQuestionIndex > 0) {
    setCurrentQuestionIndex(currentQuestionIndex - 1);
  }
};
const handleOptionChange = (questionId, selectedOption) => {
  handleAnswerSubmission(questionId, selectedOption);
};
const toggleAnswer = (questionId, option) => {

  const currentAnswers = selectedAnswers[questionId] || [];
  let updatedAnswers;

  if (currentQuestion.hasMultipleAnswer) {
    if (currentAnswers.some((selected) => selected.id === option.id)) {
      updatedAnswers = currentAnswers.filter((selected) => selected.id !== option.id);
    } else {
      updatedAnswers = [...currentAnswers, option];
    }
  } else {
    updatedAnswers = [option];
  }

  handleAnswerSubmission(questionId, updatedAnswers);
};


  const handleSubmitQuiz = async () => {
  
      console.log("Saving Quiz Answer")
      if (!allQuestionsAnswered) {
        setShowConfirmation(true); // Show confirmation dialog if not all questions are answered
      } else {
        saveMcqAnswer();
      };
      
 
  };



  const allQuestionsAnswered = quizData.questions.every(
    (question) => submittedAnswers[question.id]
  );
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };
  return (
    <div className="quiz-page-container">
     <div className="quiz-page-header-container">
      <h2>{quizData.title}</h2>
      <div className="timer">Time left: {formatTime(timeLeft)}</div>
    </div>
      <div className="quiz-card-container">
        <QuizCard
          key={currentQuestion.id}
          question={currentQuestion}
          selectedAnswers={selectedAnswers[currentQuestion.id]}
          toggleAnswer={toggleAnswer}
          handleOptionChange={handleOptionChange}
          handleNext={handleNext}
          handlePrev={handlePrev}
          isFirstQuestion={currentQuestionIndex === 0}
          isLastQuestion={currentQuestionIndex === quizData.questions.length - 1}
        />
        </div>
       <div className="navigation-container">
        
       {quizData.questions.map((question, index) => (
      
          <button
          className={`nav-button ${selectedAnswers[question.id] ? 'answered' : ''} ${currentQuestionIndex === index ? 'active' : ''}`}
            key={question.id}
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
