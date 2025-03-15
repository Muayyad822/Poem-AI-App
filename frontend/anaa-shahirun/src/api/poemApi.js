import axios from "axios";

export const fetchPoems = async () => {
  const response = await axios.get("/api/poems");
  return response.data;
};

export const createPoem = async (poem) => {
  const response = await axios.post("/api/poems", poem);
  return response.data;
};

export default { fetchPoems, createPoem };