import { describe, it, expect } from "vitest";
import { signToken, verifyToken } from "../lib/jwt";

describe("jwt util", () => {
  it("signs and verifies payload", () => {
    const payload = { id: 42, name: "alice" };
    const token = signToken(payload);
    expect(typeof token).toBe("string");
    const decoded = verifyToken(token) as any;
    expect(decoded.id).toBe(42);
    expect(decoded.name).toBe("alice");
  });
});
