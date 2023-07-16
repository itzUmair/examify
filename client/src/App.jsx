import { Login, Signup, Dashboard, LandingPage, QuizPage } from "./components";
import { useState, useEffect } from "react";
import verifyToken from "./utils/verifyToken.js";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isSignup, setIsSignup] = useState(false);
  const [onLandingPage, setOnLandingPage] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [onQuizPage, setOnQuizPage] = useState(false);

  const checkAuthentication = async () => {
    const validity = await verifyToken();
    if (validity === "valid") {
      setIsAuthenticated(true);
      setOnLandingPage(false);
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <>
      {onLandingPage && !isAuthenticated && (
        <LandingPage
          setOnLandingPage={setOnLandingPage}
          setIsLogin={setIsLogin}
          setOnQuizPage={setOnQuizPage}
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
      {!onLandingPage && isAuthenticated && !onQuizPage && (
        <Dashboard
          setIsAuthenticated={setIsAuthenticated}
          setIsLogin={setIsLogin}
        />
      )}
      {!onLandingPage && onQuizPage && <QuizPage />}
    </>
  );
}

export default App;
