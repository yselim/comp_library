import React, { FC, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode | ReactNode[];
}
const Button: FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <button
      style={{
        padding: "10px 20px",
        borderRadius: 5,
        border: "none",
        backgroundColor: "#333",
        color: "green",
        cursor: "pointer",
      }}
    >
      {props.children}
    </button>
  );
};

export default Button;
