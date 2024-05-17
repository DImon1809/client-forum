import { FC, MouseEvent, useState, useEffect } from "react";

import {
  useLoginMutation,
  useLazyCurrentQuery,
  useRegisterMutation,
} from "../../../store/services/userApi";

import ".././Form.scss";

export interface IRegister {
  changeSelectedHandler: (selected: string) => void;
}

const Register: FC<IRegister> = ({ changeSelectedHandler }) => {
  const [onRegister, { isLoading, data }] = useRegisterMutation();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmiteHandler = async (
    event: MouseEvent<HTMLButtonElement>
  ): Promise<any> => {
    try {
      event.preventDefault();

      await onRegister({ name, email, password }).unwrap();

      changeSelectedHandler("sign-in");
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
          id="name"
          name="name"
          placeholder=" "
          autoComplete="off"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <label htmlFor="password">Имя</label>
      </div>

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
        <p>Есть аккаунт?</p>
        <p className="offer" onClick={() => changeSelectedHandler("sign-in")}>
          Войти
        </p>
      </div>

      <div className="button-wrapper">
        <button onClick={onSubmiteHandler}>Зарегистрироваться</button>
      </div>
    </form>
  );
};

export default Register;
