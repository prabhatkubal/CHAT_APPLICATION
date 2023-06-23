import axios from "axios";

const baseURL = process.env.BASE_URL;

const token = localStorage.getItem("token");

const apiInstance = axios.create({
  baseURL: `${baseURL}`,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    authorization: "Bearer " + token,
  },
});
export default apiInstance;
