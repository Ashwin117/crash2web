import axios from "axios";
import uniqid from 'uniqid';

const API = axios.create({
  baseURL: "http://localhost:3000",
});

export const executeCode = async (language, sourceCode) => {
  const response = await API.post("/submit", {
    "language": language,
    "user_code": sourceCode,
    "problem_id": uniqid(),
  });
  return response.data;
};
