import { ChevronRight, ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DateNavProps {
  selectedDate: string;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  format?: "compact" | "full";
}

export default function DateNav({ selectedDate, onPrev, onNext, onToday, format = "compact" }: DateNavProps) {
  const isToday = selectedDate === new Date().toISOString().split("T")[0];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    if (format === "full") {
      return new Intl.DateTimeFormat("fa-IR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      }).format(date);
    }
    return new Intl.DateTimeFormat("fa-IR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(date);
  };

  const formatYear = (dateStr: string) => {
    return new Intl.DateTimeFormat("fa-IR", { year: "numeric" }).format(new Date(dateStr));
  };

  if (format === "full") {
    return (
      <div className="flex items-center justify-center gap-3">
        <Button variant="ghost" size="icon" onClick={onPrev} className="h-10 w-10 rounded-2xl">
          <ChevronRight className="h-5 w-5" />
        </Button>
        <div className="text-center space-y-1">
          <Badge
            variant={isToday ? "default" : "secondary"}
            className="cursor-pointer rounded-full px-3 py-0.5 text-xs"
            onClick={onToday}
          >
            {isToday ? "امروز" : "برو به امروز"}
          </Badge>
          <p className="text-2xl font-black tracking-tight">{formatDate(selectedDate)}</p>
          <p className="text-xs text-muted-foreground">{formatYear(selectedDate)}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onNext} className="h-10 w-10 rounded-2xl">
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Button variant="ghost" size="icon" onClick={onPrev} className="h-8 w-8 rounded-xl hover:bg-muted shrink-0">
        <ChevronRight className="h-4 w-4" />
      </Button>
      <div className="flex items-center gap-2 flex-wrap">
        <Badge
          variant={isToday ? "default" : "secondary"}
          className="cursor-pointer rounded-full px-3 py-0.5 text-xs"
          onClick={onToday}
        >
          {isToday ? "امروز" : "برو به امروز"}
        </Badge>
        <span className="text-sm font-semibold text-foreground">{formatDate(selectedDate)}</span>
        <span className="text-xs text-muted-foreground">{formatYear(selectedDate)}</span>
      </div>
      <Button variant="ghost" size="icon" onClick={onNext} className="h-8 w-8 rounded-xl hover:bg-muted shrink-0">
        <ChevronLeft className="h-4 w-4" />
      </Button>
    </div>
  );
}
