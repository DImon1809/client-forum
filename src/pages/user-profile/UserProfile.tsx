import { FC, useEffect, useState, useContext } from "react";

import { useParams } from "react-router-dom";

import { ThemeContext } from "../../components/theme-provider/ThemeProvider";

import { useSelector } from "react-redux";
import { RootType } from "../../store/store";
import { useGetUserByIDQuery } from "../../store/services/userApi";

import { useFollowUserMutation } from "../../store/services/followApi";
import { useUnFollowUserMutation } from "../../store/services/followApi";
import {
  useLazyGetUserByIDQuery,
  useLazyCurrentQuery,
} from "../../store/services/userApi";

import { BASE_URL } from "../../constans";

import EditButton from "../../components/profile-buttons/edit-button/EditButton";
import SubscribeButton from "../../components/profile-buttons/subscribe-button/SubscribeButton";
import UnSubscribeButton from "../../components/profile-buttons/unsubscibe-button/UnSubscribeButton";
import EditProfile from "../../components/edit-profile/EditProfile";

import "./UserProfile.scss";

const UserProfile: FC = () => {
  const { id } = useParams<string>();

  const { isEditProfile, toggleGlobalWrapper } = useContext(ThemeContext);

  const [followOnUser, followOnUserStatus] = useFollowUserMutation();
  const [unFollowUser, unFollowUserStatus] = useUnFollowUserMutation();
  const [getUserById, getUserByIdStatus] = useLazyGetUserByIDQuery();
  const [getCurrentUser] = useLazyCurrentQuery();

  const { data } = useGetUserByIDQuery(id ?? "");

  const current = useSelector((state: RootType) => state.userSlice.current);

  const [isSubscribe, setIsSubscribe] = useState<boolean>(false);
  // const [isEditProfile, setIsEditProfile] = useState<boolean>(false);

  const unFollowUserHandler = async (): Promise<void> => {
    try {
      await unFollowUser(id || "").unwrap();

      await getUserById(id || "").unwrap();

      setIsSubscribe(false);
    } catch (err) {
      console.error(err);

      alert("Что-то пошло не так");
    }
  };

  const followOnUserHandler = async (): Promise<void> => {
    try {
      await followOnUser({ followingId: id || "" }).unwrap();

      await getUserById(id || "").unwrap();

      setIsSubscribe(true);
    } catch (err) {
      console.error(err);

      alert("Что-то пошло не так");
    }
  };

  const toggleEditProfileHandler = (): void => {
    toggleGlobalWrapper();
  };

  const onCloseEditWindow = async (): Promise<void> => {
    try {
      await getCurrentUser();
      await getUserById(id || "");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    current?.following.find((_l) => _l.followingId === id) &&
      setIsSubscribe(true);
  }, []);

  return (
    <section className="profile-section">
      <div className="user-icon">
        <div className="avatar-wrapper">
          <img src={`${BASE_URL}${data?.avatarUrl}`} alt="#" />
        </div>
        <div>
          <h3>{data?.name}</h3>
        </div>
        <div className="profile-button-wrapper">
          {current?.id === id ? (
            <EditButton toggleEditProfileHandler={toggleEditProfileHandler} />
          ) : isSubscribe ? (
            <UnSubscribeButton unFollowUserHandler={unFollowUserHandler} />
          ) : (
            <SubscribeButton followOnUserHandler={followOnUserHandler} />
          )}
        </div>
      </div>
      <div className="profile-infomation-wrapper">
        <div className="infomation-header">
          <div className="email-wrapper">
            <p>Почта</p>
            <p>{data?.email}</p>
          </div>
        </div>
        <div className="infomation-body">
          <div className="follower-following-wrapper">
            <div className="follower-wrapper">
              <h2>{data?.followers?.length ?? 0}</h2>
              <h4>Подписчики</h4>
            </div>
            <div className="following-wrapper">
              <h2>{data?.following?.length ?? 0}</h2>
              <h4>Подписки</h4>
            </div>
          </div>
        </div>
      </div>

      {isEditProfile && <EditProfile onCloseEditWindow={onCloseEditWindow} />}
    </section>
  );
};

export default UserProfile;
