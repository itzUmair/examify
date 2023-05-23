import { useState } from "react";
import Logo from "../assets/logo.svg";
import "../styles/Login.css";

function Login({ setIsSignup, setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else {
      return;
    }
  };

  const validateForm = (e) => {
    e.preventDefault();
  };
  return (
    <div className="form-container">
      <form className="form">
        <img src={Logo} alt="examify" />
        <input
          type="email"
          placeholder="Email"
          onChange={handleChange}
          name="email"
          value={email}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={handleChange}
          name="password"
          value={password}
        />
        <button type="submit" onClick={validateForm} className="button">
          Login
        </button>
        <p>
          Don&apos;t have an account?{" "}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsSignup(true);
            }}
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
}

export default Login;
