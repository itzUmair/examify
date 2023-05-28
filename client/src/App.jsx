import { Login, Signup, Dashboard } from "./components";
import { useState, useEffect } from "react";
import verifyToken from "./utils/verifyToken.js";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isSignup, setIsSignup] = useState(false);
  const [onLandingPage, setOnLandingPage] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthentication = async () => {
    const validity = await verifyToken();
    if (validity === "valid") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <>
      {!isAuthenticated && isLogin && (
        <div className="login">
          <Login
            setIsSignup={setIsSignup}
            setIsLogin={setIsLogin}
            setIsAuthenticated={setIsAuthenticated}
          />
        </div>
      )}
      {!isAuthenticated && isSignup && (
        <Signup setIsLogin={setIsLogin} setIsSignup={setIsSignup} />
      )}
      {isAuthenticated && (
        <Dashboard
          setIsAuthenticated={setIsAuthenticated}
          setIsLogin={setIsLogin}
        />
      )}
    </>
  );
}

export default App;
