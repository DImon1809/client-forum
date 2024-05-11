import React, { FC } from "react";

import Header from "../header/Header";
import Container from "../container/Container";
import Navbar from "../navbar/Navbar";

const Layout = () => {
  return (
    <>
      <Header />
      <Container>
        <Navbar />
      </Container>
    </>
  );
};

export default Layout;
