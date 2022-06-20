export interface IHTTPClient {
  apiCalls: number;
  getToken(): Promise<string>;
  getBlock(token: string): Promise<string[]>;
  validate(data: string[] | string, token: string): Promise<boolean>;
}
