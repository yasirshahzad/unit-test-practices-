import { vi, it, expect, describe } from "vitest";

describe("testing mocking", () => {
  it("should return hi", async () => {
    const greetings = vi.fn();

    greetings.mockResolvedValue("hi");
    const results = await greetings();

    expect(results).toBe("hi");
  });
});
