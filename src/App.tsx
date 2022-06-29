import React, { useEffect } from "react";
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

  return <div className="App"></div>;
}

export default App;
