import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { LearningItem, TAG_COLORS } from "./types";

interface LearningCardProps {
  item: LearningItem;
  index: number;
  onEdit: (item: LearningItem) => void;
  onDelete: (id: string) => void;
}

const toFarsi = (dateKey: string) =>
  new Intl.DateTimeFormat("fa-IR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(dateKey));

export default function LearningCard({ item, index, onEdit, onDelete }: LearningCardProps) {
  return (
    <Card className="group rounded-[28px] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="space-y-5 p-8">
        <div className="flex items-center justify-between">
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${TAG_COLORS[item.tag]}`}>
            {item.tag}
          </span>
          <div className="text-5xl font-black text-muted/50">
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-bold tracking-tight leading-snug">{item.title}</h3>
          {item.description && item.description !== "بدون توضیح" && (
            <p className="text-sm leading-7 text-muted-foreground line-clamp-3">{item.description}</p>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <span className="text-xs text-muted-foreground">{toFarsi(item.date)}</span>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-xl" onClick={() => onEdit(item)}>
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-xl text-rose-500 hover:bg-rose-500/10"
              onClick={() => onDelete(item.id)}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}