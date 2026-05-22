import { ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface StatItem {
  label: string;
  value: string;
}

interface HeroCardProps {
  badge?: { icon?: ReactNode; text: string };
  metric: string | number;
  metricSubtext: string;
  progress: number;
  stats: StatItem[];
  action: { label: string; icon?: ReactNode; onClick: () => void };
  header?: ReactNode;
}

export default function HeroCard({
  badge,
  metric,
  metricSubtext,
  progress,
  stats,
  action,
  header,
}: HeroCardProps) {
  return (
    <Card className="w-full max-w-sm rounded-[24px] border-border/60 bg-background/90 shadow-2xl backdrop-blur-xl">
      <CardContent className="space-y-4 p-5 sm:space-y-5 sm:p-6">

        {header && <div>{header}</div>}

        <div className="space-y-1.5 text-center">
          {badge && (
            <Badge variant="outline" className="rounded-full px-3 py-0.5 text-xs">
              {badge.icon && <span className="ml-1">{badge.icon}</span>}
              {badge.text}
            </Badge>
          )}
          <h2 className="text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">{metric}</h2>
          <p className="text-xs text-muted-foreground">{metricSubtext}</p>
        </div>

        <Progress value={progress} className="h-1.5 rounded-full" />

        <div className="grid grid-cols-3 gap-2">
          {stats.map((s) => (
            <Card key={s.label} className="rounded-xl border-border/60 bg-muted/40 shadow-none">
              <CardContent className="space-y-0.5 p-2.5 text-center">
                <p className="text-[10px] text-muted-foreground">{s.label}</p>
                <h3 className="text-base font-black">{s.value}</h3>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button onClick={action.onClick} className="h-9 w-full rounded-xl text-xs font-bold">
          {action.icon && <span className="ml-1.5">{action.icon}</span>}
          {action.label}
        </Button>

      </CardContent>
    </Card>
  );
}
