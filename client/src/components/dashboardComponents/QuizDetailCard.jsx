import "../../styles/quizCardDetail.css";

const QuizDetailCard = ({
  quizDetails,
  setQuizDetails,
  setShowQuizResults,
}) => {
  const date = new Date(quizDetails.expiresOn).toLocaleString();
  return (
    <div className="quizCardContainer">
      <div className="quizID">{quizDetails._id}</div>
      <div className="quizDetailContainer">
        <p className="quizTitle">{quizDetails.title}</p>
        <p className="quizSubject">{quizDetails.subject}</p>
        <p className="quizGrade">{quizDetails.grade}</p>
        <p className="quizDate">{date}</p>
      </div>
      <div className="quizActionContainer">
        <button
          className="quizAction"
          onClick={() => setQuizDetails(quizDetails._id)}
        >
          Details
        </button>
        <button
          className="quizAction"
          onClick={() => setShowQuizResults(quizDetails._id)}
        >
          Results
        </button>
      </div>
    </div>
  );
};

export default QuizDetailCard;
