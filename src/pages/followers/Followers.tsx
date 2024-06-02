import { FC } from "react";

import { useSelector } from "react-redux";
import { RootType } from "../../store/store";

import FollowCard from "../../components/follow-card/FollowCard";

const Followers: FC = () => {
  const current = useSelector((state: RootType) => state.userSlice.current);

  return current?.followers.length ? (
    <section className="follower-section">
      {current.followers.map((user) => (
        <FollowCard
          key={user.id}
          userId={user.followers.id}
          name={user.followers.name || ""}
          avatarUrl={user.followers.avatarUrl || ""}
          email={user.followers.email || ""}
        />
      ))}
    </section>
  ) : (
    <div>
      <h3>У вас нет подписчиков!</h3>
    </div>
  );
};

export default Followers;
