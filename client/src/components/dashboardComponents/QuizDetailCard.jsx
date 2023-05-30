import "../../styles/quizCardDetail.css";

const QuizDetailCard = ({ quizDetails, quizType }) => {
  const date = new Date(quizDetails.expiresOn).toLocaleDateString();
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
        <button className="quizAction">Quiz Details</button>
        {quizType === "expired" ? (
          <button className="quizAction">Quiz Results</button>
        ) : (
          <button className="quizAction">Quiz Insights</button>
        )}
      </div>
    </div>
  );
};

export default QuizDetailCard;
