import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/auth";
import { LearningSchema } from "@/lib/validations/schemas";
import { todayTehran } from "@/lib/utils";

export async function GET() {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const items = await prisma.learningItem.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    select: { id: true, title: true, description: true, date: true, tag: true },
  });

  return NextResponse.json({ items });
}

export async function POST(req: NextRequest) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = LearningSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const { title, description, tag } = parsed.data;
  const date = todayTehran();

  const item = await prisma.learningItem.create({
    data: { userId, title, description: description ?? "", date, tag },
    select: { id: true, title: true, description: true, date: true, tag: true },
  });

  return NextResponse.json({ item });
}
