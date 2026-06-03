"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import HeroSection from "@/components/reminders/HeroSection";
import ReminderList from "@/components/reminders/ReminderList";
import LearningList from "@/components/reminders/LearningList";
import ReminderDialog, { ReminderForm } from "@/components/reminders/ReminderDialog";
import { Reminder, LearningItem } from "@/components/reminders/types";
import { api } from "@/lib/api";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { ReminderSchema, ReminderFormData } from "@/lib/validations/schemas";

const DEFAULT_FORM: ReminderForm = { title: "", note: "", time: "09:00", repeat: "روزانه", priority: "medium" };

export default function RemindersPage() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [learnings, setLearnings] = useState<LearningItem[]>([]);
  const [open, setOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  const [form, setForm] = useState<ReminderForm>(DEFAULT_FORM);

  const setField = <K extends keyof ReminderForm>(key: K, value: ReminderForm[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const fetchReminders = useCallback(async () => {
    try {
      const data = await api("/api/reminders", { method: "GET" });
      setReminders(data.reminders);
    } catch {
      // ignore
    }
  }, []);

  const fetchLearnings = useCallback(async () => {
    try {
      const data = await api("/api/learnings", { method: "GET" });
      setLearnings(data.items);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    fetchReminders();
    fetchLearnings();
  }, [fetchReminders, fetchLearnings]);

  const activeCount = useMemo(() => reminders.filter((r) => r.enabled).length, [reminders]);

  const resetForm = () => { setForm(DEFAULT_FORM); setEditingReminder(null); };

  const handleAdd = () => { resetForm(); setOpen(true); };

  const handleEdit = (r: Reminder) => {
    setEditingReminder(r);
    setForm({ title: r.title, note: r.note, time: r.time, repeat: r.repeat, priority: r.priority });
    setOpen(true);
  };

  const { submit: submitReminder, isLoading: savingReminder } = useFormSubmit<ReminderFormData>({
    schema: ReminderSchema,
    endpoint: editingReminder ? `/api/reminders/${editingReminder.id}` : "/api/reminders",
    method: editingReminder ? "PATCH" : "POST",
    onSuccess: (data) => {
      if (editingReminder) {
        setReminders((prev) => prev.map((r) => r.id === editingReminder.id ? data.reminder : r));
      } else {
        setReminders((prev) => [data.reminder, ...prev]);
      }
      resetForm();
      setOpen(false);
    },
  });

  const handleSave = () => submitReminder(form as unknown as ReminderFormData);

  const handleDelete = async (id: string) => {
    if (!confirm("این یادآور حذف شود؟")) return;
    try {
      await api(`/api/reminders/${id}`, { method: "DELETE" });
      setReminders((prev) => prev.filter((r) => r.id !== id));
    } catch {
      // ignore
    }
  };

  const toggleEnabled = async (id: string) => {
    const reminder = reminders.find((r) => r.id === id);
    if (!reminder) return;
    try {
      const data = await api(`/api/reminders/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ enabled: !reminder.enabled }),
      });
      setReminders((prev) => prev.map((r) => r.id === id ? data.reminder : r));
    } catch {
      // ignore
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <HeroSection
        totalReminders={reminders.length}
        activeCount={activeCount}
        learningsCount={learnings.length}
        onAdd={handleAdd}
      />

      <div className="container mx-auto px-6 py-16">
        <div className="mb-10 flex flex-col gap-3 text-center">
          <Badge variant="secondary" className="mx-auto rounded-full px-3 py-1 text-xs">یادآورهای شخصی</Badge>
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">یادآورهام</h2>
          <p className="mx-auto max-w-2xl text-base leading-8 text-muted-foreground">
            هر چیزی که می‌خوای بهت یادآوری بشه رو اینجا بنویس.
          </p>
        </div>
        <ReminderList reminders={reminders} onEdit={handleEdit} onDelete={handleDelete} onToggle={toggleEnabled} />
      </div>

      <div className="container mx-auto px-6 pb-16">
        <div className="mb-10 flex flex-col gap-3 text-center">
          <Badge variant="secondary" className="mx-auto rounded-full px-3 py-1 text-xs">مرور یادگیری‌ها</Badge>
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">مرور یادگیری‌ها</h2>
          <p className="mx-auto max-w-2xl text-base leading-8 text-muted-foreground">
            الگوریتم به‌زودی تشخیص می‌ده کِی باید هر مورد رو مرور کنی. فعلاً همه یادگیری‌هات اینجان.
          </p>
        </div>
        <LearningList learnings={learnings} />
      </div>

      <ReminderDialog
        open={open}
        onOpenChange={(v) => { if (!v) resetForm(); setOpen(v); }}
        editingReminder={!!editingReminder}
        form={form}
        onChange={setField}
        onSave={handleSave}
        isLoading={savingReminder}
      />
    </main>
  );
}