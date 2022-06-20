import axios from "axios";
import { IHTTPClient } from "./interfaces/IHttpClient";

export class HttpClient implements IHTTPClient {
  public apiCalls = 0;

  constructor(
    private readonly baseUrl: string,
    private readonly email: string
  ) {}

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
    const result = await axios.post(
      `${this.baseUrl}/check?token=${token}`,
      payload
    );
    return !!result.data.message;
  }
}
