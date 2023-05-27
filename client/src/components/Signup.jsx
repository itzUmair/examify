import { useState } from "react";

import axios from "../api/axios";
import Logo from "../assets/logo.svg";
import "../styles/form.css";

function Signup({ setIsLogin, setIsSignup }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setError("");
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "password") {
      setPassword(e.target.value);
    } else if (e.target.name === "confirmPassword") {
      setConfirmPassword(e.target.value);
    } else {
      return;
    }
  };

  const validateForm = () => {
    if (!name.length) {
      setError("Name is required");
      return false;
    } else if (!/^(?![_.])[\w.]{8,20}(?<![_.])$/.test(name)) {
      setError(
        "The username does not meet the requirements. Please ensure that the username is between 8 and 20 characters long.The username only contains alphanumeric characters, periods, and underscores.Periods and underscores are not at the beginning or end of the username. Spaces are not allowed in the username."
      );
      return false;
    } else if (!email.length) {
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
    } else if (!confirmPassword.length) {
      setError("Please confirm your password");
      return false;
    } else if (confirmPassword !== password) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const authenticate = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post("signup", {
          name,
          email,
          password,
        });
        setSuccess(response.data.message);
        setIsLoading(false);
      } catch (error) {
        setError(error.response.data.error);
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="form-container">
      <form className="form">
        <img src={Logo} alt="examify" />
        <input
          type="text"
          placeholder="Name"
          onChange={handleChange}
          name="name"
          value={name}
          required
        />
        <p className="username_hint">Name cannot be changed once set.</p>
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
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Confirm Password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
          required
        />
        <div
          className="show-password-btn"
          onClick={(e) => {
            e.preventDefault();
            setShowPassword((prevState) => !prevState);
          }}
        >
          {showPassword ? "Hide Password" : "Show Password"}
        </div>
        {error && <p className="error">{error}</p>}
        {success && (
          <p className="success">
            {success}
            <button
              style={{ color: "white" }}
              onClick={(e) => {
                e.preventDefault();
                setIsSignup(false);
                setIsLogin(true);
              }}
            >
              Log in
            </button>
          </p>
        )}
        <button
          type="submit"
          onClick={authenticate}
          className="button"
          disabled={isLoading}
        >
          {isLoading ? "Signing up..." : "Sign up"}
        </button>
        <p>
          Already have an account?
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsSignup(false);
              setIsLogin(true);
            }}
          >
            Log in
          </button>
        </p>
      </form>
    </div>
  );
}

export default Signup;
