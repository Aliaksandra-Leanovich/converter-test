import React, { ChangeEvent, useEffect, useState } from "react";
import { useCurrenciesContext } from "../../context/currenciesContext";
import { currencyService } from "../../service/currencyServices";
import { useAppDispatch } from "../../store/hooks/hooks";
import { CalculateInput } from "../CalculateInput/CalculateInput";
import {
  Container,
  ContainerInput,
  CurrencyName,
  CurrencySelect,
  StyledForm,
} from "./style";

import { combineLatest, BehaviorSubject, merge, Subject } from "rxjs";
import { map, tap } from "rxjs/operators";

export const CalculateForm = () => {
  const dispatch = useAppDispatch();

  const [allRates, setAllRates] = useState({});
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [convertableAmount, setConvertableAmount] = useState(1);
  const [keysRates, setKeyslRates] = useState([]);
  const [currencyOptions, setCurrenccyOptions] = useState([]);
  const { currencies, setCurrencies } = useCurrenciesContext();

  const baseCurrency$ = new BehaviorSubject<string>("USD");
  const convertableAmount$ = new BehaviorSubject<number>(1);
  const keysRates$ = currencyService.getAllCurrencies();
  const initialRates$ = currencyService.getAllRates();

  const updatedRates$ = combineLatest([
    initialRates$,
    baseCurrency$,
    convertableAmount$,
  ]).pipe(
    map(([initialRates, baseCurrency, convertableAmount]) => {
      return Object.entries(initialRates).reduce((acc, [key, value]) => {
        return {
          ...acc,
          [key]: (Number(value) / 1) * convertableAmount,
          // [key]: (Number(value) / initialRates[baseCurrency]) * convertableAmount, should be
        };
      }, {});
    })
  );

  const rates$ = merge(initialRates$, updatedRates$);

  useEffect(() => {
    const keysRatesSubscription = keysRates$.subscribe(setKeyslRates);
    const ratesSubscription = rates$.subscribe(setAllRates);

    return () => {
      keysRatesSubscription.unsubscribe();
      ratesSubscription.unsubscribe();
    };
  }, [dispatch, baseCurrency, convertableAmount]);

  useEffect(() => {
    setCurrenccyOptions(keysRates);
  });

  const handleSelect = (event: any) => {
    if (event) {
      setCurrencies([...currencies, event]);
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const currency = e.target.attributes.getNamedItem("name")?.nodeValue ?? "";
    const amount = Number(e.target.value);

    baseCurrency$.next(currency);
    convertableAmount$.next(amount);

    setBaseCurrency(currency);
    setConvertableAmount(convertableAmount);
  };

  return (
    <Container>
      <StyledForm>
        <>
          {Object.entries(allRates ?? {}).map(([key, value]) => {
            return (
              currencies.includes(key) && (
                <ContainerInput>
                  <CurrencyName>{key}</CurrencyName>
                  <CalculateInput
                    name={key}
                    type="number"
                    placeholder={"" + value}
                    handleInput={handleInput}
                  />
                </ContainerInput>
              )
            );
          })}
        </>
      </StyledForm>
      <CurrencySelect
        onChange={(e) => handleSelect(e.target.value)}
        value={currencyOptions}
        multiple={false}
      >
        {currencyOptions.map((keys) => {
          return <option value={keys}>{keys}</option>;
        })}
      </CurrencySelect>
    </Container>
  );
};
