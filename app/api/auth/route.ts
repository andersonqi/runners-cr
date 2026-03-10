import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_USER = process.env.ADMIN_USER ?? "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";
const TOKEN = Buffer.from(`${ADMIN_USER}:${ADMIN_PASSWORD}`).toString("base64");

export async function POST(request: NextRequest) {
  try {
    const { user, password } = await request.json();

    if (user === ADMIN_USER && password === ADMIN_PASSWORD) {
      const cookieStore = await cookies();
      cookieStore.set("admin_token", TOKEN, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 días
      });
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ error: "Credenciales incorrectas" }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_token");
  return NextResponse.json({ ok: true });
}
