import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendOtpEmail } from "@/lib/sendEmail";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "ایمیل معتبر نیست" }, { status: 400 });
  }

  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    user = await prisma.user.create({ data: { email } });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  await prisma.session.deleteMany({
    where: { userId: user.id, isVerified: false },
  });

  await prisma.session.create({
    data: {
      userId: user.id,
      otp,
      otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000),
    },
  });

  await sendOtpEmail(email, otp);

  return NextResponse.json({ message: "کد تایید ارسال شد", email });
}