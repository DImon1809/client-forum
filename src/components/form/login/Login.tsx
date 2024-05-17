import { FC, MouseEvent, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import {
  useLoginMutation,
  useLazyCurrentQuery,
} from "../../../store/services/userApi";

import ".././Form.scss";

export interface ILogin {
  changeSelectedHandler: (selected: string) => void;
}
const Login: FC<ILogin> = ({ changeSelectedHandler }) => {
  const [onLogin, { isLoading, data }] = useLoginMutation();
  const [error, setError] = useState<string>("");
  const [triggerCurrentQuery] = useLazyCurrentQuery();

  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmiteHandler = async (
    event: MouseEvent<HTMLButtonElement>
  ): Promise<any> => {
    try {
      event.preventDefault();

      await onLogin({ email, password }).unwrap();

      await triggerCurrentQuery();

      navigate("/");
    } catch (err) {
      alert("Что-то не так!");

      console.error(err);
    }
  };

  useEffect(() => {
    if (!isLoading) console.log(data);
  }, [isLoading, data]);

  return (
    <form className="form">
      <div className="input-wrapper">
        <input
          type="text"
          id="login"
          name="login"
          placeholder=" "
          autoComplete="off"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="login">Емаил</label>
      </div>

      <div className="input-wrapper">
        <input
          type="password"
          id="password"
          name="password"
          placeholder=" "
          autoComplete="off"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <label htmlFor="password">Пароль</label>
      </div>

      <div className="form-paragraph">
        <p>Нет аккаунта?</p>
        <p className="offer" onClick={() => changeSelectedHandler("sign-up")}>
          Зарегистрируйтесь
        </p>
      </div>

      <div className="button-wrapper">
        <button onClick={onSubmiteHandler}>Войти</button>
      </div>
    </form>
  );
};

export default Login;
