import { it, expect, describe } from "vitest";
import { calculateDiscount, getCoupons } from "../core";

describe("getCoupans", () => {
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
