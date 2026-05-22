import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sparkles } from "lucide-react";

interface ProgressCardProps {
  total: number;
  completed: number;
}

export default function ProgressCard({ total, completed }: ProgressCardProps) {
  const progress = total ? (completed / total) * 100 : 0;

  return (
    <Card className="rounded-2xl border-border/60 w-1/2 h-40">
      <CardContent className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">پیشرفت روزانه</p>
            <h3 className="text-2xl font-black">{Math.round(progress)}%</h3>
          </div>
        </div>

        <Progress value={progress} className="h-2" />

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{completed} انجام شده</span>
          <span>{total} تسک</span>
        </div>
      </CardContent>
    </Card>
  );
}
