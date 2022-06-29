import React from "react";
import { CalculateInput } from "../CalculateInput/CalculateInput";
import { StyledForm } from "./style";

export const CalculateForm = () => {
  return (
    <StyledForm>
      <CalculateInput />
    </StyledForm>
  );
};
