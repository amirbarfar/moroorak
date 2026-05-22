import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Clock } from "lucide-react";
import { Reminder, PRIORITY_STYLES } from "./types";

interface ReminderCardProps {
  reminder: Reminder;
  index: number;
  onEdit: (reminder: Reminder) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function ReminderCard({ reminder, index, onEdit, onDelete, onToggle }: ReminderCardProps) {
  return (
    <Card className={`group rounded-[28px] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${!reminder.enabled ? "opacity-50" : ""}`}>
      <CardContent className="space-y-5 p-8">
        <div className="flex items-center justify-between">
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${PRIORITY_STYLES[reminder.priority].badge}`}>
            {PRIORITY_STYLES[reminder.priority].label}
          </span>
          <div className="text-5xl font-black text-muted/50">
            {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-bold tracking-tight">{reminder.title}</h3>
          {reminder.note && (
            <p className="text-sm leading-7 text-muted-foreground line-clamp-2">{reminder.note}</p>
          )}
        </div>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{reminder.time}</span>
          </div>
          <Badge variant="secondary" className="rounded-full text-xs">
            {reminder.repeat}
          </Badge>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <button
            onClick={() => onToggle(reminder.id)}
            className={`text-xs font-medium transition-colors ${reminder.enabled ? "text-emerald-600" : "text-muted-foreground"}`}
          >
            {reminder.enabled ? "فعال" : "غیرفعال"}
          </button>
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-xl" onClick={() => onEdit(reminder)}>
              <Pencil className="h-3.5 w-3.5" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 rounded-xl text-rose-500 hover:bg-rose-500/10" onClick={() => onDelete(reminder.id)}>
              <Trash2 className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}