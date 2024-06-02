import { FC, useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeContext } from "./components/theme-provider/ThemeProvider";

import { useCurrentQuery } from "./store/services/userApi";

import { useSelector, useDispatch } from "react-redux";
import { RootType } from "./store/store";

import { changePrewiev } from "./store/features/userSlice";

import Posts from "./pages/posts/Posts";
import CurrentPost from "./pages/current-post/CurrentPost";
import UserProfile from "./pages/user-profile/UserProfile";
import Followers from "./pages/followers/Followers";
import Following from "./pages/following/Following";

import Auth from "./pages/auth/Auth";

import Navbar from "./components/navbar/Navbar";
import Header from "./components/header/Header";

import Profile from "./components/profile/Profile";

import { useParams, useNavigate } from "react-router-dom";

import "./App.scss";

const App: FC = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state: RootType) => state.userSlice.isAuthenticated
  );
  const isPrewievProfile = useSelector(
    (state: RootType) => state.userSlice.isPrewievProfile
  );

  useEffect(() => {
    if (window.location.href.split("/")[3] !== "users")
      dispatch(changePrewiev(true));

    if (window.location.href.split("/")[3] === "users")
      dispatch(changePrewiev(false));
  }, [navigate]);

  return (
    <>
      {isAuthenticated ? (
        <>
          <Header />
          <section
            className={
              isPrewievProfile
                ? `${theme === "light" ? "main-section" : "main-section light"}`
                : `${
                    theme === "light" ? "main-section" : "main-section light"
                  } none-preview`
            }
          >
            <Navbar />
            <Routes>
              <>
                <Route path="/" element={<Posts />} />
                <Route path="/posts/:id" element={<CurrentPost />} />
                <Route path="/followers" element={<Followers />} />
                <Route path="/following" element={<Following />} />
                <Route path="/users/:id" element={<UserProfile />} />
              </>
            </Routes>

            {isPrewievProfile && <Profile />}
          </section>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Auth />} />
        </Routes>
      )}
    </>
  );
};

export default App;
