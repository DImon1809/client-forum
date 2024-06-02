import {
  FC,
  ChangeEvent,
  MouseEvent,
  useState,
  useRef,
  useContext,
} from "react";

import { ThemeContext } from "../theme-provider/ThemeProvider";

import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootType } from "../../store/store";

import { useUpdateUserMutation } from "../../store/services/userApi";
import { useLazyCurrentQuery } from "../../store/services/userApi";

import "./EditProfile.scss";

export interface IEditProfile {
  onCloseEditWindow: () => Promise<void>;
}

const EditProfile: FC<IEditProfile> = ({ onCloseEditWindow }) => {
  const { toggleGlobalWrapper } = useContext(ThemeContext);

  const current = useSelector((state: RootType) => state.userSlice.current);
  const [getCurrentUserData] = useLazyCurrentQuery();

  const [updateUserProfile] = useUpdateUserMutation();

  const { id } = useParams<string>();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [name, setName] = useState<string>(current?.name || "");
  const [email, setEmail] = useState<string>(current?.email || "");
  const [bio, setBio] = useState<string>("");
  const [userLocation, setUserLocation] = useState<string>("");

  const dataOfBirthRef = useRef<HTMLInputElement>(null);

  const changeFile = (event: ChangeEvent<HTMLInputElement>): void => {
    console.log(event.target.files);

    setSelectedFile(event.target.files?.[0] || null);
  };

  const uploadDataHandler = async (
    event: MouseEvent<HTMLDivElement>
  ): Promise<void> => {
    try {
      event.preventDefault();

      const formData = new FormData();

      name && formData.append("name", name);

      email && email !== current?.email && formData.append("email", email);

      dataOfBirthRef.current?.value &&
        formData.append(
          "dateOfBirth",
          new Date(dataOfBirthRef.current?.value).toISOString()
        );

      bio && formData.append("bio", bio);

      userLocation && formData.append("location", userLocation);

      selectedFile && formData.append("avatar", selectedFile);

      await updateUserProfile({ userData: formData, id: id || "" }).unwrap();

      toggleGlobalWrapper();

      await onCloseEditWindow();
    } catch (err) {
      console.error(err);

      alert("Что-то пошло не так");
    }
  };

  return (
    <div
      className={
        localStorage.getItem("theme") === "black"
          ? "edit-profile black"
          : "edit-profile"
      }
    >
      <form className="form">
        <div
          className={
            localStorage.getItem("theme") === "black"
              ? "input-wrapper light"
              : "input-wrapper"
          }
        >
          <input
            type="text"
            name="email"
            id="email"
            placeholder=" "
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <label htmlFor="email">Емаил</label>
        </div>
        <div
          className={
            localStorage.getItem("theme") === "black"
              ? "input-wrapper light"
              : "input-wrapper"
          }
        >
          <input
            type="text"
            name="name"
            id="name"
            placeholder=" "
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <label htmlFor="name">Имя</label>
        </div>

        <div
          className={
            localStorage.getItem("theme") === "black"
              ? "input-file-wrapper light"
              : "input-file-wrapper"
          }
        >
          <input
            type="file"
            name="file"
            id="file"
            accept="image/*,.png,.jpg,.git,.web"
            onChange={changeFile}
          />
        </div>

        <div
          className={
            localStorage.getItem("theme") === "black"
              ? "input-birth-wrapper light"
              : "input-birth-wrapper"
          }
        >
          <label htmlFor="birth">Дата рождения</label>
          <input type="date" name="birth" id="birth" ref={dataOfBirthRef} />
        </div>

        <div
          className={
            localStorage.getItem("theme") === "black"
              ? "input-textarea-wrapper light"
              : "input-textarea-wrapper"
          }
        >
          <textarea
            name="bio"
            id="bio"
            placeholder="Напишите что-нибудь о себе..."
            value={bio}
            onChange={(event) => setBio(event.target.value)}
          ></textarea>
        </div>

        <div
          className={
            localStorage.getItem("theme") === "black"
              ? "input-wrapper light"
              : "input-wrapper"
          }
        >
          <input
            type="text"
            name="location"
            id="location"
            placeholder=" "
            value={userLocation}
            onChange={(event) => setUserLocation(event.target.value)}
          />
          <label htmlFor="location">Местоположение</label>
        </div>

        <div className="form-button" onClick={uploadDataHandler}>
          <p>Обновите профиль</p>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
