import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/hooks/hooks";
import { getCurrency } from "./store/selectors/currencySelectors";
import { featchCurrency } from "./store/slices/currencySlice";

function App() {
  const currencies = useAppSelector(getCurrency);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(featchCurrency());
  }, [dispatch]);

  console.log(currencies);
  return <div className="App"></div>;
}

export default App;
