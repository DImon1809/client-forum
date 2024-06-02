import { FC } from "react";

import "./UnSubscribeButton.scss";

import { IoPersonRemove } from "react-icons/io5";

export interface IUnSubscribeButton {
  unFollowUserHandler: () => Promise<void>;
}

const UnSubscribeButton: FC<IUnSubscribeButton> = ({ unFollowUserHandler }) => {
  return (
    <div className="profile-button-unsubscribe" onClick={unFollowUserHandler}>
      <p>Отписаться</p>
      <IoPersonRemove className="unsubscribe-icon" />
    </div>
  );
};

export default UnSubscribeButton;
