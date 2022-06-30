import axios from "axios";
import {
  BehaviorSubject,
  combineLatest,
  flatMap,
  map,
  Observable,
  pipe,
} from "rxjs";

class currencyService {
  private readonly API_URL = "https://api.exchangerate.host";

  private api = axios.create({
    baseURL: this.API_URL,
  });

  // public getAllRates(): Promise<any> {
  //   return this.api.get<any>("/latest").then(({ data }) => data);
  // }

  public getAllRates(): Observable<any> {
    return this.api.get("/latest").pipe(
      map((res: any[]) => {
        const data = res.map((obj) => ({
          label: obj.name,
          value: obj.value,
        }));
        return data;
      })
    );
  }
}
export const currencyApi = new currencyService();

export const currencyService$ = new BehaviorSubject<any>([]);

const latest$ = new BehaviorSubject("/latest");

const fetch$ = combineLatest(latest$).pipe(
  flatMap(([latest]) => axios(`https://api.exchangerate.host${latest}`)),
  map((result: any) => result.data)
);

// fetch()
//   .then((res) => res.json())
//   .then((data) => currencyService$.next(data));
