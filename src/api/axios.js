import axios from "axios";

export default axios.create({
  baseURL: "https://localhost:8443",
});

export const axiosPrivate = axios.create({
  baseURL: "https://localhost:8443",
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});