import { FC } from "react";

import { useCurrentQuery } from "../../store/services/userApi";

export interface IGuardAuth {
  children: JSX.Element;
}

const GuardAuth: FC<IGuardAuth> = ({ children }) => {
  const { isLoading } = useCurrentQuery();

  if (isLoading)
    return (
      <>
        <h1>Loading...</h1>
      </>
    );

  return children;
};

export default GuardAuth;
