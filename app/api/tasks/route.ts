import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/auth";
import { TaskSchema } from "@/lib/validations/schemas";

export async function GET(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const date = req.nextUrl.searchParams.get("date");
  if (!date) return NextResponse.json({ error: "date الزامی است" }, { status: 400 });

  const tasks = await prisma.task.findMany({
    where: { userId, date },
    orderBy: { time: "asc" },
    select: { id: true, title: true, description: true, time: true, completed: true },
  });

  return NextResponse.json({ tasks });
}

export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = TaskSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const { date, title, description, time } = parsed.data;

  const task = await prisma.task.create({
    data: { userId, date, title, description: description ?? "", time: time ?? "" },
    select: { id: true, title: true, description: true, time: true, completed: true },
  });

  return NextResponse.json({ task });
}
