"use client";

import { BookOpen } from "lucide-react";
import { useTranslations } from "next-intl";

export default function EmptyState() {
  const t = useTranslations("journal.empty");
  return (
    <div className="bg-card rounded-2xl border border-border p-5 mb-6">
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
          <BookOpen className="h-8 w-8 text-muted-foreground" />
        </div>
        <p className="text-muted-foreground">{t("message")}</p>
        <p className="text-sm text-muted-foreground/70 mt-1">{t("hint")}</p>
      </div>
    </div>
  );
}