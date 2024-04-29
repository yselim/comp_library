import React, { FC, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode | ReactNode[];
}
const Button: FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <div
      style={{
        padding: "10px 20px",
        borderRadius: 5,
        border: "solid red 2px",
        backgroundColor: "#333",
        color: "yellow",
        cursor: "pointer",
        width: 300,
        height: 150,
      }}
    >
      {props.children}
    </div>
  );
};

export default Button;
