import React, { useEffect } from "react";
import styled from "styled-components";
import { ContainerCalculateForm } from "./components/ContainerCalculateFrom/ContainerCalculateForm";
import { StyledContainer } from "./components/ContainerCalculateFrom/style";
import { useAppDispatch, useAppSelector } from "./store/hooks/hooks";
import {
  getCurrency,
  getCurrencyStatus,
} from "./store/selectors/currencySelectors";
import { featchCurrency } from "./store/slices/currencySlice";

function App() {
  const currencies = useAppSelector(getCurrency);
  const dispatch = useAppDispatch();
  const status = useAppSelector(getCurrencyStatus);

  useEffect(() => {
    dispatch(featchCurrency());
  }, [dispatch]);

  if (status === "loading") {
    return <p>loading</p>;
  }
  if (status === "error") {
    return <p>error</p>;
  }
  console.log(currencies);

  // for (const [key, value] of Object.entries(currencies.rates)) {
  //   console.log(`${key}: ${value}`);
  // }

  return (
    <StyledApp className="App">
      <ContainerCalculateForm />
    </StyledApp>
  );
}

export default App;

const StyledApp = styled.div`
  max-width: 1170px;
  width: 100%;

  padding: 40px 0;
`;
