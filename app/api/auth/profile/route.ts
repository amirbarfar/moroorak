import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";

export async function PUT(req: NextRequest) {
  const token = (await cookies()).get("token")?.value;
  
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as { userId: string };
    const { name, tag } = await req.json();

    const user = await prisma.user.update({
      where: { id: decoded.userId },
      data: { name, tag },
      select: { id: true, email: true, name: true, tag: true },
    });

    return NextResponse.json({ user });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}