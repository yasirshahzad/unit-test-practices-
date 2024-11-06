import { it, expect, describe } from "vitest";
import {
  calculateDiscount,
  getCoupons,
  isPriceInRange,
  validateUserInput,
  isValidUsername,
  canDrive,
} from "../core";

describe("getCoupons", () => {
  it("should return a list of coupons", () => {
    const result = getCoupons();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("should return a list of coupons having coupon code", () => {
    const result = getCoupons();

    result.forEach((coupon) => {
      expect(coupon).toHaveProperty("code");
      expect(coupon.code).toBeDefined();
      expect(typeof coupon.code).toBe("string");
      expect(coupon.code.length).toBeGreaterThan(0);
    });
  });

  it("should return a list of coupons having discount", () => {
    const result = getCoupons();

    result.forEach((coupon) => {
      expect(coupon).toHaveProperty("discount");
      expect(coupon.discount).toBeDefined();
      expect(typeof coupon.discount).toBe("number");
    });
  });
});

describe("calculateDiscount", () => {
  it("should return discount price", () => {
    expect(calculateDiscount(100, "SAVE10")).toBe(90);
    expect(calculateDiscount(10, "SAVE10")).toBe(9);
    expect(calculateDiscount(10, "SAVE20")).toBe(8);
  });

  it("should return original price when coupan is not valid", () => {
    expect(calculateDiscount(100, "invalid")).toBe(100);
  });

  it("should return invalid when coupon is not string", () => {
    expect(calculateDiscount(100, null)).match(/invalid/i);
  });

  it("should return invalid when price is not number", () => {
    expect(calculateDiscount("100", null)).match(/invalid/i);
  });
});

describe("validateUserInput", () => {
  it("should return validation successful on valid input", () => {
    expect(validateUserInput("Yasir", 23)).toMatch(/validation successful/i);
  });

  it("should return invalid username when username is not string", () => {
    expect(validateUserInput(null, 23)).toMatch(/invalid username/i);
  });

  it("should return invalid age when age is not number", () => {
    expect(validateUserInput("Yasir", null)).toMatch(/invalid age/i);
  });

  it("should return invalid age when age is less than 18", () => {
    expect(validateUserInput("Yasir", 17)).toMatch(/invalid age/i);
  });

  it("should return invalid username when username is less than 3", () => {
    expect(validateUserInput("Y", 23)).toMatch(/invalid username/i);
  });

  it("should return invalid username when username is greater than 255", () => {
    expect(validateUserInput("Y".repeat(256), 23)).toMatch(/invalid username/i);
  });

  it("should return invalid username and invalid age when username and password are not valid", () => {
    expect(validateUserInput("", null)).toMatch(/invalid username/i);
    expect(validateUserInput("", null)).toMatch(/invalid age/i);
  });
});

describe("isPriceInRange", () => {
  it("should return true when price is in range", () => {
    expect(isPriceInRange(50, 0, 100)).toBe(true);
  });

  it("should return true when price is at boundary", () => {
    expect(isPriceInRange(0, 0, 100)).toBe(true);
    expect(isPriceInRange(100, 0, 100)).toBe(true);
  });

  it("should return false when price is not in range", () => {
    expect(isPriceInRange(-1, 0, 100)).toBe(false);
    expect(isPriceInRange(101, 0, 100)).toBe(false);
    expect(isPriceInRange(null, 0, 100)).toBe(false);
  });
});

describe("isValidUsername", () => {
  it("should return true when username is valid", () => {
    expect(isValidUsername("Yasir")).toBe(true);
  });

  it("should return false when username is not valid", () => {
    expect(isValidUsername("Y")).toBe(false);
    expect(isValidUsername("Y".repeat(256))).toBe(false);
  });

  it("should return false when username is not string", () => {
    expect(isValidUsername(null)).toBe(false);
  });
});

// parameterized test
// https://vitest.dev/guide/parameterized.html

describe("canDrive", () => {
  const testCases = [
    { age: 15, country: "UK", expected: false },
    { age: 17, country: "UK", expected: true },
    { age: 18, country: "UK", expected: true },
    { age: 15, country: "US", expected: false },
    { age: 16, country: "US", expected: true },
    { age: 17, country: "US", expected: true },
    { age: 15, country: "CA", expected: "Invalid country code" },
    { age: "US", country: "US", expected: "Invalid age" },
  ];

  it.each(testCases)(
    "should return $expected when country is $country and age is $age",
    ({ age, country, expected }) => {
      expect(canDrive(age, country)).toBe(expected);
    }
  );
});
