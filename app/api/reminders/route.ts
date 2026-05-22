import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/auth";
import { ReminderSchema } from "@/lib/validations/schemas";

export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const reminders = await prisma.reminder.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, note: true, time: true, repeat: true, priority: true, enabled: true },
  });

  return NextResponse.json({ reminders });
}

export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = ReminderSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const { title, note, time, repeat, priority } = parsed.data;

  const reminder = await prisma.reminder.create({
    data: { userId, title, note, time, repeat, priority },
    select: { id: true, title: true, note: true, time: true, repeat: true, priority: true, enabled: true },
  });

  return NextResponse.json({ reminder });
}
