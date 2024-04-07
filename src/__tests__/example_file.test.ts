import { KeyPressHandler } from "../index";

const KH = new KeyPressHandler();

describe("Get and Set longPressTreshold", function () {
  test("Default longPressTresholdMilliSeconds should be 500 ms", () => {
    expect(KH.longPressTresholdMilliSeconds).toStrictEqual(500);
  });
  test("Default longPressTresholdSeconds should be .5 s", () => {
    expect(KH.longPressTresholdSeconds).toStrictEqual(0.5);
  });
  test("Change longPressTresholdMilliSeconds to 800 ms", () => {
    KH.longPressTresholdMilliSeconds = 800;
    expect(KH.longPressTresholdSeconds).toStrictEqual(.8);
  });
  test("Change longPressTresholdSeconds to .8 s", () => {
    KH.longPressTresholdSeconds = .8;
    expect(KH.longPressTresholdMilliSeconds).toStrictEqual(800);
  });
});
