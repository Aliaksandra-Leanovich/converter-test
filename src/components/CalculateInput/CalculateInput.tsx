import React from "react";
import { StyledInput } from "./style";

type ICalculateInput = {
  name: string;
  type: string;
  placeholder: string | undefined;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CalculateInput = ({
  type,
  name,
  placeholder,
  handleInput,
}: ICalculateInput) => {
  return (
    <StyledInput
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={handleInput}
    />
  );
};
