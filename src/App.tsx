import { FC, useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { ThemeContext } from "./components/theme-provider/ThemeProvider";

import Posts from "./pages/posts/Posts";
import CurrentPost from "./pages/current-post/CurrentPost";
import UserProfile from "./pages/user-profile/UserProfile";
import Followers from "./pages/followers/Followers";
import Following from "./pages/following/Following";

import Navbar from "./components/navbar/Navbar";
import Header from "./components/header/Header";

import "./App.scss";

const App: FC = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <Header />
      <section
        className={theme === "light" ? "main-section" : "main-section light"}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/posts:id" element={<CurrentPost />} />
          <Route path="/posts/:id" element={<CurrentPost />} />
          <Route path="/users/:id" element={<UserProfile />} />
          <Route path="/followers" element={<Followers />} />
          <Route path="/following" element={<Following />} />
        </Routes>
      </section>
    </>
  );
};

export default App;
