import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import { getCurrency } from "../../store/selectors/currencySelectors";
import { featchCurrency } from "../../store/slices/currencySlice";
import { CalculateInput } from "../CalculateInput/CalculateInput";
import { StyledForm } from "./style";

export const CalculateForm = () => {
  const currencies = useAppSelector(getCurrency);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(featchCurrency());
  }, [dispatch]);

  console.log(currencies);

  return (
    <StyledForm>
      <CalculateInput />
    </StyledForm>
  );
};
