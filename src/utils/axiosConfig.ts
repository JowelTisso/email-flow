import axios from "axios";

const PROD_URL = "https://email-flow-be.onrender.com/";

export const axiosInstance = axios.create({
  baseURL: PROD_URL,
});
