import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Pencil, Trash2, MoreHorizontal } from "lucide-react";
import { Task } from "./types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TimelineItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export default function TimelineItem({ task, onToggle, onEdit, onDelete }: TimelineItemProps) {
  return (
    <div className="relative flex flex-row-reverse gap-3 group">
      <div className="relative z-10 pt-3">
        <button
          onClick={() => onToggle(task.id)}
          className={`flex h-9 w-9 items-center justify-center rounded-full border-2 transition-all duration-200 ${
            task.completed 
              ? "border-emerald-500 bg-emerald-500 shadow-sm shadow-emerald-500/20" 
              : "border-border bg-background hover:border-primary/50 hover:bg-primary/5"
          }`}
        >
          {task.completed ? (
            <CheckCircle2 className="h-4.5 w-4.5 text-white" strokeWidth={2.5} />
          ) : (
            <Circle className="h-4.5 w-4.5 text-muted-foreground" strokeWidth={2} />
          )}
        </button>
      </div>

      <Card
        className={`flex-1 rounded-xl border transition-all duration-200 ${
          task.completed 
            ? "border-border/40 bg-muted/20" 
            : "border-border/60 bg-background hover:border-primary/20 hover:shadow-md"
        }`}
      >
        <CardContent className="p-3.5">
          <div className="flex items-center justify-between gap-3">
            
            <div className="hidden sm:flex gap-1 shrink-0">
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10"
                onClick={() => onEdit(task)}
              >
                <Pencil className="h-4 w-4" strokeWidth={1.8} />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 w-8 rounded-lg text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10"
                onClick={() => onDelete(task.id)}
              >
                <Trash2 className="h-4 w-4" strokeWidth={1.8} />
              </Button>
            </div>

            <div className="sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 rounded-lg">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-32">
                  <DropdownMenuItem onClick={() => onEdit(task)} className="gap-2">
                    <Pencil className="h-3.5 w-3.5" />
                    ویرایش
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(task.id)} className="gap-2 text-rose-500">
                    <Trash2 className="h-3.5 w-3.5" />
                    حذف
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex-1 space-y-1.5 text-right min-w-0">
              <div className="flex items-center justify-end gap-2 flex-wrap">
                <Badge 
                  variant="secondary" 
                  className="rounded-full text-[11px] px-2 py-0.5 font-normal bg-muted/80"
                >
                  {task.time}
                </Badge>
                {task.completed && (
                  <Badge className="rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] px-2 py-0.5 font-medium border-0">
                    انجام شد
                  </Badge>
                )}
              </div>
              
              <h3
                className={`text-[15px] font-semibold tracking-tight leading-snug ${
                  task.completed ? "line-through text-muted-foreground/60" : "text-foreground"
                }`}
              >
                {task.title}
              </h3>
              
              {task.description && (
                <p className="text-[13px] text-muted-foreground/80 leading-relaxed line-clamp-2">
                  {task.description}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}