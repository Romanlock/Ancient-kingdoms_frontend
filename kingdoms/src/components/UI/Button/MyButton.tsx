import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

const MyButton: React.FC<Props> = ({ children, ...props }) => {
    return (
      <button {...props} className="btn">
        {children}
      </button>
    );
  };

export default MyButton;
