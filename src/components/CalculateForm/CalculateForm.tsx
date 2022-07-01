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

  // const shownCurrencies = useCurrenciesContext();
  //контекст хочет свой собсвенный метод перебора на подобии includes
  //сделала метод checkCurrencies, но не работает

  const shownCurrencies = ["USD", "EUR", "BYN", "RUB"];

  const [currencyOptions, setCurrenccyOptions] = useState([]);
  useEffect(() => {
    setCurrenccyOptions(keysRates);
  });
  const [selectCurrency, setSelectCurrency] = useState(shownCurrencies);

  const handleSelect = (event: any) => {
    if (event) {
      setSelectCurrency(event);
      selectCurrency.push(event);
      console.log(selectCurrency);
      //срабатывает один раз
      //не отрисовываюися новые
    }
  };

  return (
    <>
      <StyledForm>
        <>
          {Object.entries(allRates ?? {}).map(([key, value]) => {
            if (shownCurrencies.includes(key)) {
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
