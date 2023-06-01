import { useState } from "react";
import "../../styles/createQuiz.css";

const CreateQuiz = () => {
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
  return (
    <section className="createQuizContainer">
      <form className="createQuizForm">
        <label htmlFor="scheduledFor">Schedule for:</label>
        <input type="datetime-local" name="scheduledFor" id="scheduledFor" />
        <label htmlFor="expiresOn">Expires On:</label>
        <input type="datetime-local" name="expiresOn" id="expiresOn" />
        <label htmlFor="timeLimit">Time Limit:</label>
        <input type="time" name="timeLimit" id="timeLimit" />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          name="description"
          id="description"
          maxLength="200"
        />
        <label htmlFor="grade">Grade:</label>
        <input type="text" name="grade" id="grade" />
        <label htmlFor="title">title:</label>
        <input type="text" name="title" id="title" />
        <label htmlFor="subject">subject:</label>
        <input type="text" name="subject" id="subject" />
        {quizQuestions.map((question, index) => {
          return (
            <div className="question" key={index}>
              <input
                type="text"
                className="questionText"
                value={question.question}
              />
              {question.options.map((option, index) => (
                <>
                  <label htmlFor="option">Option {index}:</label>
                  <input
                    type="text"
                    key={index}
                    className="questionOption"
                    value={option}
                    name="option"
                    id="option"
                  />
                </>
              ))}
              <label htmlFor="correctOption">Correct Option</label>
              <input
                type="text"
                className="correctOption"
                value={question.correctAnswer}
                name="correctOption"
                id="correctOption"
              />
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
      </form>
    </section>
  );
};

export default CreateQuiz;
