import { RootState } from "../store";

export const getCurrency = (state: RootState) => state.currency.currency;
export const getCurrencyLoading = (state: RootState) => state.currency.loading;
