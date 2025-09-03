import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// login route
export async function POST(req: Request) {
  const { username, password } = await req.json();
  
  if (
    username === process.env.ADMIN_USERNAME && //auth using env
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign(
      { username }, 
      process.env.JWT_SECRET as string, 
      { expiresIn: "1h" } 
    );

    const res = NextResponse.json({ success: true });
    res.cookies.set("admin_auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60,
    });
    return res;
  }

  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  );
}

// logout route
export async function GET(req: Request) {
  const origin = new URL(req.url).origin;
  const response = NextResponse.redirect(`${origin}/admin`);
  response.cookies.set({      //clearing cookies
    name: "admin_auth",
    value: "",
    path: "/",
    maxAge: 0,
  });

  return response;
}
