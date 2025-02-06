import { getUserByEmail } from "@/sanity";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return new Response(JSON.stringify({ error: "Email and password are required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Format email and fetch user
    const user = await getUserByEmail(email.toLowerCase());
    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid credentials" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, process.env.NEXT_PRIVATE_JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    return new Response(
      JSON.stringify({
        message: "User signed in successfully!",
        user: { email: user.email, id: user._id },
        token,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Login Error:", error);
    return new Response(JSON.stringify({ message: "An error occurred" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
