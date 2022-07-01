import { RootState } from "../store";

export const getCurrency = (state: RootState) => state.currency;
export const getCurrencyStatus = (state: RootState) => state.currency.loading;
