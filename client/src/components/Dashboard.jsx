import {
  ActiveQuizzes,
  AllQuizzes,
  NavBar,
  Tabs,
  QuizDetail,
  QuizResults,
  CreateQuiz,
} from "./dashboardComponents";
import { useState } from "react";
import "../styles/dashboard.css";

function Dashboard({ setIsAuthenticated, setIsLogin }) {
  const [currentTab, setCurrentTab] = useState(true);
  const [quizDetails, setQuizDetails] = useState(false);
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [createQuiz, setCreateQuiz] = useState(false);
  return (
    <main className="dashboardMain">
      <NavBar
        setCurrentTab={setCurrentTab}
        setIsAuthenticated={setIsAuthenticated}
        setIsLogin={setIsLogin}
      />
      {!createQuiz && !showQuizResults && !quizDetails && (
        <section>
          <button className="createQuiz" onClick={() => setCreateQuiz(true)}>
            Create Quiz
          </button>
          <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
          {currentTab && (
            <ActiveQuizzes
              setQuizDetails={setQuizDetails}
              setShowQuizResults={setShowQuizResults}
            />
          )}
          {!currentTab && (
            <AllQuizzes
              setQuizDetails={setQuizDetails}
              setShowQuizResults={setShowQuizResults}
            />
          )}
        </section>
      )}

      {createQuiz && <CreateQuiz setCreateQuiz={setCreateQuiz} />}

      {!createQuiz && quizDetails && (
        <QuizDetail quizDetails={quizDetails} setQuizDetails={setQuizDetails} />
      )}

      {!createQuiz && showQuizResults && (
        <QuizResults
          quizID={showQuizResults}
          setShowQuizResults={setShowQuizResults}
        />
      )}
    </main>
  );
}

export default Dashboard;
