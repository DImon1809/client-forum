import { FC, ReactNode } from "react";

export interface IButton {
  children: ReactNode;
  icon?: JSX.Element;
  className?: string;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  color?: "string";
}

const Button: FC<IButton> = ({
  children,
  icon,
  className,
  type,
  fullWidth,
  color,
}) => {
  return <div>Click me</div>;
};

export default Button;
