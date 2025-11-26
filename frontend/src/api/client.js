// src/api/client.js
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:4000/api", // change if backend runs elsewhere
  timeout: 60_000,
});
