import { describe, it, expect } from "vitest";
import { POST } from "../../app/api/auth/register/route";

describe("POST /api/auth/register", () => {
  it("returns 400 on empty payload", async () => {
    const req = new Request("http://localhost", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email: "" })
    });

    const res = await POST(req as any);
    // Next Response may have .status
    expect((res as any).status || (res as Response).status).toBe(400);
  });
});
