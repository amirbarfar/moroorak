"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JournalEntry } from "./types";
import { useTranslations } from "next-intl";

interface PreviousEntriesProps {
  entries: JournalEntry[];
  currentDate: string;
  onSelectDate: (date: string) => void;
}

export default function PreviousEntries({ entries, currentDate, onSelectDate }: PreviousEntriesProps) {
  const t = useTranslations("journal.archive");
  const filteredEntries = entries
    .filter((e) => e.date !== currentDate)
    .slice(0, 6);

  if (filteredEntries.length === 0) return null;

  return (
    <div className="container mx-auto px-6 py-24">
      <div className="mb-14 flex flex-col gap-4 text-center">
        <Badge variant="secondary" className="mx-auto rounded-full px-4 py-2">
          {t("badge")}
        </Badge>
        <h2 className="text-4xl font-black tracking-tight md:text-6xl">
          {t("title")}
        </h2>
        <p className="mx-auto max-w-2xl text-lg leading-9 text-muted-foreground">
          {t("description")}
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEntries.map((entry, index) => (
          <Card
            key={entry.id}
            onClick={() => onSelectDate(entry.date)}
            className="group cursor-pointer rounded-[28px] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <CardContent className="space-y-6 p-8">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="rounded-full px-3 py-1">
                  {new Date(entry.date).toLocaleDateString("fa-IR")}
                </Badge>
                <div className="text-5xl font-black text-muted">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold tracking-tight leading-snug">
                  {entry.title.length > 35 ? entry.title.slice(0, 35) + "..." : entry.title}
                </h3>
                <p className="leading-8 text-muted-foreground text-sm">
                  {entry.content.length > 100 ? entry.content.slice(0, 100) + "..." : entry.content}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
