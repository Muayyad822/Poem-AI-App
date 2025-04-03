import axios from "axios";

const API_URL = "https://poem-ai-app-bjrx.onrender.com/api/ai"; // Backend proxy

// Function to generate Arabic poetry
export const generatePoetry = async (prompt) => {
  if (!prompt?.trim()) {
    throw new Error('Prompt is required');
  }

  try {
    const response = await axios.post(`${API_URL}/generatePoetry`, { prompt }, {
      timeout: 15000 // 15 second timeout
    });
    
    if (!response.data?.poem) {
      throw new Error('Invalid response format from server');
    }
    
    return response.data;
  } catch (error) {
    const errorMessage = error.response?.status === 429 ? 
      'Service quota exceeded. Please try again later.' :
      error.code === 'ECONNABORTED' ? 
        'Request timed out. Please try again.' :
        'Failed to generate poetry';
    
    console.error("Error generating poetry:", error.response?.data || error.message);
    throw new Error(errorMessage);
  }
};

// Function to validate poetry structure
export const validatePoetry = async (text) => {
  try {
    const response = await axios.post(`${API_URL}/validatePoetry`, { text });
    return response.data.analysis || '';
  } catch (error) {
    console.error("Error validating poetry:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || 'Failed to validate poetry');
  }
};

// Function to get rhyming words
export const getRhymes = async (word) => {
  if (!word?.trim()) {
    throw new Error('Word is required');
  }

  try {
    const response = await axios.get(`${API_URL}/getRhymes`, { 
      params: { word },
      timeout: 15000 // 15 second timeout
    });
    
    if (!response.data?.rhymes) {
      throw new Error('Invalid response format from server');
    }
    
    return response.data;
  } catch (error) {
    console.error("Error fetching rhymes:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || 'Failed to fetch rhymes');
  }
};

// Function to analyze poetry structure
export const analyzePoetryStructure = async (text) => {
  try {
    const response = await axios.post(`${API_URL}/analyzePoetryStructure`, { text });
    return response.data.analysis || '';
  } catch (error) {
    console.error("Error analyzing poetry structure:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || 'Failed to analyze poetry structure');
  }
};

export default {
  generatePoetry,
  validatePoetry,
  getRhymes,
  analyzePoetryStructure
};
