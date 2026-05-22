import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/auth";
import { ReminderSchema } from "@/lib/validations/schemas";
import { z } from "zod";

const ReminderUpdateSchema = ReminderSchema.partial().extend({
  enabled: z.boolean().optional(),
});

async function getOwned(id: string, userId: string) {
  const reminder = await prisma.reminder.findUnique({ where: { id } });
  if (!reminder || reminder.userId !== userId) return null;
  return reminder;
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  if (!await getOwned(id, userId)) return NextResponse.json({ error: "یافت نشد" }, { status: 404 });

  const parsed = ReminderUpdateSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0].message }, { status: 400 });
  }

  const reminder = await prisma.reminder.update({
    where: { id },
    data: parsed.data,
    select: { id: true, title: true, note: true, time: true, repeat: true, priority: true, enabled: true },
  });

  return NextResponse.json({ reminder });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const userId = await getUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  if (!await getOwned(id, userId)) return NextResponse.json({ error: "یافت نشد" }, { status: 404 });

  await prisma.reminder.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
