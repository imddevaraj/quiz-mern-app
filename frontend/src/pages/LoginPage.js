import React, { useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/LoginPage.css';
import LoginService from '../services/LoginService';
import ResponseService from '../services/ResponseService';
function LoginPage() {
  const [emailId, setEmailInput] = useState('devaraj.durairaj@hidglobal.com');
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
          const userResponses = await ResponseService.getUserResponses(user.emailId); // Fetch user responses
          if(userResponses) {
            setResponses(userResponses.responses); // Populate responses in the state
            if(userResponses.status==="final"){
              alert("You have already completed the quiz. ");
            }else{
            navigate('/quiz', { state: { responses: userResponses.responses , user:userResponses.user} });
            }
        }else{
          setResponses([]);
          navigate('/quiz-instructions');
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
