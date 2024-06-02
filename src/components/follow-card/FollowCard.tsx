import { FC } from "react";

import { BASE_URL } from "../../constans";

import { Link } from "react-router-dom";

import "./FollowCard.scss";

export interface IFollowCard {
  userId: string;
  name: string;
  avatarUrl: string;
  email: string;
}

const FollowCard: FC<IFollowCard> = ({ userId, name, avatarUrl, email }) => {
  return (
    <div className="follow-card">
      <div className="infomation-wrapper">
        <div className="follow-image">
          <Link to={`/users/${userId}`}>
            <img src={`${BASE_URL}${avatarUrl}`} alt="#" />
          </Link>
        </div>

        <div className="follow-contact">
          <Link
            to={`/users/${userId}`}
            className={
              localStorage.getItem("theme") === "light"
                ? "user-follower"
                : "user-follower light"
            }
          >
            <h3>{name}</h3>
          </Link>
          <p>{email}</p>
        </div>
      </div>
    </div>
  );
};

export default FollowCard;
