import nodemailer from "nodemailer";

export async function POST(req) {
  const { email } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "YOUR_EMAIL@gmail.com",
      pass: "APP_PASSWORD",
    },
  });

  await transporter.sendMail({
    from: "YOUR_EMAIL@gmail.com",
    to: "abhijitakhade8830@gmail.com",
    subject: "New Subscriber",
    text: `New subscriber: ${email}`,
  });

  return Response.json({ success: true });
}
