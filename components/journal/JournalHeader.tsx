"use client";

import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";

export default function JournalHeader() {
  const t = useTranslations("journal.header");
  return (
    <div className="space-y-6">
      <Badge variant="outline" className="rounded-full px-3 py-0.5 text-xs">
        {t("badge")}
      </Badge>
      <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl">
        {t("title")}
        <span className="block text-primary">
          {t("titleAccent")}
        </span>
      </h1>
      <p className="max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
        {t("description")}
      </p>
    </div>
  );
}
