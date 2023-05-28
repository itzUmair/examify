import { ActiveQuizes, NavBar } from "./dashboardComponents";
import { useState } from "react";

function Dashboard({ setIsAuthenticated, setIsLogin }) {
  const [currentTab, setCurrentTab] = useState("activeQuizzes");
  return (
    <main>
      <NavBar
        setCurrentTab={setCurrentTab}
        setIsAuthenticated={setIsAuthenticated}
        setIsLogin={setIsLogin}
      />
      {currentTab === "activeQuizzes" && <ActiveQuizes />}
    </main>
  );
}

export default Dashboard;
