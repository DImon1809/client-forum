import React, { ReactNode, ReactElement, FC } from "react";

export interface IContainer {
  children: ReactNode;
}

export const Container: FC<IContainer> = ({ children }) => {
  return <div>{children}</div>;
};

export default Container;
