

// src/services/quizService.js


const apiUrl = process.env.REACT_APP_API_URL;
const API_BASE_URL = `${apiUrl}/api/quizzes`;
const fetchQuiz = async (id) => {
  try{
    
  const apiData = await fetch(`${API_BASE_URL}/${id}`); // Assuming quiz ID is 1
  const status = apiData.status;
  if(!apiData.ok){
    throw new Error("HTTP Error! Status: " + apiData.status);
  }
  
  const data = await apiData.json();

  return {data, status};
  } catch(error){
    console.error("Unable to Fetch Error:" ,error);
    throw error
  }
};

const submitQuiz = async (payload) => {
  try{
    console.log("Payload:",payload);
    const response = await fetch(`${API_BASE_URL}/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
  });
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  return data;
}catch(error){
  console.error("Unable to Submit Error:" ,error);
  throw error
}
};

const submitMcqQuiz = async (payload) => {
  try{
    console.log("Payload:",payload);
    const response = await fetch(`${API_BASE_URL}/savemcq`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
  });
  
  const httpStatus = response.status;
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return {data, httpStatus};

}catch(error){
  console.error("Unable to Submit Error:" ,error);
  throw error
}
};
const saveResponse = async (payload) => {
  try{
    
    const response = await fetch(`${API_BASE_URL}/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
  });
  const httpStatus = response.status;
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();

  return {data, httpStatus};
}catch(error){
  console.error("Unable to Submit Error:" ,error);
  throw error
}
};
// Example usage

export default { fetchQuiz, submitQuiz,saveResponse,submitMcqQuiz };
