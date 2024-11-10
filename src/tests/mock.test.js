import { vi, it, expect, describe } from "vitest";
import { getPriceInCurrency, getShippingInfo } from "../mocking";
import { getExchangeRate } from "../libs/currency";
import { getShippingQuote } from "../libs/shipping";

// mocking whole module
vi.mock("../libs/currency.js");
vi.mock("../libs/shipping.js");

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
