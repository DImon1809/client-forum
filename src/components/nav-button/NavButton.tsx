import { FC, ReactNode } from "react";

import { Link } from "react-router-dom";

export interface INavButton {
  children: ReactNode;
  icon: JSX.Element;
  href: string;
}

const NavButton: FC<INavButton> = ({ children, href, icon }) => {
  return (
    <button>
      {icon}
      <Link to={href}>{children}</Link>
    </button>
  );
};

export default NavButton;
