import axios from "axios";

class currencyService {
  private readonly API_URL = "https://api.exchangerate.host";

  private api = axios.create({
    baseURL: this.API_URL,
  });

  public getAllRates(): Promise<any> {
    return this.api.get<any>("/latest").then(({ data }) => data);
  }
}
export const currencyApi = new currencyService();
