import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCurrenciesContext } from "../../context/currenciesContext";
import { currencyService } from "../../service/currencyServices";
import { useAppDispatch, useAppSelector } from "../../store/hooks/hooks";
import {
  getCurrency,
  getCurrencyStatus,
} from "../../store/selectors/currencySelectors";
import { featchCurrency } from "../../store/slices/currencySlice";
import { CalculateInput } from "../CalculateInput/CalculateInput";
import {
  Container,
  ContainerInput,
  CurrencyName,
  CurrencySelect,
  StyledForm,
} from "./style";

export const CalculateForm = () => {
  // const currency = useAppSelector(getCurrency);
  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(featchCurrency());
  // }, [dispatch]);
  // // A non-serializable value was detected in an action, in the path: `payload`.
  // console.log(currency);

  const [allRates, setAllRates] = useState(null);
  useEffect(() => {
    currencyService.getAllRates().subscribe(setAllRates);
  }, [dispatch]);

  const [keysRates, setKeyslRates] = useState([]);
  useEffect(() => {
    currencyService.getRatesKey().subscribe(setKeyslRates);
  }, [dispatch]);

  const { currencies, setCurrencies } = useCurrenciesContext();

  const [currencyOptions, setCurrenccyOptions] = useState([]);

  useEffect(() => {
    setCurrenccyOptions(keysRates);
  });

  const [rezult, setRezult] = useState<number>();
  const handleInput = (e: any) => {
    const { value } = e.target;
    const rez = +value / 10;
    setRezult(rez);
    console.log(rezult);
  };

  useEffect(() => {}, []);

  return (
    <Container>
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
      <CurrencySelect
        onChange={(e) => handleInput(e)}
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
