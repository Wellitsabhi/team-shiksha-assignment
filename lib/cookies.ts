import { NextResponse } from "next/server";

export function setTokenCookie(res: Response | any, token: string) {
  res.cookies.set({
    name: "token",
    value: token,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7 // 7 days
  });
}

export function clearTokenCookie(res: Response | any) {
  res.cookies.set({
    name: "token",
    value: "",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 0
  });
}
