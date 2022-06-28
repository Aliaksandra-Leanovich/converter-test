import { configureStore } from "@reduxjs/toolkit";
import currencyReducer from "./slices/currencySlice";

const store = configureStore({
  reducer: {
    currency: currencyReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
