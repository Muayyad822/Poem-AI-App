import axios from "axios";

const API_URL = "http://localhost:5000/api/ai"; // Backend proxy

// Function to generate Arabic poetry
export const generatePoetry = async (prompt) => {
  console.log("Sending request to:", `${API_URL}/generatePoetry`);
    console.log("With payload:", { prompt });
  try {
    const response = await axios.post(`${API_URL}/generatePoetry`, { prompt });
    return response.data.poem || '';
  } catch (error) {
    console.error("Error generating poetry:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || 'Failed to generate poetry');
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
  try {
    const response = await axios.get(`${API_URL}/getRhymes`, { params: { word } });
    return response.data.rhymes || [];
  } catch (error) {
    console.error("Error fetching rhymes:", error.response?.data || error.message);
    throw new Error(error.response?.data?.error || 'Failed to fetch rhymes');
  }
};
// export const getRhymes = async (word) => {
//   try {
//     const response = await fetch(`http://localhost:5000/api/ai/getRhymes?word=${word}`, {
//       method: "GET",  // Change from POST to GET
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch rhymes");
//     }

//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching rhymes:", error);
//     throw error;
//   }
// };

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
