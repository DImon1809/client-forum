import { FC, useContext } from "react";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/features/userSlice";
import { RootType } from "../../store/store";

import { TiAdjustBrightness } from "react-icons/ti";
import { FaRegMoon } from "react-icons/fa";

import { ThemeContext } from "../theme-provider/ThemeProvider";

import { IoMdExit } from "react-icons/io";

import "./Header.scss";

const Header: FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const isAuthenticated = useSelector(
    (state: RootType) => state.userSlice.isAuthenticated
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handlerLogout = () => {
    dispatch(logout());

    if (theme !== "light") toggleTheme();

    localStorage.removeItem("token");
    navigate("/");
  };

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
        <div className="toggle-exit-wrapper">
          {theme === "light" ? (
            <FaRegMoon
              size="21px"
              style={{ cursor: "pointer" }}
              onClick={toggleTheme}
            />
          ) : (
            <TiAdjustBrightness
              size="24px"
              color="#fff"
              style={{ cursor: "pointer" }}
              onClick={toggleTheme}
            />
          )}

          {isAuthenticated && (
            <div className="exit-wrapper">
              <div
                className={
                  theme === "light" ? "button-exit" : "button-exit light"
                }
                onClick={handlerLogout}
              >
                <IoMdExit />
                <p>Выйти</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Header;
