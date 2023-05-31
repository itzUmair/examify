import {
  ActiveQuizzes,
  AllQuizzes,
  NavBar,
  Tabs,
  QuizDetail,
  QuizResults,
} from "./dashboardComponents";
import { useState } from "react";
import "../styles/dashboard.css";

function Dashboard({ setIsAuthenticated, setIsLogin }) {
  const [currentTab, setCurrentTab] = useState(true);
  const [quizDetails, setQuizDetails] = useState(false);
  const [showQuizResults, setShowQuizResults] = useState(false);
  return (
    <main className="dashboardMain">
      <NavBar
        setCurrentTab={setCurrentTab}
        setIsAuthenticated={setIsAuthenticated}
        setIsLogin={setIsLogin}
      />
      {!showQuizResults && !quizDetails && (
        <section>
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

      {quizDetails && (
        <QuizDetail quizDetails={quizDetails} setQuizDetails={setQuizDetails} />
      )}

      {showQuizResults && (
        <QuizResults
          quizID={showQuizResults}
          setShowQuizResults={setShowQuizResults}
        />
      )}
    </main>
  );
}

export default Dashboard;
