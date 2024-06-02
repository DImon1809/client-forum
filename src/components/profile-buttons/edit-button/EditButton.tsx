import { FC, useContext } from "react";

// import { ThemeContext } from "../../theme-provider/ThemeProvider";

import "./EditButton.scss";

import { CiEdit } from "react-icons/ci";

export interface IEditButton {
  toggleEditProfileHandler: () => void;
}

const EditButton: FC<IEditButton> = ({ toggleEditProfileHandler }) => {
  // const { toggleGlobalWrapper } = useContext(ThemeContext);

  return (
    <div className="profile-button-edit" onClick={toggleEditProfileHandler}>
      <p>Редактировать</p>
      <CiEdit className="edit-icon" />
    </div>
  );
};

export default EditButton;
