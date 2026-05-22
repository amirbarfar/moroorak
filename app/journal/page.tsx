"use client";

import { useState, useEffect, useCallback } from "react";
import JournalHeader from "@/components/journal/JournalHeader";
import DateSelector from "@/components/journal/DateSelector";
import JournalEditor from "@/components/journal/JournalEditor";
import PreviousEntries from "@/components/journal/PreviousEntries";
import { JournalEntry } from "@/components/journal/types";
import { useTranslations } from "next-intl";
import { api } from "@/lib/api";
import { useFormSubmit } from "@/hooks/useFormSubmit";
import { JournalSchema, JournalFormData } from "@/lib/validations/schemas";

export default function JournalPage() {
  const t = useTranslations("journal");
  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });

  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  const { submit: submitJournal, isLoading: saving } = useFormSubmit<JournalFormData>({
    schema: JournalSchema,
    endpoint: "/api/journal",
    method: "POST",
    onSuccess: (data) => {
      setEntries((prev) => {
        const exists = prev.find((e) => e.date === selectedDate);
        if (exists) return prev.map((e) => (e.date === selectedDate ? data.entry : e));
        return [data.entry, ...prev];
      });
    },
  });

  const fetchEntries = useCallback(async () => {
    try {
      const data = await api("/api/journal", { method: "GET" });
      setEntries(data.entries);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
  }, [fetchEntries]);

  const todayEntry = entries.find((e) => e.date === selectedDate);

  useEffect(() => {
    if (todayEntry) {
      setTitle(todayEntry.title);
      setContent(todayEntry.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [todayEntry, selectedDate]);

  const changeDay = (direction: "prev" | "next") => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() + (direction === "next" ? 1 : -1));
    setSelectedDate(date.toISOString().split("T")[0]);
  };

  const goToday = () => {
    setSelectedDate(new Date().toISOString().split("T")[0]);
  };

  const saveEntry = () => {
    if (!title.trim() && !content.trim()) return;
    submitJournal({ date: selectedDate, title, content });
  };

  const deleteEntry = async () => {
    if (!todayEntry || !confirm("این نوشته حذف شود؟")) return;
    try {
      await api(`/api/journal/${todayEntry.id}`, { method: "DELETE" });
      setEntries((prev) => prev.filter((e) => e.id !== todayEntry.id));
    } catch {
      // ignore
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <section className="relative bg-linear-to-b from-muted/50 to-background">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.12),transparent_30%),radial-gradient(circle_at_bottom_left,hsl(var(--ring)/0.08),transparent_30%)]" />
        <div className="container relative mx-auto px-6 py-16 md:py-24">
          <div className="grid items-start gap-8 lg:gap-14 lg:grid-cols-2">
            <div className="space-y-7 h-full flex flex-col justify-center">
              <JournalHeader />
              <DateSelector
                selectedDate={selectedDate}
                onPrev={() => changeDay("prev")}
                onNext={() => changeDay("next")}
                onToday={goToday}
              />
            </div>
            <div className="relative flex justify-center">
              <JournalEditor
                title={title}
                content={content}
                onTitleChange={setTitle}
                onContentChange={setContent}
                onSave={saveEntry}
                onDelete={deleteEntry}
                hasEntry={!!todayEntry}
                saving={saving}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </section>

      <PreviousEntries
        entries={entries}
        currentDate={selectedDate}
        onSelectDate={setSelectedDate}
      />
    </main>
  );
}