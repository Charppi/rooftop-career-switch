import { IHTTPClient } from "./interfaces/IHttpClient";

export class Solution {
  constructor(private readonly client: IHTTPClient) {}
  public async check(block: string[], token: string): Promise<string[]> {
    console.log("Starting the solution execution 🚀");

    let currentIndex = 0;
    let nextIndex = 1;

    const result = [];

    result.push(block[currentIndex]);

    do {
      // Take the last found block
      const currentBlock = result.at(-1)!;
      const nextBlock = block[nextIndex];
      // Skip the alredy found blocks to save requests to the api
      if (result.includes(nextBlock)) {
        nextIndex++;
        continue;
      }
      //
      if (!nextBlock) {
        throw new Error(
          "Next string section was not found on the provided block"
        );
      }

      const valid = await this.client.validate(
        [currentBlock, nextBlock],
        token
      );
      if (!valid) {
        nextIndex++;
        continue;
      }
      result.push(nextBlock);
      currentIndex++;
      nextIndex = 1;
    } while (currentIndex !== block.length - 1);
    return result;
  }

  public async main(): Promise<void> {
    const token = await this.client.getToken();
    const block = await this.client.getBlock(token);
    const sorted = await this.check(block, token);
    const encoded = sorted.join("");
    const valid = await this.client.validate(encoded, token);
    if (!valid) {
      console.log(`The test has failed 💥`);
      return;
    }
    console.log(
      `The test has passed with [${this.client.apiCalls}] api calls .`,
      encoded
    );
  }
}
