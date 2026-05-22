import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/auth";
import { TaskSchema } from "@/lib/validations/schemas";
import { z } from "zod";

const TaskUpdateSchema = TaskSchema.partial().extend({
  completed: z.boolean().optional(),
});

async function getOwned(id: string, userId: string) {
  const task = await prisma.task.findUnique({ where: { id } });
  if (!task || task.userId !== userId) return null;
  return task;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  if (!await getOwned(id, userId)) return NextResponse.json({ error: "یافت نشد" }, { status: 404 });

  const parsed = TaskUpdateSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const task = await prisma.task.update({
    where: { id },
    data: parsed.data,
    select: { id: true, title: true, description: true, time: true, completed: true },
  });

  return NextResponse.json({ task });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  if (!await getOwned(id, userId)) return NextResponse.json({ error: "یافت نشد" }, { status: 404 });

  await prisma.task.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
