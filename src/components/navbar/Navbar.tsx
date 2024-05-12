import { FC, useContext } from "react";
import { Link } from "react-router-dom";

import { BsPostcard } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { FaUsers } from "react-icons/fa";

import { ThemeContext } from "../theme-provider/ThemeProvider";

import "./Navbar.scss";

const Navbar: FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <nav>
      <ul>
        <li>
          <div className="button-wrapper">
            <Link
              to="/"
              className={theme === "light" ? "nav-button" : "button light"}
            >
              <BsPostcard size="17px" />
              Посты
            </Link>
          </div>
        </li>
        <li>
          <div className="button-wrapper">
            <Link
              to="/following"
              className={theme === "light" ? "nav-button" : "button light"}
            >
              <FiUsers size="17px" />
              Подписки
            </Link>
          </div>
        </li>
        <li>
          <div className="nav-button">
            <Link
              to="/followers"
              className={theme === "light" ? "nav-button" : "nav-button light"}
            >
              <FaUsers size="17px" />
              Подписчики
            </Link>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
