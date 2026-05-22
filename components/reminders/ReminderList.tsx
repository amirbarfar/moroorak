import { Card, CardContent } from "@/components/ui/card";
import { BellOff } from "lucide-react";
import { Reminder } from "./types";
import ReminderCard from "./ReminderCard";
import EmptyState from "./EmptyState";

interface ReminderListProps {
  reminders: Reminder[];
  onEdit: (reminder: Reminder) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export default function ReminderList({ reminders, onEdit, onDelete, onToggle }: ReminderListProps) {
  if (reminders.length === 0) {
    return (
      <EmptyState
        icon={<BellOff className="h-10 w-10 text-muted-foreground" />}
        title="هنوز یادآوری نداری"
        description="اولین یادآورت رو بساز تا هیچ چیزی فراموش نشه."
      />
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {reminders.map((reminder, index) => (
        <ReminderCard
          key={reminder.id}
          reminder={reminder}
          index={index}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}