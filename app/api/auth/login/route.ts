import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { username, password } = body;

  // Simple Manager Check – frontend appearance related
  if (username === "manager" && password === "access2025") {
    const response = NextResponse.json({ success: true });

    // Keep same cookie / flow
    response.cookies.set("auth_token", "logged-in", {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  }

  return NextResponse.json(
    { error: "Invalid credentials" },
    { status: 401 }
  );
}
