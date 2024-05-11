import React, { useContext } from "react";
import { ThemeContext } from "../theme-provider";

import { FaRegMoon } from "react-icons/fa";
import { LuSunMedium } from "react-icons/lu";

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav>
      <ul>
        <li>Network Social</li>
        <li>{theme === "light" ? <FaRegMoon /> : <LuSunMedium />}</li>
        <li></li>
      </ul>
    </nav>
  );
};

export default Header;
