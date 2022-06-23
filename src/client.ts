import axios, { AxiosError } from "axios";
import { IHTTPClient } from "./interfaces/IHttpClient";

export class HttpClient implements IHTTPClient {
  public apiCalls = 0;
  private retry = 0;
  private retryLimit = 10;

  constructor(
    private readonly baseUrl: string,
    private readonly email: string
  ) {}

  private sleep(ms: number) {
    return new Promise((res, rej) => setTimeout(res, ms * 1000));
  }

  public async getToken(): Promise<string> {
    this.apiCalls++;
    const result = await axios.get(`${this.baseUrl}/token?email=${this.email}`);
    return result.data.token as string;
  }

  public async getBlock(token: string): Promise<string[]> {
    this.apiCalls++;
    const result = await axios.get(`${this.baseUrl}/blocks?token=${token}`);
    return result.data.data as string[];
  }

  public async validate(
    data: string[] | string,
    token: string
  ): Promise<boolean> {
    this.apiCalls++;
    const payload =
      typeof data === "string" ? { encoded: data } : { blocks: data };
    try {
      const result = await axios.post(
        `${this.baseUrl}/check?token=${token}`,
        payload
      );
      return !!result.data.message;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          if (error.response.status === 429) {
            await this.sleep(2 ^ this.retry);
            this.retry++;
            if (this.retry === this.retryLimit) {
              throw new Error("Api request retry limit reached");
            }
            return this.validate(data, token);
          }
        }
      }
      throw error;
    }
  }
}
