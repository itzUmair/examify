import { useState } from "react";
import Logo from "../assets/logo.svg";
import "../styles/landingpage.css";
import axios from "../api/axios";
const LandingPage = ({ setOnLandingPage, setIsLogin }) => {
  const [error, seterror] = useState("");
  const [quizCode, setQuizCode] = useState("");
  const [quiz, setQuiz] = useState(null);
  const [stdName, setStdName] = useState("");

  const getQuiz = async (e) => {
    e.preventDefault();
    const quiz = await axios.get(`getQuiz/${quizCode}`);
    setQuiz(quiz.data);
  };

  const handleStartQuiz = (e) => {
    e.preventDefault();
  };

  // TODO: work on the quiz screen

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
              onChange={(e) => setQuizCode(e.target.value)}
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
              <span>Time</span> limit: {quiz.timeLimit}
            </p>
          </div>
          <form className="studentNameForm">
            <input
              type="text"
              value={stdName}
              placeholder="Enter your name"
              onChange={(e) => setStdName(e.target.value)}
              className="studentNameInput"
            />
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
