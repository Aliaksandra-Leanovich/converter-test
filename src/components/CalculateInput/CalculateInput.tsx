import React from "react";
import { StyledInput } from "./style";

type ICalculateInput = {
  type: string;
  placeholder: string;
};

export const CalculateInput = ({ type, placeholder }: ICalculateInput) => {
  return <StyledInput />;
};
