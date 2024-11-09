import { vi, it, expect, describe } from "vitest";

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
