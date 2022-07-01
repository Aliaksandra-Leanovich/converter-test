import React, { useEffect, useState } from "react";
import { useCurrenciesContext } from "../../context/currenciesContext";
import { currencyService } from "../../service/currencyServices";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import {
  getCurrency,
  getCurrencyStatus,
} from "../../store/selectors/currencySelectors";
import { featchCurrency } from "../../store/slices/currencySlice";
import { CalculateInput } from "../CalculateInput/CalculateInput";
import { ContainerInput, CurrencyName, StyledForm } from "./style";
import Select, { StylesConfig } from "react-select";
import { isNonNullExpression } from "typescript";
import { CurrencySelect } from "../CurrencySelect/CurrencySelect";

export const CalculateForm = () => {
  // const currencies = useAppSelector(getCurrency);
  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(featchCurrency());
  // }, [dispatch]);
  //A non-serializable value was detected in an action, in the path: `payload`.
  // console.log(currencies.currency.rates);

  const [allRates, setAllRates] = useState(null);
  useEffect(() => {
    currencyService.getAllRates().subscribe(setAllRates);
  }, [dispatch]);

  const [keysRates, setKeyslRates] = useState([]);
  useEffect(() => {
    currencyService.getRatesKey().subscribe(setKeyslRates);
  }, [dispatch]);

  const { currencies, setCurrencies } = useCurrenciesContext();

  const shownCurrencies1 = ["USD", "EUR", "BYN", "RUB"];

  const [currencyOptions, setCurrenccyOptions] = useState([]);
  useEffect(() => {
    setCurrenccyOptions(keysRates);
  });
  const [selectCurrency, setSelectCurrency] = useState(shownCurrencies1);

  const handleSelect = (event: any) => {
    if (event) {
      selectCurrency.push(event);
      setCurrencies([...currencies, event]);
    }
  };

  return (
    <>
      <StyledForm>
        <>
          {Object.entries(allRates ?? {}).map(([key, value]) => {
            if (currencies.includes(key)) {
              return (
                <ContainerInput>
                  <CurrencyName>{key}</CurrencyName>
                  <CalculateInput type="number" placeholder={"" + value} />
                </ContainerInput>
              );
            }
          })}
        </>
      </StyledForm>
      <select
        onChange={(e) => handleSelect(e.target.value)}
        value={currencyOptions}
        multiple={false}
      >
        {currencyOptions.map((keys) => {
          return <option value={keys}>{keys}</option>;
        })}
      </select>
    </>
  );
};
