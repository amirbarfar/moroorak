import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/auth";
import { JournalSchema } from "@/lib/validations/schemas";

export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const entries = await prisma.journalEntry.findMany({
    where: { userId },
    orderBy: { date: "desc" },
    select: { id: true, date: true, title: true, content: true },
  });

  return NextResponse.json({ entries });
}

export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = JournalSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const { date, title, content } = parsed.data;

  const entry = await prisma.journalEntry.upsert({
    where: { userId_date: { userId, date } },
    update: { title, content },
    create: { userId, date, title, content },
    select: { id: true, date: true, title: true, content: true },
  });

  return NextResponse.json({ entry });
}
