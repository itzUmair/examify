import { useState, useEffect } from "react";
import axios from "../../api/axios";
import Loader from "../../assets/loader.svg";
import { DeleteQuizDialog } from "../dashboardComponents";
import "../../styles/quizDetail.css";

const QuizDetail = ({ quizDetails, setQuizDetails }) => {
  const [quizDetail, setQuizDetail] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [deleteQuizDialog, setDeleteQuizDialog] = useState(false);
  const [quizDeleted, setQuizDeleted] = useState(false);

  const fetchQuizDetails = async () => {
    setIsLoading(true);
    const quiz = await axios.get(`/getQuizDetails/${quizDetails}`);
    setQuizDetail(quiz.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchQuizDetails();
  }, []);

  const createdOn = new Date(quizDetail?.createdOn).toLocaleString();
  const scheduledFor = new Date(quizDetail?.scheduledFor).toLocaleString();
  const expiresOn = new Date(quizDetail?.expiresOn).toLocaleString();

  const deleteQuiz = async () => {
    await axios.delete(`/deleteQuiz/${quizDetails}`);
    setQuizDeleted(true);
    setDeleteQuizDialog(false);
  };
  return (
    <>
      {deleteQuizDialog && (
        <DeleteQuizDialog
          deleteQuiz={deleteQuiz}
          setDeleteQuizDialog={setDeleteQuizDialog}
        />
      )}
      {quizDeleted && (
        <div className="quizDeletedDialog">
          <p>Quiz Deleted Successfully!</p>
          <button className="closeBtn" onClick={() => setQuizDetails(false)}>
            Close
          </button>
        </div>
      )}
      {isLoading && <img src={Loader} alt="loading data" className="loading" />}
      {!isLoading && (
        <section className="quizDetailsContainer">
          <div className="actionBtnContainer">
            <button onClick={() => setQuizDetails(false)} className="closeBtn">
              {" "}
              close
            </button>
            {/* <button className="editBtn">Edit Quiz</button> */}
            <button
              className="deleteBtn"
              onClick={() => setDeleteQuizDialog(true)}
            >
              Delete Quiz
            </button>
          </div>
          <div className="quizDetails">
            <h2>Details</h2>
            <span>
              <p>id:</p>
              <p>{quizDetail?._id}</p>
            </span>
            <span>
              <p>title:</p>
              <p>{quizDetail?.title}</p>
            </span>
            <span>
              <p>description:</p>
              <p>{quizDetail?.description}</p>
            </span>
            <span>
              <p>grade:</p>
              <p>{quizDetail?.grade}</p>
            </span>
            <span>
              <p>subject:</p>
              <p>{quizDetail?.subject}</p>
            </span>
            <span>
              <p>created on:</p>
              <p>{createdOn}</p>
            </span>
            <span>
              <p>scheduled for:</p>
              <p>{scheduledFor}</p>
            </span>
            <span>
              <p>expires on:</p>
              <p>{expiresOn}</p>
            </span>
            <span>
              <p>time limit:</p>
              <p>{quizDetail?.timeLimit}</p>
            </span>
            <h2>Questions</h2>
            <div className="quizQuestionsContainer">
              {quizDetail?.questions?.map((question, index) => (
                <div key={question._id} className="questionContainer">
                  <p className="questionText">
                    Q{index + 1}. {question?.question}
                  </p>
                  <div className="optionsContainer">
                    {question?.options?.map((option, index) => (
                      <div key={index} className="optionItem">
                        <p>{option}</p>
                      </div>
                    ))}
                  </div>
                  <p>correct answer: {question?.correctAnswer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default QuizDetail;
