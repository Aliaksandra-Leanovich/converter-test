import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { currencyApi } from "../../service/currencyServices";

export const featchCurrency = createAsyncThunk<any>(
  "currency/featchCurrency",
  () => {
    return currencyApi.getAllRates();
  }
);
export interface IInitialState {
  currency: any;
  status: string;
}

const initialState: IInitialState = {
  currency: {},
  status: "idle",
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(featchCurrency.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(featchCurrency.fulfilled, (state, action) => {
      state.status = "success";
      state.currency = action.payload;
    });
    builder.addCase(featchCurrency.rejected, (state, action) => {
      state.status = "error";
    });
  },
});
export default currencySlice.reducer;
