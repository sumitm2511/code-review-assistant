import axios from "axios";

export const api = axios.create({
  baseURL: "https://code-review-backend-4ohe.onrender.com/api",  
});
