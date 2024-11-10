import { vi, it, expect, describe } from "vitest";
import {
  getPriceInCurrency,
  getShippingInfo,
  renderPage,
  submitOrder,
} from "../mocking";
import { getExchangeRate } from "../libs/currency";
import { getShippingQuote } from "../libs/shipping";
import { trackPageView } from "../libs/analytics";
import { charge } from "../libs/payment";

// mocking whole module
vi.mock("../libs/currency.js");
vi.mock("../libs/shipping.js");
vi.mock("../libs/analytics.js");
vi.mock("../libs/analytics.js");
vi.mock("../libs/payment.js");

describe("testing mocking", () => {
  it("should return ok", () => {
    // Create a mock for the following function
    const sendText = vi.fn();

    // sendText(message) { }
    sendText.mockReturnValue("ok");

    // Call the mock function
    const result = sendText("message");

    // Assert that the mock function is called
    expect(sendText).toHaveBeenCalledWith("message");

    // Assert that the result is ok
    expect(result).toBe("ok");
  });
});

describe("getPriceInCurrency", () => {
  it("should return the currency rate", () => {
    // Create a mock for the getExchangeRate function
    vi.mocked(getExchangeRate).mockReturnValue(2);

    const result = getPriceInCurrency(100, "USD");

    expect(result).toBe(200);
  });
});

describe("getShippingInfo", () => {
  it("should return shipping unavailable when quote is null", () => {
    // Create a mock for the getShippingQuote function
    vi.mocked(getShippingQuote).mockReturnValue(null);

    const result = getShippingInfo("New York");

    expect(result).toMatch(/Shipping Unavailable/i);
  });

  it("should return shipping when quote is available", () => {
    // Create a mock for the getShippingQuote function
    vi.mocked(getShippingQuote).mockReturnValue({ cost: 10, estimatedDays: 2 });

    const result = getShippingInfo("New York");

    // output: Shipping Cost: $${quote.cost} (${quote.estimatedDays} Days)
    expect(result).toMatch(/Shipping Cost: \$10 \(2 Days\)/i);
  });
});

// interaction testing, either function is called or not.
describe("renderPage", () => {
  it("should return the content", async () => {
    const results = await renderPage();

    expect(results).match(/content/i);
  });

  it("should call the analytics", async () => {
    await renderPage();

    expect(trackPageView).toHaveBeenCalledWith("/home");
  });
});

describe("submitOrder", () => {
  it("should return success", async () => {
    vi.mocked(charge).mockReturnValue({ status: "success" });

    const results = await submitOrder(
      { totalAmount: 100 },
      { creditCardNumber: "1234" }
    );

    console.log("results", results);

    expect(results.success).toBe(true);
  });

  it("should return error", async () => {
    vi.mocked(charge).mockReturnValue({ status: "failed" });

    const results = await submitOrder(
      { totalAmount: 100 },
      { creditCardNumber: "1234" }
    );

    expect(results).toEqual({ success: false, error: "payment_error" });
  });

  it("should call charge function", async () => {
    await submitOrder({ totalAmount: 100 }, { creditCardNumber: "1234" });

    expect(charge).toHaveBeenCalledWith({ creditCardNumber: "1234" }, 100);
  });
});
