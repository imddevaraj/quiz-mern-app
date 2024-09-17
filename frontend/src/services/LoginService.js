// src/services/LoginService.js


const apiUrl = process.env.REACT_APP_API_URL;
const API_BASE_URL = `${apiUrl}/api/auth`;

const authenticate = async (emailId) => {
  
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailId }),
      });
  
      if (!response.ok) {
        throw new Error('Authentication failed');
      }
  
      const data = await response.json();
      
      return data;
    } catch (error) {
      console.error('Error during authentication:', error);
      throw error;
    }
  };

export default {authenticate };

    