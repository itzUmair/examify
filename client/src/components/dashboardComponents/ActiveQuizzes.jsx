import { useState, useEffect } from "react";
import { QuizDetailCard } from "./index";
import axios from "../../api/axios";
import Loader from "../../assets/loader.svg";
import "../../styles/quizzes.css";

const ActiveQuizzes = ({ setQuizDetails, setShowQuizResults }) => {
  const [activeQuizzes, setActiveQuizzes] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchActiveQuizzes = async () => {
    setIsLoading(true);
    const teacherData = JSON.parse(localStorage.getItem("userData"));
    const allActiveQuizzes = await axios.get(
      `/getAllActiveQuizzes/${teacherData.id}`
    );
    setActiveQuizzes(allActiveQuizzes.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchActiveQuizzes();
  }, []);
  return (
    <>
      {activeQuizzes?.length === 0 ? (
        <p>No quizzes active</p>
      ) : (
        <section className="activeQuizContainer">
          {isLoading && (
            <img src={Loader} alt="loading data" className="loading" />
          )}
          {!isLoading &&
            activeQuizzes?.length &&
            activeQuizzes.map((quiz) => (
              <QuizDetailCard
                key={quiz._id}
                quizDetails={quiz}
                setQuizDetails={setQuizDetails}
                setShowQuizResults={setShowQuizResults}
              />
            ))}
        </section>
      )}
    </>
  );
};

export default ActiveQuizzes;
