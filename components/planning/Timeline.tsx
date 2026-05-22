import { ScrollArea } from "@/components/ui/scroll-area";
import TimelineItem from "./TimelineItem";
import EmptyState from "./EmptyState";
import { Task } from "./types";

interface TimelineProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function Timeline({ tasks, onToggle, onEdit, onDelete }: TimelineProps) {
  if (tasks.length === 0) {
    return <EmptyState />;
  }

  return (
    <ScrollArea className="h-[calc(100vh-20rem)] pr-2">
      <div className="relative">
        <div className="absolute right-3.75 top-0 h-full w-px bg-border/60" />
        <div className="space-y-4">
          {tasks.map((task) => (
            <TimelineItem key={task.id} task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}