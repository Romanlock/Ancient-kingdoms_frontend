import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const MyInput: React.FC<Props> = ({ ...props }) => {
    return <input {...props} />;
};

export default MyInput;
