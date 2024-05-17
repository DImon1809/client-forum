import { FC, useState } from "react";

import Login from "../../components/form/login/Login";
import Register from "../../components/form/Register/Register";

import "./Auth.scss";

const Auth: FC = () => {
  const [selected, setSelected] = useState("sign-in");

  const changeSelectedHandler = (select: string): void => {
    setSelected(select);
  };

  return (
    <div className="form-wrapper">
      <div className="select-wrapper">
        <div
          className={selected === "sign-in" ? "wrapper" : "wrapper right"}
        ></div>
        <div
          className="form-item"
          onClick={() => changeSelectedHandler("sign-in")}
        >
          <p className={selected === "sign-in" ? "sign-in" : ""}>Вход</p>
        </div>
        <div
          className="form-item"
          onClick={() => changeSelectedHandler("sign-up")}
        >
          <p className={selected === "sign-up" ? "sign-up" : ""}>Регистрация</p>
        </div>
      </div>

      {selected === "sign-in" ? (
        <Login changeSelectedHandler={changeSelectedHandler} />
      ) : (
        <Register changeSelectedHandler={changeSelectedHandler} />
      )}
    </div>
  );
};

export default Auth;
