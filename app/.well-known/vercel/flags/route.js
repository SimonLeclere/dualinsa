import { ApiData, verifyAccess } from "@vercel/flags";
import { unstable_getProviderData as getProviderData } from "@vercel/flags/next";
import { NextResponse } from "next/server";
import * as flags from "@/lib/flags";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET(request) {
  const access = await verifyAccess(request.headers.get("Authorization"));
  if (!access) return NextResponse.json(null, { status: 401 });

  return NextResponse.json(getProviderData(flags));
}