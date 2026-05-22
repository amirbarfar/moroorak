export type Tag = "برنامه‌نویسی" | "طراحی" | "مطالعه" | "سلامتی" | "ایده" | "عمومی";

export type LearningItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  tag: Tag;
};

export const ALL_TAGS: Tag[] = ["برنامه‌نویسی", "طراحی", "مطالعه", "سلامتی", "ایده", "عمومی"];

export const TAG_COLORS: Record<Tag, string> = {
  "برنامه‌نویسی": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "طراحی": "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  "مطالعه": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "سلامتی": "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  "ایده": "bg-rose-500/10 text-rose-600 dark:text-rose-400",
  "عمومی": "bg-muted text-muted-foreground",
};