import { FC } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.scss";

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<h2>Auth</h2>} />
      </Routes>
    </>
  );
};

export default App;
