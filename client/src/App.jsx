import { Login, Signup } from "./components";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./styles/Login.css";

function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [isSignup, setIsSignup] = useState(false);
  const [onLandingPage, setOnLandingPage] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <>
      <CSSTransition
        in={!isAuthenticated && !isSignup && isLogin}
        unmountOnExit
        timeout={500}
        classNames="login"
      >
        <div className="login">
          <Login
            setIsSignup={setIsSignup}
            setIsAuthenticated={setIsAuthenticated}
          />
        </div>
      </CSSTransition>
    </>
  );
}

export default App;
