import { Login, Signup } from "./components";
import { useState } from "react";
import "./styles/Login.css";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isSignup, setIsSignup] = useState(false);
  const [onLandingPage, setOnLandingPage] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <>
      {!isAuthenticated && !isSignup && isLogin && (
        <div className="login">
          <Login
            setIsSignup={setIsSignup}
            setIsLogin={setIsLogin}
            setIsAuthenticated={setIsAuthenticated}
          />
        </div>
      )}
      {!isAuthenticated && !isLogin && isSignup && (
        <div className="login">
          <Signup setIsLogin={setIsLogin} setIsSignup={setIsSignup} />
        </div>
      )}
    </>
  );
}

export default App;
