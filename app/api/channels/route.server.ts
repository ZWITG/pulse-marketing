import { NextResponse } from "next/server";
import { configured } from "@/lib/publishers.server";

// Which platforms have keys set. Booleans only, never the keys.
export async function GET() {
  return NextResponse.json(configured());
}
