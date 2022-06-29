import axios from "axios";

class currencyService {
  private readonly API_URL = "https://api.exchangerate.host";

  private api = axios.create({
    baseURL: this.API_URL,
  });

  public async getAllRates(): Promise<any> {
    const { data } = await this.api.get<any>("/latest");
    return data;
  }
}
export const currencyApi = new currencyService();
