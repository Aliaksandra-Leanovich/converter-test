import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import {
  getCurrency,
  getCurrencyStatus,
} from "../../store/selectors/currencySelectors";
import { featchCurrency } from "../../store/slices/currencySlice";
import { CalculateInput } from "../CalculateInput/CalculateInput";
import { ContainerInput, CurrencyName, StyledForm } from "./style";

export const CalculateForm = () => {
  const currencies = useAppSelector(getCurrency);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(featchCurrency());
  }, [dispatch]);

  // console.log(currencies);

  return (
    <StyledForm>
      {/* <ContainerInput>
        <CurrencyName>USD</CurrencyName>
        <CalculateInput type="number" placeholder={currencies.USD} />
      </ContainerInput>
      <ContainerInput>
        <CurrencyName> EUR </CurrencyName>
        <CalculateInput type="number" placeholder={currencies.EUR} />
      </ContainerInput> */}
    </StyledForm>
  );
};
