import { RootState } from "../store";

export const getCurrency = (state: RootState) => state.currency.currency.rates;
export const getCurrencyLoading = (state: RootState) => state.currency.loading;
