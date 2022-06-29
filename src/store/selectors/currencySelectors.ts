import { RootState } from "../store";

export const getCurrency = (state: RootState) => state.currency.currency;
export const getCurrencyStatus = (state: RootState) => state.currency.status;
