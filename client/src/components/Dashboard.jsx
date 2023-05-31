import {
  ActiveQuizzes,
  AllQuizzes,
  NavBar,
  Tabs,
  QuizDetail,
} from "./dashboardComponents";
import { useState } from "react";
import "../styles/dashboard.css";

function Dashboard({ setIsAuthenticated, setIsLogin }) {
  const [currentTab, setCurrentTab] = useState(true);
  const [quizDetails, setQuizDetails] = useState(false);
  return (
    <main className="dashboardMain">
      <NavBar
        setCurrentTab={setCurrentTab}
        setIsAuthenticated={setIsAuthenticated}
        setIsLogin={setIsLogin}
      />
      {!quizDetails && (
        <section>
          <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
          {currentTab && <ActiveQuizzes setQuizDetails={setQuizDetails} />}
          {!currentTab && <AllQuizzes setQuizDetails={setQuizDetails} />}
        </section>
      )}

      {quizDetails && (
        <QuizDetail quizDetails={quizDetails} setQuizDetails={setQuizDetails} />
      )}
    </main>
  );
}

export default Dashboard;
