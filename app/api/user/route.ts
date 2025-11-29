import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "../../../lib/jwt";
import { connectMongoose } from "../../../lib/mongoose";
import User from "../../../models/User";
import { z } from "zod";

async function getUserFromReq(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) return null;
  try {
    const payload = verifyToken(token);
    return payload;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const payload = await getUserFromReq(req);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectMongoose();
  const user = await User.findById(payload.id).select("-password");
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ user });
}

const UpdateSchema = z.object({
  name: z.string().max(100).optional(),
  email: z.string().email().optional()
});

export async function PATCH(req: NextRequest) {
  const payload = await getUserFromReq(req);
  if (!payload) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const parsed = UpdateSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });

  await connectMongoose();
  const user = await User.findById(payload.id);
  if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (parsed.data.email) user.email = parsed.data.email;
  if (parsed.data.name !== undefined) user.name = parsed.data.name;
  await user.save();

  return NextResponse.json({ user: { id: user._id, email: user.email, name: user.name } });
}
