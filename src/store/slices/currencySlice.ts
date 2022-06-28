import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const featchCurrency = createAsyncThunk(
  "currency/featchCurrency",
  async () => {
    const result = await (
      await fetch("https://api.exchangerate.host/latest")
    ).json();

    return result;
  }
);
export interface IInitialState {
  currency: any;
  loading: boolean;
}

const initialState: IInitialState = {
  currency: {},
  loading: false,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(featchCurrency.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(featchCurrency.fulfilled, (state, action) => {
      state.loading = false;
      state.currency = action.payload;
    });
    builder.addCase(featchCurrency.rejected, (state, action) => {
      state.loading = false;
    });
  },
});
export default currencySlice.reducer;
