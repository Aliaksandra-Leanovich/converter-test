import axios from "axios";
import { from, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { ICurrency, Response } from "../types";

const API_URL = "https://api.exchangerate.host";
const DIFFERENCE_THRESHOLD_SEC = 5 * 60 * 1000; // 5 minutes threshold

class CurrencyService {
  private lastRequestTimestamp = 0;
  private cachedRates: Observable<ICurrency> = of();

  private api = axios.create({
    baseURL: API_URL,
  });

  getAllRates(): Observable<ICurrency> {
    const currentTimestamp = new Date().getTime();
    const isNewRequest =
      currentTimestamp - this.lastRequestTimestamp > DIFFERENCE_THRESHOLD_SEC;

    if (isNewRequest) {
      this.cachedRates = from(this.api.get("/latest")).pipe(
        map((response: Response) => response.data.rates)
      );
      this.lastRequestTimestamp = currentTimestamp;
    }

    return this.cachedRates;
  }

  getAllCurrencies(): Observable<string[]> {
    return this.getAllRates().pipe(
      map((rates: ICurrency) => Object.keys(rates))
    );
  }
}

export const currencyService = new CurrencyService();
