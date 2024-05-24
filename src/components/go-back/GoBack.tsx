import { FC } from "react";

import { useNavigate } from "react-router-dom";

import "./GoBack.scss";

import { FaRegArrowAltCircleLeft } from "react-icons/fa";

const GoBack: FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="go-back" onClick={handleGoBack}>
      <FaRegArrowAltCircleLeft className="arrow" />
      <p>Назад</p>
    </div>
  );
};

export default GoBack;
