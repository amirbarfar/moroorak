import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LearningItem } from "./types";

interface LearningCardProps {
  item: LearningItem;
  index: number;
}

const toFarsi = (dateStr: string) =>
  new Intl.DateTimeFormat("fa-IR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(dateStr));

export default function LearningCard({ item, index }: LearningCardProps) {
  return (
    <Card className="rounded-[28px] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="space-y-5 p-8">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-medium">
            {item.tag}
          </span>
          <div className="text-5xl font-black text-muted/50">
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
          {item.description && (
            <p className="text-sm leading-7 text-muted-foreground line-clamp-3">{item.description}</p>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-xs text-muted-foreground">{toFarsi(item.date)}</span>
          <Badge variant="outline" className="rounded-full text-xs">
            در انتظار مرور
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}