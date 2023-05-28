import { useState } from "react";
import Logo from "../assets/logo.svg";
import axios from "../api/axios.js";
import "../styles/form.css";

function Login({ setIsSignup, setIsLogin, setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setError("");
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else {
      return;
    }
  };

  const validateForm = () => {
    if (!email.length) {
      setError("Email is required");
      return false;
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError("Invalid email address");
      return false;
    } else if (!password.length) {
      setError("Password is required");
      return false;
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      );
      return false;
    }
    return true;
  };

  const authenticate = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    if (validateForm()) {
      try {
        const response = await axios.post("signin", {
          email,
          password,
        });
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("userData", JSON.stringify(response.data.data));
        setIsLoading(false);
        setIsLogin(false);
        setIsAuthenticated(true);
      } catch (error) {
        setError(error.response.data.error);
        setIsLoading(false);
      }
    }
    setIsLoading(false);
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
          required
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          onChange={handleChange}
          name="password"
          value={password}
          required
        />
        <div
          className="show-password-btn"
          onClick={(e) => {
            setShowPassword((prevState) => !prevState);
          }}
        >
          Show Password
        </div>
        {error && <p className="error">{error}</p>}
        <button
          type="submit"
          onClick={authenticate}
          className="button"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Log in"}
        </button>
        <p>
          Don&apos;t have an account?
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsSignup(true);
              setIsLogin(false);
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
