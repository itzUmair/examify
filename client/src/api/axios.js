import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:8080/api/v1/",
  baseURL: "https://examify-api.vercel.app/api/v1/",
});
