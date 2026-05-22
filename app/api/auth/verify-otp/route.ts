// app/api/auth/verify-otp/route.ts
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { sign } from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();

  if (!email || !otp) {
    return NextResponse.json({ error: "ایمیل و کد تایید الزامی است" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      sessions: {
        where: {
          isVerified: false,
          otpExpiresAt: { gt: new Date() },
        },
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  if (!user || user.sessions.length === 0) {
    return NextResponse.json({ error: "کد تایید نامعتبر یا منقضی شده" }, { status: 400 });
  }

  const session = user.sessions[0];

  if (session.otp !== otp) {
    return NextResponse.json({ error: "کد تایید اشتباه است" }, { status: 400 });
  }

  await prisma.session.update({
    where: { id: session.id },
    data: { isVerified: true },
  });

  await prisma.session.deleteMany({
    where: { userId: user.id, isVerified: false },
  });

  const token = sign(
    { userId: user.id, email: user.email, name: user.name, tag: user.tag },
    process.env.JWT_SECRET!,
    { expiresIn: "7d" }
  );

  (await cookies()).set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    path: "/",
  });

  return NextResponse.json({ message: "ورود موفق", user: { id: user.id, email: user.email } });
}