import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5000/" : "https://idea-share-livid.vercel.app/",
});

export default API;
