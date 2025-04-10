import axios from "axios";

const API_BASE_URL = "https://poem-ai-app-bjrx.onrender.com/api";

// ✅ Enable credentials for cookies
axios.defaults.withCredentials = true;

// ✅ Login function
export const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

// ✅ Signup function
export const signup = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/signup`, { username, password });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Signup failed");
  }
};

// ✅ Helper function to get authentication headers
export const getAuthHeaders = () => {
  return {
    'Content-Type': 'application/json'
  };
};

// ✅ Example protected request (using cookies)
export const getProtectedData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/protected`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch protected data");
  }
};

export default { login, signup, getProtectedData };




// export default { login, signup };