import { it, expect, describe } from "vitest";
import { fictorial, fizzBuzz, max } from "./../intro";

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

describe("fizzBuzz", () => {
  it("should return FizzBuzz if the number is divisible by both 3 and 5", () => {
    const n = 45;
    expect(fizzBuzz(n)).toBe("FizzBuzz");
  });

  it("should return Fizz if the number is divisble by 3 only", () => {
    const n = 9;
    expect(fizzBuzz(n)).toBe("Fizz");
  });

  it("should return Buzz if the number is divisible by 5 only", () => {
    const n = 20;
    expect(fizzBuzz(n)).toBe("Buzz");
  });
});

describe("fictorial", () => {
  it("should return 120 for 5", () => {
    const n = 5;

    expect(fictorial(n)).toBe(120);
  });
});
