import { FC } from "react";

import "./SubscribeButton.scss";

import { IoMdPersonAdd } from "react-icons/io";

export interface ISubscribeButton {
  followOnUserHandler: () => Promise<void>;
}

const SubscribeButton: FC<ISubscribeButton> = ({ followOnUserHandler }) => {
  return (
    <div className="profile-button-subscribe" onClick={followOnUserHandler}>
      <p>Подписаться</p>
      <IoMdPersonAdd className="subscribe-icon" />
    </div>
  );
};

export default SubscribeButton;
