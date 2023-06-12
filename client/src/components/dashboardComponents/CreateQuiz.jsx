import { useState } from "react";
import "../../styles/createQuiz.css";
import axios from "../../api/axios";

const CreateQuiz = () => {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData?.id);
  const [quizMetaDeta, setQuizMetaDeta] = useState({
    createdBy: userData?.id,
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
      question: "question 1",
      options: ["option 1", "option 2", "option 3", "option 4"],
      correctAnswer: "option 1",
    },
    {
      question: "question 1",
      options: ["option 1", "option 2", "option 3", "option 4"],
      correctAnswer: "option 1",
    },
    {
      question: "question 1",
      options: ["option 1", "option 2", "option 3", "option 4"],
      correctAnswer: "option 1",
    },
    {
      question: "question 1",
      options: ["option 1", "option 2", "option 3", "option 4"],
      correctAnswer: "option 1",
    },
    {
      question: "question 1",
      options: ["option 1", "option 2", "option 3", "option 4"],
      correctAnswer: "option 1",
    },
  ]);

  const handleChange = (e, questionIndex, key, optionIndex) => {
    const updatedQuestions = [...quizQuestions];
    if (key === "options") {
      updatedQuestions[questionIndex][key][optionIndex] = e.target.value;
    } else {
      updatedQuestions[questionIndex][key] = e.target.value;
    }
    setQuizQuestions(updatedQuestions);
  };

  const handleMetaDataChange = (e) => {
    const { name, value } = e.target;
    setQuizMetaDeta((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleCreateQuiz = async (e) => {
    e.preventDefault();
    const quiz = { ...quizMetaDeta, questions: quizQuestions };
    try {
      const response = await axios.post("createQuiz", {
        ...quiz,
      });
      setSuccess(response.data.message);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      setError(error.response.data.message || error.message);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="createQuizContainer">
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
        <input
          type="text"
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
          maxLength="15"
          value={quizMetaDeta.grade}
          onChange={handleMetaDataChange}
        />
        <label htmlFor="title">title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={quizMetaDeta.title}
          onChange={handleMetaDataChange}
        />
        <label htmlFor="subject">subject:</label>
        <input
          type="text"
          name="subject"
          id="subject"
          value={quizMetaDeta.subject}
          onChange={handleMetaDataChange}
        />
        <h2>Questions: </h2>
        {quizQuestions.map((question, QuesIndex) => {
          return (
            <div className="questionContainer" key={QuesIndex}>
              <div className="question" key={QuesIndex}>
                <input
                  type="text"
                  className="questionText"
                  value={question.question}
                  name={"question" + QuesIndex}
                  onChange={(e) => handleChange(e, QuesIndex, "question")}
                />
                {question.options.map((option, index) => (
                  <>
                    <label htmlFor="option">Option {index}:</label>
                    <input
                      type="text"
                      key={index}
                      className="questionOption"
                      value={option}
                      name={`option${index}`}
                      id={`option${index}`}
                      onChange={(e) =>
                        handleChange(e, QuesIndex, "options", index)
                      }
                    />
                  </>
                ))}
                <label htmlFor="correctOption">Correct Option</label>
                <input
                  type="text"
                  className="correctOption"
                  value={question.correctAnswer}
                  name={`correctOption${QuesIndex}`}
                  id={`correctOption${QuesIndex}`}
                  onChange={(e) => handleChange(e, QuesIndex, "correctAnswer")}
                />
              </div>
            </div>
          );
        })}
        <button
          onClick={(e) => {
            e.preventDefault();
            setQuizQuestions((prevQuestions) => [
              ...prevQuestions,
              {
                question: "question 1",
                options: ["option 1", "option 2", "option 3", "option 4"],
                correctAnswer: "option 1",
              },
            ]);
          }}
        >
          ADD
        </button>
        <button className="createQuizButton" onClick={handleCreateQuiz}>
          Create Quiz
        </button>
      </form>
    </section>
  );
};

export default CreateQuiz;
