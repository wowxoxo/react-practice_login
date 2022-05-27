import React, { ButtonHTMLAttributes } from "react";

import classes from "./Button.module.css";

interface My {
  name: string;
}

interface ButtonProps {
  // type?: "submit" | "reset" | "button"
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: My["name"];
  disabled?: boolean;
  children: React.ReactNode;
}

const Button = ({
  type = "button",
  className,
  onClick,
  disabled,
  children
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${classes.button} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
