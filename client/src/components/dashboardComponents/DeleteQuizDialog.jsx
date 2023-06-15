const DeleteQuizDialog = ({ deleteQuiz, setDeleteQuizDialog }) => {
  return (
    <div className="quizDeletedDialog">
      <p>Are you sure you want to delete this quiz?</p>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={() => deleteQuiz()} className="deleteBtn">
          Delete
        </button>
        <button onClick={() => setDeleteQuizDialog(false)} className="closeBtn">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteQuizDialog;
