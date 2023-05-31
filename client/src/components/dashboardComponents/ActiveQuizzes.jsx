import { useState, useEffect } from "react";
import { QuizDetailCard } from "./index";
import axios from "../../api/axios";
import Loader from "../../assets/loader.svg";
import "../../styles/quizzes.css";

const ActiveQuizzes = ({ setQuizDetails }) => {
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
    <section className="activeQuizContainer">
      {isLoading && <img src={Loader} alt="loading data" className="loading" />}
      {!isLoading &&
        activeQuizzes?.length &&
        activeQuizzes.map((quiz) => (
          <QuizDetailCard
            key={quiz._id}
            quizDetails={quiz}
            quizType="expired"
            setQuizDetails={setQuizDetails}
          />
        ))}
    </section>
  );
};

export default ActiveQuizzes;
