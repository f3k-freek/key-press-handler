import { ExampleSpace } from "../index";

const ES = new ExampleSpace.default();

describe("Get default publicNumber", function () {
  test("publicNumber should be 1234", () => {
    expect(ES.publicNumber).toBe(1234);
  });
});
