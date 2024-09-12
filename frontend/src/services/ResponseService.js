// src/services/quizService.js
const API_BASE_URL = 'http://localhost:5000/api/responses';

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
  
  export default { getUserResponses };