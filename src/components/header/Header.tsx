import { FC, useContext } from "react";

import { TiAdjustBrightness } from "react-icons/ti";
import { FaRegMoon } from "react-icons/fa";

import { ThemeContext } from "../theme-provider/ThemeProvider";

import "./Header.scss";

const Header: FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <section className="header-section">
      <div className="header-infomation">
        <div>
          <p
            className={
              theme === "light" ? "title-aplication" : "title-aplication light"
            }
          >
            Network Social
          </p>
        </div>
        <div onClick={toggleTheme}>
          {theme === "light" ? (
            <FaRegMoon size="21px" />
          ) : (
            <TiAdjustBrightness size="24px" color="#fff" />
          )}
        </div>
      </div>
    </section>
  );
};

export default Header;
