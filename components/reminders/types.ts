export type RepeatType = "روزانه" | "یکبار";
export type Priority = "high" | "medium" | "low";

export type Reminder = {
  id: string;
  title: string;
  note: string;
  time: string;
  repeat: RepeatType;
  priority: Priority;
  enabled: boolean;
};

export type LearningItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  tag: string;
};

export const PRIORITY_STYLES: Record<Priority, { badge: string; label: string }> = {
  high: { badge: "bg-rose-500/10 text-rose-600 dark:text-rose-400", label: "بالا" },
  medium: { badge: "bg-amber-500/10 text-amber-600 dark:text-amber-400", label: "متوسط" },
  low: { badge: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400", label: "پایین" },
};