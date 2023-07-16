import { Login, Signup, Dashboard, LandingPage } from "./components";
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
      {onLandingPage && (
        <LandingPage
          setOnLandingPage={setOnLandingPage}
          setIsLogin={setIsLogin}
        />
      )}
      {!onLandingPage && !isAuthenticated && isLogin && (
        <div className="login">
          <Login
            setIsSignup={setIsSignup}
            setIsLogin={setIsLogin}
            setIsAuthenticated={setIsAuthenticated}
            setOnLandingPage={setOnLandingPage}
          />
        </div>
      )}
      {!onLandingPage && !isAuthenticated && isSignup && (
        <Signup
          setIsLogin={setIsLogin}
          setIsSignup={setIsSignup}
          setOnLandingPage={setOnLandingPage}
        />
      )}
      {!onLandingPage && isAuthenticated && (
        <Dashboard
          setIsAuthenticated={setIsAuthenticated}
          setIsLogin={setIsLogin}
        />
      )}
    </>
  );
}

export default App;
