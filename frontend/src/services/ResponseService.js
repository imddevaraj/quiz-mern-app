

// src/services/quizService.js

const apiUrl = process.env.REACT_APP_API_URL;
const API_BASE_URL = `${apiUrl}/api/responses`;


const getUserResponses = async (email) => {
    try {
      
      const response = await fetch(`${API_BASE_URL}/getUserResponses?email=${email}`);
      if (response.ok) {
        return await response.json();
      } 
      if (response.status === 404) {
        return null;
      }
    } catch (error) {
      console.error('Error fetching user responses:', error);
      throw error;
    }
  };
  
  const getMcqResponses = async(email) =>{
    try {
      
      const response = await fetch(`${API_BASE_URL}/getMcqResponses?email=${email}`);
      console.log(response.status);
      return {httpStatus:response.status, result:await response.json()};
    } catch (error) {
      console.error('Error fetching user responses:', error);
      throw error;
    }

  };
  export default { getUserResponses,getMcqResponses };