import { Solution } from "../src/solution";
import { originalSortSolution, shuffle, validate } from "../src/utils";

const httpClientMock = {
  apiCalls: 1,
  getToken: jest.fn(),
  getBlock: jest.fn(),
  validate,
};

const solution = new Solution(httpClientMock);
const testToken = "test-token";

describe("solution test", () => {
  beforeEach(jest.clearAllMocks);
  it("Should pass the string chain validation", async () => {
    const [first, ...rest] = originalSortSolution;
    const data = [first, ...shuffle(rest)];
    const result = await solution.check(data, testToken);
    expect(result).toEqual(originalSortSolution);
  });

  it("Should fail the string chain validation due an additional block was added", async () => {
    const [first, ...rest] = originalSortSolution;
    const data = [first, ...shuffle(rest), "x"];
    try {
      await solution.check(data, testToken);
      fail("This should not happend");
    } catch (error) {
      expect(error).toEqual(
        new Error("Next string section was not found on the provided block")
      );
    }
  });
});
