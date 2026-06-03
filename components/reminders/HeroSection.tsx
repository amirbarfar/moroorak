"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import HeroCard from "@/components/ui/hero-card";
import { Bell } from "lucide-react";

interface HeroSectionProps {
  totalReminders: number;
  activeCount: number;
  learningsCount: number;
  onAdd: () => void;
}

export default function HeroSection({ totalReminders, activeCount, learningsCount, onAdd }: HeroSectionProps) {
  const t = useTranslations("reminders.hero");

  return (
    <section className="relative bg-linear-to-b from-muted/50 to-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.12),transparent_30%),radial-gradient(circle_at_bottom_left,hsl(var(--ring)/0.08),transparent_30%)]" />
      <div className="container relative mx-auto px-6 py-16 md:py-24">
        <div className="grid items-center gap-8 lg:gap-14 lg:grid-cols-2">

          <div className="space-y-5">
            <Badge variant="outline" className="rounded-full px-3 py-0.5 text-xs">
              {t("badge")}
            </Badge>
            <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl">
              {t("title")}
              <span className="block text-primary">{t("titleAccent")}</span>
            </h1>
            <p className="max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
              {t("description")}
            </p>
          </div>

          <div className="relative flex justify-center">
            <HeroCard
              badge={{ icon: <Bell className="h-3 w-3" />, text: activeCount > 0 ? t("activeLabel") : t("noActiveLabel") }}
              metric={activeCount}
              metricSubtext={t("statsText", { total: totalReminders, active: activeCount })}
              progress={totalReminders ? (activeCount / totalReminders) * 100 : 0}
              stats={[
                { label: t("totalLabel"), value: String(totalReminders) },
                { label: t("activeStat"), value: String(activeCount) },
                { label: t("learningStat"), value: String(learningsCount) },
              ]}
              action={{ label: t("addNew"), onClick: onAdd }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
