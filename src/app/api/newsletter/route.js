import { client } from "@/sanity/client";
import sendMail from "@/utils/sendMail";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();
    const formattedEmail = email.toLowerCase();

    if (!formattedEmail) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    // Check if email is already subscribed
    const existingSubscriber = await client.fetch(
      `*[_type == "newsletter" && email == $email][0]`,
      { email: formattedEmail }
    );

    if (existingSubscriber) {
      return NextResponse.json(
        { message: "This email is already subscribed" },
        { status: 409 }
      );
    }

    // Save email to Sanity
    const newSubscriber = {
      _type: "newsletter",
      email: formattedEmail,
      subscribedAt: new Date().toISOString(),
    };

    await client.create(newSubscriber);

    // Confirmation Email Template
    const emailContent = `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://yourblog.com/logo.png" alt="Your Blog Logo" style="max-width: 150px;" />
        </div>

        <div style="padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
          <h2 style="color: #333; text-align: center;">You're Subscribed! 🎉</h2>
          <hr style="border: 1px solid #ddd; margin: 20px 0;" />
          <p style="font-size: 16px; text-align: center;">
            Hi there! 👋 <br />
            Thank you for subscribing to our blog newsletter! 🎊
          </p>

          <p style="font-size: 16px; text-align: center;">
            You’ll now receive the latest blog posts, exclusive content, and updates straight to your inbox! 📬✨
          </p>

          <div style="text-align: center; margin-top: 20px;">
            <a href="https://yourblog.com" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: #fff; text-decoration: none; font-size: 16px; border-radius: 5px;">Visit Our Blog</a>
          </div>

          <p style="font-size: 14px; color: #999; margin-top: 20px; text-align: center;">
            If you ever want to unsubscribe, you can do so at any time.
          </p>
        </div>

        <div style="text-align: center; margin-top: 20px; color: #999;">
          <p style="font-size: 14px;">&copy; ${new Date().getFullYear()} Meet Hammed. All rights reserved.</p>
          <p style="font-size: 14px;">Follow us on: 
            <a href="https://twitter.com/yourblog" style="color: #007bff;">Twitter</a> | 
            <a href="https://facebook.com/yourblog" style="color: #007bff;">Facebook</a>
          </p>
        </div>
      </div>
    `;

    // Send confirmation email
    await sendMail(
      formattedEmail,
      "Welcome to Our Blog Newsletter 🎊",
      emailContent
    );

    return NextResponse.json(
      { message: "Successfully subscribed to the newsletter!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
