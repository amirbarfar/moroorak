import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/auth";

export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const stats = await prisma.pomodoroStat.findMany({
    where: { userId },
    orderBy: { date: "desc" },
    select: { date: true, count: true },
  });

  return NextResponse.json({ stats });
}

export async function POST() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const today = new Date().toISOString().split("T")[0];

  const stat = await prisma.pomodoroStat.upsert({
    where: { userId_date: { userId, date: today } },
    update: { count: { increment: 1 } },
    create: { userId, date: today, count: 1 },
    select: { date: true, count: true },
  });

  return NextResponse.json({ stat });
}
