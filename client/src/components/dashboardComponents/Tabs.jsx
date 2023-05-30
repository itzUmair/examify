import "../../styles/tabs.css";

const Tabs = ({ currentTab, setCurrentTab }) => {
  return (
    <ul className="tabs">
      <li
        className={currentTab ? "tabsOptions active" : "tabsOptions"}
        onClick={() => setCurrentTab(true)}
      >
        Active Quizzes
      </li>
      <li
        className={!currentTab ? "tabsOptions active" : "tabsOptions"}
        onClick={() => setCurrentTab(false)}
      >
        Closed Quizzes
      </li>
    </ul>
  );
};

export default Tabs;
