import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/auth";
import { LearningSchema } from "@/lib/validations/schemas";

async function getOwned(id: string, userId: string) {
  const item = await prisma.learningItem.findUnique({ where: { id } });
  if (!item || item.userId !== userId) return null;
  return item;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  if (!await getOwned(id, userId)) return NextResponse.json({ error: "یافت نشد" }, { status: 404 });

  const parsed = LearningSchema.partial().safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const item = await prisma.learningItem.update({
    where: { id },
    data: parsed.data,
    select: { id: true, title: true, description: true, date: true, tag: true },
  });

  return NextResponse.json({ item });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  if (!await getOwned(id, userId)) return NextResponse.json({ error: "یافت نشد" }, { status: 404 });

  await prisma.learningItem.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
