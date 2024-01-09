import { useState } from "react";
import Logo from "../assets/logo.svg";
import "../styles/landingpage.css";
import axios from "../api/axios";
const LandingPage = ({ setOnLandingPage, setIsLogin, setOnQuizPage }) => {
  const [error, setError] = useState("");
  const [quizCode, setQuizCode] = useState("");
  const [quiz, setQuiz] = useState(null);
  const [stdName, setStdName] = useState("");

  const getQuiz = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const quiz = await axios.get(`getQuiz/${quizCode}`);
      const today = new Date().toISOString();
      const scheDate = new Date(quiz.data.scheduledFor).toISOString();
      const expDate = new Date(quiz.data.expiresOn).toISOString();
      if (today < scheDate) {
        setError(
          `Quiz starts on ${new Date(quiz.data.scheduledFor).toLocaleString()}`
        );
      } else if (today > expDate) {
        setError(
          `Quiz expired on ${new Date(
            quiz.data.expiresOn
          ).toLocaleDateString()}`
        );
      } else {
        setQuiz(quiz.data);
      }
    } catch (error) {
      setError(error.response?.data?.error);
    }
  };

  const handleStartQuiz = (e) => {
    e.preventDefault();
    if (stdName.length < 3) {
      setError("Enter a valid name");
      return;
    }
    localStorage.setItem("stdName", JSON.stringify(stdName));
    localStorage.setItem("quizData", JSON.stringify(quiz));
    setOnLandingPage(false);
    setIsLogin(false);
    setOnQuizPage(true);
  };

  return (
    <>
      {quiz === null ? (
        <div className="landingPageContainer">
          <img src={Logo} alt="examify" className="landingPageLogo" />
          <form className="quizStartForm">
            <input
              type="text"
              name="quizCode"
              placeholder="Enter quiz code"
              onChange={(e) => {
                setError("");
                setQuizCode(e.target.value);
              }}
              value={quizCode}
            />
            {error && <p className="error">{error}</p>}
            <button className="button" onClick={getQuiz}>
              Start
            </button>
          </form>
          <p className="seperator">OR</p>
          <button
            className="button"
            onClick={() => {
              setIsLogin(true);
              setOnLandingPage(false);
            }}
          >
            I am a teacher
          </button>
        </div>
      ) : (
        <div className="quizMetaInfoContainer">
          <img src={Logo} alt="examify" className="landingPageLogo" />
          <div className="quizMetaInfo">
            <p>
              <span>ID</span>: {quiz._id}
            </p>
            <p>
              <span>Scheduled for: </span>
              {new Date(quiz.scheduledFor).toLocaleString()}
            </p>
            <p>
              <span>Expires on: </span>
              {new Date(quiz.expiresOn).toLocaleString()}
            </p>
            <p>
              <span>Title</span>: {quiz.title}
            </p>
            <p>
              <span>Description</span>: {quiz.description}
            </p>
            <p>
              <span>Subject</span>: {quiz.subject}
            </p>
            <p>
              <span>Grade</span>: {quiz.grade}
            </p>
            <p>
              <span>Time limit: </span>
              {quiz.timeLimit} minutes
            </p>
          </div>
          <form className="studentNameForm">
            <input
              type="text"
              value={stdName}
              placeholder="Enter your name"
              onChange={(e) => {
                setError("");
                setStdName(e.target.value);
              }}
              className="studentNameInput"
              maxLength="20"
            />
            {error && <p className="error">{error}</p>}
            <button className="button" onClick={handleStartQuiz}>
              Start Quiz
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default LandingPage;
