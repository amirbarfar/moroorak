"use client";

import { Plus } from "lucide-react";
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
  const progress = total ? Math.round((completed / total) * 100) : 0;

  return (
    <HeroCard
      header={
        <div className="space-y-2">
          <DateNav selectedDate={selectedDate} onPrev={onPrev} onNext={onNext} onToday={onToday} format="full" />
          <p className="text-center text-sm text-muted-foreground">
            {total > 0 ? `${total} برنامه برای این روز` : "هنوز برنامه‌ای نداری"}
          </p>
        </div>
      }
      metric={`${progress}٪`}
      metricSubtext="پیشرفت روزانه"
      progress={progress}
      stats={[
        { label: "کل برنامه", value: String(total) },
        { label: "انجام شده", value: String(completed) },
        { label: "مانده", value: String(total - completed) },
      ]}
      action={{ label: "برنامه جدید", icon: <Plus className="h-5 w-5" />, onClick: onAdd }}
    />
  );
}
