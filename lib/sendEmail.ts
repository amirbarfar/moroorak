import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOtpEmail(to: string, otp: string) {
  await transporter.sendMail({
    from: `"Moroorak" ${process.env.SMTP_FROM || process.env.SMTP_USER}`,
    to,
    subject: "کد ورود به مرورک",
    html: `
      <div dir="rtl" style="font-family: Tahoma, Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #f9f9f9; border-radius: 12px;">
        <h2 style="color: #1a1a1a; margin-bottom: 8px;">کد ورود شما</h2>
        <p style="color: #555; margin-bottom: 24px;">برای ورود به مرورک از کد زیر استفاده کن:</p>
        <div style="background: #fff; border: 2px solid #e5e7eb; border-radius: 8px; padding: 24px; text-align: center; letter-spacing: 12px; font-size: 36px; font-weight: bold; color: #111;">
          ${otp}
        </div>
        <p style="color: #999; font-size: 13px; margin-top: 24px;">این کد ۵ دقیقه اعتبار دارد. اگر درخواست نداده‌ای این ایمیل رو نادیده بگیر.</p>
      </div>
    `,
  });
}
