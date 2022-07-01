import React, { createContext, ReactNode, useContext, useState } from "react";

export interface IExpensesContextProviderProps {
  children: ReactNode;
}

export interface ICurrenciesContext {
  currencies: any;
  setCurrencies: (newCurrencies: any[]) => void;
  checkCurrencies: (key: string) => any;
}

const CurrenciesContext = createContext<any>({
  currencies: [],
  setCurrencies: (newCurrencies: any[]) => {},
  checkCurrencies: (key: string) => {},
});

const useCurrenciesContextValue = () => {
  const [currenciesContext, setCurrenciesContext] =
    useState<ICurrenciesContext>(() => ({
      currencies: ["USD", "EUR", "BYN", "RUB"],
      setCurrencies: (newCurrencies: any) => {
        setCurrenciesContext((ctx: any) => ({
          ...ctx,
          currencies: newCurrencies,
        }));
      },
      checkCurrencies: (key: string) => {
        setCurrenciesContext((ctx) => ({
          ...ctx,
          currencies: ctx.currencies.includes(
            (currencies: any) => currencies.key !== key
          ),
        }));
      },
    }));

  return currenciesContext;
};

export const useCurrenciesContext = () =>
  useContext<ICurrenciesContext>(CurrenciesContext);

export const CurrenciesContextProvider = ({
  children,
}: IExpensesContextProviderProps) => {
  return (
    <CurrenciesContext.Provider value={useCurrenciesContextValue()}>
      {children}
    </CurrenciesContext.Provider>
  );
};
