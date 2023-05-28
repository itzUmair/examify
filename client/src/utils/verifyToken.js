import axios from "../api/axios.js";
const verifyToken = async () => {
  const token = localStorage.getItem("token") || false;
  if (!token) return "invalid";
  try {
    const cookie = await axios.post(
      "verifyToken",
      { message: "token verification" },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const userData = JSON.stringify(cookie.data.data);
    localStorage.setItem("userData", userData);
    return cookie.data.message;
  } catch (error) {
    return "invalid";
  }
};

export default verifyToken;
