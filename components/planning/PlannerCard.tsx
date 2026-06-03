"use client";

import { useTranslations } from "next-intl";
import HeroCard from "@/components/ui/hero-card";
import DateNav from "@/components/ui/date-nav";

interface PlannerCardProps {
  selectedDate: string;
  total: number;
  completed: number;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onAdd: () => void;
}

export default function PlannerCard({
  selectedDate, total, completed, onPrev, onNext, onToday, onAdd,
}: PlannerCardProps) {
  const t = useTranslations("planning.card");
  const progress = total ? Math.round((completed / total) * 100) : 0;

  return (
    <HeroCard
      header={
        <div className="space-y-2">
          <DateNav selectedDate={selectedDate} onPrev={onPrev} onNext={onNext} onToday={onToday} format="full" />
          <p className="text-center text-sm text-muted-foreground">
            {total > 0 ? t("hasPlans", { count: total }) : t("noPlans")}
          </p>
        </div>
      }
      metric={`${progress}٪`}
      metricSubtext={t("dailyProgress")}
      progress={progress}
      stats={[
        { label: t("totalPlans"), value: String(total) },
        { label: t("done"), value: String(completed) },
        { label: t("remaining"), value: String(total - completed) },
      ]}
      action={{ label: t("addNew"), onClick: onAdd }}
    />
  );
}
