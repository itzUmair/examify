import { ActiveQuizzes, AllQuizzes, NavBar, Tabs } from "./dashboardComponents";
import { useState } from "react";
import "../styles/dashboard.css";

function Dashboard({ setIsAuthenticated, setIsLogin }) {
  const [currentTab, setCurrentTab] = useState(true);
  return (
    <main className="dashboardMain">
      <NavBar
        setCurrentTab={setCurrentTab}
        setIsAuthenticated={setIsAuthenticated}
        setIsLogin={setIsLogin}
      />
      <section>
        <Tabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
        {currentTab && <ActiveQuizzes />}
        {!currentTab && <AllQuizzes />}
      </section>
    </main>
  );
}

export default Dashboard;
