import React from "react";
import { StyledInput } from "./style";

type ICalculateInput = {
  name: string;
  type: string;
  value: number | undefined;
  placeholder: string | undefined;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CalculateInput = ({
  name,
  value,
  type,
  placeholder,
  handleInput,
}: ICalculateInput) => {
  return (
    <StyledInput
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={handleInput}
    />
  );
};
