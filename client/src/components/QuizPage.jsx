import { useEffect, useState } from "react";
import Logo from "../assets/logo.svg";
import resultIcon from "../assets/icons8-certify.svg";
import "../styles/quizPage.css";
import axios from "../api/axios";

const QuizPage = () => {
  const [quizData, setQuizData] = useState({});
  const [remainingSeconds, setRemainingSeconds] = useState(0);
  const [questions, setQuestions] = useState([{}]);
  const [error, setError] = useState("");
  const [stdName, setStdName] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    setStdName(JSON.parse(localStorage.getItem("stdName")));
    setQuizData(JSON.parse(localStorage.getItem("quizData")));
  }, []);

  const forceCloseQuiz = () => {};

  useEffect(() => {
    setQuestions(quizData.questions);
    if (quizData.timeLimit) {
      const timeLimit = quizData.timeLimit;
      setRemainingSeconds(timeLimit * 60);

      const timer = setInterval(() => {
        setRemainingSeconds((prevRemainingSeconds) => {
          let updatedRemainingSeconds = prevRemainingSeconds - 1;

          if (updatedRemainingSeconds < 0) {
            clearInterval(timer);
            forceCloseQuiz();
          }

          return updatedRemainingSeconds;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizData]);

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  const handleOptionChange = (questionIndex, optionIndex) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[questionIndex].selectedOption = optionIndex;
      return updatedQuestions;
    });
  };

  const handleSubmitQuiz = async () => {
    let answers = [];
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].selectedOption === undefined) {
        setError("Answer all questions");
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        return;
      } else {
        answers.push(questions[i].options[questions[i].selectedOption]);
      }
    }
    console.log(answers);
    try {
      const response = await axios.post("submitQuiz", {
        id: quizData._id,
        name: stdName,
        answers: answers,
      });
      setResult(response.data.score);
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <>
      {!result && (
        <div className="quizContainer">
          <div className="header">
            <img src={Logo} alt="examify" className="quizContainerLogo" />
            <p className="quizTitle">{quizData.title}</p>
            <p
              className={
                minutes < 1 ? "timeDisplay timeWarning" : "timeDisplay"
              }
            >
              Time Left: &nbsp;
              {minutes.toString().padStart(2, "0")}:
              {seconds.toString().padStart(2, "0")}
            </p>
          </div>
          {error && <p className="error">{error}</p>}
          {JSON.stringify(quizData)}
          {questions?.map((question, QuesIndex) => {
            return (
              <div className="questionContainer" key={QuesIndex}>
                <div className="question" key={QuesIndex}>
                  <p className="questionNumber">Question No. {QuesIndex + 1}</p>
                  <p className="questionText">{question?.question}</p>
                  {question?.options?.map((option, index) => (
                    <div className="options" key={index}>
                      <input
                        type="radio"
                        key={index}
                        className="questionOption"
                        value={option}
                        name={`${QuesIndex}${index}`}
                        id={`option${index}`}
                        checked={question?.selectedOption === index}
                        onChange={() => handleOptionChange(QuesIndex, index)}
                      />
                      <label htmlFor="option" key={`${QuesIndex}${index}`}>
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          <div className="actionBtn">
            <button className="submitQuizBtn" onClick={handleSubmitQuiz}>
              Submit
            </button>
          </div>
        </div>
      )}
      {result && (
        <div className="resultContainer">
          <img src={resultIcon} />
          <h1>Quiz submitted successfully!</h1>
          <p>
            You scored <span>{result}</span> out of{" "}
            <span>{quizData.questions.length}</span>
          </p>
          <button className="closeBtn" onClick={() => window.location.reload()}>
            Continue
          </button>
        </div>
      )}
    </>
  );
};

export default QuizPage;
