import { it, expect, describe } from "vitest";
import { max } from "./../intro";

describe("max", () => {
  it("should return the first argument if argument 1 is greater than argument 2", () => {
    // following AAA Pattern in the first test
    // arrange
    const a = 5;
    const b = 3;

    // act
    const result = max(a, b);

    // assert
    expect(result).toBe(a);
  });

  it("should return the second argument if argument 1 is less than argument 2", () => {
    const a = 4;
    const b = 5;

    expect(max(a, b)).toBe(b);
  });

  it("should return the first argument if both arguments are equal", () => {
    const a = 5;
    const b = 5;

    expect(max(a, b)).toBe(a);
  });
});
