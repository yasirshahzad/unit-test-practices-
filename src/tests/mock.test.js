import { vi, it, expect, describe } from "vitest";
import { getPriceInCurrency } from "../mocking";
import { getExchangeRate } from "../libs/currency";

// mocking whole module
vi.mock("../libs/currency.js");

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
