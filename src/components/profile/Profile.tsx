import { FC, useContext } from "react";
import { ThemeContext } from "../theme-provider/ThemeProvider";

import { BASE_URL } from "../../constans";

import { useSelector } from "react-redux";
import { RootType } from "../../store/store";

import { Link } from "react-router-dom";

import { MdOutlineEmail } from "react-icons/md";

import "./Profile.scss";

const Profile: FC = () => {
  const { theme } = useContext(ThemeContext);

  const current = useSelector((state: RootType) => state.userSlice.current);

  return (
    <div className="user-card">
      <div className="avatar-container">
        <img src={`${BASE_URL}${current?.avatarUrl}`} alt="#" />
      </div>
      <div className="infomation-wrapper">
        <Link
          to={`/users/${current?.id}`}
          className={theme === "light" ? "name-link" : "name-link light"}
        >
          <h4>{current?.name}</h4>
        </Link>
        <div className="text-wrapper">
          <MdOutlineEmail />
          <p>{current?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
