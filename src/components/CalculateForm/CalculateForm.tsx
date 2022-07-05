import { ChangeEvent, useEffect, useState } from "react";
import { useCurrenciesContext } from "../../context/currenciesContext";
import { currencyService } from "../../service/currencyServices";
import { CalculateInput } from "../CalculateInput/CalculateInput";
import {
  Container,
  ContainerInput,
  CurrencyName,
  CurrencySelect,
  StyledForm,
} from "./style";
import { ICurrency } from "../../types";

export const CalculateForm = () => {
  const [allRates, setAllRates] = useState<ICurrency>({});
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [convertableAmount, setConvertableAmount] = useState(1);
  const [allCurrencies, setAllCurrencies] = useState<string[]>([]);
  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  const { currencies, setCurrencies } = useCurrenciesContext();

  const allCurrencies$ = currencyService.getAllCurrencies();
  const rates$ = currencyService.getAllRates();

  useEffect(() => {
    const allCurrenciesSubscription =
      allCurrencies$.subscribe(setAllCurrencies);
    const ratesSubscription = rates$.subscribe(setAllRates);

    return () => {
      allCurrenciesSubscription.unsubscribe();
      ratesSubscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    setCurrencyOptions(allCurrencies);
  }, [allCurrencies]);

  const handleSelect = (event: string) => {
    if (event) {
      setCurrencies([...currencies, event]);
    }
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>): void => {
    const currency = e.target.attributes.getNamedItem("name")?.nodeValue ?? "";
    const amount = Number(e.target.value);

    setBaseCurrency(currency);
    setConvertableAmount(amount);
  };

  const calculateValue = (value: number, key: string): number => {
    if (allRates) {
      return (
        (convertableAmount / Number(allRates[baseCurrency])) *
        Number(allRates[key])
      );
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
                        : calculateValue(Number(value), key)
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
