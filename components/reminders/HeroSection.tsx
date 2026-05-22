import { Badge } from "@/components/ui/badge";
import HeroCard from "@/components/ui/hero-card";
import { Bell, Plus } from "lucide-react";

interface HeroSectionProps {
  totalReminders: number;
  activeCount: number;
  learningsCount: number;
  onAdd: () => void;
}

export default function HeroSection({ totalReminders, activeCount, learningsCount, onAdd }: HeroSectionProps) {
  return (
    <section className="relative bg-linear-to-b from-muted/50 to-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.12),transparent_30%),radial-gradient(circle_at_bottom_left,hsl(var(--ring)/0.08),transparent_30%)]" />
      <div className="container relative mx-auto px-6 py-16 md:py-24">
        <div className="grid items-center gap-8 lg:gap-14 lg:grid-cols-2">

          <div className="space-y-5">
            <Badge variant="outline" className="rounded-full px-3 py-0.5 text-xs">
              یادآورها
            </Badge>
            <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl">
              هیچ چیزی
              <span className="block text-primary">فراموش نشه</span>
            </h1>
            <p className="max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
              یادآورهای شخصی بساز و یادگیری‌هات رو با الگوریتم هوشمند مرور کن تا هیچ‌وقت فراموش نشن.
            </p>
          </div>

          <div className="relative flex justify-center">
            <HeroCard
              badge={{ icon: <Bell className="h-3 w-3" />, text: activeCount > 0 ? "یادآور فعال" : "بدون یادآور فعال" }}
              metric={activeCount}
              metricSubtext={`از ${totalReminders} یادآور، ${activeCount} فعاله`}
              progress={totalReminders ? (activeCount / totalReminders) * 100 : 0}
              stats={[
                { label: "کل", value: String(totalReminders) },
                { label: "فعال", value: String(activeCount) },
                { label: "یادگیری", value: String(learningsCount) },
              ]}
              action={{ label: "یادآور جدید", icon: <Plus className="h-5 w-5" />, onClick: onAdd }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}