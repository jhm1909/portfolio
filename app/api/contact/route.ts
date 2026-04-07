import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // TODO: Replace with your email service (Resend, SendGrid, etc.)
    // For now, log to console — you can integrate Resend like this:
    //
    // import { Resend } from 'resend';
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'portfolio@capy.dev',
    //   to: 'your@email.com',
    //   subject: `Portfolio Contact: ${name}`,
    //   text: `From: ${name} (${email})\n\n${message}`,
    // });

    console.log("📬 New contact form submission:", { name, email, message });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
