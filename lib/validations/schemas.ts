import { z } from 'zod';

export const DateSchema = z.string().regex(
  /^\d{4}-\d{2}-\d{2}$/, 
  "تاریخ باید به فرمت YYYY-MM-DD باشد"
);

export const TimeSchema = z.string().regex(
  /^([01][0-9]|2[0-3]):[0-5][0-9]$/,
  "زمان باید به فرمت HH:MM باشد"
);

export const ReminderSchema = z.object({
  title: z.string().min(1, "عنوان الزامی است").max(100, "عنوان خیلی طولانی است"),
  note: z.string().optional().default(""),
  time: TimeSchema,
  repeat: z.enum(["روزانه", "یکبار"]).default("روزانه"),
  priority: z.enum(["low", "medium", "high"]).default("medium"),
});

export type ReminderFormData = z.infer<typeof ReminderSchema>;

export const TaskSchema = z.object({
  title: z.string().min(1, "عنوان وظیفه الزامی است"),
  description: z.string().optional().default(""),
  date: DateSchema,
  time: TimeSchema.optional().or(z.literal("")),
});

export type TaskFormData = z.infer<typeof TaskSchema>;

export const JournalSchema = z.object({
  title: z.string().min(1, "عنوان الزامی است"),
  content: z.string().min(1, "متن یادداشت الزامی است"),
  date: DateSchema,
});

export type JournalFormData = z.infer<typeof JournalSchema>;

export const LearningSchema = z.object({
  title: z.string().min(1, "عنوان الزامی است"),
  description: z.string().optional().default(""),
  tag: z.string().min(1, "تگ الزامی است"),
});

export type LearningFormData = z.infer<typeof LearningSchema>;