import { useState, useEffect } from "react";
import { QuizDetailCard } from "./index";
import axios from "../../api/axios";
import Loader from "../../assets/loader.svg";
import "../../styles/quizzes.css";

const AllQuizzes = ({ setQuizDetails, setShowQuizResults }) => {
  const [allQuizzes, setAllQuizzes] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchAllQuizzes = async () => {
    setIsLoading(true);
    const teacherData = JSON.parse(localStorage.getItem("userData"));
    const allQuizzes = await axios.get(`/getAllQuizzes/${teacherData.id}`);
    setAllQuizzes(allQuizzes.data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllQuizzes();
  }, []);
  return (
    <>
      {allQuizzes?.length === 0 ? (
        <p>No quizzes available</p>
      ) : (
        <section className="allQuizContainer">
          {isLoading && (
            <img src={Loader} alt="loading data" className="loading" />
          )}
          {!isLoading &&
            allQuizzes?.length &&
            allQuizzes.map((quiz) => (
              <QuizDetailCard
                key={quiz._id}
                quizDetails={quiz}
                quizType="expired"
                setQuizDetails={setQuizDetails}
                setShowQuizResults={setShowQuizResults}
              />
            ))}
        </section>
      )}
    </>
  );
};

export default AllQuizzes;
