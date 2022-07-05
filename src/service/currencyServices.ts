import axios from "axios";
import { from, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ICurrency, Response } from "../types";

class CurrencyService {
  private readonly API_URL = "https://api.exchangerate.host";

  private api = axios.create({
    baseURL: this.API_URL,
  });

  getAllRates(): Observable<ICurrency> {
    return from(this.api.get("/latest")).pipe(
      map((response: Response) => response.data.rates)
    );
  }

  getAllCurrencies(): Observable<string[]> {
    return this.getAllRates().pipe(
      map((rates: ICurrency) => Object.keys(rates))
    );
  }
}

export const currencyService = new CurrencyService();
