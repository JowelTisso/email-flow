import axios from "axios";

const DEV_URL = "http://192.168.29.225:5000/api";
// const PROD_URL =
//   "https://preparation-time-tracker-backend.onrender.com/";

export const axiosInstance = axios.create({
  baseURL: DEV_URL,
});
