import axios from "axios";
import { from, Observable, pipe } from "rxjs";
import { map } from "rxjs/operators";

export interface ICurrency {
  [label: string]: string | undefined;
}

class CurrencyService {
  private readonly API_URL = "https://api.exchangerate.host";

  private api = axios.create({
    baseURL: this.API_URL,
  });

  public getAllRates(): Observable<any> {
    return from(this.api.get("/latest?base=USD")).pipe(
      map((response) => {
        return response.data.rates;
      })
    );
  }
  public getRatesKey(): Observable<any> {
    return from(this.api.get("/latest?base=USD")).pipe(
      map((response) => Object.keys(response.data.rates))
    );
  }
  public getAllCurrencies(): Observable<any> {
    return this.getAllRates().pipe(map((rates) => Object.keys(rates)));
  }
}
export const currencyService = new CurrencyService();
