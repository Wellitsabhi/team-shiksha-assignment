import { describe, test, expect, beforeAll, afterAll, vi } from "vitest";

vi.mock("../lib/mongoose", () => {
  return {
    connectMongoose: async () => Promise.resolve(),
    disconnectMongoose: async () => Promise.resolve(),
  };
});

vi.mock("mongoose", () => {
  return {
    disconnect: async () => Promise.resolve(),
  };
});

describe("API basic", () => {
  beforeAll(async () => {
    const { connectMongoose } = await import("../lib/mongoose");
    await connectMongoose();
  });

  afterAll(async () => {
    const { disconnectMongoose } = await import("../lib/mongoose");
    await disconnectMongoose();
  });

  test("sanity - mocked DB connection resolves", async () => {
    expect(true).toBeTruthy();
  });
});
