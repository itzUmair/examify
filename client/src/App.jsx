import { Login, Signup } from "./components";
import { useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isSignup, setIsSignup] = useState(false);
  const [onLandingPage, setOnLandingPage] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      {isLogin && (
        <div className="login">
          <Login
            setIsSignup={setIsSignup}
            setIsLogin={setIsLogin}
            setIsAuthenticated={setIsAuthenticated}
          />
        </div>
      )}
      {isSignup && <Signup setIsLogin={setIsLogin} setIsSignup={setIsSignup} />}
    </>
  );
}

export default App;
