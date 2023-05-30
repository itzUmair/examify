import { useState, useEffect } from "react";
import { QuizDetailCard } from "./index";
import axios from "../../api/axios";
import "../../styles/quizzes.css";

const AllQuizzes = () => {
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
    <section className="allQuizContainer">
      {isLoading && <p>Loading Data</p>}
      {!isLoading &&
        allQuizzes?.length &&
        allQuizzes.map((quiz) => (
          <QuizDetailCard
            key={quiz._id}
            quizDetails={quiz}
            quizType="expired"
          />
        ))}
    </section>
  );
};

export default AllQuizzes;
