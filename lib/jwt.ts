import * as jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev_secret";
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

export function signToken(payload: object) {
  return (jwt as any).sign(payload, SECRET, { expiresIn: EXPIRES_IN });
}

export function verifyToken(token: string) {
  return (jwt as any).verify(token, SECRET) as any;
}
