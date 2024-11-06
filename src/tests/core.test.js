import { it, expect, describe } from "vitest";
import { calculateDiscount, getCoupons, validateUserInput } from "../core";

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
