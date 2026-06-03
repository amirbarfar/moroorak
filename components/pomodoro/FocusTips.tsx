"use client";

import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FocusTip } from "./types";

export default function FocusTips() {
  const t = useTranslations("pomodoro.tips");

  const focusTips: FocusTip[] = [
    { title: t("focusTitle"), description: t("focusDesc") },
    { title: t("shortBreakTitle"), description: t("shortBreakDesc") },
    { title: t("longBreakTitle"), description: t("longBreakDesc") },
  ];

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="mb-10 flex flex-col gap-3 text-center">
        <Badge variant="secondary" className="mx-auto rounded-full px-3 py-1 text-xs">
          {t("badge")}
        </Badge>
        <h2 className="text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">
          {t("title")}
        </h2>
        <p className="mx-auto max-w-3xl text-base leading-8 text-muted-foreground">
          {t("description")}
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {focusTips.map((tip, index) => (
          <Card
            key={tip.title}
            className="group rounded-[28px] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <CardContent className="space-y-4 p-6">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="rounded-full px-3 py-0.5 text-xs">
                  {t("stepBadge", { step: index + 1 })}
                </Badge>
                <div className="text-3xl font-black text-muted">0{index + 1}</div>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-bold tracking-tight">{tip.title}</h3>
                <p className="text-sm leading-7 text-muted-foreground">{tip.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
