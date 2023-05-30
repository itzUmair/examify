import { useState, useEffect } from "react";
import { QuizDetailCard } from "./index";
import axios from "../../api/axios";
import "../../styles/quizzes.css";

const ActiveQuizzes = () => {
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
      {isLoading && <p>Loading Data</p>}
      {!isLoading &&
        activeQuizzes?.length &&
        activeQuizzes.map((quiz) => (
          <QuizDetailCard
            key={quiz._id}
            quizDetails={quiz}
            quizType="expired"
          />
        ))}
    </section>
  );
};

export default ActiveQuizzes;
