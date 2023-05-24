import { useState } from "react";
import Logo from "../assets/logo.svg";
import "../styles/Login.css";

function Login({ setIsSignup, setIsLogin, setIsAuthenticated }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

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

  const validateForm = (e) => {
    e.preventDefault();
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )
    ) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      );
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError("Invalid email address");
    }
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
        <button
          className="show-password-btn"
          onClick={(e) => {
            e.preventDefault();
            setShowPassword((prevState) => !prevState);
          }}
        >
          Show Password
        </button>
        {error && <p className="error">{error}</p>}
        <button type="submit" onClick={validateForm} className="button">
          Login
        </button>
        <p>
          Don&apos;t have an account?{" "}
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
