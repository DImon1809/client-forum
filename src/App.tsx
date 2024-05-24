import { FC, useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeContext } from "./components/theme-provider/ThemeProvider";

import { useCurrentQuery } from "./store/services/userApi";

import { useSelector } from "react-redux";
import { RootType } from "./store/store";

import Posts from "./pages/posts/Posts";
import CurrentPost from "./pages/current-post/CurrentPost";
import UserProfile from "./pages/user-profile/UserProfile";
import Followers from "./pages/followers/Followers";
import Following from "./pages/following/Following";

import Auth from "./pages/auth/Auth";

import Navbar from "./components/navbar/Navbar";
import Header from "./components/header/Header";

import Profile from "./components/profile/Profile";

import "./App.scss";

const App: FC = () => {
  const { theme } = useContext(ThemeContext);

  const isAuthenticated = useSelector(
    (state: RootType) => state.userSlice.isAuthenticated
  );

  return (
    <>
      {isAuthenticated ? (
        <>
          <Header />
          <section
            className={
              theme === "light" ? "main-section" : "main-section light"
            }
          >
            <Navbar />
            <Routes>
              <Route path="/" element={<Posts />} />
              <Route path="/posts/:id" element={<CurrentPost />} />
              <Route path="/users/:id" element={<UserProfile />} />
              <Route path="/followers" element={<Followers />} />
              <Route path="/following" element={<Following />} />
            </Routes>

            <Profile />
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
