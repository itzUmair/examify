import { useState } from "react";
import Logo from "../../assets/logo.svg";
import arrow from "../../assets/arrow.svg";
import "../../styles/navbar.css";

function NavBar({ setCurrentTab, setIsAuthenticated, setIsLogin }) {
  const [profileMenu, setProfileMenu] = useState(false);
  const user = JSON.parse(localStorage.getItem("userData"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setIsAuthenticated(false);
    setIsLogin(true);
  };
  return (
    <nav className="navbar">
      <img src={Logo} alt="Examify" className="logo" />
      <button
        className="profile"
        onClick={() => setProfileMenu((prevState) => !prevState)}
      >
        {user?.name}
        <img src={arrow} alt="dropdown" />
      </button>
      {profileMenu && (
        <ul className="profileMenuContainer">
          <li className="profileOptions">
            <p className="profileEmailTag">Logged in with:</p>
            <p className="profileEmail">{user?.emailAddress}</p>
          </li>
          <li className="profileOptions">
            <button className="dashboardNavBtn" onClick={() => {}}>
              View Profile
            </button>
          </li>
          <li className="profileOptions">
            <button className="dashboardNavBtn" onClick={logout}>
              Log Out
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default NavBar;
