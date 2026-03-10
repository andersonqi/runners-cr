import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_USER = process.env.ADMIN_USER ?? "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";
const TOKEN = Buffer.from(`${ADMIN_USER}:${ADMIN_PASSWORD}`).toString("base64");

export async function GET() {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get("admin_token")?.value;

  if (adminToken === TOKEN) {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}
