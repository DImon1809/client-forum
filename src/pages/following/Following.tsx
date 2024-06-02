import { FC } from "react";

import { useSelector } from "react-redux";
import { RootType } from "../../store/store";

import FollowCard from "../../components/follow-card/FollowCard";

import "./Following.scss";

const Following: FC = () => {
  const current = useSelector((state: RootType) => state.userSlice.current);

  return current?.following.length ? (
    <section className="following-section">
      {current.following.map((user) => (
        <FollowCard
          key={user.id}
          userId={user.following.id}
          name={user.following.name || ""}
          avatarUrl={user.following.avatarUrl || ""}
          email={user.following.email || ""}
        />
      ))}
    </section>
  ) : (
    <div>
      <h3>У вас нет подписок!</h3>
    </div>
  );
};

export default Following;
