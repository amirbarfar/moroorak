import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface DateSwitcherProps {
  selectedDate: string;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  taskCount: number;
}

export default function DateSwitcher({
  selectedDate,
  onPrev,
  onNext,
  onToday,
  taskCount,
}: DateSwitcherProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("fa-IR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  return (
    <Card className="mb-8 rounded-2xl border-border/60 h-40 w-1/2">
      <CardContent className="flex items-center justify-between p-4">
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl" onClick={onPrev}>
          <ChevronRight className="h-4 w-4" />
        </Button>

        <div className="text-center">
          <Badge
            variant="secondary"
            className="mb-2 rounded-full cursor-pointer text-xs"
            onClick={onToday}
          >
            امروز
          </Badge>
          <h2 className="text-lg font-black">{formatDate(selectedDate)}</h2>
          <p className="mt-1 text-xs text-muted-foreground">{taskCount} برنامه برای این روز</p>
        </div>

        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl" onClick={onNext}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
