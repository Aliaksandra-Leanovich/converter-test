import { createContext, ReactNode, useContext, useState } from "react";

export interface ICurrenciesContextProviderProps {
  children: ReactNode;
}

export interface ICurrenciesContext {
  currencies: string[];
  setCurrencies: (newCurrencies: string[]) => void;
}

const CurrenciesContext = createContext({
  currencies: [] as string[],
  setCurrencies: (newCurrencies: string[]) => {},
});

const useCurrenciesContextValue = (): ICurrenciesContext => {
  const [currenciesContext, setCurrenciesContext] =
    useState<ICurrenciesContext>(() => ({
      currencies: ["USD", "EUR", "BYN", "RUB"],

      setCurrencies: (newCurrencies: string[]) => {
        setCurrenciesContext((context) => ({
          ...context,
          currencies: newCurrencies,
        }));
      },
    }));

  return currenciesContext;
};

export const useCurrenciesContext = () =>
  useContext<ICurrenciesContext>(CurrenciesContext);

export const CurrenciesContextProvider = ({
  children,
}: ICurrenciesContextProviderProps) => {
  return (
    <CurrenciesContext.Provider value={useCurrenciesContextValue()}>
      {children}
    </CurrenciesContext.Provider>
  );
};
