import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import type { NextFetchEvent, NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  if (req.cookies.get("poll-token")) return;

  const random = nanoid();

  // Redirect (to apply cookie)
  const res = NextResponse.next();

  res.cookies.set("poll-token", random, { sameSite: "strict" });

  return res;
}
