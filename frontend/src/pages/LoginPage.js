import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/LoginPage.css';
import LoginService from '../services/LoginService';
import ResponseService from '../services/ResponseService';
function LoginPage() {
  const [emailId, setEmailInput] = useState();
  const [errorMessage, setErrorMessage] = useState('');
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [responses, setResponses] = useState([]); // State to store user responses
 

  const handleEmailChange = (event) => {
    setEmailInput(event.target.value);
  };


  const handleLogin =  async (e) => {
    console.log('Logging in with',emailId);
    e.preventDefault();
    setErrorMessage('');
    
    try{
      const user = await LoginService.authenticate(emailId);
      setUser({ 
        emailId: user.emailId ,
        name: user.name,
        id: user.id,
      });
      if(user){
        const {httpStatus,mcqresponses} = await ResponseService.getMcqResponses(user.emailId); // Fetch user responses
          console.log("MCQ Responses:",mcqresponses);
          console.log("HTTP Status:",httpStatus);
          if(httpStatus===404) {
            setResponses([]);
            navigate('/quiz-instructions');
          }else if(httpStatus===200){
            if (mcqresponses && mcqresponses.length > 0) {
              alert("You have already completed the quiz.");
              navigate('/'); // Redirect to home page
            } else {
              setResponses([]);
              navigate('/quiz-instructions');
            }
          }else{
            alert("You have already completed the quiz.");
            navigate('/'); // Redirect to home page
          }
      }else{
        setResponses([]);
       navigate('/quiz-instructions');
      }
    }catch(error){
      setResponses([]);
      console.error('Error during authentication:', error);
      setErrorMessage('Authentication failed');
    }
  };

  return (
    <div className="login-page">
  
      <form onSubmit={handleLogin} className='login-form'>
      {errorMessage && (
          <div className="error-message">{errorMessage}</div>
        )}
        <div className="form-group">
        <label htmlFor='email'>Email:</label>
          <input
            type="email"
            id="email "
            value={emailId}
            placeholder="Enter your HID email id"
            onChange={handleEmailChange}
            required
          />
        </div>
      
        <button type="submit" className="btn" >Sign up/Login</button>
      </form>
     
    </div>
  );
}

export default LoginPage;
