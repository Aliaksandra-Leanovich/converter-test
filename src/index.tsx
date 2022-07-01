import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { CurrenciesContextProvider } from "./context/currenciesContext";
import GlobalStyles from "./GlobalStyles";
import store from "./store/store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CurrenciesContextProvider>
        <GlobalStyles />
        <App />
      </CurrenciesContextProvider>
    </Provider>
  </React.StrictMode>
);
