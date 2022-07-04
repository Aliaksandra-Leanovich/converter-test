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

  const [allRates, setAllRates] = useState(null);
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [convertableAmount, setConvertableAmount] = useState(1);
  const [keysRates, setKeyslRates] = useState([]);
  const [currencyOptions, setCurrenccyOptions] = useState([]);
  const { currencies, setCurrencies } = useCurrenciesContext();

  const baseCurrency$ = new BehaviorSubject<string>("USD");
  const convertableAmount$ = new BehaviorSubject<number>(1);
  const keysRates$ = currencyService.getAllCurrencies();
  const initialRates$ = currencyService.getAllRates();

  const rates$ = merge(initialRates$);

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

  const handleSelect = (event: string) => {
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
    setConvertableAmount(amount);
  };
  const convertValues = (value: number, key: string) => {
    if (allRates) {
      return (convertableAmount / allRates[baseCurrency]) * allRates[key];
    }

    return value;
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
                    key={key}
                    type="number"
                    placeholder={"" + value}
                    handleInput={handleInput}
                    value={
                      key === baseCurrency
                        ? convertableAmount
                        : convertValues(Number(value), key)
                    }
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
