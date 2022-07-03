import React from "react";
import { StyledInput } from "./style";

type ICalculateInput = {
  type: string;
  placeholder: string | undefined;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const CalculateInput = ({
  type,
  placeholder,
  handleInput,
}: ICalculateInput) => {
  return (
    <StyledInput type={type} placeholder={placeholder} onChange={handleInput} />
  );
};
