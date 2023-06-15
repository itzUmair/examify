import React, { useState } from "react";
import "../../styles/createQuiz.css";
import axios from "../../api/axios";

const CreateQuiz = ({ setCreateQuiz }) => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [quizMetaDeta, setQuizMetaDeta] = useState({
    createdBy: userData?.id || "",
    scheduledFor: "",
    expiresOn: "",
    timeLimit: "",
    description: "",
    grade: "",
    title: "",
    subject: "",
  });
  const [quizQuestions, setQuizQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: "",
    },
  ]);

  const handleChange = (e, questionIndex, key, optionIndex) => {
    setSuccess("");
    setError("");
    const updatedQuestions = [...quizQuestions];
    if (key === "options") {
      updatedQuestions[questionIndex][key][optionIndex] = e.target.value;
    } else {
      updatedQuestions[questionIndex][key] = e.target.value;
    }
    setQuizQuestions(updatedQuestions);
  };

  const handleMetaDataChange = (e) => {
    setSuccess("");
    setError("");
    const { name, value } = e.target;
    setQuizMetaDeta((prevState) => ({ ...prevState, [name]: value }));
  };

  const scrollWindowToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    const data = Object.values(quizMetaDeta);
    if (data.includes("")) {
      setError("Please provide values for all the fields.");
      scrollWindowToTop();
      return;
    }
    const quiz = { ...quizMetaDeta, questions: quizQuestions };
    const sf = new Date(quiz.scheduledFor);
    const eo = new Date(quiz.expiresOn);
    const expiryTime = (eo - sf) / (1000 * 60);

    const dateNow = new Date();

    if (quiz.timeLimit < 5 || quiz.timeLimit > 180) {
      setError("Time limit should be between 5 - 180");
      scrollWindowToTop();
      return;
    }

    if (sf < dateNow) {
      setError(
        "The scheduled date and time must be later than the current date and time"
      );
      scrollWindowToTop();
      return;
    }

    if (expiryTime < quiz.timeLimit || expiryTime < quiz.scheduledFor) {
      setError(
        `The expiration date and time must be later than the scheduled date and time, and cover the quiz's time limit of ${quiz.timeLimit} minutes.`
      );
      scrollWindowToTop();
      return;
    }

    const isEmpty = (value) => value === "";

    const isAnyValueEmpty = quizQuestions.some((question) =>
      Object.values(question).some((val) =>
        Array.isArray(val) ? val.some(isEmpty) : isEmpty(val)
      )
    );

    if (isAnyValueEmpty) {
      setError("Please provide values for all the fields.");
      scrollWindowToTop();
      return;
    }

    try {
      const response = await axios.post("createQuiz", {
        ...quiz,
      });
      setSuccess(response.data.message);
      scrollWindowToTop();
    } catch (error) {
      setError(error.response.data.message || error.message);
    }
  };

  return (
    <section className="createQuizContainer">
      <button className="closeBtn" onClick={() => setCreateQuiz(false)}>
        back
      </button>
      <h1>New Quiz</h1>
      <form className="createQuizForm">
        {success && <p className="success">{success}</p>}
        {error && <p className="error">{error}</p>}
        <label htmlFor="scheduledFor">Schedule for:</label>
        <input
          type="datetime-local"
          name="scheduledFor"
          id="scheduledFor"
          value={quizMetaDeta.scheduledFor}
          onChange={handleMetaDataChange}
        />
        <label htmlFor="expiresOn">Expires On:</label>
        <input
          type="datetime-local"
          name="expiresOn"
          id="expiresOn"
          value={quizMetaDeta.expiresOn}
          onChange={handleMetaDataChange}
        />
        <label htmlFor="timeLimit">Time Limit:</label>
        <input
          type="number"
          name="timeLimit"
          id="timeLimit"
          min="5"
          max="180"
          value={quizMetaDeta.timeLimit}
          onChange={handleMetaDataChange}
        />
        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          id="description"
          maxLength="200"
          value={quizMetaDeta.description}
          onChange={handleMetaDataChange}
        />
        <label htmlFor="grade">Grade:</label>
        <input
          type="text"
          name="grade"
          id="grade"
          maxLength="10"
          value={quizMetaDeta.grade}
          onChange={handleMetaDataChange}
        />
        <label htmlFor="title">title:</label>
        <input
          type="text"
          name="title"
          id="title"
          maxLength="50"
          value={quizMetaDeta.title}
          onChange={handleMetaDataChange}
        />
        <label htmlFor="subject">subject:</label>
        <input
          type="text"
          name="subject"
          id="subject"
          maxLength="20"
          value={quizMetaDeta.subject}
          onChange={handleMetaDataChange}
        />
        <h2>Questions: </h2>
        {quizQuestions.map((question, QuesIndex) => {
          return (
            <div className="questionContainer" key={QuesIndex}>
              <div className="question" key={QuesIndex}>
                <p className="questionNumber">Question No. {QuesIndex + 1}</p>
                <textarea
                  className="questionText"
                  value={question.question}
                  name={"question" + QuesIndex}
                  placeholder="enter question"
                  maxLength="200"
                  onChange={(e) => handleChange(e, QuesIndex, "question")}
                />
                {question.options.map((option, index) => (
                  <React.Fragment key={index}>
                    <label htmlFor="option" key={`${QuesIndex}${index}`}>
                      Option {index + 1}:
                    </label>
                    <textarea
                      key={index}
                      className="questionOption"
                      placeholder="enter option"
                      value={option}
                      name={`option${index}`}
                      id={`option${index}`}
                      maxLength="200"
                      onChange={(e) =>
                        handleChange(e, QuesIndex, "options", index)
                      }
                    />
                  </React.Fragment>
                ))}
                <label htmlFor="correctOption">Correct Option: </label>
                <textarea
                  className="correctOption"
                  value={question.correctAnswer}
                  placeholder="enter correct option"
                  name={`correctOption${QuesIndex}`}
                  id={`correctOption${QuesIndex}`}
                  maxLength="200"
                  onChange={(e) => handleChange(e, QuesIndex, "correctAnswer")}
                />
              </div>
            </div>
          );
        })}
        <button
          className="addQuestionBtn"
          onClick={(e) => {
            e.preventDefault();
            setQuizQuestions((prevQuestions) => [
              ...prevQuestions,
              {
                question: "",
                options: ["", "", "", ""],
                correctAnswer: "",
              },
            ]);
          }}
        >
          add question
        </button>
        <button className="createQuizBtn" onClick={handleCreateQuiz}>
          Create Quiz
        </button>
      </form>
    </section>
  );
};

export default CreateQuiz;
